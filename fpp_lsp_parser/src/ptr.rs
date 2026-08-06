//! In rust-analyzer, syntax trees are transient objects.
//!
//! That means that we create trees when we need them, and tear them down to
//! save memory. In this architecture, hanging on to a particular syntax node
//! for a long time is ill-advisable, as that keeps the whole tree resident.
//!
//! Instead, we provide a [`SyntaxNodePtr`] type, which stores information about
//! *location* of a particular syntax node in a tree. Its a small type which can
//! be cheaply stored, and which can be resolved to a real [`SyntaxNode`] when
//! necessary.

use std::hash::{Hash, Hasher};

use rowan::TextRange;

use crate::{FppLanguage, SyntaxKind, SyntaxNode};

/// A "pointer" to a [`SyntaxNode`], via location in the source code.
pub type SyntaxNodePtr = rowan::ast::SyntaxNodePtr<FppLanguage>;

/// Like `SyntaxNodePtr`, but remembers the type of node.
pub struct AstPtr {
    raw: SyntaxNodePtr,
}

impl std::fmt::Debug for AstPtr {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_tuple("AstPtr").field(&self.raw).finish()
    }
}

impl Copy for AstPtr {}
impl Clone for AstPtr {
    fn clone(&self) -> AstPtr {
        *self
    }
}

impl Eq for AstPtr {}

impl PartialEq for AstPtr {
    fn eq(&self, other: &AstPtr) -> bool {
        self.raw == other.raw
    }
}

impl Hash for AstPtr {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.raw.hash(state);
    }
}

impl AstPtr {
    pub fn new(node: &SyntaxNode) -> AstPtr {
        AstPtr {
            raw: SyntaxNodePtr::new(node),
        }
    }

    pub fn to_node(&self, root: &SyntaxNode) -> SyntaxNode {
        self.raw.to_node(root)
    }

    pub fn syntax_node_ptr(&self) -> SyntaxNodePtr {
        self.raw
    }

    pub fn text_range(&self) -> TextRange {
        self.raw.text_range()
    }

    pub fn kind(&self) -> SyntaxKind {
        self.raw.kind()
    }
}
