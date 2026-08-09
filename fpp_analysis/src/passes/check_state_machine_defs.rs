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
        let sma = StateMachineAnalysis::new(symbol.clone());
        match CheckStateMachineSemantics::def_state_machine(a, sma, node) {
            Ok(sma) => {
                let state_machine = StateMachine::new(Arc::new(node.clone()), sma);
                a.state_machine_map.insert(symbol, state_machine);
            }
            Err(err) => err.emit(),
        }
        // Do not descend into the state machine members; they are handled by
        // the state machine semantics.
        ControlFlow::Continue(())
    }
}
