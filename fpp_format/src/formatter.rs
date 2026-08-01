use crate::FormatOptions;
use crate::builder::FormatBuilder;
use fpp_lsp_parser::{SyntaxElement, SyntaxKind, SyntaxNode, SyntaxToken, WalkEvent};

/// Main formatter that walks the syntax tree and produces formatted output
pub struct Formatter {
    builder: FormatBuilder,
    /// Track depth of member-list nesting to know when COMMA is a separator
    member_list_depth: usize,
    /// Track if we've seen a blank line in recent whitespace (for preservation)
    pending_blank_line: bool,
    /// Number of `{` opened but not yet closed. Standalone comments indent to
    /// this depth, since a comment can appear between a `{` and the member-list
    /// node (so the builder's own indent level is not yet raised).
    brace_depth: usize,
    /// Number of enclosing `choice { … }` blocks. FPP forbids bare newlines
    /// inside a choice (except within a `do { }` action list), so while this is
    /// non-zero we regenerate every line break as a `\` continuation and
    /// suppress stray source EOLs.
    choice_depth: usize,
    /// True while emitting a single-member `do { x }` action list inline (only
    /// inside a choice). Suppresses the member-list expansion for that block.
    inline_do: bool,
    /// Number of enclosing `do { … }` action lists. Bare newlines are valid
    /// inside a do-block even within a choice, so this tells the EOL handler
    /// when a source newline may pass through unescaped.
    do_block_depth: usize,
}

impl Formatter {
    /// Create a new formatter with the given options
    pub fn new(options: FormatOptions) -> Self {
        Self {
            builder: FormatBuilder::new(options.indent_width),
            member_list_depth: 0,
            pending_blank_line: false,
            brace_depth: 0,
            choice_depth: 0,
            inline_do: false,
            do_block_depth: 0,
        }
    }

    /// Format a syntax tree node and return the formatted text
    pub fn format(mut self, root: &SyntaxNode) -> String {
        // Walk the tree in preorder, visiting both nodes and tokens
        for event in root.preorder_with_tokens() {
            match event {
                WalkEvent::Enter(element) => self.handle_enter(element),
                WalkEvent::Leave(element) => self.handle_leave(element),
            }
        }

        self.builder.finish()
    }

    /// Handle entering a node or token
    fn handle_enter(&mut self, element: SyntaxElement) {
        match element {
            SyntaxElement::Node(node) => self.enter_node(&node),
            SyntaxElement::Token(token) => self.handle_token(&token),
        }
    }

    /// Handle leaving a node or token
    fn handle_leave(&mut self, element: SyntaxElement) {
        if let SyntaxElement::Node(node) = element {
            self.leave_node(&node);
        }
    }

    /// Handle entering a node
    fn enter_node(&mut self, node: &SyntaxNode) {
        use SyntaxKind::*;

        match node.kind() {
            // Track choice nesting: inside a choice, FPP forbids bare newlines
            // (except within a do-block), so line breaks become `\` continuations.
            DEF_CHOICE => {
                self.choice_depth += 1;
            }

            // Inside a choice, a do-block with a single action stays inline
            // (`do { a }`); a multi-action list expands one action per line.
            DO_EXPR => {
                self.do_block_depth += 1;
                if self.choice_depth > 0 {
                    self.inline_do = Self::do_expr_is_single_member(node);
                }
            }

            // Member lists need indentation -- except a single-member do-block
            // inside a choice, which we keep inline (`do { a }`).
            list if list.is_member_list() => {
                if self.inline_do && node.kind() == DO_EXPR_MEMBER_LIST {
                    // Stay inline: no break, no indent.
                    self.member_list_depth += 1;
                } else {
                    self.builder.newline();
                    self.builder.indent();
                    self.member_list_depth += 1;
                }
            }

            // Direct children of member lists should start on their own line
            // This includes defs/specs but also struct members, enum constants, formal params, etc.
            _ if self.member_list_depth > 0 && self.is_list_member(node) => {
                if self.inline_do {
                    // Inline do-block member stays on the same line.
                } else if self.pending_blank_line {
                    // Preserve a blank line from source.
                    self.builder.blank_line();
                    self.pending_blank_line = false;
                } else if !self.builder.is_at_line_start() {
                    self.builder.newline();
                }
            }

            // Binary operators need space before
            BINARY_OP => {
                self.builder.space();
            }

            // Array size/index needs no space before [
            INDEX_OR_SIZE => {}

            _ => {}
        }
    }

