# FPP LSP Parser

This is the second of the two parsers in FPP. This parser's responsibility
is to provide a syntax tree (_not_ abstract syntax tree) that losslessly
represents the source text.

This implementation is based on Rust Analyzer's Rowan implementation which
implements a Red/Green Syntax tree. Much of the basic helper/builder code
is copied directly from the Rust Analyzer source. Nearly all the code in the
top level of the crate is directly from Rust Analyzer. The FPP parsing code
can be found in `src/grammar`.

The primary difference between this parser and the parser in `fpp_parser`
is that this parser simply groups tokens in syntactical nodes while the
`fpp_parser` extracts semantic meaning from the token stream. The semantic
meaning is lossy meaning you cannot recreate the original token stream
from the AST. This parser's grouping is lossless meaning the original
source text can be recreated. This makes it a good fit for operations
and transformations that operate on the source text rather than
language semantics.

This parser interfaces with the language server to provide semantic
highlighting, edits, formatting, auto-complete etc. It can also be
used standalone for formatting.
