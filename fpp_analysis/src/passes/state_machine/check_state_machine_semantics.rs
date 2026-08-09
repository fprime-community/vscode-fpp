use crate::Analysis;
use crate::analyzers::state_machine::SmResult;
use crate::passes::state_machine::{
    CheckInitialTransitions, CheckSignalUses, CheckStateMachineUses, CheckTransitionGraph,
    CheckTypedElements, ComputeFlattenedChoiceTransitionMap, ComputeFlattenedStateTransitionMap,
    EnterStateMachineSymbols,
};
use crate::semantics::state_machine::StateMachineAnalysis;
use fpp_ast::DefStateMachine;

/// Check semantics for a state machine definition
pub struct CheckStateMachineSemantics;

impl CheckStateMachineSemantics {
    pub fn def_state_machine(
        a: &Analysis,
        sma: StateMachineAnalysis,
        node: &DefStateMachine,
    ) -> SmResult {
        match node.members {
            // Internal state machine: check it
            Some(_) => {
                let sma = EnterStateMachineSymbols::def_state_machine(sma, node)?;
                let sma = CheckStateMachineUses::def_state_machine(sma, node)?;
                let sma = CheckInitialTransitions::def_state_machine(sma, node)?;
                let sma = CheckSignalUses::def_state_machine(sma, node)?;
                let sma = CheckTransitionGraph::def_state_machine(sma, node)?;
                let sma = CheckTypedElements::def_state_machine(a, sma, node)?;
                let sma = ComputeFlattenedStateTransitionMap::def_state_machine(sma, node)?;
                let sma = ComputeFlattenedChoiceTransitionMap::def_state_machine(sma, node)?;
                Ok(sma)
            }
            // External state machine: do nothing
            None => Ok(sma),
        }
    }
}
