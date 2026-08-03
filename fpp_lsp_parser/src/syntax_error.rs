//! See docs for `SyntaxError`.

use std::fmt;

use crate::{SyntaxKind, TextRange, TextSize};

/// Represents the result of unsuccessful tokenization, parsing
/// or tree validation.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct SyntaxError {
    msg: String,
    range: TextRange,
    expected: Option<SyntaxKind>,
}

impl SyntaxError {
    pub fn new(message: impl Into<String>, range: TextRange) -> Self {
        Self {
            msg: message.into(),
            range,
            expected: None,
        }
    }

    pub fn new_with_expected(
        message: impl Into<String>,
        range: TextRange,
        expected: SyntaxKind,
    ) -> Self {
        Self {
            msg: message.into(),
            range,
            expected: Some(expected),
        }
    }

    pub fn new_at_offset(message: impl Into<String>, offset: TextSize) -> Self {
        Self {
            msg: message.into(),
            range: TextRange::empty(offset),
            expected: None,
        }
    }

    pub fn range(&self) -> TextRange {
        self.range
    }

    pub fn expected(&self) -> Option<SyntaxKind> {
        self.expected
    }

    pub fn with_range(mut self, range: TextRange) -> Self {
        self.range = range;
        self
    }
}

impl fmt::Display for SyntaxError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        self.msg.fmt(f)
    }
}

impl std::error::Error for SyntaxError {}
