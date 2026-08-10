use crate::semantics::state_machine::{
    GuardedTransition, StateMachineNestedScope, StateMachineScope, StateMachineSymbol,
    StateMachineTypedElement, StateOrChoice, Transition, TransitionGraph,
};
use crate::semantics::{Symbol, Type};
use fpp_ast::AstNode;
use fpp_core::Node;
use rustc_hash::FxHashMap as HashMap;
use std::sync::Arc;

/// A map from signals to guarded transitions
pub type SignalTransitionMap = HashMap<StateMachineSymbol, GuardedTransition>;

/// A map from states to guarded transitions
pub type StateTransitionMap = HashMap<StateMachineSymbol, GuardedTransition>;

/// A map from signals to state-transition maps
pub type SignalStateTransitionMap = HashMap<StateMachineSymbol, StateTransitionMap>;

/// A map from transition expressions (by node ID) to transitions
pub type TransitionExprMap = HashMap<Node, Transition>;

/// The state machine analysis data structure
#[derive(Debug, Clone)]
pub struct StateMachineAnalysis {
    /// The state machine symbol
    pub symbol: Symbol,
    /// A list of unqualified names representing the enclosing scope names
    pub scope_name_list: Vec<String>,
    /// The current state machine nested scope for symbol lookup
    pub nested_scope: StateMachineNestedScope,
    /// The current parent state
    pub parent_state: Option<StateMachineSymbol>,
    /// The mapping from symbols to their parent symbols
    pub parent_state_map: HashMap<StateMachineSymbol, StateMachineSymbol>,
    /// The mapping from symbols with scopes to their scopes
    pub symbol_scope_map: HashMap<StateMachineSymbol, StateMachineScope>,
    /// The mapping from uses (by node ID) to their definitions
    pub use_def_map: HashMap<Node, StateMachineSymbol>,
    /// The transition graph
    pub transition_graph: TransitionGraph,
    /// The reverse transition graph
    pub reverse_transition_graph: TransitionGraph,
    /// Map from typed elements to optional types
    pub type_option_map: HashMap<StateMachineTypedElement, Option<Arc<Type>>>,
    /// The current signal-transition map
    pub signal_transition_map: SignalTransitionMap,
    /// The flattened state transition map
    pub flattened_state_transition_map: SignalStateTransitionMap,
    /// The flattened choice transition map
    pub flattened_choice_transition_map: TransitionExprMap,
    /// Whether a *blocking* error has been emitted for this state machine.
    ///
    /// The state-machine passes emit their diagnostics in place and keep going
    /// (like the rest of the analysis), so most errors do not stop later passes.
    /// A few errors are different: they leave a map entry unpopulated that a
    /// later pass unconditionally reads — an undefined symbol (no `use_def_map`
    /// entry) or a missing/duplicate initial transition (no `initial_node`).
    /// Continuing past those would panic on the reading pass's `unwrap`, so the
    /// producing pass sets this flag and `CheckStateMachineSemantics` gates the
    /// dependent passes on it. Non-blocking errors (duplicate signal, type
    /// mismatch, unreachable node, choice cycle) leave the flag clear.
    pub blocking_error: bool,
}

impl StateMachineAnalysis {
    pub fn new(symbol: Symbol) -> StateMachineAnalysis {
        StateMachineAnalysis {
            symbol,
            scope_name_list: Vec::new(),
            nested_scope: StateMachineNestedScope::empty(),
            parent_state: None,
            parent_state_map: HashMap::default(),
            symbol_scope_map: HashMap::default(),
            use_def_map: HashMap::default(),
            transition_graph: TransitionGraph::new(),
            reverse_transition_graph: TransitionGraph::new(),
            type_option_map: HashMap::default(),
            signal_transition_map: SignalTransitionMap::default(),
            flattened_state_transition_map: SignalStateTransitionMap::default(),
            flattened_choice_transition_map: TransitionExprMap::default(),
            blocking_error: false,
        }
    }

    /// Gets the list of parent states, highest first, followed by the
    /// items in `start`.
    pub fn get_parent_state_list(
        &self,
        s: &StateMachineSymbol,
        start: Vec<StateMachineSymbol>,
    ) -> Vec<StateMachineSymbol> {
        let mut result = start;
        let mut current = s.clone();
        while let Some(state) = self.parent_state_map.get(&current) {
            result.insert(0, state.clone());
            current = state.clone();
        }
        result
    }

