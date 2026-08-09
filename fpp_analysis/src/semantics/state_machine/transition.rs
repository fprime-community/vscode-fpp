use crate::semantics::state_machine::{StateMachineSymbol, StateOrChoice};

/// An FPP state machine transition
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Transition {
    /// An external transition
    External {
        actions: Vec<StateMachineSymbol>,
        target: StateOrChoice,
    },
    /// An internal transition
    Internal { actions: Vec<StateMachineSymbol> },
}

impl Transition {
    pub fn get_actions(&self) -> &[StateMachineSymbol] {
        match self {
            Transition::External { actions, .. } => actions,
            Transition::Internal { actions } => actions,
        }
    }

    pub fn get_target_opt(&self) -> Option<&StateOrChoice> {
        match self {
            Transition::External { target, .. } => Some(target),
            Transition::Internal { .. } => None,
        }
    }
}

/// A guarded transition
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct GuardedTransition {
    pub guard_opt: Option<StateMachineSymbol>,
    pub transition: Transition,
}
