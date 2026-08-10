use crate::Analysis;
use crate::passes::state_machine::CheckStateMachineSemantics;
use crate::semantics::Symbol;
use crate::semantics::state_machine::{StateMachine, StateMachineAnalysis};
use fpp_ast::{DefStateMachine, MoveWalkable, Node, Visitor};
use std::ops::ControlFlow;
use std::sync::Arc;

/// Check state machine definitions
pub struct CheckStateMachineDefs;

impl<'ast> Visitor<'ast> for CheckStateMachineDefs {
    type Break = ();
    type State = Analysis;

    /// Descend into every container so that state machine definitions nested
    /// in modules are reached.
    fn super_visit(&self, a: &mut Analysis, node: Node<'ast>) -> ControlFlow<Self::Break> {
        node.walk(a, self)
    }

    fn visit_def_state_machine(
        &self,
        a: &mut Analysis,
        node: &'ast DefStateMachine,
    ) -> ControlFlow<Self::Break> {
        let symbol = Symbol::StateMachine(Arc::new(node.clone()));
        let mut sma = StateMachineAnalysis::new(symbol.clone());
        // Errors are emitted in place during analysis. A blocking error stops
        // the later graph/type passes, so the transition graph and flattened
        // maps may be incomplete — but `EnterStateMachineSymbols` and
        // `CheckStateMachineUses` always run first, so the symbol scopes and
        // use-def map are populated regardless.
        //
        // We store the state machine either way: editor features (completion,
        // hover, go-to-definition, semantic tokens) rely only on the always-
        // populated symbol data, and they are needed most while the definition
        // is mid-edit and therefore has a blocking error (e.g. an incomplete
        // `enter <target>`). Consumers that need the full transition graph
        // (diagram lowering) must check `sma.blocking_error` before use.
        let _ = CheckStateMachineSemantics::def_state_machine(a, &mut sma, node);
        let state_machine = StateMachine::new(Arc::new(node.clone()), sma);
        a.state_machine_map.insert(symbol, state_machine);
        // Do not descend into the state machine members; they are handled by
        // the state machine semantics.
        ControlFlow::Continue(())
    }
}
