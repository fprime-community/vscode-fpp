use crate::Analysis;
use crate::analyzers::state_machine::{
    SmResult, SmTypedElementAnalyzer, StateMachineAnalysisVisitor,
};
use crate::semantics::state_machine::transition_graph::Node as TgNode;
use crate::semantics::state_machine::{
    StateMachineAnalysis, StateMachineSymbol, StateMachineTypedElement, StateOrChoice,
};
use fpp_ast::{
    AstNode, DefChoice, DefState, DefStateMachine, SpecInitialTransition, SpecStateEntry,
    SpecStateExit, SpecStateTransition,
};

/// Compute the type option map
pub struct ComputeTypeOptionMap<'a> {
    pub a: &'a Analysis,
}

impl<'a> ComputeTypeOptionMap<'a> {
    /// Analyze a state machine definition
    pub fn def_state_machine(
        a: &'a Analysis,
        sma: StateMachineAnalysis,
        node: &DefStateMachine,
    ) -> SmResult {
        StateMachineAnalysisVisitor::def_state_machine(&ComputeTypeOptionMap { a }, sma, node)
    }
}

impl SmTypedElementAnalyzer for ComputeTypeOptionMap<'_> {
    fn initial_transition_typed_element(
        &self,
        mut sma: StateMachineAnalysis,
        te: &StateMachineTypedElement,
    ) -> SmResult {
        sma.type_option_map.insert(te.clone(), None);
        Ok(sma)
    }

    fn choice_typed_element(
        &self,
        sma: StateMachineAnalysis,
        te: &StateMachineTypedElement,
    ) -> SmResult {
        let sym = match te {
            StateMachineTypedElement::Choice(node) => StateMachineSymbol::Choice(node.clone()),
            _ => panic!("expected choice"),
        };
        let soc = StateOrChoice::Choice(sym);
        let node = TgNode { soc };
        let arcs: Vec<_> = sma
            .reverse_transition_graph
            .arc_map
            .get(&node)
            .map(|set| set.iter().cloned().collect())
            .unwrap_or_default();
        match arcs.split_first() {
            None => {
                // Handle the case where no arc comes into J.
                // This happens when J is the initial node in the transition graph.
                let mut sma = sma;
                sma.type_option_map.insert(te.clone(), None);
                Ok(sma)
            }
            Some((head, tail)) => {
                // Handle the case where at least one arc comes into J.
                let te0 = head.get_typed_element();
                let mut sma = self.visit_typed_element(sma, te0.clone())?;
                let to0 = sma.type_option_map.get(&te0).cloned().unwrap();
                let mut acc_te = te0;
                let mut acc_to = to0;
                for arc in tail {
                    let te2 = arc.get_typed_element();
                    sma = self.visit_typed_element(sma, te2.clone())?;
                    let to2 = sma.common_type_at_choice(te, &acc_te, &acc_to, &te2)?;
                    acc_te = te2;
                    acc_to = to2;
                }
                sma.type_option_map.insert(te.clone(), acc_to);
                Ok(sma)
            }
        }
    }

    fn state_entry_typed_element(
        &self,
        mut sma: StateMachineAnalysis,
        te: &StateMachineTypedElement,
    ) -> SmResult {
        sma.type_option_map.insert(te.clone(), None);
        Ok(sma)
    }

    fn state_exit_typed_element(
        &self,
        mut sma: StateMachineAnalysis,
        te: &StateMachineTypedElement,
    ) -> SmResult {
        sma.type_option_map.insert(te.clone(), None);
        Ok(sma)
    }

    fn state_transition_typed_element(
        &self,
        mut sma: StateMachineAnalysis,
        te: &StateMachineTypedElement,
    ) -> SmResult {
        let st = match te {
            StateMachineTypedElement::StateTransition(node) => node,
            _ => panic!("expected state transition"),
        };
        let signal_id = st.signal.id();
        let signal_symbol = sma.use_def_map.get(&signal_id).unwrap().clone();
        let signal_def = match &signal_symbol {
            StateMachineSymbol::Signal(node) => node,
            _ => panic!("expected signal symbol"),
        };
        let to = signal_def
            .type_name
            .as_ref()
            .map(|node| self.a.type_map.get(&node.node_id).unwrap().clone());
        sma.type_option_map.insert(te.clone(), to);
        Ok(sma)
    }

    fn visit_typed_element(
        &self,
        sma: StateMachineAnalysis,
        te: StateMachineTypedElement,
    ) -> SmResult {
        if sma.type_option_map.contains_key(&te) {
            Ok(sma)
        } else {
            self.dispatch_typed_element(sma, te)
        }
    }
}

impl StateMachineAnalysisVisitor for ComputeTypeOptionMap<'_> {
    fn def_choice(&self, sma: StateMachineAnalysis, node: &DefChoice) -> SmResult {
        self.def_choice_te(sma, node)
    }

    fn spec_state_entry(&self, sma: StateMachineAnalysis, node: &SpecStateEntry) -> SmResult {
        self.spec_state_entry_te(sma, node)
    }

    fn spec_state_exit(&self, sma: StateMachineAnalysis, node: &SpecStateExit) -> SmResult {
        self.spec_state_exit_te(sma, node)
    }

    fn spec_initial_transition(
        &self,
        sma: StateMachineAnalysis,
        node: &SpecInitialTransition,
    ) -> SmResult {
        self.spec_initial_transition_te(sma, node)
    }

    fn spec_state_transition(
        &self,
        sma: StateMachineAnalysis,
        node: &SpecStateTransition,
    ) -> SmResult {
        self.spec_state_transition_te(sma, node)
    }

    fn def_state(&self, sma: StateMachineAnalysis, node: &DefState) -> SmResult {
        self.state_analyzer_def_state(sma, node)
    }
}
