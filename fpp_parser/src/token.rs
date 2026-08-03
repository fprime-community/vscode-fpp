use fpp_core::{BytePos, SourceFile, Span, Spanned};
use fpp_lexer::TokenKind;
use std::fmt::Debug;

#[derive(Debug)]
pub struct Token {
    pub kind: TokenKind,
    pub span: Span,
    pub text: Option<String>,
}

impl Token {
    pub fn new(
        kind: TokenKind,
        text: Option<String>,
        file: SourceFile,
        start: BytePos,
        length: BytePos,
        include_span: Option<Span>,
    ) -> Token {
        Token {
            kind,
            span: Span::new(file, start, length, include_span),
            text,
        }
    }

    pub fn kind(&self) -> TokenKind {
        self.kind
    }

    pub fn text(&self) -> &str {
        match self.text.as_ref() {
            None => "",
            Some(txt) => txt,
        }
    }
}

impl Spanned for Token {
    fn span(&self) -> Span {
        self.span
    }
}
