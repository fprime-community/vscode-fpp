use crate::analyzers::state_machine::SmResult;
use crate::errors::{SemanticError, SemanticResult};
use crate::semantics::state_machine::transition_graph::{Arc as TgArc, Node as TgNode};
use crate::semantics::state_machine::{StateMachineAnalysis, StateMachineSymbol, StateOrChoice};
use rustc_hash::FxHashSet as HashSet;
use std::ops::ControlFlow;

/// Checks for choice cycles
pub struct CheckChoiceCycles;

#[derive(Clone, Default)]
struct State {
    #[allow(dead_code)]
    visited: HashSet<StateMachineSymbol>,
    path_set: HashSet<StateMachineSymbol>,
    path_list: Vec<TgArc>,
}

impl State {
    fn clear_path(&self) -> State {
        State {
            visited: self.visited.clone(),
            path_set: HashSet::default(),
            path_list: Vec::new(),
        }
    }
}

impl CheckChoiceCycles {
    pub fn state_machine_analysis(sma: &mut StateMachineAnalysis) -> SmResult {
        let nodes: Vec<TgNode> = sma.transition_graph.arc_map.keys().cloned().collect();
        let mut s = State::default();
        for node in nodes {
            if let StateOrChoice::Choice(c) = node.soc {
                // Emit each choice cycle and keep scanning the remaining choice
                // nodes (the DFS state carries over so visited nodes are not
                // re-reported). A cycle is *blocking*, though: the typed-element
                // pass walks the choice graph assuming it is acyclic and would
                // otherwise recurse forever, so mark it so the gate stops there.
                match Self::visit(sma, s.clear_path(), c) {
                    Ok(next) => s = next,
                    Err(err) => {
                        err.emit();
                        sma.blocking_error = true;
                    }
                }
            }
        }
        ControlFlow::Continue(())
    }

    fn visit(sma: &StateMachineAnalysis, s: State, c: StateMachineSymbol) -> SemanticResult<State> {
        if s.path_set.contains(&c) {
            let loc = c.get_span();
            let mut parts = vec!["encountered a choice cycle:".to_string()];
            for a in s.path_list.iter().rev() {
                parts.push(a.show_transition());
            }
            return Err(SemanticError::ChoiceCycle {
                loc,
                msg: parts.join("\n  "),
            });
        }
        let path_set = s.path_set.clone();
        let mut s1 = s;
        s1.path_set.insert(c.clone());
        let soc = StateOrChoice::Choice(c.clone());
        let node = TgNode { soc };
        let arcs: Vec<TgArc> = sma
            .transition_graph
            .arc_map
            .get(&node)
            .map(|set| set.iter().cloned().collect())
            .unwrap_or_default();
        let mut s = s1;
        for a in arcs {
            if let StateOrChoice::Choice(c1) = &a.get_end_node().soc {
                let c1 = c1.clone();
                let mut s2 = s;
                s2.path_list.insert(0, a);
                s = Self::visit(sma, s2, c1)?;
            }
        }
        s.visited.insert(c);
        s.path_set = path_set;
        Ok(s)
    }
}
