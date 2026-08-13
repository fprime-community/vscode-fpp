//! FPP diagram lowering.
//!
//! This crate turns the FPP semantic analysis ([`fpp_analysis::Analysis`]) into
//! diagrams, in two stages:
//!
//! 1. **Analysis → IR** ([`lower`]): a framework-agnostic [`ir::Diagram`] made of
//!    component/instance nodes, expanded typed ports, and port-to-port edges.
//! 2. **IR → renderer model** ([`sprotty`]): a sprotty `SModel` JSON tree that a
//!    sprotty host lays out (with ELK) and renders.
//!
//! The IR seam keeps the analysis walk independent of any single rendering
//! framework — a new renderer only needs a new IR consumer, not a new analysis
//! pass.

pub mod ir;
pub mod layout;
pub mod lower;
pub mod lower_sm;
pub mod mermaid;
pub mod sprotty;

pub use ir::{Diagram, DiagramKind, StateMachineDiagram, TransitionActionMode};
pub use layout::SmLayout;
pub use lower::LowerError;

use fpp_analysis::Analysis;

/// Lower a port-graph element (component / topology / connection group) into a
/// diagram IR. For [`DiagramKind::ConnectionGroup`], `name` must be
/// `<topology>.<group>`.
///
/// [`DiagramKind::StateMachine`] is not a port graph and is not handled here;
/// use [`lower_state_machine`] (or [`lower_to_smodel`], which dispatches).
pub fn lower(a: &Analysis, kind: DiagramKind, name: &str) -> Result<Diagram, LowerError> {
    match kind {
        DiagramKind::Component => lower::lower_component(a, name),
        DiagramKind::Topology => lower::lower_topology(a, name),
        DiagramKind::ConnectionGroup => {
            let (topology, group) = split_group_name(name);
            lower::lower_connection_group(a, topology, group)
        }
        DiagramKind::StateMachine => Err(LowerError::NotFound {
            kind,
            name: name.to_string(),
        }),
    }
}

/// Lower a state machine (by fully qualified name) into a diagram IR.
///
/// `mode` selects how transition actions are presented on edges; see
/// [`TransitionActionMode`].
pub fn lower_state_machine(
    a: &Analysis,
    name: &str,
    mode: TransitionActionMode,
) -> Result<StateMachineDiagram, LowerError> {
    lower_sm::lower_state_machine(a, name, mode)
}

/// Lower a state machine (by fully qualified name) directly to Mermaid
/// `stateDiagram-v2` source text.
pub fn lower_state_machine_to_mermaid(
    a: &Analysis,
    name: &str,
    mode: TransitionActionMode,
) -> Result<String, LowerError> {
    let diagram = lower_state_machine(a, name, mode)?;
    Ok(mermaid::state_machine_to_mermaid(&diagram, mode))
}

/// Lower an element directly to a sprotty `SModel` JSON value.
///
/// When `hide_unused_ports` is set, ports not referenced by any connection are
/// pruned (a no-op for component and state machine diagrams). See
/// [`Diagram::prune_unused_ports`].
pub fn lower_to_smodel(
    a: &Analysis,
    kind: DiagramKind,
    name: &str,
    hide_unused_ports: bool,
    mode: TransitionActionMode,
) -> Result<serde_json::Value, LowerError> {
    if kind == DiagramKind::StateMachine {
        let diagram = lower_state_machine(a, name, mode)?;
        return Ok(sprotty::state_machine_to_smodel_json(&diagram));
    }
    let mut diagram = lower(a, kind, name)?;
    if hide_unused_ports {
        diagram.prune_unused_ports();
    }
    Ok(sprotty::to_smodel_json(&diagram))
}

/// Split a `<topology>.<group>` connection-group name into its parts. The group
/// is the final dot-separated segment.
fn split_group_name(name: &str) -> (&str, &str) {
    match name.rfind('.') {
        Some(idx) => (&name[..idx], &name[idx + 1..]),
        None => (name, ""),
    }
}
