mod construct_transition_graph;
pub use construct_transition_graph::*;

mod check_choice_cycles;
pub use check_choice_cycles::*;

mod check_tg_reachability;
pub use check_tg_reachability::*;
use fpp_ast::DefStateMachine;
use std::ops::ControlFlow;

use crate::{analyzers::state_machine::SmResult, semantics::state_machine::StateMachineAnalysis};

/// Compute and check the transition graph
pub struct CheckTransitionGraph;

impl CheckTransitionGraph {
    pub fn def_state_machine(sma: &mut StateMachineAnalysis, node: &DefStateMachine) -> SmResult {
        ConstructTransitionGraph::def_state_machine(sma, node)?;
        CheckTGReachability::state_machine_analysis(sma)?;
        CheckChoiceCycles::state_machine_analysis(sma)?;
        sma.reverse_transition_graph = sma.transition_graph.get_reverse_graph();
        ControlFlow::Continue(())
        // Note: a choice cycle found above sets `sma.blocking_error`; the caller
        // gates the typed-element pass on it (that pass walks the choice graph
        // assuming acyclicity).
    }
}
