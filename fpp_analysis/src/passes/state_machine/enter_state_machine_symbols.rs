use crate::analyzers::state_machine::{SmResult, StateMachineAnalysisVisitor};
use crate::errors::SemanticResult;
use crate::semantics::state_machine::{
    StateMachineAnalysis, StateMachineNameGroup, StateMachineScope, StateMachineSymbol,
};
use fpp_ast::{DefAction, DefChoice, DefGuard, DefSignal, DefState};
use std::sync::Arc;

/// Enter state machine symbols into their scopes
pub struct EnterStateMachineSymbols;

impl EnterStateMachineSymbols {
    fn update_map(sma: &mut StateMachineAnalysis, s: &StateMachineSymbol) {
        if let Some(ps) = &sma.parent_state {
            sma.parent_state_map.insert(s.clone(), ps.clone());
        }
    }

    fn visit_node(
        &self,
        mut sma: StateMachineAnalysis,
        symbol: StateMachineSymbol,
        name_groups: &[StateMachineNameGroup],
    ) -> SmResult {
        for ng in name_groups {
            sma.nested_scope.put(*ng, symbol.clone())?;
        }
        Self::update_map(&mut sma, &symbol);
        Ok(sma)
    }
}

impl StateMachineAnalysisVisitor for EnterStateMachineSymbols {
    fn def_action(&self, sma: StateMachineAnalysis, node: &DefAction) -> SmResult {
        let symbol = StateMachineSymbol::Action(Arc::new(node.clone()));
        self.visit_node(sma, symbol, &[StateMachineNameGroup::Action])
    }

    fn def_guard(&self, sma: StateMachineAnalysis, node: &DefGuard) -> SmResult {
        let symbol = StateMachineSymbol::Guard(Arc::new(node.clone()));
        self.visit_node(sma, symbol, &[StateMachineNameGroup::Guard])
    }

    fn def_choice(&self, sma: StateMachineAnalysis, node: &DefChoice) -> SmResult {
        let symbol = StateMachineSymbol::Choice(Arc::new(node.clone()));
        self.visit_node(sma, symbol, &[StateMachineNameGroup::State])
    }

    fn def_signal(&self, sma: StateMachineAnalysis, node: &DefSignal) -> SmResult {
        let symbol = StateMachineSymbol::Signal(Arc::new(node.clone()));
        self.visit_node(sma, symbol, &[StateMachineNameGroup::Signal])
    }

    fn def_state(&self, sma: StateMachineAnalysis, node: &DefState) -> SmResult {
        let parent_state = sma.parent_state.clone();
        let symbol = StateMachineSymbol::State(Arc::new(node.clone()));
        // Enter the state symbol into the enclosing scope
        let mut sma = self.visit_node(sma, symbol.clone(), &[StateMachineNameGroup::State])?;
        // Push a new scope for the state members and set the parent state
        sma.nested_scope.push(StateMachineScope::new());
        sma.parent_state = Some(symbol.clone());
        let mut sma = self.state_analyzer_def_state(sma, node)?;
        // Save the state scope and pop it off the stack
        let scope = sma.nested_scope.pop();
        sma.symbol_scope_map.insert(symbol, scope);
        sma.parent_state = parent_state;
        Ok(sma)
    }
}

impl EnterStateMachineSymbols {
    /// Analyze a state machine definition
    pub fn def_state_machine(
        sma: StateMachineAnalysis,
        node: &fpp_ast::DefStateMachine,
    ) -> SemanticResult<StateMachineAnalysis> {
        StateMachineAnalysisVisitor::def_state_machine(&EnterStateMachineSymbols, sma, node)
    }
}
