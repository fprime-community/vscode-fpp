//! See [`Input`].

use crate::syntax::SyntaxKind;

/// Input for the parser -- a sequence of tokens.
///
/// As of now, parser doesn't have access to the *text* of the tokens, and makes
/// decisions based solely on their classification. Unlike `LexerToken`, the
/// `Tokens` doesn't include whitespace and comments. Main input to the parser.
///
/// Struct of arrays internally, but this shouldn't really matter.
pub struct Input(Vec<SyntaxKind>);

/// `pub` impl used by callers to create `Tokens`.
impl Input {
    #[inline]
    pub fn with_capacity(capacity: usize) -> Self {
        Self(Vec::with_capacity(capacity))
    }
    #[inline]
    pub fn push(&mut self, kind: SyntaxKind) {
        self.push_impl(kind)
    }
    #[inline]
    fn push_impl(&mut self, kind: SyntaxKind) {
        self.0.push(kind);
    }
}

/// pub(crate) impl used by the parser to consume `Tokens`.
impl Input {
    pub(crate) fn kind(&self, idx: usize) -> SyntaxKind {
        self.0.get(idx).copied().unwrap_or(SyntaxKind::EOF)
    }
}
