use crate::analyzers::state_machine::SmResult;
use crate::passes::state_machine::check_transition_graph::{
    CheckChoiceCycles, CheckTGReachability, ConstructTransitionGraph,
};
use crate::semantics::state_machine::StateMachineAnalysis;
use fpp_ast::DefStateMachine;

/// Compute and check the transition graph
pub struct CheckTransitionGraph;

impl CheckTransitionGraph {
    pub fn def_state_machine(sma: StateMachineAnalysis, node: &DefStateMachine) -> SmResult {
        let mut sma = ConstructTransitionGraph::def_state_machine(sma, node)?;
        CheckTGReachability::state_machine_analysis(&sma)?;
        CheckChoiceCycles::state_machine_analysis(&sma)?;
        sma.reverse_transition_graph = sma.transition_graph.get_reverse_graph();
        Ok(sma)
    }
}
