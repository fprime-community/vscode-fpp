/// Represents pending whitespace to be emitted
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Whitespace {
    /// No whitespace
    None,
    /// Single space
    Space,
    /// Single newline
    Newline,
    /// Blank line (two newlines)
    BlankLine,
    /// Backslash line continuation (` \` then newline). Used inside choice
    /// blocks, where FPP forbids bare newlines.
    ContinuationNewline,
}

/// Builder for constructing formatted output text
pub struct FormatBuilder {
    /// The output string being constructed
    output: String,
    /// Pending whitespace to be emitted before the next token
    pending_whitespace: Whitespace,
    /// Whether we're currently at the start of a line
    at_line_start: bool,
    /// Number of spaces per indent level
    indent_width: usize,
    /// Current indentation level
    indent_level: usize,
}

impl FormatBuilder {
    /// Create a new builder with the given indent width
    pub fn new(indent_width: usize) -> Self {
        Self {
            output: String::new(),
            pending_whitespace: Whitespace::None,
            at_line_start: true,
            indent_width,
            indent_level: 0,
        }
    }

    /// Get the formatted output
    pub fn finish(mut self) -> String {
        // Ensure exactly one trailing newline
        if !self.output.ends_with('\n') {
            self.output.push('\n');
        }
        self.output
    }

    /// Request a space before the next token
    pub fn space(&mut self) {
        // Upgrade to space if we don't have stronger whitespace pending
        if self.pending_whitespace == Whitespace::None {
            self.pending_whitespace = Whitespace::Space;
        }
    }

    /// Request a newline before the next token
    pub fn newline(&mut self) {
        // Upgrade to newline if we don't have blank line pending
        match self.pending_whitespace {
            Whitespace::None | Whitespace::Space => self.pending_whitespace = Whitespace::Newline,
            _ => {} // Keep stronger whitespace
        }
    }

    /// Request a blank line (two newlines) before the next token
    pub fn blank_line(&mut self) {
        // Always upgrade to blank line
        self.pending_whitespace = Whitespace::BlankLine;
    }

    /// Request a backslash line continuation before the next token. Emitted as
    /// ` \` followed by a newline. Overrides a pending plain space/newline (a
    /// choice block must not emit a bare newline), but never downgrades a
    /// stronger blank line.
    pub fn continuation_newline(&mut self) {
        match self.pending_whitespace {
            Whitespace::None | Whitespace::Space | Whitespace::Newline => {
                self.pending_whitespace = Whitespace::ContinuationNewline;
            }
            _ => {} // Keep stronger whitespace
        }
    }

    /// Increase indentation level
    pub fn indent(&mut self) {
        self.indent_level += 1;
    }

    /// Decrease indentation level
    pub fn dedent(&mut self) {
        if self.indent_level > 0 {
            self.indent_level -= 1;
        }
    }

    /// Get the current indentation level (for save/restore).
    pub fn indent_level(&self) -> usize {
        self.indent_level
    }

    /// Set the indentation level directly (for save/restore).
    pub fn set_indent_level(&mut self, level: usize) {
        self.indent_level = level;
    }

    /// Emit a token with the given text
    pub fn token(&mut self, text: &str) {
        if text.is_empty() {
            return;
        }

        // First, emit pending whitespace
        self.emit_pending_whitespace();

        // If we're at line start and not after whitespace, emit indentation
        if self.at_line_start && !text.trim().is_empty() {
            let indent = " ".repeat(self.indent_level * self.indent_width);
            self.output.push_str(&indent);
            self.at_line_start = false;
        }

        // Emit the token text
        self.output.push_str(text);
    }

    /// Emit pending whitespace
    fn emit_pending_whitespace(&mut self) {
        match self.pending_whitespace {
            Whitespace::None => {}
            Whitespace::Space => {
                if !self.at_line_start {
                    self.output.push(' ');
                }
            }
            Whitespace::Newline => {
                self.output.push('\n');
                self.at_line_start = true;
            }
            Whitespace::BlankLine => {
                // Emit two newlines for blank line
                if !self.at_line_start {
                    self.output.push('\n');
                }
                self.output.push('\n');
                self.at_line_start = true;
            }
            Whitespace::ContinuationNewline => {
                // ` \` after the previous token, then a newline. At line start
                // there is nothing to continue, so fall back to a plain newline.
                if !self.at_line_start {
                    self.output.push_str(" \\");
                }
                self.output.push('\n');
                self.at_line_start = true;
            }
        }
        self.pending_whitespace = Whitespace::None;
    }

    /// Check if we're at the start of a line
    pub fn is_at_line_start(&self) -> bool {
        self.at_line_start
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_token() {
        let mut builder = FormatBuilder::new(2);
        builder.token("hello");
        assert_eq!(builder.finish(), "hello\n");
    }

    #[test]
    fn test_space_between_tokens() {
        let mut builder = FormatBuilder::new(2);
        builder.token("hello");
        builder.space();
        builder.token("world");
        assert_eq!(builder.finish(), "hello world\n");
    }

    #[test]
    fn test_newline() {
        let mut builder = FormatBuilder::new(2);
        builder.token("line1");
        builder.newline();
        builder.token("line2");
        assert_eq!(builder.finish(), "line1\nline2\n");
    }

    #[test]
    fn test_indentation() {
        let mut builder = FormatBuilder::new(2);
        builder.token("outer");
        builder.newline();
        builder.indent();
        builder.token("inner");
        builder.dedent();
        builder.newline();
        builder.token("outer");
        assert_eq!(builder.finish(), "outer\n  inner\nouter\n");
    }

    #[test]
    fn test_blank_line() {
        let mut builder = FormatBuilder::new(2);
        builder.token("first");
        builder.blank_line();
        builder.token("second");
        assert_eq!(builder.finish(), "first\n\nsecond\n");
    }

    #[test]
    fn test_whitespace_upgrade() {
        let mut builder = FormatBuilder::new(2);
        builder.token("hello");
        builder.space();
        builder.newline(); // Should upgrade space to newline
        builder.token("world");
        assert_eq!(builder.finish(), "hello\nworld\n");
    }
}
