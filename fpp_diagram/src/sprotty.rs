//! Lowering from the framework-agnostic [`crate::ir`] into a sprotty `SModel`
//! JSON tree.
//!
//! This is the sprotty-specific renderer target. The produced model mirrors the
//! shapes the sprotty webview expects (`SGraph` / `SNode` / `SPort` / `SEdge` /
//! `SLabel`), carrying FPP specifics on extra fields (`kind`, `isOutput`) that
//! the FPP `IView`s and the ELK layout configurator read. It is **layout-free**:
//! nodes/ports get fixed label sizes but no positions — layout (ELK) runs in the
//! JS host. See `docs/visualization-work-to-go.md` §2.1.

use crate::ir::{Diagram, Direction, Node, Port};
use serde::{Deserialize, Serialize};

/// Fixed label/port sizes, mirroring the legacy `generator.ts`. Because these
/// are fixed, the host can skip the DOM bounds-measurement round trip and let
/// ELK size nodes from ports + labels.
mod size {
    /// Component name/class label.
    pub const COMPONENT_LABEL: (f64, f64) = (100.0, 15.0);
    /// Port name label.
    pub const PORT_LABEL: (f64, f64) = (50.0, 10.0);
    /// A physical port box.
    pub const PORT: (f64, f64) = (10.0, 10.0);
}

/// A 2D size.
#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub struct Dimension {
    pub width: f64,
    pub height: f64,
}

impl From<(f64, f64)> for Dimension {
    fn from((width, height): (f64, f64)) -> Self {
        Dimension { width, height }
    }
}

/// A sprotty model element. Variants are distinguished by the `type` tag, which
/// matches the `configureModelElement` registrations in the webview DI config.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type")]
pub enum SModelElement {
    /// The root graph element.
    #[serde(rename = "graph")]
    Graph {
        id: String,
        children: Vec<SModelElement>,
    },
    /// A component node.
    #[serde(rename = "node:component", rename_all = "camelCase")]
    ComponentNode {
        id: String,
        /// FPP extra: `active` | `queued` | `passive`; drives node styling.
        kind: String,
        children: Vec<SModelElement>,
    },
    /// A port on a component node.
    #[serde(rename = "port", rename_all = "camelCase")]
    Port {
        id: String,
        size: Dimension,
        /// FPP extra: the port kind (e.g. `sync`, `async`, `command recv`);
        /// drives port styling.
        kind: String,
        /// FPP extra: outputs are placed EAST, inputs WEST by the ELK config.
        is_output: bool,
        children: Vec<SModelElement>,
    },
    /// A label on a component node.
    #[serde(rename = "label:node:component")]
    ComponentLabel {
        id: String,
        text: String,
        size: Dimension,
    },
    /// A label on a port.
    #[serde(rename = "label:port")]
    PortLabel {
        id: String,
        text: String,
        size: Dimension,
    },
    /// A connection edge.
    #[serde(rename = "edge", rename_all = "camelCase")]
    Edge {
        id: String,
        source_id: String,
        target_id: String,
    },

    // --- state machine elements ---
    /// A state node in a state machine diagram.
    #[serde(rename = "node:state", rename_all = "camelCase")]
    StateNode {
        id: String,
        /// Nesting depth (0 = top level); drives progressively darker shading.
        depth: u32,
        /// Hover text (entry/exit actions); empty if none. Rendered as an SVG
        /// `<title>` by the webview view.
        detail: String,
        children: Vec<SModelElement>,
    },
    /// A choice (junction) node in a state machine diagram.
    #[serde(rename = "node:choice", rename_all = "camelCase")]
    ChoiceNode {
        id: String,
        /// Nesting depth (0 = top level).
        depth: u32,
        children: Vec<SModelElement>,
    },
    /// The initial pseudo-state (filled dot).
    #[serde(rename = "node:initial", rename_all = "camelCase")]
    InitialNode { id: String, size: Dimension },
    /// A label on a state node.
    #[serde(rename = "label:node:state")]
    StateLabel {
        id: String,
        text: String,
        size: Dimension,
    },
    /// A transition edge in a state machine diagram.
    #[serde(rename = "edge:transition", rename_all = "camelCase")]
    TransitionEdge {
        id: String,
        source_id: String,
        target_id: String,
        /// Hover text (full transition incl. actions); empty if none.
        detail: String,
        children: Vec<SModelElement>,
    },
    /// A label on a transition edge.
    #[serde(rename = "label:transition", rename_all = "camelCase")]
    TransitionLabel {
        id: String,
        text: String,
        size: Dimension,
        /// Sprotty edge-label placement (0..1 along the edge).
        edge_placement: EdgePlacement,
    },
}

/// Placement of a label along an edge, matching sprotty's `EdgePlacement`.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EdgePlacement {
    pub position: f64,
    pub side: String,
    pub rotate: bool,
}

