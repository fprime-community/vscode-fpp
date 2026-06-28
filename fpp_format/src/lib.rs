mod builder;
mod formatter;

use std::path::Path;
use std::{fs, io};

pub use fpp_lsp_parser::SyntaxError;
use fpp_lsp_parser::{parse, TopEntryPoint};

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
            indent_width: 2,
            max_line_width: 100,
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
}
