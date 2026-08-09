use crate::errors::SemanticResult;
use crate::semantics::state_machine::StateMachineAnalysis;
use fpp_ast::{
    DefAction, DefChoice, DefGuard, DefSignal, DefState, DefStateMachine, SpecInitialTransition,
    SpecStateEntry, SpecStateExit, SpecStateTransition, StateMachineMember, StateMember,
};

/// The result type of a state machine analysis step
pub type SmResult = SemanticResult<StateMachineAnalysis>;

/// A generic analysis visitor for state machine semantics.
///
/// This trait folds the behavior of the Scala `StateMachineAnalysisVisitor`
/// and `StateAnalyzer` mixins: the default `def_state` pushes the state name
/// onto the scope name list and visits the state members.
pub trait StateMachineAnalysisVisitor {
    /// The default action: return the analysis unchanged
    fn default(&self, sma: StateMachineAnalysis) -> SmResult {
        Ok(sma)
    }

    fn def_action(&self, sma: StateMachineAnalysis, _node: &DefAction) -> SmResult {
        self.default(sma)
    }

    fn def_guard(&self, sma: StateMachineAnalysis, _node: &DefGuard) -> SmResult {
        self.default(sma)
    }

    fn def_choice(&self, sma: StateMachineAnalysis, _node: &DefChoice) -> SmResult {
        self.default(sma)
    }

    fn def_signal(&self, sma: StateMachineAnalysis, _node: &DefSignal) -> SmResult {
        self.default(sma)
    }

    fn spec_initial_transition(
        &self,
        sma: StateMachineAnalysis,
        _node: &SpecInitialTransition,
    ) -> SmResult {
        self.default(sma)
    }

    fn spec_state_entry(&self, sma: StateMachineAnalysis, _node: &SpecStateEntry) -> SmResult {
        self.default(sma)
    }

    fn spec_state_exit(&self, sma: StateMachineAnalysis, _node: &SpecStateExit) -> SmResult {
        self.default(sma)
    }

    fn spec_state_transition(
        &self,
        sma: StateMachineAnalysis,
        _node: &SpecStateTransition,
    ) -> SmResult {
        self.default(sma)
    }

    /// Analyze a state definition. The default behavior comes from
    /// `StateAnalyzer`: push the state name onto the scope name list, visit
    /// the members, and restore the scope name list.
    fn def_state(&self, sma: StateMachineAnalysis, node: &DefState) -> SmResult {
        self.state_analyzer_def_state(sma, node)
    }

    /// The `StateAnalyzer` implementation of `def_state`, available to
    /// passes that override `def_state` and need to call `super`.
    fn state_analyzer_def_state(&self, mut sma: StateMachineAnalysis, node: &DefState) -> SmResult {
        let saved = sma.scope_name_list.clone();
        sma.scope_name_list.insert(0, node.name.data.clone());
        let mut sma = self.visit_state_members(sma, &node.members)?;
        sma.scope_name_list = saved;
        Ok(sma)
    }

    /// Analyze a state machine definition, visiting its members
    fn def_state_machine(&self, sma: StateMachineAnalysis, node: &DefStateMachine) -> SmResult {
        match &node.members {
            Some(members) => self.visit_sm_members(sma, members),
            None => Ok(sma),
        }
    }

    fn visit_sm_members(
        &self,
        sma: StateMachineAnalysis,
        members: &[StateMachineMember],
    ) -> SmResult {
        members
            .iter()
            .try_fold(sma, |sma, m| self.match_state_machine_member(sma, m))
    }

    fn visit_state_members(&self, sma: StateMachineAnalysis, members: &[StateMember]) -> SmResult {
        members
            .iter()
            .try_fold(sma, |sma, m| self.match_state_member(sma, m))
    }

    fn match_state_machine_member(
        &self,
        sma: StateMachineAnalysis,
        member: &StateMachineMember,
    ) -> SmResult {
        match member {
            StateMachineMember::DefAction(n) => self.def_action(sma, n),
            StateMachineMember::DefGuard(n) => self.def_guard(sma, n),
            StateMachineMember::DefChoice(n) => self.def_choice(sma, n),
            StateMachineMember::DefSignal(n) => self.def_signal(sma, n),
            StateMachineMember::DefState(n) => self.def_state(sma, n),
            StateMachineMember::SpecInitialTransition(n) => self.spec_initial_transition(sma, n),
            // Type definitions are handled by the main analysis
            _ => Ok(sma),
        }
    }

    fn match_state_member(&self, sma: StateMachineAnalysis, member: &StateMember) -> SmResult {
        match member {
            StateMember::DefChoice(n) => self.def_choice(sma, n),
            StateMember::DefState(n) => self.def_state(sma, n),
            StateMember::SpecInitialTransition(n) => self.spec_initial_transition(sma, n),
            StateMember::SpecStateEntry(n) => self.spec_state_entry(sma, n),
            StateMember::SpecStateExit(n) => self.spec_state_exit(sma, n),
            StateMember::SpecStateTransition(n) => self.spec_state_transition(sma, n),
            StateMember::SpecInclude(_) => Ok(sma),
        }
    }
}
