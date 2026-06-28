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
    pub fn finish(self) -> String {
        self.output
    }

    /// Request a space before the next token
    pub fn space(&mut self) {
        // Upgrade to space if we don't have stronger whitespace pending
        match self.pending_whitespace {
            Whitespace::None => self.pending_whitespace = Whitespace::Space,
            _ => {} // Keep stronger whitespace
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

    /// Get current indentation level
    pub fn current_indent(&self) -> usize {
        self.indent_level
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
        }
        self.pending_whitespace = Whitespace::None;
    }

    /// Check if we're at the start of a line
    pub fn is_at_line_start(&self) -> bool {
        self.at_line_start
    }

    /// Force emit of pending whitespace (useful for comments)
    pub fn flush_whitespace(&mut self) {
        self.emit_pending_whitespace();
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_token() {
        let mut builder = FormatBuilder::new(2);
        builder.token("hello");
        assert_eq!(builder.finish(), "hello");
    }

    #[test]
    fn test_space_between_tokens() {
        let mut builder = FormatBuilder::new(2);
        builder.token("hello");
        builder.space();
        builder.token("world");
        assert_eq!(builder.finish(), "hello world");
    }

    #[test]
    fn test_newline() {
        let mut builder = FormatBuilder::new(2);
        builder.token("line1");
        builder.newline();
        builder.token("line2");
        assert_eq!(builder.finish(), "line1\nline2");
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
        assert_eq!(builder.finish(), "outer\n  inner\nouter");
    }

    #[test]
    fn test_blank_line() {
        let mut builder = FormatBuilder::new(2);
        builder.token("first");
        builder.blank_line();
        builder.token("second");
        assert_eq!(builder.finish(), "first\n\nsecond");
    }

    #[test]
    fn test_whitespace_upgrade() {
        let mut builder = FormatBuilder::new(2);
        builder.token("hello");
        builder.space();
        builder.newline(); // Should upgrade space to newline
        builder.token("world");
        assert_eq!(builder.finish(), "hello\nworld");
    }
}
