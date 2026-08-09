use crate::analyzers::state_machine::SmResult;
use crate::semantics::state_machine::{StateMachineAnalysis, StateMachineTypedElement};
use fpp_ast::{
    DefChoice, SpecInitialTransition, SpecStateEntry, SpecStateExit, SpecStateTransition,
};
use std::sync::Arc;

/// State machine typed element analyzer
pub trait SmTypedElementAnalyzer {
    // ----------------------------------------------------------------------
    // Interface methods to override
    // Each of these methods is called when a corresponding typed element
    // is visited
    // ----------------------------------------------------------------------

    fn initial_transition_typed_element(
        &self,
        sma: StateMachineAnalysis,
        _te: &StateMachineTypedElement,
    ) -> SmResult {
        Ok(sma)
    }

    fn choice_typed_element(
        &self,
        sma: StateMachineAnalysis,
        _te: &StateMachineTypedElement,
    ) -> SmResult {
        Ok(sma)
    }

    fn state_entry_typed_element(
        &self,
        sma: StateMachineAnalysis,
        _te: &StateMachineTypedElement,
    ) -> SmResult {
        Ok(sma)
    }

    fn state_exit_typed_element(
        &self,
        sma: StateMachineAnalysis,
        _te: &StateMachineTypedElement,
    ) -> SmResult {
        Ok(sma)
    }

    fn state_transition_typed_element(
        &self,
        sma: StateMachineAnalysis,
        _te: &StateMachineTypedElement,
    ) -> SmResult {
        Ok(sma)
    }

    // ----------------------------------------------------------------------
    // Implementation using StateMachineAnalysisVisitor
    // ----------------------------------------------------------------------

    fn visit_typed_element(
        &self,
        sma: StateMachineAnalysis,
        te: StateMachineTypedElement,
    ) -> SmResult {
        self.dispatch_typed_element(sma, te)
    }

    fn dispatch_typed_element(
        &self,
        sma: StateMachineAnalysis,
        te: StateMachineTypedElement,
    ) -> SmResult {
        match &te {
            StateMachineTypedElement::InitialTransition(_) => {
                self.initial_transition_typed_element(sma, &te)
            }
            StateMachineTypedElement::Choice(_) => self.choice_typed_element(sma, &te),
            StateMachineTypedElement::StateEntry(_) => self.state_entry_typed_element(sma, &te),
            StateMachineTypedElement::StateExit(_) => self.state_exit_typed_element(sma, &te),
            StateMachineTypedElement::StateTransition(_) => {
                self.state_transition_typed_element(sma, &te)
            }
        }
    }

    fn def_choice_te(&self, sma: StateMachineAnalysis, node: &DefChoice) -> SmResult {
        self.visit_typed_element(
            sma,
            StateMachineTypedElement::Choice(Arc::new(node.clone())),
        )
    }

    fn spec_state_entry_te(&self, sma: StateMachineAnalysis, node: &SpecStateEntry) -> SmResult {
        self.visit_typed_element(
            sma,
            StateMachineTypedElement::StateEntry(Arc::new(node.clone())),
        )
    }

    fn spec_state_exit_te(&self, sma: StateMachineAnalysis, node: &SpecStateExit) -> SmResult {
        self.visit_typed_element(
            sma,
            StateMachineTypedElement::StateExit(Arc::new(node.clone())),
        )
    }

    fn spec_initial_transition_te(
        &self,
        sma: StateMachineAnalysis,
        node: &SpecInitialTransition,
    ) -> SmResult {
        self.visit_typed_element(
            sma,
            StateMachineTypedElement::InitialTransition(Arc::new(node.clone())),
        )
    }

    fn spec_state_transition_te(
        &self,
        sma: StateMachineAnalysis,
        node: &SpecStateTransition,
    ) -> SmResult {
        self.visit_typed_element(
            sma,
            StateMachineTypedElement::StateTransition(Arc::new(node.clone())),
        )
    }
}
