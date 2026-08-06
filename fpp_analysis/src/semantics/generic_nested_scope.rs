use crate::semantics::SymbolInterface;
use crate::semantics::generic_name_symbol_map::GenericNameSymbolMap;
use fpp_util::EnumMap;
use std::marker::PhantomData;

#[derive(Debug, Clone)]
pub struct GenericNestedScope<NG: Copy, S: SymbolInterface, M: EnumMap<NG, GenericNameSymbolMap<S>>>(
    Vec<Option<S>>,
    PhantomData<NG>,
    PhantomData<M>,
);

impl<NG: Copy, S: SymbolInterface, M: EnumMap<NG, GenericNameSymbolMap<S>>>
    GenericNestedScope<NG, S, M>
{
    pub fn new() -> Self {
        Self(vec![None], Default::default(), Default::default())
    }

    /// Push a new scope onto the stack
    pub fn push(&mut self, symbol: S) {
        self.0.push(Some(symbol));
    }

    pub fn pop(&mut self) {
        self.0.pop();
    }

    /// Look up a symbol in all the scopes nested in this scope
    pub fn search<F: Fn(&Option<S>) -> Option<S>>(&self, predicate: F) -> Option<S> {
        // Work in the current scope and work out to the outermost
        self.0.iter().rev().find_map(predicate)
    }

    pub fn current(&self) -> &Option<S> {
        self.0.last().unwrap()
    }
}
