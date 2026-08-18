use crate::Analysis;
use crate::semantics::{ImpliedUse, ImpliedUseSet};
use fpp_ast::{MoveWalkable, Node, TypeName, TypeNameKind, Visitor};
use std::ops::ControlFlow;

/// Construct the implied use map.
///
/// Handles the string case: a use of a string type implies a use of the
/// framework definitions that back it:
///
/// - Every string type implies a use of the type `FwSizeStoreType`.
/// - A string type with default size additionally implies a use of the
///   constant `FW_FIXED_LENGTH_STRING_SIZE`.
///
/// The implied uses are stored in `Analysis::implied_use_map`, keyed by the
/// string type-name node id, each with its own replicated (stable, distinct)
/// node id. They are consumed by the use-analysis passes (`CheckUses`,
/// `CheckUseDefCycles`).
pub struct ConstructImpliedUseMap;

impl<'ast> Visitor<'ast> for ConstructImpliedUseMap {
    type Break = ();
    type State = Analysis;

    /// Descend into every container so all type names in the model are reached.
    fn super_visit(&self, a: &mut Analysis, node: Node<'ast>) -> ControlFlow<Self::Break> {
        node.walk(a, self)
    }

    fn visit_type_name(&self, a: &mut Analysis, node: &'ast TypeName) -> ControlFlow<Self::Break> {
        if let TypeNameKind::String(size) = &node.kind {
            let mut set = ImpliedUseSet::default();
            set.types.push(ImpliedUse::from_ident_list_and_id(
                vec!["FwSizeStoreType".to_string()],
                node.node_id,
            ));
            if size.is_none() {
                set.constants.push(ImpliedUse::from_ident_list_and_id(
                    vec!["FW_FIXED_LENGTH_STRING_SIZE".to_string()],
                    node.node_id,
                ));
            }
            a.implied_use_map.insert(node.node_id, set);
        }
        self.super_visit(a, Node::TypeName(node))
    }
}
