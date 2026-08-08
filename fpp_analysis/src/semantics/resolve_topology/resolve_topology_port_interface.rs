use crate::Analysis;
use crate::errors::SemanticResult;
use crate::semantics::{PortInstanceIdentifier, Topology};
use fpp_core::Spanned;

/// Resolve a topology's port interface
pub fn resolve(a: &Analysis, t: &mut Topology) -> SemanticResult {
    let ports = t.ports.clone();
    for a_node in ports {
        let top_port = &a_node.underlying_ast;
        if let Some(instance) = PortInstanceIdentifier::from_node(a, top_port)? {
            t.add_port(
                &a_node.name,
                a_node.node_id,
                a_node.loc,
                instance,
                top_port.span(),
            )?;
        }
    }
    Ok(())
}