    /// Check if a node is a member directly in a member list
    fn is_list_member(&self, node: &SyntaxNode) -> bool {
        use SyntaxKind::*;

        // Check if parent is a member list
        let parent = match node.parent() {
            Some(p) => p,
            None => return false,
        };

        if !parent.kind().is_member_list() {
            return false;
        }

        // Most member types should get newlines
        match node.kind() {
            // Defs and specs
            _ if node.kind().is_def() || node.kind().is_spec() => true,
            // Struct/enum/array expression members
            EXPR_STRUCT_MEMBER | DEF_ENUM_CONSTANT | STRUCT_MEMBER | FORMAL_PARAM => true,
            // Connection, topology, state machine members
            CONNECTION | SPEC_INSTANCE | SPEC_TOP_PORT => true,
            // Expression constructs that shouldn't break
            EXPR | EXPR_IDENT | EXPR_LITERAL | EXPR_BINARY | EXPR_UNARY | EXPR_POSTFIX
            | EXPR_ARRAY | EXPR_STRUCT | NAME | NAME_REF | TYPE_NAME => false,
            // Inline clauses
            DEFAULT | FORMAT | ID | OPCODE | PRIORITY | BASE_ID | SAVE_OPCODE | SET_OPCODE => false,
            _ => false,
        }
    }

    /// Handle leaving a node
    fn leave_node(&mut self, node: &SyntaxNode) {
        use SyntaxKind::*;

        match node.kind() {
            DEF_CHOICE => {
                if self.choice_depth > 0 {
                    self.choice_depth -= 1;
                }
            }

            DO_EXPR => {
                if self.do_block_depth > 0 {
                    self.do_block_depth -= 1;
                }
                if self.choice_depth > 0 {
                    self.inline_do = false;
                }
            }

            // Member lists need dedentation -- but an inline do-block never
            // indented, so it must not dedent either.
            list if list.is_member_list() => {
                if !(self.inline_do && node.kind() == DO_EXPR_MEMBER_LIST) {
                    self.builder.dedent();
                }
                if self.member_list_depth > 0 {
                    self.member_list_depth -= 1;
                }
            }

            // After binary operator, add space
            BINARY_OP => {
                self.builder.space();
            }

            // After completing a top-level def/spec node, emit newline
            // But NOT for sub-nodes that might have trailing keywords (do-expr, clauses, etc.)
            // Emit newline to separate this complete def/spec from the next one
            // -- unless a trailing comment or post-annotation follows it (possibly
            // across a separator comma) on the same source line. In that case the
            // trivia must stay attached (its handler emits it inline), and the
            // newline comes afterwards.
            kind if (kind.is_def() || kind.is_spec())
                && self.is_top_level_def_or_spec(node)
                && !self.builder.is_at_line_start()
                && !Self::followed_by_trailing_trivia(node.next_sibling_or_token()) =>
            {
                self.builder.newline();
            }

            // NOTE: Don't emit newline after DEFAULT, DO_EXPR, THEN_CLAUSE, ELSE_CLAUSE, etc.
            // They might be followed by FORMAT, ENTER_KW, ELSE_KW, etc.
            // The keywords themselves will handle spacing
            _ => {}
        }
    }

    /// Check if a def/spec node is top-level (not nested inside a transition/choice/etc.)
    fn is_top_level_def_or_spec(&self, node: &SyntaxNode) -> bool {
        // Check if parent is a member list (meaning this is a top-level def/spec)
        if let Some(parent) = node.parent() {
            parent.kind().is_member_list()
        } else {
            false
        }
    }

    /// Whether we are directly inside a choice block (not within a nested
    /// do-block). FPP forbids bare newlines here, so line breaks must be `\`
    /// continuations and source newlines are suppressed.
    fn in_choice_body(&self) -> bool {
        self.choice_depth > 0 && self.do_block_depth == 0
    }

    /// Whether a `DO_EXPR` node's action list contains exactly one member. Such
    /// a do-block is kept inline (`do { a }`) inside a choice.
    fn do_expr_is_single_member(do_expr: &SyntaxNode) -> bool {
        use SyntaxKind::*;

        do_expr
            .children()
            .find(|c| c.kind() == DO_EXPR_MEMBER_LIST)
            .map(|list| list.children().filter(|c| c.kind() == NAME_REF).count() == 1)
            .unwrap_or(false)
    }

