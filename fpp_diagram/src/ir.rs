//! The framework-agnostic diagram intermediate representation.
//!
//! This module defines a small, self-contained model of an FPP diagram in terms
//! of FPP semantics — component boxes, typed ports, and connections between
//! them. It deliberately knows nothing about any rendering framework (sprotty,
//! ELK, graphviz, …). Lowering from [`fpp_analysis::Analysis`] produces this IR
//! (see [`crate::lower`]); a second lowering step targets a specific rendering
//! framework (see [`crate::sprotty`]).
//!
//! Keeping this seam means a new renderer only needs a new IR-consumer, not a
//! new analysis walk.

use serde::{Deserialize, Serialize};

/// The kind of diagram being produced.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum DiagramKind {
    /// A single component definition and its ports.
    Component,
    /// A topology: component instances and the connections between them.
    Topology,
    /// A single named connection group within a topology.
    ConnectionGroup,
    /// A state machine: states, choices, and transitions between them.
    StateMachine,
}

/// How a state machine transition's actions are presented on its edge label.
///
/// A transition's *executed* action sequence (per the FPP spec) is: the exit
/// actions of the states being left, then the transition's own `do { }`
/// actions, then the entry actions of the states being entered (including the
/// target leaf state's own entry actions). Two views of this are useful:
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum TransitionActionMode {
    /// UML statechart convention (default): the edge shows only the
    /// transition's own `do { }` actions. Each state's entry/exit actions are
    /// shown inside the state, not duplicated on its edges.
    #[default]
    Uml,
    /// Flattened execution view: the edge shows the full action sequence that
    /// actually runs when the transition is taken (exit + do + entry, including
    /// the target leaf's entry actions).
    Flattened,
}

/// The kind of a component, which drives node styling.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum ComponentKind {
    Active,
    Passive,
    Queued,
}

impl From<&fpp_ast::ComponentKind> for ComponentKind {
    fn from(kind: &fpp_ast::ComponentKind) -> Self {
        match kind {
            fpp_ast::ComponentKind::Active => ComponentKind::Active,
            fpp_ast::ComponentKind::Passive => ComponentKind::Passive,
            fpp_ast::ComponentKind::Queued => ComponentKind::Queued,
        }
    }
}

/// The direction of a port, relative to its owning component.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum Direction {
    Input,
    Output,
}

/// A finer classification of a port, used for styling.
///
/// General ports carry their queueing discipline; special ports (command,
/// telemetry, …) carry their FPP special-port kind name.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum PortKind {
    /// A synchronous general input/output port.
    Sync,
    /// An asynchronous general input port.
    Async,
    /// A guarded general input port.
    Guarded,
    /// A general output port (outputs have no queueing discipline).
    Output,
    /// A framework special port (command recv, telemetry, event, …). The string
    /// is the FPP special-port kind rendered in FPP style (e.g. `command recv`).
    Special(String),
    /// An internal port (not connectable; shown for completeness).
    Internal,
}

/// A single port on a node.
///
/// FPP array ports of width `n` are expanded into `n` individual [`Port`]s, one
/// per array index, so that each connection endpoint references a concrete port.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Port {
    /// Stable identifier: `<node id>.<port name>.<index>`. Connection endpoints
    /// reference this exact id.
    pub id: String,
    /// The unqualified port name, e.g. `cmdIn`.
    pub name: String,
    /// The label to display. For arrays this is `name[index]`, otherwise `name`.
    pub label: String,
    pub direction: Direction,
    pub kind: PortKind,
    /// The array index of this physical port within its declared port.
    pub index: i128,
    /// The declared array width of the port this element belongs to (`1` for a
    /// scalar port).
    pub array_size: i128,
    /// The fully qualified port type, if any (e.g. `Fw.Cmd`); `serial` ports and
    /// internal ports have `None`.
    pub type_name: Option<String>,
}

/// A node in the diagram: a component definition (component diagrams) or a
/// component instance (topology diagrams).
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Node {
    /// Stable identifier. For instances this is the qualified instance name; for
    /// a component definition it is the qualified component name.
    pub id: String,
    /// The primary label (instance name, or component name).
    pub name: String,
    /// The fully qualified name.
    pub qualified_name: String,
    /// The component class name to show as a secondary label (e.g. the component
    /// definition an instance is of). `None` for a component-definition diagram.
    pub class_name: Option<String>,
    pub kind: ComponentKind,
    pub ports: Vec<Port>,
}

/// A connection between two ports in the diagram.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Edge {
    /// Stable identifier.
    pub id: String,
    /// The source port id (an output port). Matches a [`Port::id`].
    pub from_port: String,
    /// The target port id (an input port). Matches a [`Port::id`].
    pub to_port: String,
    /// The connection graph (group) name this edge belongs to.
    pub graph_name: String,
    /// Whether this connection is declared `unmatched`.
    pub unmatched: bool,
}

