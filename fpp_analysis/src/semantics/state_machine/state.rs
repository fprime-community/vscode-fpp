use fpp_ast::{DefState, Ident, SpecInitialTransition, SpecStateEntry, SpecStateExit, StateMember};

/// A state of an FPP state machine
pub struct State;

fn list_to_opt<T>(mut list: Vec<T>, item_kind: &str) -> Option<T> {
    match list.len() {
        0 => None,
        1 => Some(list.remove(0)),
        _ => panic!("state should have at most one {}", item_kind),
    }
}

impl State {
    pub fn get_substates(state: &DefState) -> Vec<&DefState> {
        state
            .members
            .iter()
            .filter_map(|m| match m {
                StateMember::DefState(node) => Some(node),
                _ => None,
            })
            .collect()
    }

    pub fn get_entry_specifier_opt(state: &DefState) -> Option<&SpecStateEntry> {
        let specifiers: Vec<&SpecStateEntry> = state
            .members
            .iter()
            .filter_map(|m| match m {
                StateMember::SpecStateEntry(node) => Some(node),
                _ => None,
            })
            .collect();
        list_to_opt(specifiers, "entry specifier")
    }

    pub fn get_entry_actions(state: &DefState) -> &[Ident] {
        match Self::get_entry_specifier_opt(state) {
            Some(spec) => &spec.actions.actions,
            None => &[],
        }
    }

    pub fn get_exit_specifier_opt(state: &DefState) -> Option<&SpecStateExit> {
        let specifiers: Vec<&SpecStateExit> = state
            .members
            .iter()
            .filter_map(|m| match m {
                StateMember::SpecStateExit(node) => Some(node),
                _ => None,
            })
            .collect();
        list_to_opt(specifiers, "exit specifier")
    }

    pub fn get_initial_specifier(state: &DefState) -> Option<&SpecInitialTransition> {
        let specifiers: Vec<&SpecInitialTransition> = state
            .members
            .iter()
            .filter_map(|m| match m {
                StateMember::SpecInitialTransition(node) => Some(node),
                _ => None,
            })
            .collect();
        list_to_opt(specifiers, "initial transition")
    }

    pub fn get_exit_actions(state: &DefState) -> &[Ident] {
        match Self::get_exit_specifier_opt(state) {
            Some(spec) => &spec.actions.actions,
            None => &[],
        }
    }
}
