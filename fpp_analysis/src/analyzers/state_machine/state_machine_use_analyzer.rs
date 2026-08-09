use crate::analyzers::state_machine::SmResult;
use crate::semantics::state_machine::StateMachineAnalysis;
use fpp_ast::{
    DefChoice, Ident, QualIdent, SpecInitialTransition, SpecStateEntry, SpecStateExit,
    SpecStateTransition, TransitionExpr, TransitionOrDo,
};

/// Analyze state machine uses.
///
/// Each of these methods is called when a corresponding use occurs.
pub trait StateMachineUseAnalyzer {
    /// A use of an action definition
    fn action_use(&self, sma: StateMachineAnalysis, _node: &Ident) -> SmResult {
        Ok(sma)
    }

    /// A use of a guard definition
    fn guard_use(&self, sma: StateMachineAnalysis, _node: &Ident) -> SmResult {
        Ok(sma)
    }

    /// A use of a signal definition
    fn signal_use(&self, sma: StateMachineAnalysis, _node: &Ident) -> SmResult {
        Ok(sma)
    }

    /// A use of a state definition or choice definition
    fn state_or_choice_use(&self, sma: StateMachineAnalysis, _node: &QualIdent) -> SmResult {
        Ok(sma)
    }

    // ------------------------------------------------------------------
    // Implementation using StateMachineAnalysisVisitor
    // ------------------------------------------------------------------

    fn def_choice_uses(&self, sma: StateMachineAnalysis, node: &DefChoice) -> SmResult {
        let sma = self.guard_use(sma, &node.guard)?;
        let sma = self.transition_expr(sma, &node.if_transition)?;
        self.transition_expr(sma, &node.else_transition)
    }

    fn spec_state_entry_uses(&self, sma: StateMachineAnalysis, node: &SpecStateEntry) -> SmResult {
        self.actions(sma, &node.actions.actions)
    }

    fn spec_state_exit_uses(&self, sma: StateMachineAnalysis, node: &SpecStateExit) -> SmResult {
        self.actions(sma, &node.actions.actions)
    }

    fn spec_initial_transition_uses(
        &self,
        sma: StateMachineAnalysis,
        node: &SpecInitialTransition,
    ) -> SmResult {
        self.transition_expr(sma, &node.transition)
    }

    fn spec_state_transition_uses(
        &self,
        sma: StateMachineAnalysis,
        node: &SpecStateTransition,
    ) -> SmResult {
        let sma = self.signal_use(sma, &node.signal)?;
        let sma = match &node.guard {
            Some(guard) => self.guard_use(sma, guard)?,
            None => sma,
        };
        self.transition_or_do(sma, &node.transition_or_do)
    }

    // ------------------------------------------------------------------
    // Private helper methods
    // ------------------------------------------------------------------

    fn transition_expr(&self, sma: StateMachineAnalysis, e: &TransitionExpr) -> SmResult {
        let sma = match &e.actions {
            Some(do_expr) => self.actions(sma, &do_expr.actions)?,
            None => sma,
        };
        self.state_or_choice_use(sma, &e.target)
    }

    fn actions(&self, sma: StateMachineAnalysis, actions: &[Ident]) -> SmResult {
        actions
            .iter()
            .try_fold(sma, |sma, action| self.action_use(sma, action))
    }

    fn transition_or_do(&self, sma: StateMachineAnalysis, tod: &TransitionOrDo) -> SmResult {
        match tod {
            TransitionOrDo::Transition(e) => self.transition_expr(sma, e),
            TransitionOrDo::Do(actions) => self.actions(sma, &actions.actions),
        }
    }
}
