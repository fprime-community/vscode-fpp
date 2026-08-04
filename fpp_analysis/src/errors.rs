use crate::semantics::TypeConversionError;
use fpp_core::{Diagnostic, Level, Span};

#[derive(Debug)]
pub struct SymbolUse {
    pub def_loc: Span,
    pub use_loc: Span,
}

#[derive(Debug)]
pub enum SemanticError {
    RedefinedSymbol {
        /// Name of the symbol being redefined
        name: String,
        /// Location of the duplicate symbol
        loc: Span,
        /// Location of the previous symbol that is clashing
        prev_loc: Span,
    },
    UndefinedSymbol {
        ng: String,
        name: String,
        loc: Span,
    },
    UseDefCycle {
        loc: Span,
        cycle: Vec<SymbolUse>,
    },
    InvalidSymbol {
        symbol_name: String,
        msg: String,
        loc: Span,
        def_loc: Span,
    },
    InvalidType {
        loc: Span,
        msg: String,
    },
    DuplicateStructMember {
        name: String,
        loc: Span,
        prev_loc: Span,
    },
    TypeConversion {
        loc: Span,
        msg: String,
        err: Box<TypeConversionError>,
    },
    EmptyArray {
        loc: Span,
    },
    EnumConstantShouldBeImplied {
        loc: Span,
    },
    EnumConstantShouldBeExplicit {
        loc: Span,
    },
    DuplicateEnumConstant {
        value: i128,
        loc: Span,
        prev_loc: Span,
    },
    InvalidIntValue {
        loc: Span,
        v: Option<i128>,
        msg: String,
    },
    DivisionByZero {
        loc: Span,
    },
    InvalidShiftAmount {
        loc: Span,
    },
    InvalidTypeForMemberSelection {
        loc: Span,
        member: String,
        type_name: String,
    },
    FormatStringMismatchLength {
        format_locs: Vec<Span>,
        type_locs: Vec<Span>,
    },
    FormatStringInvalidReplacement {
        format_loc: Span,
        type_loc: Span,
        msg: String,
    },
    FormatStringInvalidPrecision {
        loc: Span,
        value: i32,
        max: i32,
    },
    ArrayDefaultMismatchedSize {
        loc: Span,
        size_loc: Span,
        value_size: usize,
        type_size: i128,
    },
}

pub type SemanticResult<T = ()> = Result<T, SemanticError>;

impl SemanticError {
    pub fn emit(self) {
        Into::<Diagnostic>::into(self).emit();
    }
}

impl From<SemanticError> for Diagnostic {
    fn from(val: SemanticError) -> Self {
        match val {
            SemanticError::RedefinedSymbol {
                name,
                loc,
                prev_loc,
            } => Diagnostic::new(
                loc,
                Level::Error,
                format!("redefinition of symbol {}", name),
            )
            .span_note(prev_loc, "previous definition is here"),
            SemanticError::UndefinedSymbol { ng, name, loc } => Diagnostic::new(
                loc,
                Level::Error,
                format!("cannot find {} `{}` in scope", ng, name),
            ),
            SemanticError::InvalidSymbol {
                symbol_name,
                msg,
                loc,
                def_loc,
            } => Diagnostic::new(loc, Level::Error, msg)
                .span_note(def_loc, format!("{} defined here", symbol_name)),
            SemanticError::UseDefCycle { loc, cycle } => cycle.iter().enumerate().fold(
                Diagnostic::new(loc, Level::Error, "encountered symbol use-definition cycle"),
                |out, (i, suse)| match i {
                    0 => out.span_note(suse.def_loc, "defined here"),
                    _ if i == cycle.len() - 1 => out.span_note(suse.use_loc, "used here"),
                    _ => out
                        .span_note(suse.use_loc, "used here")
                        .span_note(suse.def_loc, "defined here"),
                },
            ),
            SemanticError::InvalidType { loc, msg } => Diagnostic::new(loc, Level::Error, msg),
            SemanticError::DuplicateStructMember {
                name,
                loc,
                prev_loc,
            } => Diagnostic::new(
                loc,
                Level::Error,
                format!("duplicate struct member `{}`", name),
            )
            .span_note(prev_loc, "previously defined here"),
            SemanticError::TypeConversion { loc, msg, err } => {
                err.annotate(Diagnostic::new(loc, Level::Error, msg))
            }
            SemanticError::EmptyArray { loc } => {
                Diagnostic::new(loc, Level::Error, "array expression may not be empty")
            }
            SemanticError::EnumConstantShouldBeImplied { loc } => {
                Diagnostic::new(loc, Level::Error, "expected constant value to be implied")
                    .note("enum constants must be all explicit or all implied")
            }
            SemanticError::EnumConstantShouldBeExplicit { loc } => {
                Diagnostic::new(loc, Level::Error, "expected constant value to be explicit")
                    .note("enum constants must be all explicit or all implied")
            }
            SemanticError::DuplicateEnumConstant {
                value,
                loc,
                prev_loc,
            } => Diagnostic::new(
                loc,
                Level::Error,
                format!("duplicate enum constant `{}`", value),
            )
            .span_note(prev_loc, "previously defined here"),
            SemanticError::InvalidIntValue { loc, v, msg } => {
                let diag = Diagnostic::new(loc, Level::Error, msg);
                match v {
                    None => diag,
                    Some(v) => diag.note(format!("expression evaluated to `{}`", v)),
                }
            }
            SemanticError::DivisionByZero { loc } => {
                Diagnostic::new(loc, Level::Error, "division by zero")
            }
            SemanticError::InvalidShiftAmount { loc } => {
                Diagnostic::new(loc, Level::Error, "invalid shift amount").note(
                    "shift amount must be a non-negative value that must be in the range [0,255]",
                )
            }
            SemanticError::InvalidTypeForMemberSelection {
                loc,
                member,
                type_name,
            } => Diagnostic::new(
                loc,
                Level::Error,
                format!("{} has no member `{}`", type_name, member),
            ),
            SemanticError::FormatStringMismatchLength {
                format_locs,
                type_locs,
            } => {
                if format_locs.len() < type_locs.len() {
                    let diag = Diagnostic::new(
                        type_locs[format_locs.len()],
                        Level::Error,
                        "missing format replacement field",
                    );
                    type_locs[format_locs.len() + 1..]
                        .iter()
                        .fold(diag, |diag, loc| {
                            diag.span_note(*loc, "missing format replacement field")
                        })
                } else {
                    let diag = Diagnostic::new(
                        format_locs[type_locs.len()],
                        Level::Error,
                        "extraneous format replacement field",
                    );
                    format_locs[type_locs.len() + 1..]
                        .iter()
                        .fold(diag, |diag, loc| {
                            diag.span_annotation(*loc, "extraneous format replacement field")
                        })
                }
            }
            SemanticError::FormatStringInvalidReplacement {
                format_loc,
                type_loc,
                msg,
            } => Diagnostic::new(format_loc, Level::Error, msg)
                .span_note(type_loc, "type defined here"),
            SemanticError::FormatStringInvalidPrecision { loc, value, max } => Diagnostic::new(
                loc,
                Level::Error,
                format!(
                    "precision value `{}` is larger than the maximum ({})",
                    value, max
                ),
            ),
            SemanticError::ArrayDefaultMismatchedSize {
                loc,
                size_loc,
                value_size,
                type_size,
            } => Diagnostic::new(
                loc,
                Level::Error,
                "cannot convert value to array type due to mismatched sizes",
            )
            .note(format!("value size `{}`", value_size))
            .span_note(size_loc, format!("array size `{}`", type_size)),
        }
    }
}
