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
    InvalidQualifier {
        loc: Span,
        msg: String,
        def_loc: Span,
        def_msg: String,
    },
    DuplicateStructMember {
        name: String,
        loc: Span,
        prev_loc: Span,
    },
    DuplicateParameter {
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
    InvalidArraySize {
        loc: Span,
        size: i128,
    },
    InvalidPriority {
        loc: Span,
    },
    InvalidQueueFull {
        loc: Span,
    },
    InvalidSpecialPort {
        loc: Span,
        msg: String,
    },
    InvalidPortInstance {
        loc: Span,
        msg: String,
        def_loc: Span,
    },
    DuplicateInterface {
        name: String,
        loc: Span,
        prev_loc: Span,
    },
    DuplicatePortInstance {
        name: String,
        loc: Span,
        import_locs: Vec<Span>,
        prev_loc: Span,
        prev_import_locs: Vec<Span>,
    },
    InterfaceImport {
        loc: Span,
        inner: Box<SemanticError>,
    },
    PassiveAsync {
        loc: Span,
        import_locs: Vec<Span>,
    },
    DuplicateOpcodeValue {
        value: String,
        loc: Span,
        prev_loc: Span,
    },
    DuplicateIdValue {
        value: String,
        loc: Span,
        prev_loc: Span,
    },
    DuplicateStateMachineInstance {
        name: String,
        loc: Span,
        prev_loc: Span,
    },
    DuplicateLimit {
        loc: Span,
        prev_loc: Span,
    },
    DuplicateDictionaryName {
        kind: String,
        name: String,
        loc: Span,
        prev_loc: Span,
    },
    DuplicateInitSpecifier {
        phase: i128,
        loc: Span,
        prev_loc: Span,
    },
    MissingPort {
        loc: Span,
        spec_msg: String,
        port_msg: String,
    },
    MissingAsync {
        kind: String,
        loc: Span,
    },
    PassiveStateMachine {
        loc: Span,
    },
    InvalidDataProducts {
        loc: Span,
        msg: String,
    },
    InvalidCommand {
        loc: Span,
        msg: String,
    },
    InvalidEvent {
        loc: Span,
        msg: String,
    },
    InvalidInternalPort {
        loc: Span,
        msg: String,
    },
    InvalidPortMatching {
        loc: Span,
        msg: String,
    },
    InvalidTlmChannelName {
        loc: Span,
        name: String,
        component_name: String,
    },
    InvalidDefComponentInstance {
        name: String,
        loc: Span,
        msg: String,
    },
    OverlappingIdRanges {
        base_id1: i128,
        name1: String,
        loc1: Span,
        base_id2: i128,
        max_id2: i128,
        name2: String,
        loc2: Span,
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
            SemanticError::InvalidQualifier {
                loc,
                msg,
                def_loc,
                def_msg,
            } => Diagnostic::new(loc, Level::Error, msg).span_note(def_loc, def_msg),
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
            SemanticError::DuplicateParameter {
                name,
                loc,
                prev_loc,
            } => Diagnostic::new(loc, Level::Error, format!("duplicate parameter `{}`", name))
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
            SemanticError::InvalidArraySize { loc, size } => Diagnostic::new(
                loc,
                Level::Error,
                format!("invalid array size {}", size),
            ),
            SemanticError::InvalidPriority { loc } => Diagnostic::new(
                loc,
                Level::Error,
                "only async input may have a priority",
            ),
            SemanticError::InvalidQueueFull { loc } => Diagnostic::new(
                loc,
                Level::Error,
                "only async input may have queue full behavior",
            ),
            SemanticError::InvalidSpecialPort { loc, msg } => {
                Diagnostic::new(loc, Level::Error, msg)
            }
            SemanticError::InvalidPortInstance { loc, msg, def_loc } => {
                Diagnostic::new(loc, Level::Error, msg).span_note(def_loc, "defined here")
            }
            SemanticError::DuplicateInterface {
                name,
                loc,
                prev_loc,
            } => Diagnostic::new(loc, Level::Error, format!("duplicate interface {}", name))
                .span_note(prev_loc, "previous occurrence is here"),
            SemanticError::DuplicatePortInstance {
                name,
                loc,
                import_locs,
                prev_loc,
                prev_import_locs,
            } => {
                let diag = Diagnostic::new(
                    loc,
                    Level::Error,
                    format!("duplicate port instance {}", name),
                );
                let diag = import_locs
                    .iter()
                    .fold(diag, |diag, l| diag.span_note(*l, "port imported from here"));
                let diag = diag.span_note(prev_loc, "previous instance is here");
                prev_import_locs
                    .iter()
                    .fold(diag, |diag, l| diag.span_note(*l, "port imported from here"))
            }
            SemanticError::InterfaceImport { loc, inner } => {
                let diag: Diagnostic = (*inner).into();
                diag.span_note(loc, "failed to import interface here")
            }
            SemanticError::PassiveAsync { loc, import_locs } => {
                let diag = Diagnostic::new(
                    loc,
                    Level::Error,
                    "passive component may not have async input",
                );
                import_locs.iter().fold(diag, |diag, l| {
                    diag.span_note(*l, "port instance was imported from here")
                })
            }
            SemanticError::DuplicateOpcodeValue {
                value,
                loc,
                prev_loc,
            } => Diagnostic::new(
                loc,
                Level::Error,
                format!("duplicate opcode value {}", value),
            )
            .span_note(prev_loc, "previous occurrence is here"),
            SemanticError::DuplicateIdValue {
                value,
                loc,
                prev_loc,
            } => Diagnostic::new(
                loc,
                Level::Error,
                format!("duplicate identifier value {}", value),
            )
            .span_note(prev_loc, "previous occurrence is here"),
            SemanticError::DuplicateStateMachineInstance {
                name,
                loc,
                prev_loc,
            } => Diagnostic::new(
                loc,
                Level::Error,
                format!("duplicate state machine instance {}", name),
            )
            .span_note(prev_loc, "previous occurrence is here"),
            SemanticError::DuplicateLimit { loc, prev_loc } => {
                Diagnostic::new(loc, Level::Error, "duplicate limit")
                    .span_note(prev_loc, "previous occurrence is here")
            }
            SemanticError::DuplicateDictionaryName {
                kind,
                name,
                loc,
                prev_loc,
            } => Diagnostic::new(
                loc,
                Level::Error,
                format!("duplicate {} name {}", kind, name),
            )
            .span_note(prev_loc, "previous occurrence is here"),
            SemanticError::DuplicateInitSpecifier {
                phase,
                loc,
                prev_loc,
            } => Diagnostic::new(
                loc,
                Level::Error,
                format!("duplicate init specifier for phase {}", phase),
            )
            .span_note(prev_loc, "previous occurrence is here"),
            SemanticError::MissingPort {
                loc,
                spec_msg,
                port_msg,
            } => Diagnostic::new(
                loc,
                Level::Error,
                format!("component with {} must have {}", spec_msg, port_msg),
            ),
            SemanticError::MissingAsync { kind, loc } => Diagnostic::new(
                loc,
                Level::Error,
                format!("{} component must have async input", kind),
            ),
            SemanticError::PassiveStateMachine { loc } => Diagnostic::new(
                loc,
                Level::Error,
                "passive component may not have state machine instances",
            ),
            SemanticError::InvalidDataProducts { loc, msg } => {
                Diagnostic::new(loc, Level::Error, msg)
            }
            SemanticError::InvalidCommand { loc, msg } => Diagnostic::new(loc, Level::Error, msg),
            SemanticError::InvalidEvent { loc, msg } => Diagnostic::new(loc, Level::Error, msg),
            SemanticError::InvalidInternalPort { loc, msg } => {
                Diagnostic::new(loc, Level::Error, msg)
            }
            SemanticError::InvalidPortMatching { loc, msg } => {
                Diagnostic::new(loc, Level::Error, msg)
            }
            SemanticError::InvalidTlmChannelName {
                loc,
                name,
                component_name,
            } => Diagnostic::new(
                loc,
                Level::Error,
                format!(
                    "{} is not a telemetry channel of component {}",
                    name, component_name
                ),
            ),
            SemanticError::InvalidDefComponentInstance { name, loc, msg } => {
                Diagnostic::new(loc, Level::Error, format!("invalid instance {}: {}", name, msg))
            }
            SemanticError::OverlappingIdRanges {
                base_id1,
                name1,
                loc1,
                base_id2,
                max_id2,
                name2,
                loc2,
            } => Diagnostic::new(
                loc1,
                Level::Error,
                format!(
                    "base id {} of instance {} is in the id range [{}, {}] of instance {}",
                    base_id1, name1, base_id2, max_id2, name2
                ),
            )
            .span_note(loc2, "conflicting instance is here"),
        }
    }
}
