use crate::semantics::generic_name_symbol_map::GenericNameSymbolMap;
use crate::semantics::generic_nested_scope::GenericNestedScope;
use crate::semantics::generic_scope::GenericScope;
use crate::semantics::{NameGroup, NameGroupMap, Symbol};

pub type NestedScope =
    GenericNestedScope<NameGroup, Symbol, NameGroupMap<GenericNameSymbolMap<Symbol>>>;

pub type Scope = GenericScope<NameGroup, Symbol, NameGroupMap<GenericNameSymbolMap<Symbol>>>;
