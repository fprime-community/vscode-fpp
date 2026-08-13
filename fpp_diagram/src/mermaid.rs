//! Mermaid codegen backend for state machine diagrams.
//!
//! Turns a [`crate::ir::StateMachineDiagram`] into Mermaid `stateDiagram-v2`
//! source text. Mermaid natively models the things a state machine needs —
//! composite (nested) states, `<<choice>>` pseudostates, and the `[*]` initial
//! marker — and lays them out far better than a hand-rolled port-graph renderer.
//!
//! This is a peer of [`crate::sprotty`]: both consume the same IR, so the choice
//! of renderer is just which backend the host calls.
//!
//! ## Mapping
//!
//! | IR | Mermaid |
//! |---|---|
//! | top-level state | `state "Label" as Id` |
//! | composite state | `state "Label" as Id` + `state Id { … }` |
//! | choice | `state Id <<choice>>` |
//! | initial pseudo-state + its edge | `[*] --> Target` |
//! | composite-state initial (empty-label edge) | `[*] --> Child` inside the block |
//! | transition | `From --> To : signal [guard]` |
//!
//! Node ids are fully qualified (`S.C`); dots are sanitized to `_` for Mermaid
//! identifiers, and the unqualified name is preserved as the display label.

use crate::ir::{SmNode, SmNodeKind, StateMachineDiagram, TransitionActionMode};
use rustc_hash::FxHashMap as HashMap;
use std::fmt::Write;

/// Generate Mermaid `stateDiagram-v2` source for a state machine diagram.
///
/// In [`TransitionActionMode::Uml`] each state's entry/exit actions are shown on
/// the state itself: a leaf state uses inline description lines (`Id : entry /
/// …`), and a composite (group) state folds them into its label (Mermaid rejects
/// descriptions on group nodes, and notes attached to a group node are hoisted
/// out to the diagram's top level instead of staying nested). In
/// [`TransitionActionMode::Flattened`] they are omitted from the nodes because
/// they appear on the transition edges instead.
///
/// Internal transitions (`on signal [guard] do { … }`, which fire actions
/// without leaving the state) are shown inside the state in *both* modes: they
/// have no target arc, so there is no edge for flattened mode to fold them into.
pub fn state_machine_to_mermaid(
    diagram: &StateMachineDiagram,
    mode: TransitionActionMode,
) -> String {
    // Group real (non-initial) nodes by their parent id.
    let mut children_of: HashMap<Option<&str>, Vec<&SmNode>> = HashMap::default();
    for node in &diagram.nodes {
        if node.kind == SmNodeKind::Initial {
            continue;
        }
        children_of
            .entry(node.parent.as_deref())
            .or_default()
            .push(node);
    }

    let mut out = String::new();

    // Embed the layout options as Mermaid YAML frontmatter so the source is
    // self-contained: any Mermaid 11+ renderer (with the ELK layout plugin)
    // reproduces this diagram without external config. The options come from the
    // FPP `diagram-layout` annotation via the IR.
    let layout = &diagram.layout;
    out.push_str("---\n");
    out.push_str("config:\n");
    let _ = writeln!(out, "  layout: {}", layout.engine.elk());
    // The ELK options only apply to the ELK backend; `dagre` (Mermaid's built-in
    // renderer) ignores them, so omit the block entirely for it. Conversely, the
    // node/rank spacing (`state.*Spacing`) is honored only by `dagre` — ELK
    // computes its own spacing — so emit that block only for `dagre`.
    if layout.engine == crate::layout::LayoutEngine::Elk {
        out.push_str("  elk:\n");
        let _ = writeln!(
            out,
            "    nodePlacementStrategy: {}",
            layout.node_placement.elk()
        );
        let _ = writeln!(
            out,
            "    cycleBreakingStrategy: {}",
            layout.cycle_breaking.elk()
        );
        let _ = writeln!(
            out,
            "    considerModelOrder: {}",
            layout.consider_model_order.elk()
        );
    } else {
        out.push_str("  state:\n");
        let _ = writeln!(out, "    nodeSpacing: {}", layout.node_spacing);
        let _ = writeln!(out, "    rankSpacing: {}", layout.rank_spacing);
    }
    out.push_str("---\n");

    out.push_str("stateDiagram-v2\n");

    // The flow direction applies to both engines. For state diagrams Mermaid
    // takes it from a `direction` statement in the body (not from config).
    let _ = writeln!(out, "    direction {}", layout.direction.elk());

    // A style class so choices read as decision nodes but still show their name.
    // (A bare `<<choice>>` diamond renders without any visible label.)
    out.push_str("    classDef choice fill:#FDD35C,stroke:#7b337d,color:#000\n");

    // Node declarations (recursive, so composite states nest their children).
    if let Some(roots) = children_of.get(&None) {
        for node in roots {
            emit_node(&mut out, node, &children_of, diagram, 1, mode);
        }
    }

    // The state-machine-level initial transition(s): edges leaving the synthetic
    // initial pseudo-state become `[*] --> Target`.
    for edge in &diagram.edges {
        if edge.from == SmNode::INITIAL_ID {
            let _ = writeln!(out, "    [*] --> {}", sanitize(&edge.to));
        }
    }

    // All ordinary transitions. Initial transitions (empty label) are emitted
    // with the states above, so skip them here.
    for edge in &diagram.edges {
        if edge.from == SmNode::INITIAL_ID || is_initial_transition(edge) {
            continue;
        }
        let from = sanitize(&edge.from);
        let to = sanitize(&edge.to);
        match edge_label(edge) {
            Some(label) => {
                let _ = writeln!(out, "    {from} --> {to} : {label}");
            }
            None => {
                let _ = writeln!(out, "    {from} --> {to}");
            }
        }
    }

    out
}

