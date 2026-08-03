use crate::{Parse, SyntaxNode, SyntaxToken};

pub enum VisitorResult {
    /// Visit all children
    Recurse,
    /// Go to next sibling
    Next,
}

pub trait Visitor {
    type State;

    fn visit_node(&self, state: &mut Self::State, node: &SyntaxNode) -> VisitorResult;
    fn visit_token(&self, state: &mut Self::State, token: &SyntaxToken);
}

fn visit_node<State, V: Visitor<State = State>>(node: &SyntaxNode, state: &mut State, visitor: &V) {
    match visitor.visit_node(state, node) {
        VisitorResult::Recurse => {
            for child in node.children_with_tokens() {
                match child {
                    rowan::NodeOrToken::Node(child_node) => visit_node(&child_node, state, visitor),
                    rowan::NodeOrToken::Token(token) => visitor.visit_token(state, &token),
                }
            }
        }
        VisitorResult::Next => {}
    }
}

impl Parse {
    pub fn visit<State, V: Visitor<State = State>>(&self, state: &mut State, visitor: &V) {
        visit_node(&self.syntax_node(), state, visitor);
    }
}
