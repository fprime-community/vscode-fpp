use crate::TokenKind::*;
use crate::{KeywordKind, TokenKind};

use pretty_assertions::assert_eq;

#[derive(Debug, PartialEq)]
struct TokenStr<'a>(pub &'a str, pub TokenKind);

fn lex(content: &'_ str) -> Vec<TokenStr<'_>> {
    let mut out = Vec::new();
    let mut offset: usize = 0;
    for token in crate::Lexer::new(content) {
        out.push(TokenStr(&content[offset..(offset + token.len)], token.kind));
        offset += token.len;
    }

    out
}

#[test]
fn whitespace() {
    let tokens = lex("   ");
    assert_eq!(tokens, vec![TokenStr("   ", Whitespace)]);
}

#[test]
fn comment() {
    let tokens = lex(r#" # comment

    # more comments

    "#);
    assert_eq!(
        tokens,
        vec![
            TokenStr(" ", Whitespace),
            TokenStr("# comment", Comment),
            TokenStr("\n\n", Eol),
            TokenStr("    ", Whitespace),
            TokenStr("# more comments", Comment),
            TokenStr("\n\n", Eol),
            TokenStr("    ", Whitespace),
        ]
    );
}

#[test]
fn literals() {
    let tokens = lex(
        r#"12 1.23 0x10 0x1AEF 001 1e30 10.3e3 .3e3 "" "string \"" """
    a multiline literal string with \"\"\" some \escapes " "
    """ """""" "#,
    );
    assert_eq!(
        tokens,
        vec![
            TokenStr("12", LiteralInt),
            TokenStr(" ", Whitespace),
            TokenStr("1.23", LiteralFloat),
            TokenStr(" ", Whitespace),
            TokenStr("0x10", LiteralInt),
            TokenStr(" ", Whitespace),
            TokenStr("0x1AEF", LiteralInt),
            TokenStr(" ", Whitespace),
            TokenStr("001", LiteralInt),
            TokenStr(" ", Whitespace),
            TokenStr("1e30", LiteralFloat),
            TokenStr(" ", Whitespace),
            TokenStr("10.3e3", LiteralFloat),
            TokenStr(" ", Whitespace),
            TokenStr(".3e3", LiteralFloat),
            TokenStr(" ", Whitespace),
            TokenStr("\"\"", LiteralString),
            TokenStr(" ", Whitespace),
            TokenStr("\"string \\\"\"", LiteralString),
            TokenStr(" ", Whitespace),
            TokenStr(
                "\"\"\"\n    a multiline literal string with \\\"\\\"\\\" some \\escapes \" \"\n    \"\"\"",
                LiteralMultilineString { indent: 4 }
            ),
            TokenStr(" ", Whitespace),
            TokenStr("\"\"\"\"\"\"", LiteralMultilineString { indent: 0 }),
            TokenStr(" ", Whitespace),
        ]
    );
}

#[test]
fn annotations() {
    let tokens = lex(r#"@ Pre annotation
        Some Identifiers @< Post annotation"#);

    assert_eq!(
        tokens,
        vec![
            TokenStr("@ Pre annotation", PreAnnotation),
            TokenStr("\n", Eol),
            TokenStr("        ", Whitespace),
            TokenStr("Some", Identifier),
            TokenStr(" ", Whitespace),
            TokenStr("Identifiers", Identifier),
            TokenStr(" ", Whitespace),
            TokenStr("@< Post annotation", PostAnnotation),
        ]
    );
}

#[test]
fn identifiers_and_keywords() {
    let tokens = lex(r#"Ident _underscope_start with_numbers01_asd yellow $yellow action every"#);

    assert_eq!(
        tokens,
        vec![
            TokenStr("Ident", Identifier),
            TokenStr(" ", Whitespace),
            TokenStr("_underscope_start", Identifier),
            TokenStr(" ", Whitespace),
            TokenStr("with_numbers01_asd", Identifier),
            TokenStr(" ", Whitespace),
            TokenStr("yellow", Keyword(KeywordKind::Yellow)),
            TokenStr(" ", Whitespace),
            TokenStr("$yellow", Identifier),
            TokenStr(" ", Whitespace),
            TokenStr("action", Keyword(KeywordKind::Action)),
            TokenStr(" ", Whitespace),
            TokenStr("every", Keyword(KeywordKind::Every)),
        ]
    );
}

// #[test]
// fn escape_newline() {
//     let tokens = lex(r#"escaped \
//     newline"#);
//     assert_eq!(tokens.len(), 2);
//     let mut idx = Index(0);
//     assert_token_eq(&tokens[idx.next()], Identifier, "escaped");
//     assert_token_eq(&tokens[idx.next()], Identifier, "newline");
// }

#[test]
fn invalid_tokens() {
    let tokens = lex(r#"1ee 	 $ ™™ 1e1e "
    ""#);
    assert_eq!(
        tokens,
        vec![
            TokenStr("1ee", LiteralFloat),
            TokenStr(" ", Whitespace),
            TokenStr("	", Unknown),
            TokenStr(" ", Whitespace),
            TokenStr("$", Unknown),
            TokenStr(" ", Whitespace),
            TokenStr("™™", Unknown),
            TokenStr(" ", Whitespace),
            TokenStr("1e1e", LiteralFloat),
            TokenStr(" ", Whitespace),
            TokenStr("\"", LiteralString),
            TokenStr("\n", Eol),
            TokenStr("    ", Whitespace),
            TokenStr("\"", LiteralString),
        ]
    );
}

// #[test]
// fn escape_newline_error() {
//     let tokens = lex(r#"escaped \hello
//     newline"#);
//     assert_eq!(tokens.len(), 2);
//     let mut idx = Index(0);
//     assert_token_eq(&tokens[idx.next()], Identifier, "escaped");
//     // assert_token_eq(
//     //     &tokens[idx.next()],
//     //     Error("Non whitespace character illegal after line continuation"),
//     //     "",
//     // );
//     assert_token_eq(&tokens[idx.next()], Identifier, "newline");
// }

// #[test]
// fn symbols() {
//     let tokens = lex(r#": . ,

//         = ()

//         ) {}

//         } []

//         ] -> - + ; / *

//         1

//         )1

//         }1

//         ]"#);

//     assert_eq!(tokens.len(), 25);
//     let mut idx = Index(0);
//     assert_token_eq(&tokens[idx.next()], Colon, "");
//     assert_token_eq(&tokens[idx.next()], Dot, "");
//     assert_token_eq(&tokens[idx.next()], Comma, "");
//     assert_token_eq(&tokens[idx.next()], Equals, "");
//     assert_token_eq(&tokens[idx.next()], LeftParen, "");
//     assert_token_eq(&tokens[idx.next()], RightParen, "");
//     assert_token_eq(&tokens[idx.next()], RightParen, "");
//     assert_token_eq(&tokens[idx.next()], LeftCurly, "");
//     assert_token_eq(&tokens[idx.next()], RightCurly, "");
//     assert_token_eq(&tokens[idx.next()], RightCurly, "");
//     assert_token_eq(&tokens[idx.next()], LeftSquare, "");
//     assert_token_eq(&tokens[idx.next()], RightSquare, "");
//     assert_token_eq(&tokens[idx.next()], RightSquare, "");
//     assert_token_eq(&tokens[idx.next()], RightArrow, "");
//     assert_token_eq(&tokens[idx.next()], Minus, "");
//     assert_token_eq(&tokens[idx.next()], Plus, "");
//     assert_token_eq(&tokens[idx.next()], Semi, "");
//     assert_token_eq(&tokens[idx.next()], Slash, "");
//     assert_token_eq(&tokens[idx.next()], Star, "");
//     assert_token_eq(&tokens[idx.next()], LiteralInt, "1");
//     assert_token_eq(&tokens[idx.next()], RightParen, "");
//     assert_token_eq(&tokens[idx.next()], LiteralInt, "1");
//     assert_token_eq(&tokens[idx.next()], RightCurly, "");
//     assert_token_eq(&tokens[idx.next()], LiteralInt, "1");
//     assert_token_eq(&tokens[idx.next()], RightSquare, "");
// }