/// A complete diagram in intermediate form.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Diagram {
    pub kind: DiagramKind,
    /// The fully qualified name of the element this diagram depicts.
    pub name: String,
    pub nodes: Vec<Node>,
    pub edges: Vec<Edge>,
}

impl Port {
    /// Build the stable id for a port element under a node.
    pub fn make_id(node_id: &str, port_name: &str, index: i128) -> String {
        format!("{node_id}.{port_name}.{index}")
    }
}

impl Diagram {
    /// Remove ports that are not referenced by any edge.
    ///
    /// This is the IR-level equivalent of the legacy "hide unused ports" toggle.
    /// It is a no-op for [`DiagramKind::Component`] diagrams, which have no edges
    /// and are meant to show a component's full port surface.
    pub fn prune_unused_ports(&mut self) {
        if self.kind == DiagramKind::Component {
            return;
        }
        let used: rustc_hash::FxHashSet<&str> = self
            .edges
            .iter()
            .flat_map(|e| [e.from_port.as_str(), e.to_port.as_str()])
            .collect();
        for node in &mut self.nodes {
            node.ports.retain(|p| used.contains(p.id.as_str()));
        }
    }
}

// --- state machine diagrams -------------------------------------------------
//
// State machine diagrams are a node graph (states + choices connected by
// transitions), not a port graph, so they use their own IR types rather than
// overloading [`Node`]/[`Port`]/[`Edge`].

/// The kind of a state machine diagram node.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum SmNodeKind {
    /// A state (leaf or composite).
    State,
    /// A choice (junction) node — a guarded branch, drawn as a diamond.
    Choice,
    /// The synthetic initial pseudo-state (the filled dot).
    Initial,
}

/// A node in a state machine diagram: a state, a choice, or the initial
/// pseudo-state.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SmNode {
    /// Stable identifier. For states/choices this is the qualified name within
    /// the state machine (e.g. `S.C`); the initial pseudo-state uses a fixed id.
    pub id: String,
    /// The label to display (unqualified name; empty for the initial pseudo-state).
    pub label: String,
    pub kind: SmNodeKind,
    /// The id of the parent state, for hierarchical (composite) states. `None`
    /// for top-level nodes.
    pub parent: Option<String>,
    /// Nesting depth: `0` for a top-level state, `1` for a state directly inside
    /// a composite state, and so on. Drives progressively darker shading.
    pub depth: u32,
    /// Entry actions (`entry do { ... }`), by name; empty if none.
    pub entry_actions: Vec<String>,
    /// Exit actions (`exit do { ... }`), by name; empty if none.
    pub exit_actions: Vec<String>,
    /// Internal transitions (`on signal [guard] do { ... }`), each pre-formatted
    /// as `signal [guard] / a1 a2`. These react to a signal without changing
    /// state, so — like entry/exit actions — they are shown *inside* the state
    /// box rather than as a transition arrow (an arrow would wrongly imply the
    /// state's exit/entry actions run). Empty if the state has none.
    #[serde(default)]
    pub internal_transitions: Vec<String>,
    /// Hover text with the full detail (entry/exit actions), or empty if none.
    /// Kept off the visible label to avoid a wide, noisy diagram.
    pub detail: String,
}

/// A transition edge in a state machine diagram.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SmEdge {
    /// Stable identifier.
    pub id: String,
    /// Source node id (a state, a choice, or the initial pseudo-state).
    pub from: String,
    /// Target node id.
    pub to: String,
    /// The transition trigger: `signal [guard]`, or a choice's `[guard]` /
    /// `[!guard]`. Empty for a bare initial transition. Renderers show this as
    /// the primary (first) line of the edge label.
    pub label: String,
    /// The transition's actions (the `do { … }` list), by name; empty if none.
    /// Renderers may show these as a secondary line under the trigger.
    pub actions: Vec<String>,
    /// Hover text with the full transition including actions (e.g.
    /// `s [g] / a1 a2`), or empty if the label already says everything.
    pub detail: String,
}

/// A complete state machine diagram in intermediate form.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct StateMachineDiagram {
    /// The fully qualified name of the state machine.
    pub name: String,
    pub nodes: Vec<SmNode>,
    pub edges: Vec<SmEdge>,
    /// ELK layout options, parsed from the state machine's `diagram-layout`
    /// source annotation (defaults when absent).
    #[serde(default)]
    pub layout: crate::layout::SmLayout,
}

impl SmNode {
    /// The fixed id of the synthetic initial pseudo-state.
    pub const INITIAL_ID: &'static str = "__initial__";
}
