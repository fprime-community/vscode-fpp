# FPP Parser

This is one of the two parsers in FPP. This parser is responsible to
generating the abstract syntax tree (AST) in the `fpp_ast` crate.

The other parser lives in `fpp_lsp_parser` and is primarily meant to
build the syntax tree for language servers.

There are two parsing layers to this package. `cursor` and `parser`.

## Cursor

The cursor layer is a thin wrapper around the raw `fpp_lexer` which
pulls token out of the lexer and manages lookaheads. Because the
parser supports an arbitrary number of lookaheads, the tokens need
to be buffered in place before they can be consumed by the parser.

The cursor is also responsible for filtering out tokens that are not
relevant for parsing the AST such as whitespace and comments.

## Parser

The parser layer is where the full parser is written. It is a
handwritten recursive decent parser. Each rule will generate an AST
node which tracks its span (start/end position in the file). Spans are
inserted into the compiler context and the AST holds a Span ID given
back to us from the compiler context. Parsing rules should keep track of
their first node/span and once the node is parsed, call
`self.node(first.span)` to receive a node id from the compiler context.

The parser is partially error resistant. The error recovery in this
parser will skip ahead to anchor tokens to begin reparsing grammars.
Anchor tokens are list delimiters and end of list tokens which allow
the parser to drop the current rule and move to another potential start
of the grammar rule.

The purpose of this parser is to generate a correct AST. At syntax
errors, the parser is meant to do something reasonable while maintaining
as much as possible. Information/tokens that cannot be parsed into
nodes will be dropped. AST are passed to the FPP analyzer for semantic
analysis and ultimately code generation.
