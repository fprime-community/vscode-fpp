use crate::semantics::state_machine::StateMachineSymbol;

/// An FPP state or choice
#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub enum StateOrChoice {
    State(StateMachineSymbol),
    Choice(StateMachineSymbol),
}

impl StateOrChoice {
    pub fn get_symbol(&self) -> &StateMachineSymbol {
        match self {
            StateOrChoice::State(symbol) => symbol,
            StateOrChoice::Choice(symbol) => symbol,
        }
    }

    pub fn get_name(&self) -> String {
        match self {
            StateOrChoice::State(symbol) => format!("state {}", symbol.get_unqualified_name()),
            StateOrChoice::Choice(symbol) => format!("choice {}", symbol.get_unqualified_name()),
        }
    }
}
