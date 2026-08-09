use crate::Analysis;
use crate::analyzers::state_machine::SmResult;
use crate::passes::state_machine::check_typed_elements::{
    CheckActionAndGuardTypes, ComputeTypeOptionMap,
};
use crate::semantics::state_machine::StateMachineAnalysis;
use fpp_ast::DefStateMachine;

/// Check typed elements
pub struct CheckTypedElements;

impl CheckTypedElements {
    pub fn def_state_machine(
        a: &Analysis,
        sma: StateMachineAnalysis,
        node: &DefStateMachine,
    ) -> SmResult {
        let sma = ComputeTypeOptionMap::def_state_machine(a, sma, node)?;
        CheckActionAndGuardTypes::def_state_machine(a, sma, node)
    }
}
