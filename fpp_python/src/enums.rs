//! Python-enum mirrors of the `fpp_analysis` semantic enums that have no
//! `fpp_ast` leaf-enum equivalent (the AST leaves are mirrored in `crate::ast`
//! by the `fpp_ast_bindings!` macro and reused directly).
//!
//! Each is a fieldless `#[pyclass(eq, eq_int)]` enum (rendered as a Python
//! `enum.Enum` by `pyo3-stub-gen`) plus a `From<&native>` that maps the native
//! variant onto it; any variant payload is carried by dedicated getters on the
//! wrapper, so the enum only reflects the discriminant.

use fpp_analysis::semantics::state_machine::Kind as SmKind;
use fpp_analysis::semantics::{
    CommandKind as SemCommandKind, Direction as SemDirection, GeneralKind as SemGeneralKind,
};
use pyo3::prelude::*;
use pyo3_stub_gen::derive::gen_stub_pyclass_enum;

/// Port direction.
#[gen_stub_pyclass_enum]
#[pyclass(eq, eq_int, frozen, hash)]
#[derive(Clone, Copy, PartialEq, Eq, Hash)]
pub enum Direction {
    Input,
    Output,
}

impl From<&SemDirection> for Direction {
    fn from(d: &SemDirection) -> Self {
        match d {
            SemDirection::Input => Direction::Input,
            SemDirection::Output => Direction::Output,
        }
    }
}

/// Kind of a general port instance (priority/queue-full detail, when present, is
/// exposed by `GeneralPortInstance.priority` / `.queue_full`).
#[gen_stub_pyclass_enum]
#[pyclass(eq, eq_int, frozen, hash)]
#[derive(Clone, Copy, PartialEq, Eq, Hash)]
pub enum GeneralKind {
    AsyncInput,
    GuardedInput,
    Output,
    SyncInput,
}

impl From<&SemGeneralKind> for GeneralKind {
    fn from(k: &SemGeneralKind) -> Self {
        match k {
            SemGeneralKind::AsyncInput { .. } => GeneralKind::AsyncInput,
            SemGeneralKind::GuardedInput => GeneralKind::GuardedInput,
            SemGeneralKind::Output => GeneralKind::Output,
            SemGeneralKind::SyncInput => GeneralKind::SyncInput,
        }
    }
}

/// Command dispatch kind (priority/queue-full detail, when present, is exposed by
/// `Command.priority` / `.queue_full`).
#[gen_stub_pyclass_enum]
#[pyclass(eq, eq_int, frozen, hash)]
#[derive(Clone, Copy, PartialEq, Eq, Hash)]
pub enum CommandKind {
    Async,
    Guarded,
    Sync,
}

impl From<&SemCommandKind> for CommandKind {
    fn from(k: &SemCommandKind) -> Self {
        match k {
            SemCommandKind::Async { .. } => CommandKind::Async,
            SemCommandKind::Guarded => CommandKind::Guarded,
            SemCommandKind::Sync => CommandKind::Sync,
        }
    }
}

/// External (F Prime-generated) vs internal state machine.
#[gen_stub_pyclass_enum]
#[pyclass(eq, eq_int, frozen, hash)]
#[derive(Clone, Copy, PartialEq, Eq, Hash)]
pub enum StateMachineKind {
    External,
    Internal,
}

impl From<&SmKind> for StateMachineKind {
    fn from(k: &SmKind) -> Self {
        match k {
            SmKind::External => StateMachineKind::External,
            SmKind::Internal => StateMachineKind::Internal,
        }
    }
}

pub fn register(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_class::<Direction>()?;
    m.add_class::<GeneralKind>()?;
    m.add_class::<CommandKind>()?;
    m.add_class::<StateMachineKind>()?;
    Ok(())
}