/// Lower a diagram IR into a sprotty `SModel` root graph.
pub fn to_smodel(diagram: &Diagram) -> SModelElement {
    let mut children: Vec<SModelElement> = diagram.nodes.iter().map(node_to_smodel).collect();
    children.extend(diagram.edges.iter().map(|e| SModelElement::Edge {
        id: e.id.clone(),
        source_id: e.from_port.clone(),
        target_id: e.to_port.clone(),
    }));

    SModelElement::Graph {
        id: "root".to_string(),
        children,
    }
}

/// Serialize a diagram IR directly to a sprotty `SModel` JSON value.
pub fn to_smodel_json(diagram: &Diagram) -> serde_json::Value {
    serde_json::to_value(to_smodel(diagram)).expect("SModel serialization is infallible")
}

/// Lower a state machine diagram IR into a sprotty `SModel` root graph.
///
/// Composite states nest their child states/choices: a node whose `parent` is
/// another node becomes a child element of that parent, so the layout draws a
/// containment box.
///
/// With ELK's hierarchical layout (`elk.hierarchyHandling: INCLUDE_CHILDREN`),
/// each edge is routed within — and its coordinates are relative to — the
/// **lowest common ancestor** of its endpoints. So an edge must be placed as a
/// child of that LCA container, not at the root; otherwise it renders wildly
/// offset. We bucket edges by their LCA id and attach them there.
pub fn state_machine_to_smodel(diagram: &crate::ir::StateMachineDiagram) -> SModelElement {
    // Group node ids by their parent id (None → top level).
    let mut children_of: rustc_hash::FxHashMap<Option<&str>, Vec<&crate::ir::SmNode>> =
        rustc_hash::FxHashMap::default();
    for node in &diagram.nodes {
        children_of
            .entry(node.parent.as_deref())
            .or_default()
            .push(node);
    }

    // Map each node id to its parent id, to walk ancestor chains for LCA.
    let parent_of: rustc_hash::FxHashMap<&str, Option<&str>> = diagram
        .nodes
        .iter()
        .map(|n| (n.id.as_str(), n.parent.as_deref()))
        .collect();

    // Bucket each edge under its LCA container id (`None` = graph root).
    let mut edges_of: rustc_hash::FxHashMap<Option<&str>, Vec<SModelElement>> =
        rustc_hash::FxHashMap::default();
    for edge in &diagram.edges {
        let lca = lca_of(&parent_of, &edge.from, &edge.to);
        edges_of
            .entry(lca)
            .or_default()
            .push(transition_edge_element(edge));
    }

    // Recursively build the top-level nodes (each pulls in its descendant nodes
    // and the edges whose LCA is that node), then the root-level edges.
    let mut children: Vec<SModelElement> = children_of
        .get(&None)
        .map(|roots| {
            roots
                .iter()
                .map(|n| sm_node_to_smodel(n, &children_of, &mut edges_of))
                .collect()
        })
        .unwrap_or_default();

    if let Some(root_edges) = edges_of.remove(&None) {
        children.extend(root_edges);
    }

    SModelElement::Graph {
        id: "root".to_string(),
        children,
    }
}

/// Serialize a state machine diagram IR directly to a sprotty `SModel` JSON.
pub fn state_machine_to_smodel_json(diagram: &crate::ir::StateMachineDiagram) -> serde_json::Value {
    serde_json::to_value(state_machine_to_smodel(diagram))
        .expect("SModel serialization is infallible")
}

fn sm_node_to_smodel<'a>(
    node: &'a crate::ir::SmNode,
    children_of: &rustc_hash::FxHashMap<Option<&'a str>, Vec<&'a crate::ir::SmNode>>,
    edges_of: &mut rustc_hash::FxHashMap<Option<&'a str>, Vec<SModelElement>>,
) -> SModelElement {
    use crate::ir::SmNodeKind;

    // Nested states/choices declared under this node, followed by the edges whose
    // lowest-common-ancestor container is this node (ELK routes them here).
    let mut nested: Vec<SModelElement> = children_of
        .get(&Some(node.id.as_str()))
        .map(|kids| {
            kids.iter()
                .map(|k| sm_node_to_smodel(k, children_of, edges_of))
                .collect()
        })
        .unwrap_or_default();
    if let Some(own_edges) = edges_of.remove(&Some(node.id.as_str())) {
        nested.extend(own_edges);
    }

    match node.kind {
        SmNodeKind::Initial => SModelElement::InitialNode {
            id: node.id.clone(),
            size: Dimension {
                width: 14.0,
                height: 14.0,
            },
        },
        SmNodeKind::State => {
            let mut children = vec![sm_node_label(node)];
            children.extend(nested);
            SModelElement::StateNode {
                id: node.id.clone(),
                depth: node.depth,
                detail: node.detail.clone(),
                children,
            }
        }
        SmNodeKind::Choice => {
            let mut children = vec![sm_node_label(node)];
            children.extend(nested);
            SModelElement::ChoiceNode {
                id: node.id.clone(),
                depth: node.depth,
                children,
            }
        }
    }
}

