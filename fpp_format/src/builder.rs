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

/// The kind of an alignment anchor recorded during the walk.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum AnchorKind {
    /// A `->` in a topology direct connection.
    Arrow,
    /// A `@<` post-annotation.
    PostAnnotation,
}

/// A recorded alignment anchor: where an alignable token starts in the output.
#[derive(Debug, Clone, Copy)]
pub struct Anchor {
    /// 0-based index of the line the anchor sits on.
    pub line: usize,
    /// 0-based character column where the anchor token begins.
    pub col: usize,
    /// Indentation level of the line (used to group anchors).
    pub indent_level: usize,
    /// The kind of anchor.
    pub kind: AnchorKind,
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
    /// Flat mode: newlines/blank-lines/continuations downgrade to a single
    /// space and indentation is inert. Used to measure a node's single-line
    /// width without mutating the real output.
    flat: bool,
    /// 0-based index of the current output line.
    line: usize,
    /// 0-based character column of the write cursor on the current line.
    col: usize,
    /// Alignment anchors recorded during the walk (see `token_anchor`).
    anchors: Vec<Anchor>,
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
            flat: false,
            line: 0,
            col: 0,
            anchors: Vec::new(),
        }
    }

    /// Enable flat mode: line breaks collapse to a single space and indentation
    /// is inert. Used to measure the single-line width of a node.
    pub fn set_flat(&mut self, flat: bool) {
        self.flat = flat;
    }

    /// Whether the builder is in flat (measurement) mode.
    pub fn is_flat(&self) -> bool {
        self.flat
    }

    /// Get the formatted output, applying column alignment to recorded anchors.
    pub fn finish(mut self) -> String {
        let aligned = align_lines(&self.output, &self.anchors);
        self.output = aligned;

        // Ensure exactly one trailing newline
        if !self.output.ends_with('\n') {
            self.output.push('\n');
        }
        self.output
    }

    /// The output built so far (used for flat-width measurement).
    pub fn output(&self) -> &str {
        &self.output
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
        // In flat mode, collapse line breaks to a single space.
        if self.flat {
            self.space();
            return;
        }
        // Upgrade to newline if we don't have blank line pending
        match self.pending_whitespace {
            Whitespace::None | Whitespace::Space => self.pending_whitespace = Whitespace::Newline,
            _ => {} // Keep stronger whitespace
        }
    }

    /// Request a blank line (two newlines) before the next token
    pub fn blank_line(&mut self) {
        // In flat mode, collapse to a single space.
        if self.flat {
            self.space();
            return;
        }
        // Always upgrade to blank line
        self.pending_whitespace = Whitespace::BlankLine;
    }

    /// Request a backslash line continuation before the next token. Emitted as
    /// ` \` followed by a newline. Overrides a pending plain space/newline (a
    /// choice block must not emit a bare newline), but never downgrades a
    /// stronger blank line.
    pub fn continuation_newline(&mut self) {
        // In flat mode, collapse to a single space.
        if self.flat {
            self.space();
            return;
        }
        match self.pending_whitespace {
            Whitespace::None | Whitespace::Space | Whitespace::Newline => {
                self.pending_whitespace = Whitespace::ContinuationNewline;
            }
            _ => {} // Keep stronger whitespace
        }
    }

    /// Increase indentation level
    pub fn indent(&mut self) {
        if self.flat {
            return;
        }
        self.indent_level += 1;
    }

    /// Decrease indentation level
    pub fn dedent(&mut self) {
        if self.flat {
            return;
        }
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
        self.emit_indent_if_needed(text);

        // Emit the token text
        self.push(text);
    }

    /// Emit a token that participates in column alignment. Records an anchor at
    /// the column where the token begins (after pending whitespace and indent),
    /// then emits the token. No-op recording in flat mode.
    pub fn token_anchor(&mut self, text: &str, kind: AnchorKind) {
        if text.is_empty() {
            return;
        }

        self.emit_pending_whitespace();
        self.emit_indent_if_needed(text);

        if !self.flat {
            self.anchors.push(Anchor {
                line: self.line,
                col: self.col,
                indent_level: self.indent_level,
                kind,
            });
        }

        self.push(text);
    }

    /// Emit leading indentation if we are at the start of a line and the token
    /// is not itself whitespace.
    fn emit_indent_if_needed(&mut self, text: &str) {
        if self.at_line_start && !text.trim().is_empty() {
            let indent = " ".repeat(self.indent_level * self.indent_width);
            self.push(&indent);
            self.at_line_start = false;
        }
    }

    /// Append text to the output, tracking the current line and column.
    fn push(&mut self, text: &str) {
        for ch in text.chars() {
            if ch == '\n' {
                self.line += 1;
                self.col = 0;
            } else {
                self.col += 1;
            }
        }
        self.output.push_str(text);
    }

    /// Emit pending whitespace
    fn emit_pending_whitespace(&mut self) {
        match self.pending_whitespace {
            Whitespace::None => {}
            Whitespace::Space => {
                if !self.at_line_start {
                    self.push(" ");
                }
            }
            Whitespace::Newline => {
                self.push("\n");
                self.at_line_start = true;
            }
            Whitespace::BlankLine => {
                // Emit two newlines for blank line
                if !self.at_line_start {
                    self.push("\n");
                }
                self.push("\n");
                self.at_line_start = true;
            }
            Whitespace::ContinuationNewline => {
                // ` \` after the previous token, then a newline. At line start
                // there is nothing to continue, so fall back to a plain newline.
                if !self.at_line_start {
                    self.push(" \\");
                }
                self.push("\n");
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

/// Left-pad text before each anchor so anchors in the same group share a column.
///
/// A group is a maximal run of anchors on consecutive lines (line index
/// increasing by exactly 1) with the same `indent_level` and `kind`. Any gap
/// (blank or non-matching line) or a change in indent/kind starts a new group.
/// Padding is inserted at the anchor's char column; since at most one anchor
/// occurs per line for the kinds we align, inserting spaces never shifts a
/// later anchor on the same line.
fn align_lines(output: &str, anchors: &[Anchor]) -> String {
    if anchors.is_empty() {
        return output.to_string();
    }

    let mut lines: Vec<String> = output.split('\n').map(|s| s.to_string()).collect();

    let mut i = 0;
    while i < anchors.len() {
        // Extend a group while anchors stay contiguous and same indent/kind.
        let mut j = i + 1;
        while j < anchors.len()
            && anchors[j].kind == anchors[i].kind
            && anchors[j].indent_level == anchors[i].indent_level
            && anchors[j].line == anchors[j - 1].line + 1
        {
            j += 1;
        }

        let target = anchors[i..j].iter().map(|a| a.col).max().unwrap_or(0);
        for a in &anchors[i..j] {
            if a.col < target
                && let Some(line) = lines.get_mut(a.line)
            {
                let pad = " ".repeat(target - a.col);
                // Insert at the anchor's char column (byte index derived from
                // char count, since alignment lines are ASCII in practice but
                // we stay char-safe).
                let byte_idx = line
                    .char_indices()
                    .nth(a.col)
                    .map(|(b, _)| b)
                    .unwrap_or(line.len());
                line.insert_str(byte_idx, &pad);
            }
        }

        i = j;
    }

    lines.join("\n")
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