    /// Whether the element sequence starting at `start` reaches a trailing
    /// comment or post-annotation on the same source line -- i.e. trivia that
    /// stays attached to the preceding item. A member-separator `COMMA` and
    /// inline whitespace are skipped; any newline (EOL, or whitespace with
    /// '\n') or real node ends the line first, so it is not trailing.
    fn followed_by_trailing_trivia(start: Option<SyntaxElement>) -> bool {
        use SyntaxKind::*;

        let mut next = start;
        while let Some(elem) = next {
            match elem {
                SyntaxElement::Token(t) => match t.kind() {
                    COMMENT | POST_ANNOTATION => return true,
                    // The separator comma and inline whitespace sit between the
                    // item and its trailing trivia -- keep scanning past them.
                    COMMA => next = t.next_sibling_or_token(),
                    WHITESPACE if !t.text().contains('\n') => {
                        next = t.next_sibling_or_token();
                    }
                    _ => return false,
                },
                SyntaxElement::Node(_) => return false,
            }
        }
        false
    }

    /// Check if a comment is trailing (on the same source line as preceding
    /// content) vs standalone (on its own line).
    ///
    /// We walk backwards through the lossless tree from the comment. Trivia
    /// (whitespace without a newline) is skipped. The first thing we hit
    /// decides it:
    /// - an EOL, or whitespace containing `\n` -> the comment starts a fresh
    ///   line, so it is standalone;
    /// - any real token or a node (e.g. the preceding definition) with no
    ///   intervening newline -> there is content on this line, so the comment
    ///   is trailing.
    fn is_trailing_comment(&self, token: &SyntaxToken) -> bool {
        use SyntaxKind::*;

        let mut current = token.prev_sibling_or_token();
        loop {
            match current {
                Some(SyntaxElement::Token(t)) => match t.kind() {
                    EOL => return false,
                    WHITESPACE => {
                        if t.text().contains('\n') {
                            return false;
                        }
                        current = t.prev_sibling_or_token();
                    }
                    // A real token with no newline before it -> same line.
                    _ => return true,
                },
                // Reaching a node (a preceding definition/expression) without
                // having seen a newline first means there is content on this
                // line -> the comment trails it.
                Some(SyntaxElement::Node(_)) => return true,
                // Nothing before it at all -> standalone.
                None => return false,
            }
        }
    }

