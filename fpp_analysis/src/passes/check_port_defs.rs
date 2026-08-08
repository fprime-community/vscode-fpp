use crate::Analysis;
use crate::errors::SemanticError;
use fpp_ast::{DefPort, MoveWalkable, Node, Visitor};
use fpp_core::Spanned;
use rustc_hash::FxHashMap as HashMap;
use std::ops::ControlFlow;

/// Check port definitions.
pub struct CheckPortDefs;

impl<'ast> Visitor<'ast> for CheckPortDefs {
    type Break = ();
    type State = Analysis;

    /// Descend into every container so that port definitions nested in modules
    /// are reached.
    fn super_visit(&self, a: &mut Analysis, node: Node<'ast>) -> ControlFlow<Self::Break> {
        node.walk(a, self)
    }

    fn visit_def_port(&self, a: &mut Self::State, node: &'ast DefPort) -> ControlFlow<Self::Break> {
        let mut seen: HashMap<String, fpp_core::Span> = HashMap::default();
        for param in &node.params {
            if let Some(prev_loc) = seen.insert(param.name.data.clone(), param.name.span()) {
                SemanticError::DuplicateParameter {
                    name: param.name.data.clone(),
                    loc: param.name.span(),
                    prev_loc,
                }
                .emit();
            }
        }

        self.super_visit(a, Node::DefPort(node))
    }
}
