use crate::semantics::Symbol;
use fpp_core::Span;

/// An FPP system.
///
/// Records the system symbol and the deployment topology it names. (Dictionary
/// and codegen support are not part of this analyzer, so no dictionary is
/// tracked here.)
#[derive(Debug, Clone)]
pub struct FppSystem {
    /// The system definition symbol.
    pub symbol: Symbol,
    /// The deployment topology symbol named by the system.
    pub topology: Symbol,
    /// The location of the system definition.
    pub loc: Span,
}