/// Build a transition edge element (with its optional label child).
fn transition_edge_element(edge: &crate::ir::SmEdge) -> SModelElement {
    let mut edge_children = Vec::new();
    if !edge.label.is_empty() {
        // The visible label is the trigger only (single line); actions live in
        // `detail` (hover). Size is deterministic without DOM metrics.
        edge_children.push(SModelElement::TransitionLabel {
            id: format!("{}.label", edge.id),
            text: edge.label.clone(),
            size: text_size(&edge.label),
            edge_placement: EdgePlacement {
                position: 0.5,
                side: "top".to_string(),
                rotate: false,
            },
        });
    }
    SModelElement::TransitionEdge {
        id: edge.id.clone(),
        source_id: edge.from.clone(),
        target_id: edge.to.clone(),
        detail: edge.detail.clone(),
        children: edge_children,
    }
}

/// The lowest common ancestor container of two node ids, walking `parent_of`.
/// Returns `None` when the LCA is the graph root (they share no ancestor).
fn lca_of<'a>(
    parent_of: &rustc_hash::FxHashMap<&'a str, Option<&'a str>>,
    a: &'a str,
    b: &'a str,
) -> Option<&'a str> {
    // Collect the ancestor chain of `a` (including `a` itself), then walk up from
    // `b` until we hit one of them.
    let mut a_chain: Vec<&str> = vec![a];
    let mut cur = a;
    while let Some(Some(p)) = parent_of.get(cur) {
        a_chain.push(p);
        cur = p;
    }
    let a_set: rustc_hash::FxHashSet<&str> = a_chain.into_iter().collect();

    let mut cur = b;
    loop {
        if a_set.contains(cur) {
            return Some(cur);
        }
        match parent_of.get(cur) {
            Some(Some(p)) => cur = p,
            _ => return None,
        }
    }
}

/// Build the visible name label for a state or choice node — the name only.
/// Entry/exit actions are carried in the node's `detail` (hover), not the label,
/// so state boxes stay small.
fn sm_node_label(node: &crate::ir::SmNode) -> SModelElement {
    SModelElement::StateLabel {
        id: format!("{}.label", node.id),
        text: node.label.clone(),
        size: text_size(&node.label),
    }
}

/// Estimate the rendered size of a single-line text, using fixed per-character
/// width and a fixed line height so ELK layout needs no DOM metrics.
fn text_size(text: &str) -> Dimension {
    const CHAR_WIDTH: f64 = 7.0;
    const LINE_HEIGHT: f64 = 14.0;
    let chars = text.chars().count();
    Dimension {
        width: (chars as f64 * CHAR_WIDTH).max(20.0),
        height: LINE_HEIGHT,
    }
}

fn node_to_smodel(node: &Node) -> SModelElement {
    let mut children: Vec<SModelElement> = Vec::new();

    // Primary label: the instance/component name.
    children.push(SModelElement::ComponentLabel {
        id: format!("{}.label.name", node.id),
        text: node.name.clone(),
        size: size::COMPONENT_LABEL.into(),
    });
    // Secondary label: the component class name, when present.
    if let Some(class_name) = &node.class_name {
        children.push(SModelElement::ComponentLabel {
            id: format!("{}.label.class", node.id),
            text: class_name.clone(),
            size: size::COMPONENT_LABEL.into(),
        });
    }

    children.extend(node.ports.iter().map(port_to_smodel));

    SModelElement::ComponentNode {
        id: node.id.clone(),
        kind: component_kind_str(node.kind).to_string(),
        children,
    }
}

fn port_to_smodel(port: &Port) -> SModelElement {
    let label = SModelElement::PortLabel {
        id: format!("{}.label", port.id),
        text: port.label.clone(),
        size: size::PORT_LABEL.into(),
    };
    SModelElement::Port {
        id: port.id.clone(),
        size: size::PORT.into(),
        kind: port_kind_str(&port.kind),
        is_output: matches!(port.direction, Direction::Output),
        children: vec![label],
    }
}

fn component_kind_str(kind: crate::ir::ComponentKind) -> &'static str {
    match kind {
        crate::ir::ComponentKind::Active => "active",
        crate::ir::ComponentKind::Passive => "passive",
        crate::ir::ComponentKind::Queued => "queued",
    }
}

/// The string form of a port kind, matching what the webview port views key on.
fn port_kind_str(kind: &crate::ir::PortKind) -> String {
    use crate::ir::PortKind;
    match kind {
        PortKind::Sync => "sync".to_string(),
        PortKind::Async => "async".to_string(),
        PortKind::Guarded => "guarded".to_string(),
        PortKind::Output => "output".to_string(),
        PortKind::Special(s) => s.clone(),
        PortKind::Internal => "internal".to_string(),
    }
}