    /// Handle a token
    fn handle_token(&mut self, token: &SyntaxToken) {
        use SyntaxKind::*;

        match token.kind() {
            // Whitespace - check for blank lines (multiple newlines) to preserve
            WHITESPACE => {
                // Count newlines in whitespace to detect blank lines
                let newline_count = token.text().matches('\n').count();
                if newline_count >= 2 && self.member_list_depth > 0 {
                    // Source had a blank line - preserve at most one
                    self.pending_blank_line = true;
                }
            }

            // EOL in member lists acts as a separator (emit newline, suppress literal)
            // Outside member lists, skip it (we regenerate whitespace)
            EOL => {
                // Inside a choice body, all line breaks are regenerated as `\`
                // continuations by the structural handlers -- swallow source EOLs.
                if self.in_choice_body() {
                    // no-op
                } else if self.member_list_depth > 0 {
                    // This is a member separator - emit a newline. A blank line
                    // between members is lexed as one EOL token holding multiple
                    // '\n's; preserve it as a single blank line to keep the
                    // author's statement grouping. The WHITESPACE handler also
                    // sets pending_blank_line for the rarer split-token case.
                    let blank = self.pending_blank_line || token.text().matches('\n').count() >= 2;
                    if blank {
                        self.builder.blank_line();
                        self.pending_blank_line = false;
                    } else {
                        self.builder.newline();
                    }
                }
                // Outside member lists, skip (whitespace is regenerated)
            }

            // Preserve comments with proper indentation
            COMMENT => {
                // Determine if this is a trailing/inline comment based on SOURCE position
                // A comment is trailing if the previous token on the same source line is non-trivia
                let is_trailing = self.is_trailing_comment(token);

                if is_trailing {
                    // Inline/trailing comment - add space before, stay on same line
                    self.builder.space();
                    self.builder.token(token.text());
                    // Don't add newline - it will come from the next structure
                } else {
                    // Standalone comment - on its own line, indented to match the
                    // members it sits among. A comment can appear between a `{`
                    // and the member-list node, so the builder's own indent level
                    // is not raised yet; use the open-brace depth instead.
                    if !self.builder.is_at_line_start() {
                        self.builder.newline();
                    }

                    let saved = self.builder.indent_level();
                    self.builder.set_indent_level(self.brace_depth);
                    self.builder.token(token.text());
                    self.builder.set_indent_level(saved);
                    self.builder.newline();
                }
            }

            // Pre-annotations go on their own line BEFORE the item
            PRE_ANNOTATION => {
                if !self.builder.is_at_line_start() {
                    self.builder.newline();
                }
                self.builder.token(token.text());
                self.builder.newline();
            }

            // Post-annotations stay INLINE after the item (same line)
            POST_ANNOTATION => {
                // Add space before, stay on current line
                self.builder.space();
                self.builder.token(token.text());
                // Don't emit newline - let the next member separator handle it
            }

            // `else` inside a choice body starts a new (continued) line.
            ELSE_KW if self.in_choice_body() => {
                self.builder.continuation_newline();
                self.builder.token(token.text());
                self.builder.space();
            }

            // Keywords - add space after
            keyword if keyword.is_keyword() => {
                if !self.builder.is_at_line_start() {
                    self.builder.space();
                }

                self.builder.token(token.text());
                self.builder.space();
            }

            // Opening braces - space before, newline after
            LEFT_CURLY => {
                self.brace_depth += 1;
                let opens_choice = token.parent().is_some_and(|p| p.kind() == DEF_CHOICE);
                self.builder.space();
                self.builder.token(token.text());
                if self.inline_do {
                    // Single-member `do { a }` stays on one line.
                    self.builder.space();
                } else {
                    // A choice body is not a member list, so indent it
                    // explicitly. A bare newline after the choice `{` is valid.
                    if opens_choice {
                        self.builder.indent();
                    }
                    self.builder.newline();
                }
            }

            // Closing braces - newline before if needed, SPACE after (not newline!)
            // The newline decision is driven by the NEXT element (like DEFAULT keyword)
            RIGHT_CURLY => {
                let is_choice_closing = token.parent().is_some_and(|p| p.kind() == DEF_CHOICE);

                if self.brace_depth > 0 {
                    self.brace_depth -= 1;
                }

                if is_choice_closing {
                    // The choice body was indented; dedent and put `}` on its own
                    // line. FPP requires the preceding line break to be a `\`
                    // continuation.
                    self.builder.dedent();
                    self.builder.continuation_newline();
                } else if self.inline_do {
                    // Single-member `do { a }` stays inline: space before `}`.
                    self.builder.space();
                } else if !self.builder.is_at_line_start() {
                    self.builder.newline();
                }
                self.builder.token(token.text());
                // Emit space, not newline - trailing clauses (default, else, enter) need to stay attached
                self.builder.space();
            }

            COLON => {
                // name: Type
                self.builder.token(token.text());
                self.builder.space();
            }

            // Operators that need space around them
            EQUALS => {
                // Def = expr
                self.builder.space();
                self.builder.token(token.text());
                self.builder.space();
            }

            // Operators from BINARY_OP node (space added by node handlers)
            PLUS | MINUS | STAR | SLASH => {
                self.builder.token(token.text());
            }

            // Comma in member lists: suppress (we use newlines as separators)
            // Comma elsewhere: emit with space after
            COMMA => {
                if self.member_list_depth > 0 {
                    // Suppress literal comma in member lists. Normally a newline
                    // separates members -- but if a trailing comment or
                    // post-annotation follows the comma, it belongs to the item
                    // just closed and must stay on this line, so emit a space and
                    // let the following separator/member drive the newline.
                    if Self::followed_by_trailing_trivia(token.next_sibling_or_token()) {
                        self.builder.space();
                    } else {
                        self.builder.newline();
                    }
                } else {
                    // Outside member lists, keep comma with space after
                    self.builder.token(token.text());
                    self.builder.space();
                }
            }

            // Semicolon - no space before, newline after
            SEMI => {
                self.builder.token(token.text());
                self.builder.newline();
            }

            // Dots - no space around
            DOT => {
                self.builder.token(token.text());
            }

            // Opening parens - no space before
            LEFT_PAREN => {
                self.builder.token(token.text());
            }

            // Opening square brackets - space before for arrays
            LEFT_SQUARE => {
                // Check context - if inside INDEX_OR_SIZE, no space
                self.builder.token(token.text());
            }

            // Closing parens - no space before
            RIGHT_PAREN => {
                self.builder.token(token.text());
            }

            // Closing square brackets - no space before.
            // Normally this marks array sizes but may be used in expressions
            RIGHT_SQUARE => {
                self.builder.token(token.text());

                let is_subscript = token.parent_ancestors().nth(1).is_some_and(|n| {
                    n.kind() == EXPR_SUBSCRIPT
                        || n.kind() == CONNECTION_FROM
                        || n.kind() == CONNECTION_TO
                });

                if !is_subscript {
                    self.builder.space();
                }
            }

            // Arrows
            RIGHT_ARROW => {
                self.builder.space();
                self.builder.token(token.text());
                self.builder.space();
            }

            // All other tokens (identifiers, literals, etc.)
            _ => {
                self.builder.token(token.text());
            }
        }
    }
}
