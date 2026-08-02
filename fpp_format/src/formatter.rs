use crate::FormatOptions;
use crate::builder::{AnchorKind, FormatBuilder};
use fpp_lsp_parser::{SyntaxElement, SyntaxKind, SyntaxNode, SyntaxToken, WalkEvent};

/// Tracks whether the enclosing specifier is being exploded (one clause per
/// line) and whether its continuation indent has been opened yet.
struct ExplodeFrame {
    /// Whether this spec's clauses should each go on their own line.
    exploding: bool,
    /// Whether `indent()` has been called for this spec's clauses.
    indented: bool,
}

/// Main formatter that walks the syntax tree and produces formatted output
pub struct Formatter {
    builder: FormatBuilder,
    /// Maximum rendered line width before a specifier's clauses are exploded.
    max_line_width: usize,
    /// Spaces per indent level (needed to measure flat width at a given depth).
    indent_width: usize,
    /// Stack of explode frames, one per enclosing explodable specifier.
    explode_stack: Vec<ExplodeFrame>,
    /// Track depth of member-list nesting to know when COMMA is a separator
    member_list_depth: usize,
    /// Track if we've seen a blank line in recent whitespace (for preservation)
    pending_blank_line: bool,
    /// Number of `{` opened but not yet closed. Standalone comments indent to
    /// this depth, since a comment can appear between a `{` and the member-list
    /// node (so the builder's own indent level is not yet raised).
    brace_depth: usize,
    /// Whether the current do-block should stay inline (single member, fits on one line).
    /// Set when entering DO_EXPR, cleared when leaving.
    inline_do: bool,
}

