use crate::semantics::Symbol;
use fpp_core::Span;

/// An FPP system.
///
/// Mirrors Scala `analysis.FppSystem`. The Scala version also carries the
/// resolved dictionary; dictionary/codegen support is not ported here, so this
/// records just the system symbol and the deployment topology it names.
#[derive(Debug, Clone)]
pub struct FppSystem {
    /// The system definition symbol.
    pub symbol: Symbol,
    /// The deployment topology symbol named by the system.
    pub topology: Symbol,
    /// The location of the system definition.
    pub loc: Span,
}