    /// Gets the qualified name of a symbol
    pub fn get_qualified_name(&self, symbol: &StateMachineSymbol) -> String {
        let mut parts = vec![symbol.get_unqualified_name().to_string()];
        let mut current = symbol.clone();
        while let Some(parent) = self.parent_state_map.get(&current) {
            parts.push(parent.get_unqualified_name().to_string());
            current = parent.clone();
        }
        parts.reverse();
        parts.join(".")
    }

    /// Get a state symbol from an identifier node
    pub fn get_state_symbol(&self, state: &fpp_ast::QualIdent) -> StateMachineSymbol {
        let sym = self.use_def_map.get(&state.id()).unwrap().clone();
        match sym {
            StateMachineSymbol::State(_) => sym,
            _ => panic!("expected state symbol"),
        }
    }

    /// Get an action symbol from an identifier node
    pub fn get_action_symbol(&self, action: &fpp_ast::Ident) -> StateMachineSymbol {
        let sym = self.use_def_map.get(&action.id()).unwrap().clone();
        match sym {
            StateMachineSymbol::Action(_) => sym,
            _ => panic!("expected action symbol"),
        }
    }

    /// Get a guard symbol from an identifier node
    pub fn get_guard_symbol(&self, guard: &fpp_ast::Ident) -> StateMachineSymbol {
        let sym = self.use_def_map.get(&guard.id()).unwrap().clone();
        match sym {
            StateMachineSymbol::Guard(_) => sym,
            _ => panic!("expected guard symbol"),
        }
    }

    /// Get a signal symbol from an identifier node
    pub fn get_signal_symbol(&self, signal: &fpp_ast::Ident) -> StateMachineSymbol {
        let sym = self.use_def_map.get(&signal.id()).unwrap().clone();
        match sym {
            StateMachineSymbol::Signal(_) => sym,
            _ => panic!("expected signal symbol"),
        }
    }

    /// Gets the common type of two typed elements at a choice.
    ///
    /// A type mismatch here is non-blocking: the diagnostic is emitted in place
    /// and `None` is returned as the fallback common type so analysis continues.
    pub fn common_type_at_choice(
        &self,
        te: &StateMachineTypedElement,
        te1: &StateMachineTypedElement,
        to1: &Option<Arc<Type>>,
        te2: &StateMachineTypedElement,
    ) -> Option<Arc<Type>> {
        let to2 = self.type_option_map.get(te2).cloned().unwrap();
        match crate::semantics::state_machine::TypeOption::common_type(to1, &to2) {
            Some(to) => to,
            None => {
                crate::errors::SemanticError::ChoiceTypeMismatch {
                    loc: te.get_span(),
                    loc1: te1.get_span(),
                    show1: crate::semantics::state_machine::TypeOption::show(to1),
                    loc2: te2.get_span(),
                    show2: crate::semantics::state_machine::TypeOption::show(&to2),
                }
                .emit();
                None
            }
        }
    }

    /// Convert one type option to another at a call site.
    ///
    /// A mismatch here is non-blocking: the diagnostic is emitted in place and
    /// the call-site type is returned as the fallback so analysis continues.
    pub fn convert_type_options_at_call_site(
        &self,
        loc: fpp_core::Span,
        te_kind: &str,
        te_to: &Option<Arc<Type>>,
        site_kind: &str,
        site_to: &Option<Arc<Type>>,
    ) -> Option<Arc<Type>> {
        if !crate::semantics::state_machine::TypeOption::is_convertible_to(te_to, site_to) {
            crate::errors::SemanticError::CallSiteTypeMismatch {
                loc,
                te_kind: te_kind.to_string(),
                te_show: crate::semantics::state_machine::TypeOption::show(te_to),
                site_kind: site_kind.to_string(),
                site_show: crate::semantics::state_machine::TypeOption::show(site_to),
            }
            .emit();
        }
        site_to.clone()
    }

    /// Get a state or choice from a qualified identifier node
    pub fn get_state_or_choice(&self, soc: &fpp_ast::QualIdent) -> StateOrChoice {
        match self.use_def_map.get(&soc.id()).unwrap() {
            state @ StateMachineSymbol::State(_) => StateOrChoice::State(state.clone()),
            choice @ StateMachineSymbol::Choice(_) => StateOrChoice::Choice(choice.clone()),
            _ => panic!("expected state or choice"),
        }
    }
}
