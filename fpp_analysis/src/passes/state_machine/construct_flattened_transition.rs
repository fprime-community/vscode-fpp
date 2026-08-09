use crate::semantics::state_machine::{
    StateMachineAnalysis, StateMachineSymbol, StateOrChoice, Transition,
};
use fpp_ast::StateMember;

/// Construct a flattened transition
pub struct ConstructFlattenedTransition<'a> {
    pub sma: &'a StateMachineAnalysis,
    pub source: StateOrChoice,
}

impl<'a> ConstructFlattenedTransition<'a> {
    pub fn new(sma: &'a StateMachineAnalysis, source: StateOrChoice) -> Self {
        ConstructFlattenedTransition { sma, source }
    }

    /// The interface method
    pub fn transition(&self, transition: Transition) -> Transition {
        match transition {
            Transition::External { .. } => self.external_transition(transition),
            Transition::Internal { .. } => transition,
        }
    }

    // Flatten an external transition
    fn external_transition(&self, transition: Transition) -> Transition {
        let (t_actions, target) = match transition {
            Transition::External { actions, target } => (actions, target),
            _ => panic!("expected external transition"),
        };
        let source_states = self.get_source_parent_state_list(&self.source);
        let target_states = self.get_target_parent_state_list(&target);
        let (exit_states, entry_states) =
            Self::delete_longest_common_prefix(source_states, target_states);
        let mut actions = Vec::new();
        for s in exit_states.iter().rev() {
            actions.extend(self.get_exit_actions(s));
        }
        actions.extend(t_actions);
        for s in &entry_states {
            actions.extend(self.get_entry_actions(s));
        }
        Transition::External { actions, target }
    }

    // Get the parent state list of a source state or choice
    fn get_source_parent_state_list(&self, soc: &StateOrChoice) -> Vec<StateMachineSymbol> {
        let start = match soc {
            StateOrChoice::State(state) => vec![state.clone()],
            StateOrChoice::Choice(_) => Vec::new(),
        };
        self.sma.get_parent_state_list(soc.get_symbol(), start)
    }

    // Get the parent state list of a target state or choice
    fn get_target_parent_state_list(&self, soc: &StateOrChoice) -> Vec<StateMachineSymbol> {
        self.sma.get_parent_state_list(soc.get_symbol(), Vec::new())
    }

    // Delete the longest common prefix of two lists
    fn delete_longest_common_prefix(
        list1: Vec<StateMachineSymbol>,
        list2: Vec<StateMachineSymbol>,
    ) -> (Vec<StateMachineSymbol>, Vec<StateMachineSymbol>) {
        let mut i = 0;
        while i < list1.len() && i < list2.len() && list1[i] == list2[i] {
            i += 1;
        }
        (list1[i..].to_vec(), list2[i..].to_vec())
    }

    // Get the entry actions of a state symbol
    fn get_entry_actions(&self, s: &StateMachineSymbol) -> Vec<StateMachineSymbol> {
        let node = match s {
            StateMachineSymbol::State(node) => node,
            _ => panic!("expected state symbol"),
        };
        let mut result = Vec::new();
        for member in &node.members {
            if let StateMember::SpecStateEntry(spec) = member {
                for action in &spec.actions.actions {
                    result.push(self.sma.get_action_symbol(action));
                }
            }
        }
        result
    }

    // Get the exit actions of a state symbol
    fn get_exit_actions(&self, s: &StateMachineSymbol) -> Vec<StateMachineSymbol> {
        let node = match s {
            StateMachineSymbol::State(node) => node,
            _ => panic!("expected state symbol"),
        };
        let mut result = Vec::new();
        for member in &node.members {
            if let StateMember::SpecStateExit(spec) = member {
                for action in &spec.actions.actions {
                    result.push(self.sma.get_action_symbol(action));
                }
            }
        }
        result
    }
}
