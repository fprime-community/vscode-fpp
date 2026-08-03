use crate::interface::with;
use crate::Span;
use std::fmt::{Debug, Formatter};

pub trait Spanned {
    fn span(&self) -> Span;
}

pub trait Annotated {
    fn pre_annotation(&self) -> Vec<String>;
    fn post_annotation(&self) -> Vec<String>;
}

#[derive(Eq, Hash, PartialEq, Copy, Clone)]
pub struct Node {
    pub(crate) handle: usize,
}

impl Node {
    pub fn new(span: Span) -> Node {
        with(|w| w.node_add(&span))
    }

    pub fn annotate(node: &Node, pre: Vec<String>, post: Vec<String>) {
        with(|w| w.node_add_annotation(node, pre, post))
    }
}

impl Spanned for Node {
    fn span(&self) -> Span {
        with(|w| w.node_span(self))
    }
}

impl Debug for Node {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        self.span().fmt(f)
    }
}

impl Annotated for Node {
    fn pre_annotation(&self) -> Vec<String> {
        with(|w| w.node_pre_annotation(self))
    }

    fn post_annotation(&self) -> Vec<String> {
        with(|w| w.node_post_annotation(self))
    }
}
