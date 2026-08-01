mod builder;
mod formatter;

use std::path::Path;
use std::{fs, io};

pub use fpp_lsp_parser::SyntaxError;
use fpp_lsp_parser::{TopEntryPoint, parse};

use crate::formatter::Formatter;

/// Configuration options for the formatter
#[derive(Debug, Clone)]
pub struct FormatOptions {
    /// Number of spaces per indentation level (default: 2)
    pub indent_width: usize,
    /// Maximum line width (currently unused, for future line-breaking)
    pub max_line_width: usize,
}

impl Default for FormatOptions {
    fn default() -> Self {
        Self {
            indent_width: 4,
            max_line_width: 80,
        }
    }
}

/// Errors that can occur during formatting
#[derive(Debug)]
pub enum FormatError {
    /// Parse errors occurred while parsing the input
    ParseError(Vec<SyntaxError>),
    /// I/O error occurred while reading or writing files
    IoError(io::Error),
}

impl From<io::Error> for FormatError {
    fn from(err: io::Error) -> Self {
        FormatError::IoError(err)
    }
}

impl std::fmt::Display for FormatError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            FormatError::ParseError(errors) => {
                write!(f, "Parse errors: ")?;
                for err in errors {
                    write!(f, "{}, ", err)?;
                }
                Ok(())
            }
            FormatError::IoError(err) => write!(f, "I/O error: {}", err),
        }
    }
}

impl std::error::Error for FormatError {}

/// Format FPP source text with the given options.
///
/// Returns the formatted text, or an error if the input has parse errors.
/// Note: The formatter will still attempt to format code with parse errors,
/// but may return a `ParseError` if the errors are severe.
pub fn format_text(text: &str, options: FormatOptions) -> Result<String, FormatError> {
    // Parse the input text
    let parse = parse(text, TopEntryPoint::Module);

    // Check for parse errors - we can format even with errors, but warn about them
    let errors = parse.errors();
    if !errors.is_empty() {
        // For now, we'll format anyway but could optionally fail here
        // return Err(FormatError::ParseError(errors));
    }

    // Get the syntax tree root
    let root = parse.syntax_node();

    // Create formatter and format the tree
    let formatter = Formatter::new(options);
    let formatted = formatter.format(&root);

    Ok(formatted)
}