/// Build a transition's edge label: the trigger on the first line and, when the
/// transition has actions, `/ a1 a2` on a second line (`<br/>` — Mermaid renders
/// it as a two-line label). Returns `None` when there is nothing to show.
fn edge_label(edge: &crate::ir::SmEdge) -> Option<String> {
    let trigger = escape_label(&edge.label);
    let has_actions = !edge.actions.is_empty();
    if trigger.is_empty() && !has_actions {
        return None;
    }
    if !has_actions {
        return Some(trigger);
    }
    let actions = escape_label(&format!("/ {}", edge.actions.join(" ")));
    if trigger.is_empty() {
        Some(actions)
    } else {
        // `<br/>` splits the label into two SVG <tspan> lines (works under
        // `securityLevel: strict` with `htmlLabels: false`).
        Some(format!("{trigger}<br/>{actions}"))
    }
}

/// Emit a single node declaration (and, for composite states, its block).
fn emit_node(
    out: &mut String,
    node: &SmNode,
    children_of: &HashMap<Option<&str>, Vec<&SmNode>>,
    diagram: &StateMachineDiagram,
    indent: usize,
    mode: TransitionActionMode,
) {
    let pad = "    ".repeat(indent);
    let id = sanitize(&node.id);

    match node.kind {
        SmNodeKind::Choice => {
            // A `<<choice>>` diamond renders without a visible label, so instead
            // show the choice as a labeled node styled as a decision (via the
            // `choice` classDef). The guards remain on the outgoing edges.
            let _ = writeln!(out, "{pad}state \"{}\" as {id}", escape_label(&node.label));
            let _ = writeln!(out, "{pad}class {id} choice");
        }
        SmNodeKind::State => {
            let kids = children_of.get(&Some(node.id.as_str()));
            let is_composite = kids.is_some_and(|k| !k.is_empty());

            // In UML mode, show the state's entry/exit actions on the state; in
            // flattened mode these appear on the transition edges instead.
            let mut action_descs: Vec<String> = if mode == TransitionActionMode::Uml {
                let mut d = Vec::new();
                if !node.entry_actions.is_empty() {
                    d.push(escape_label(&format!(
                        "entry / {}",
                        node.entry_actions.join(" ")
                    )));
                }
                if !node.exit_actions.is_empty() {
                    d.push(escape_label(&format!(
                        "exit / {}",
                        node.exit_actions.join(" ")
                    )));
                }
                d
            } else {
                Vec::new()
            };

            // Internal transitions (`on signal [guard] do { ... }`) react to a
            // signal without changing state, so — like entry/exit actions — they
            // belong inside the state box, never as an arrow. They are shown in
            // *both* action modes: there is no transition edge to fold them into,
            // so flattened mode cannot move them elsewhere.
            action_descs.extend(node.internal_transitions.iter().map(|t| escape_label(t)));

            // Display label: the unqualified name. Mermaid forbids a description
            // line on a *composite* (group) state ("Group nodes can only have
            // label"), and a note attached to a group node is hoisted out of its
            // parent to the diagram's top level (losing the nesting). So fold a
            // composite state's entry/exit actions into its label instead — the
            // label belongs to the (nested) box, so the actions stay in place.
            // `<br/>` splits the label into stacked <tspan> lines (works under
            // `securityLevel: strict` with `htmlLabels: false`).
            let mut label = escape_label(&node.label);
            if is_composite && !action_descs.is_empty() {
                label.push_str("<br/>");
                label.push_str(&action_descs.join("<br/>"));
            }
            let _ = writeln!(out, "{pad}state \"{label}\" as {id}");

            // A leaf state carries its entry/exit as inline description lines
            // (`Id : entry / …`). Composite states already carry them in the
            // label above.
            if !is_composite {
                for desc in &action_descs {
                    let _ = writeln!(out, "{pad}{id} : {desc}");
                }
            }

            if let Some(kids) = kids.filter(|k| !k.is_empty()) {
                let _ = writeln!(out, "{pad}state {id} {{");
                for child in kids {
                    emit_node(out, child, children_of, diagram, indent + 1, mode);
                }
                // This composite state's own initial transition (an empty-label
                // edge from this state to one of its children) becomes `[*] -->`
                // inside the block.
                for edge in &diagram.edges {
                    if edge.from == node.id && is_initial_transition(edge) {
                        let _ = writeln!(out, "{pad}    [*] --> {}", sanitize(&edge.to));
                    }
                }
                let _ = writeln!(out, "{pad}}}");
            }
        }
        // The initial pseudo-state is never emitted as a node; its edge is
        // rendered as `[*] -->` at the appropriate scope.
        SmNodeKind::Initial => {}
    }
}

/// Whether an edge is an initial transition (rendered as `[*] -->`). Initial
/// transitions are the only edges with an empty trigger label; every state
/// transition carries a signal and every choice branch carries a guard.
fn is_initial_transition(edge: &crate::ir::SmEdge) -> bool {
    edge.from != SmNode::INITIAL_ID && edge.label.is_empty()
}

/// Sanitize a node id into a valid Mermaid identifier (alphanumeric + `_`).
fn sanitize(id: &str) -> String {
    id.chars()
        .map(|c| {
            if c.is_ascii_alphanumeric() || c == '_' {
                c
            } else {
                '_'
            }
        })
        .collect()
}

/// Escape a label for use in Mermaid text: strip characters that would break the
/// line (quotes, newlines). Labels are short trigger strings like `s [g]`.
fn escape_label(label: &str) -> String {
    label.replace(['"', '\n', '\r'], " ").trim().to_string()
}
