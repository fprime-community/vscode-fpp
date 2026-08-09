use crate::analyzers::state_machine::SmResult;
use crate::semantics::state_machine::{StateMachineAnalysis, StateMachineSymbol};
use fpp_ast::{
    DefChoice, SpecInitialTransition, SpecStateTransition, TransitionExpr, TransitionOrDo,
};

/// Analyze transition expressions
pub trait TransitionExprAnalyzer {
    // ----------------------------------------------------------------------
    // Interface methods to override
    // Each of these methods is called when a corresponding transition
    // expression is visited
    // ----------------------------------------------------------------------

    /// A transition expression in an external state transition
    fn state_transition_expr(
        &self,
        sma: StateMachineAnalysis,
        _a_node: &SpecStateTransition,
        _expr_node: &TransitionExpr,
    ) -> SmResult {
        Ok(sma)
    }

    /// A transition expression in an initial transition
    fn initial_transition_expr(
        &self,
        sma: StateMachineAnalysis,
        _a_node: &SpecInitialTransition,
        _expr_node: &TransitionExpr,
    ) -> SmResult {
        Ok(sma)
    }

    /// The pair of transition expressions in a choice
    fn choice_transition_expr_pair(
        &self,
        sma: StateMachineAnalysis,
        choice: &StateMachineSymbol,
        if_expr_node: &TransitionExpr,
        else_expr_node: &TransitionExpr,
    ) -> SmResult {
        let sma = self.choice_transition_expr(sma, choice, if_expr_node)?;
        self.choice_transition_expr(sma, choice, else_expr_node)
    }

    /// A transition expression in a choice
    fn choice_transition_expr(
        &self,
        sma: StateMachineAnalysis,
        _choice: &StateMachineSymbol,
        _expr_node: &TransitionExpr,
    ) -> SmResult {
        Ok(sma)
    }

    // ----------------------------------------------------------------------
    // Implementation using StateMachineAnalysisVisitor
    // ----------------------------------------------------------------------

    fn def_choice_texpr(&self, sma: StateMachineAnalysis, node: &DefChoice) -> SmResult {
        let choice = StateMachineSymbol::Choice(std::sync::Arc::new(node.clone()));
        self.choice_transition_expr_pair(sma, &choice, &node.if_transition, &node.else_transition)
    }

    fn spec_initial_transition_texpr(
        &self,
        sma: StateMachineAnalysis,
        node: &SpecInitialTransition,
    ) -> SmResult {
        self.initial_transition_expr(sma, node, &node.transition)
    }

    fn spec_state_transition_texpr(
        &self,
        sma: StateMachineAnalysis,
        node: &SpecStateTransition,
    ) -> SmResult {
        match &node.transition_or_do {
            TransitionOrDo::Transition(transition) => {
                self.state_transition_expr(sma, node, transition)
            }
            _ => Ok(sma),
        }
    }
}
