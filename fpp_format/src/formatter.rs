use crate::builder::FormatBuilder;
use crate::FormatOptions;
use fpp_lsp_parser::{SyntaxElement, SyntaxKind, SyntaxNode, SyntaxToken, WalkEvent};

/// Main formatter that walks the syntax tree and produces formatted output
pub struct Formatter {
    builder: FormatBuilder,
    options: FormatOptions,
}

impl Formatter {
    /// Create a new formatter with the given options
    pub fn new(options: FormatOptions) -> Self {
        Self {
            builder: FormatBuilder::new(options.indent_width),
            options,
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
            // Module definition - add blank line before if not first
            DEF_MODULE => {
                if !self.builder.is_at_line_start() {
                    self.builder.blank_line();
                }
            }

            // Member lists need indentation
            MODULE_MEMBER_LIST
            | COMPONENT_MEMBER_LIST
            | INTERFACE_MEMBER_LIST
            | STRUCT_MEMBER_LIST
            | ENUM_MEMBER_LIST
            | STATE_MACHINE_MEMBER_LIST
            | STATE_MEMBER_LIST
            | TOPOLOGY_MEMBER_LIST => {
                self.builder.newline();
                self.builder.indent();
            }

            // Definitions inside member lists
            DEF_CONSTANT
            | DEF_ABSTRACT_TYPE
            | DEF_ALIAS_TYPE
            | DEF_ARRAY
            | DEF_STRUCT
            | DEF_ENUM
            | DEF_COMPONENT
            | DEF_PORT
            | DEF_INTERFACE
            | DEF_STATE_MACHINE => {
                // Add newline before definition if we're not at line start
                if !self.builder.is_at_line_start() {
                    self.builder.newline();
                }
            }

            // Spec items also need newlines
            spec if spec.is_spec() => {
                if !self.builder.is_at_line_start() {
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

    /// Handle leaving a node
    fn leave_node(&mut self, node: &SyntaxNode) {
        use SyntaxKind::*;

        match node.kind() {
            // Member lists need dedentation
            MODULE_MEMBER_LIST
            | COMPONENT_MEMBER_LIST
            | INTERFACE_MEMBER_LIST
            | STRUCT_MEMBER_LIST
            | ENUM_MEMBER_LIST
            | STATE_MACHINE_MEMBER_LIST
            | STATE_MEMBER_LIST
            | TOPOLOGY_MEMBER_LIST => {
                self.builder.dedent();
            }

            // After binary operator, add space
            BINARY_OP => {
                self.builder.space();
            }

            _ => {}
        }
    }

    /// Handle a token
    fn handle_token(&mut self, token: &SyntaxToken) {
        use SyntaxKind::*;

        match token.kind() {
            // Skip whitespace and EOL - we regenerate them
            WHITESPACE | EOL => {}

            // Preserve comments with proper indentation
            COMMENT => {
                // Ensure we're on a new line for standalone comments
                // or have a space for inline comments
                if self.builder.is_at_line_start() {
                    // Standalone comment - will get indented
                    self.builder.token(token.text());
                } else {
                    // Inline comment - add space before
                    self.builder.space();
                    self.builder.token(token.text());
                }
            }

            // Preserve annotations - they should be on their own line
            PRE_ANNOTATION | POST_ANNOTATION => {
                if !self.builder.is_at_line_start() {
                    self.builder.newline();
                }
                self.builder.token(token.text());
                self.builder.newline();
            }

            // Keywords - add space after
            keyword if keyword.is_keyword() => {
                self.builder.token(token.text());
                self.builder.space();
            }

            // Opening braces - space before, newline after
            LEFT_CURLY => {
                self.builder.space();
                self.builder.token(token.text());
                self.builder.newline();
            }

            // Closing braces - newline before if needed, newline after
            RIGHT_CURLY => {
                if !self.builder.is_at_line_start() {
                    self.builder.newline();
                }
                self.builder.token(token.text());
                self.builder.newline();
            }

            // Operators that need space around them
            EQUALS | COLON => {
                self.builder.space();
                self.builder.token(token.text());
                self.builder.space();
            }

            // Operators from BINARY_OP node (space added by node handlers)
            PLUS | MINUS | STAR | SLASH => {
                self.builder.token(token.text());
            }

            // Comma - no space before, space after
            COMMA => {
                self.builder.token(token.text());
                self.builder.space();
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

            // Closing brackets/parens - no space before
            RIGHT_PAREN | RIGHT_SQUARE => {
                self.builder.token(token.text());
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