impl Formatter {
    /// Create a new formatter with the given options
    pub fn new(options: FormatOptions) -> Self {
        Self {
            builder: FormatBuilder::new(options.indent_width),
            max_line_width: options.max_line_width,
            indent_width: options.indent_width,
            explode_stack: Vec::new(),
            member_list_depth: 0,
            pending_blank_line: false,
            brace_depth: 0,
            inline_do: false,
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

        // Push an explode frame when entering an explodable specifier. Its
        // clauses break onto continuation lines only if the whole spec would
        // exceed the line width when rendered flat. During flat measurement we
        // never explode (and must not recurse into flat_len).
        if !self.builder.is_flat() && Self::is_explodable_spec(node.kind()) {
            let exploding = self.flat_len(node) > self.max_line_width;
            self.explode_stack.push(ExplodeFrame {
                exploding,
                indented: false,
            });
        }

        // If this node begins a clause of the currently-exploding spec, break
        // before it (node-wrapped clauses; bare-keyword clauses are handled in
        // handle_token).
        if self.is_node_clause_boundary(node) {
            self.break_clause();
        }

        match node.kind() {
            // Set inline_do flag when entering a do-block that should stay inline
            DO_EXPR => {
                // Check if single member by counting NAME_REF nodes in the member list
                let single_member = node
                    .children()
                    .any(|c| {
                        c.kind() == DO_EXPR_MEMBER_LIST
                            && c.children().filter(|n| n.kind() == NAME_REF).count() == 1
                    });
                self.inline_do = single_member;
            }

            // Member lists need indentation, unless it's a DO_EXPR_MEMBER_LIST
            // with a single member that should stay inline (parent DO_EXPR is not exploding).
            list if list.is_member_list() => {
                let is_inline_do = node.kind() == DO_EXPR_MEMBER_LIST
                    && !self.top_exploding()
                    && node.children().filter(|c| c.kind() == NAME_REF).count() == 1;

                if Self::is_empty_member_list(node) || is_inline_do {
                    // Stay inline: no break, no indent. An empty list renders as
                    // `()`/`{}` -- breaking it would emit an invalid bare `(\n)`.
                    // A do-block that fits on one line also stays inline.
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
                if self.pending_blank_line {
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

    /// Whether a specifier kind can have its trailing clauses exploded onto
    /// separate lines. Equals `is_spec()` plus the three specs it omits,
    /// DEF_CHOICE (which explodes its `else` clause), and DO_EXPR (which
    /// explodes its action list when too wide).
    fn is_explodable_spec(kind: SyntaxKind) -> bool {
        use SyntaxKind::*;
        kind.is_spec()
            || matches!(
                kind,
                SPEC_CONTAINER | SPEC_RECORD | SPEC_STATE_MACHINE_INSTANCE | DEF_CHOICE | DO_EXPR
            )
    }

    /// Whether the innermost enclosing spec is currently exploding.
    fn top_exploding(&self) -> bool {
        self.explode_stack.last().is_some_and(|f| f.exploding)
    }

    /// Emit a clause break: open the continuation indent once, then a `\`
    /// continuation newline. No-op if the enclosing spec is not exploding.
    /// For DEF_CHOICE, always use continuation newlines since FPP requires them.
    fn break_clause(&mut self) {
        if let Some(frame) = self.explode_stack.last_mut() {
            if !frame.exploding {
                return;
            }
            if !frame.indented {
                self.builder.indent();
                frame.indented = true;
            }
            // Choice blocks require backslash continuations for line breaks
            self.builder.continuation_newline();
        }
    }

    /// Whether `node` is the first element of a node-wrapped clause belonging to
    /// the currently-exploding spec (its direct parent is that spec).
    fn is_node_clause_boundary(&self, node: &SyntaxNode) -> bool {
        use SyntaxKind::*;

        if !self.top_exploding() {
            return false;
        }

        let parent = match node.parent() {
            Some(p) => p,
            None => return false,
        };
        if !Self::is_explodable_spec(parent.kind()) {
            return false;
        }

        match node.kind() {
            OPCODE | PRIORITY | QUEUE_FULL | ID | FORMAT | EVENT_THROTTLE => true,
            // `default <expr>` clause only appears as a clause in a param spec.
            DEFAULT => parent.kind() == SPEC_PARAM,
            _ => false,
        }
    }

    /// Whether `token` is a bare keyword that introduces a clause of the
    /// currently-exploding spec (its direct parent is that spec). Distinguishes
    /// `high`/`low` limits (telemetry) from severity levels (event) by parent.
    /// ELSE_KW in a choice is a clause boundary for explosion.
    fn is_token_clause_boundary(&self, token: &SyntaxToken) -> bool {
        use SyntaxKind::*;

        if !self.top_exploding() {
            return false;
        }

        let parent = match token.parent() {
            Some(p) => p,
            None => return false,
        };

        matches!(
            (parent.kind(), token.kind()),
            (SPEC_EVENT, SEVERITY_KW)
                | (SPEC_TELEMETRY, UPDATE_KW | LOW_KW | HIGH_KW)
                | (SPEC_PARAM, SET_KW | SAVE_KW)
                | (SPEC_CONTAINER, DEFAULT_KW)
                | (SPEC_RECORD, ARRAY_KW)
                | (DEF_CHOICE, ELSE_KW)
        )
    }

    /// Measure the width of a node rendered on a single line (flat), including
    /// the member indentation it sits at. Used to decide whether to explode.
    fn flat_len(&self, node: &SyntaxNode) -> usize {
        let mut probe = Formatter::new(FormatOptions {
            indent_width: self.indent_width,
            max_line_width: self.max_line_width,
        });
        probe.builder.set_flat(true);
        for event in node.preorder_with_tokens() {
            match event {
                WalkEvent::Enter(element) => probe.handle_enter(element),
                WalkEvent::Leave(element) => probe.handle_leave(element),
            }
        }
        let rendered = probe.builder.output().trim_end().chars().count();
        rendered + self.builder.indent_level() * self.indent_width
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
            // Telemetry limit-sequence members (yellow/orange/red)
            LIMIT => true,
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

        // Pop the explode frame for an explodable spec. If we opened a
        // continuation indent for its clauses, close it now -- before the
        // trailing-newline arm below emits the member separator, so the next
        // member lands back at member indent.
        if !self.builder.is_flat()
            && Self::is_explodable_spec(node.kind())
            && let Some(frame) = self.explode_stack.pop()
            && frame.exploding
            && frame.indented
        {
            self.builder.dedent();
        }

        match node.kind() {
            // Clear inline_do flag when leaving DO_EXPR
            DO_EXPR => {
                self.inline_do = false;
            }

            // Member lists need dedentation, unless they stayed inline.
            list if list.is_member_list() => {
                let was_inline_do = node.kind() == DO_EXPR_MEMBER_LIST
                    && !self.top_exploding()
                    && node.children().filter(|c| c.kind() == NAME_REF).count() == 1;

                if !Self::is_empty_member_list(node) && !was_inline_do {
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

    /// Whether a token is at the root level (parent is ROOT node, which happens
    /// when using non-module entry points like Component, Topology, etc.).
    fn is_at_root_level(&self, token: &SyntaxToken) -> bool {
        use SyntaxKind::*;
        token.parent().is_some_and(|p| p.kind() == ROOT)
    }

    /// Whether a member-list node has no member children -- only its delimiter
    /// tokens (and possibly trivia). Such a list stays inline (`()` / `{}`)
    /// rather than breaking onto separate lines.
    fn is_empty_member_list(node: &SyntaxNode) -> bool {
        node.children().next().is_none()
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

        // Bare-keyword clause boundary: break before a keyword that introduces
        // a clause of the currently-exploding spec, then fall through to normal
        // handling for the keyword itself.
        if self.is_token_clause_boundary(token) {
            self.break_clause();
        }

        match token.kind() {
            // Whitespace - check for blank lines (multiple newlines) to preserve
            WHITESPACE => {
                // Count newlines in whitespace to detect blank lines
                let newline_count = token.text().matches('\n').count();
                if newline_count >= 2 && (self.member_list_depth > 0 || self.is_at_root_level(token)) {
                    // Source had a blank line - preserve at most one
                    self.pending_blank_line = true;
                }
            }

            // EOL in member lists (or at the root level) acts as a separator
            EOL => {
                // Check if we're inside an inline do-block - skip EOL tokens in DO_EXPR or its member list
                let in_inline_do = self.inline_do
                    && token.parent().is_some_and(|p| {
                        p.kind() == DO_EXPR_MEMBER_LIST || p.kind() == DO_EXPR
                    });

                if in_inline_do {
                    // Skip EOL tokens in inline do-blocks
                } else if self.member_list_depth > 0 || self.is_at_root_level(token) {
                    // Skip this EOL if it's a single newline immediately followed by
                    // trailing trivia (comment or post-annotation) - those stay inline.
                    // But preserve blank lines (multiple newlines) even before trailing trivia.
                    let is_single_newline = token.text().matches('\n').count() == 1;
                    let followed_by_trivia = is_single_newline && Self::followed_by_trailing_trivia(token.next_sibling_or_token());

                    if followed_by_trivia {
                        // Suppress this single EOL; the trivia stays on the same line
                    } else {
                        // This is a member/item separator - emit a newline. A blank line
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
                } else {
                    // Outside member lists and root level, skip (whitespace is regenerated)
                }
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
                // Add space before, stay on current line. Record an anchor so
                // adjacent post-annotations align into a shared column.
                self.builder.space();
                self.builder
                    .token_anchor(token.text(), AnchorKind::PostAnnotation);
                // Don't emit newline - let the next member separator handle it
            }

            // Keywords - add space after
            keyword if keyword.is_keyword() => {
                if !self.builder.is_at_line_start() {
                    self.builder.space();
                }

                self.builder.token(token.text());
                self.builder.space();
            }

            // Opening braces - space before, newline/space after
            LEFT_CURLY => {
                self.brace_depth += 1;
                let opens_choice = token.parent().is_some_and(|p| p.kind() == DEF_CHOICE);

                self.builder.space();
                self.builder.token(token.text());

                // Check if this opens a do-block (parent or grandparent is DO_EXPR)
                let in_do_expr = token.parent().is_some_and(|p| {
                    p.kind() == DO_EXPR || p.parent().is_some_and(|gp| gp.kind() == DO_EXPR)
                });

                if self.inline_do && in_do_expr {
                    // Inline do-block: space instead of newline
                    self.builder.space();
                } else {
                    // Choice bodies need explicit indentation (not a member list)
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
                    // Choice body was indented; dedent before the closing brace
                    self.builder.dedent();
                    if !self.builder.is_at_line_start() {
                        self.builder.newline();
                    }
                } else if self.inline_do {
                    // Inline do-block: space before closing brace
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
            // Comma elsewhere: emit with space after. A comma is a member
            // separator only when its DIRECT parent is a member-list node --
            // a comma inside a clause that merely sits within an enclosing
            // member list (e.g. a topology `implements A, B`) is not.
            COMMA => {
                let is_separator = token
                    .parent()
                    .is_some_and(|p| p.kind().is_member_list());
                if is_separator {
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

            // String literals normally follow a keyword (which leaves a pending
            // space), but a few forms place one directly after an expression --
            // e.g. `phase <expr> "code"`. Request a space so the two tokens do
            // not run together; this is a no-op when a space is already pending.
            LITERAL_STRING => {
                self.builder.space();
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
                // A `->` in a topology connection aligns into a shared column;
                // a port-return `->` (parent DEF_PORT) does not.
                let in_connection = token.parent().is_some_and(|p| p.kind() == CONNECTION);
                if in_connection {
                    self.builder.token_anchor(token.text(), AnchorKind::Arrow);
                } else {
                    self.builder.token(token.text());
                }
                self.builder.space();
            }

            // All other tokens (identifiers, literals, etc.)
            _ => {
                self.builder.token(token.text());
            }
        }
    }
}
