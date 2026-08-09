mod compute_type_option_map;
pub use compute_type_option_map::*;

mod check_action_and_guard_types;
pub use check_action_and_guard_types::*;
use fpp_ast::DefStateMachine;

use crate::{
    Analysis, analyzers::state_machine::SmResult, semantics::state_machine::StateMachineAnalysis,
};

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
