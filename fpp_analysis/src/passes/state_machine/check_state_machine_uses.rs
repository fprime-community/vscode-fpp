use crate::analyzers::state_machine::{
    SmResult, StateMachineAnalysisVisitor, StateMachineUseAnalyzer,
};
use crate::errors::SemanticError;
use crate::semantics::SymbolInterface;
use crate::semantics::state_machine::{
    StateMachineAnalysis, StateMachineNameGroup, StateMachineSymbol,
};
use fpp_ast::{
    AstNode, DefChoice, DefState, Ident, QualIdent, SpecInitialTransition, SpecStateEntry,
    SpecStateExit, SpecStateTransition,
};
use fpp_core::Spanned;
use std::sync::Arc;

/// Match uses to their definitions
pub struct CheckStateMachineUses;

impl CheckStateMachineUses {
    /// Visit an identifier node and check a use
    fn visit_ident_node(
        &self,
        mut sma: StateMachineAnalysis,
        ng: StateMachineNameGroup,
        node: &Ident,
    ) -> SmResult {
        match sma.nested_scope.get(ng, &node.data) {
            Some(sym) => {
                sma.use_def_map.insert(node.id(), sym);
                Ok(sma)
            }
            None => Err(SemanticError::UndefinedSymbol {
                ng: ng.to_string(),
                name: node.data.clone(),
                loc: node.span(),
            }),
        }
    }

    /// Visit a qualified identifier node and check a use
    fn visit_qual_ident_node(
        &self,
        sma: StateMachineAnalysis,
        ng: StateMachineNameGroup,
        node: &QualIdent,
    ) -> SmResult {
        match node {
            QualIdent::Unqualified(name) => self.visit_unqualified_name(sma, ng, node.id(), name),
            QualIdent::Qualified(qualified) => {
                self.visit_qualified_name(sma, ng, node.id(), &qualified.qualifier, &qualified.name)
            }
        }
    }

    fn visit_unqualified_name(
        &self,
        mut sma: StateMachineAnalysis,
        ng: StateMachineNameGroup,
        id: fpp_core::Node,
        name: &Ident,
    ) -> SmResult {
        match sma.nested_scope.get(ng, &name.data) {
            Some(sym) => {
                sma.use_def_map.insert(id, sym);
                Ok(sma)
            }
            None => Err(SemanticError::UndefinedSymbol {
                ng: ng.to_string(),
                name: name.data.clone(),
                loc: name.span(),
            }),
        }
    }

    fn visit_qualified_name(
        &self,
        sma: StateMachineAnalysis,
        ng: StateMachineNameGroup,
        id: fpp_core::Node,
        qualifier: &QualIdent,
        name: &Ident,
    ) -> SmResult {
        let mut sma = self.visit_qual_ident_node(sma, ng, qualifier)?;
        let qualifier_symbol = sma.use_def_map.get(&qualifier.id()).unwrap().clone();
        let scope = match sma.symbol_scope_map.get(&qualifier_symbol) {
            Some(scope) => scope,
            None => {
                return Err(SemanticError::InvalidSymbol {
                    symbol_name: qualifier_symbol.get_unqualified_name().to_string(),
                    loc: qualifier.span(),
                    msg: "not a qualifier".to_string(),
                    def_loc: qualifier_symbol.name().span(),
                });
            }
        };
        match scope.get(ng, &name.data) {
            Some(sym) => {
                sma.use_def_map.insert(id, sym);
                Ok(sma)
            }
            None => Err(SemanticError::UndefinedSymbol {
                ng: ng.to_string(),
                name: name.data.clone(),
                loc: name.span(),
            }),
        }
    }

    /// Analyze a state machine definition
    pub fn def_state_machine(
        sma: StateMachineAnalysis,
        node: &fpp_ast::DefStateMachine,
    ) -> SmResult {
        StateMachineAnalysisVisitor::def_state_machine(&CheckStateMachineUses, sma, node)
    }
}

impl StateMachineUseAnalyzer for CheckStateMachineUses {
    fn action_use(&self, sma: StateMachineAnalysis, node: &Ident) -> SmResult {
        self.visit_ident_node(sma, StateMachineNameGroup::Action, node)
    }

    fn guard_use(&self, sma: StateMachineAnalysis, node: &Ident) -> SmResult {
        self.visit_ident_node(sma, StateMachineNameGroup::Guard, node)
    }

    fn signal_use(&self, sma: StateMachineAnalysis, node: &Ident) -> SmResult {
        self.visit_ident_node(sma, StateMachineNameGroup::Signal, node)
    }

    fn state_or_choice_use(&self, sma: StateMachineAnalysis, node: &QualIdent) -> SmResult {
        self.visit_qual_ident_node(sma, StateMachineNameGroup::State, node)
    }
}

impl StateMachineAnalysisVisitor for CheckStateMachineUses {
    fn def_choice(&self, sma: StateMachineAnalysis, node: &DefChoice) -> SmResult {
        self.def_choice_uses(sma, node)
    }

    fn spec_state_entry(&self, sma: StateMachineAnalysis, node: &SpecStateEntry) -> SmResult {
        self.spec_state_entry_uses(sma, node)
    }

    fn spec_state_exit(&self, sma: StateMachineAnalysis, node: &SpecStateExit) -> SmResult {
        self.spec_state_exit_uses(sma, node)
    }

    fn spec_initial_transition(
        &self,
        sma: StateMachineAnalysis,
        node: &SpecInitialTransition,
    ) -> SmResult {
        self.spec_initial_transition_uses(sma, node)
    }

    fn spec_state_transition(
        &self,
        sma: StateMachineAnalysis,
        node: &SpecStateTransition,
    ) -> SmResult {
        self.spec_state_transition_uses(sma, node)
    }

    fn def_state(&self, mut sma: StateMachineAnalysis, node: &DefState) -> SmResult {
        let symbol = StateMachineSymbol::State(Arc::new(node.clone()));
        let scope = sma.symbol_scope_map.get(&symbol).unwrap().clone();
        sma.nested_scope.push(scope);
        let mut sma = self.state_analyzer_def_state(sma, node)?;
        sma.nested_scope.pop();
        Ok(sma)
    }
}