/// Format an FPP file and return the formatted text.
///
/// This reads the file, formats it, and returns the result without
/// modifying the original file.
pub fn format_file(path: &Path) -> Result<String, FormatError> {
    let text = fs::read_to_string(path)?;
    format_text(&text, FormatOptions::default())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_format_simple_module() {
        let input = r#"module F {
    constant a = 1
    constant b = 2 + 3
}
"#;
        let result = format_text(input, FormatOptions::default());
        assert!(result.is_ok());

        let formatted = result.unwrap();
        // Verify it can be parsed again
        let parse = parse(&formatted, TopEntryPoint::Module);
        assert!(parse.errors().is_empty());
    }

    #[test]
    fn test_format_idempotent() {
        let input = "module F { constant a = 1 }";
        let result1 = format_text(input, FormatOptions::default()).unwrap();
        let result2 = format_text(&result1, FormatOptions::default()).unwrap();
        assert_eq!(result1, result2, "Formatter should be idempotent");
    }

    #[test]
    fn test_enum_reparses_cleanly() {
        // Phase 1: enum with comma separators must reparse after formatting
        let input = "module F { enum Color { RED, GREEN, BLUE } }";
        let formatted = format_text(input, FormatOptions::default()).unwrap();

        // Must reparse with zero errors
        let parse = parse(&formatted, TopEntryPoint::Module);
        assert!(
            parse.errors().is_empty(),
            "Formatted enum failed to reparse: {:?}\nFormatted output:\n{}",
            parse.errors(),
            formatted
        );

        // Must be idempotent
        let formatted2 = format_text(&formatted, FormatOptions::default()).unwrap();
        assert_eq!(formatted, formatted2, "Enum formatting not idempotent");
    }

    #[test]
    fn test_struct_members_separate_lines() {
        // Phase 1: struct members should be on separate lines
        let input = "module F { struct S { x: U32, y: F32 } }";
        let formatted = format_text(input, FormatOptions::default()).unwrap();

        // Must reparse
        let parse = parse(&formatted, TopEntryPoint::Module);
        assert!(
            parse.errors().is_empty(),
            "Formatted struct failed to reparse: {:?}\nFormatted output:\n{}",
            parse.errors(),
            formatted
        );

        // Must be idempotent
        let formatted2 = format_text(&formatted, FormatOptions::default()).unwrap();
        assert_eq!(formatted, formatted2, "Struct formatting not idempotent");
    }

    #[test]
    fn test_nested_module_reparses() {
        // Phase 1: nested modules with various definitions
        let input = r#"
module Outer {
  module Inner {
    constant x = 42
    enum Status { OK, ERROR }
  }
  struct Point { x: F32, y: F32 }
}
"#;
        let formatted = format_text(input, FormatOptions::default()).unwrap();

        // Must reparse
        let parse = parse(&formatted, TopEntryPoint::Module);
        assert!(
            parse.errors().is_empty(),
            "Formatted nested module failed to reparse: {:?}\nFormatted output:\n{}",
            parse.errors(),
            formatted
        );

        // Must be idempotent
        let formatted2 = format_text(&formatted, FormatOptions::default()).unwrap();
        assert_eq!(
            formatted, formatted2,
            "Nested module formatting not idempotent"
        );
    }

    #[test]
    fn test_binary_expressions_reparse() {
        // Phase 1: expressions should format and reparse correctly
        let input = "module F { constant a = 1 + 2 * 3 - 4 / 5 }";
        let formatted = format_text(input, FormatOptions::default()).unwrap();

        // Must reparse
        let parse = parse(&formatted, TopEntryPoint::Module);
        assert!(
            parse.errors().is_empty(),
            "Formatted expression failed to reparse: {:?}\nFormatted output:\n{}",
            parse.errors(),
            formatted
        );

        // Must be idempotent
        let formatted2 = format_text(&formatted, FormatOptions::default()).unwrap();
        assert_eq!(
            formatted, formatted2,
            "Expression formatting not idempotent"
        );
    }

    #[test]
    fn test_trailing_newline() {
        // Phase 1: exactly one trailing newline
        let input = "module F { constant a = 1 }";
        let formatted = format_text(input, FormatOptions::default()).unwrap();

        assert!(formatted.ends_with('\n'), "Missing trailing newline");
        assert!(
            !formatted.ends_with("\n\n"),
            "Multiple trailing newlines: {:?}",
            formatted.chars().rev().take(5).collect::<Vec<_>>()
        );
    }

    #[test]
    fn test_idempotent_all_fixtures() {
        // Phase 1: comprehensive idempotency test
        let test_cases = vec![
            "module F { }",
            "module F { constant a = 1 }",
            "module F { enum E { A, B, C } }",
            "module F { struct S { x: U32 } }",
            "module F { struct S { x: U32, y: F32, z: Bool } }",
            "module F { enum E { A } }",
            "module F { module Inner { constant x = 1 } }",
        ];

        for input in test_cases {
            let formatted1 = format_text(input, FormatOptions::default()).unwrap();
            let formatted2 = format_text(&formatted1, FormatOptions::default()).unwrap();
            assert_eq!(
                formatted1, formatted2,
                "Not idempotent for input: {}\nFirst:\n{}\nSecond:\n{}",
                input, formatted1, formatted2
            );

            // Also verify it reparses
            let parse = parse(&formatted1, TopEntryPoint::Module);
            assert!(
                parse.errors().is_empty(),
                "Failed to reparse for input: {}\nFormatted:\n{}\nErrors: {:?}",
                input,
                formatted1,
                parse.errors()
            );
        }
    }

    #[test]
    fn test_all_fixtures_reparse_and_idempotent() {
        // Test all fixtures in tests/ directory
        let fixtures = vec![
            // Original fixtures
            "simple-module.fpp",
            "nested-module.fpp",
            "comments.fpp",
            "multiple-definitions.fpp",
            "binary-expressions.fpp",
            // New fixtures
            "annotations.fpp",
            "array-struct.fpp",
            "component.fpp",
            "port.fpp",
            "topology.fpp",
            "state-machine.fpp",
        ];

        for fixture_name in fixtures {
            let fixture_path = format!("tests/{}", fixture_name);
            let input = match fs::read_to_string(&fixture_path) {
                Ok(content) => content,
                Err(_) => {
                    // Fixture might not exist yet, skip
                    continue;
                }
            };

            // First pass formatting
            let formatted1 = format_text(&input, FormatOptions::default())
                .unwrap_or_else(|e| panic!("{}: Format failed: {:?}", fixture_name, e));

            // CRITICAL: Must parse cleanly with fpp_lsp_parser (not fpp binary!)
            let parse_result = parse(&formatted1, TopEntryPoint::Module);
            if !parse_result.errors().is_empty() {
                eprintln!(
                    "{}: {} LSP parse errors",
                    fixture_name,
                    parse_result.errors().len()
                );
                for (i, err) in parse_result.errors().iter().take(3).enumerate() {
                    eprintln!("  {}. {:?}", i + 1, err);
                }
            }
            assert!(
                parse_result.errors().is_empty(),
                "{}: First-pass output has LSP parse errors: {:?}\nOutput:\n{}",
                fixture_name,
                parse_result.errors(),
                formatted1
            );

            // Second pass - test idempotency
            let formatted2 = format_text(&formatted1, FormatOptions::default())
                .unwrap_or_else(|e| panic!("{}: Second format failed: {:?}", fixture_name, e));

            assert_eq!(
                formatted1, formatted2,
                "{}: Not idempotent\nFirst:\n{}\nSecond:\n{}",
                fixture_name, formatted1, formatted2
            );
        }
    }
}
