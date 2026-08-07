mod analysis;
mod errors;

use crate::passes::{
    CheckExprTypes, CheckFrameworkConstantValues, CheckFrameworkDefs, CheckPortDefs, CheckTypeUses,
    CheckUseDefCycles, CheckUses, EnterSymbols, EvalConstantExprs, EvalImpliedEnumConsts,
    FinalizeTypeDefs,
};
pub use analysis::*;
use fpp_ast::{MutVisitor, Visitor};
use fpp_core::FileReader;
use std::ops::ControlFlow;

pub mod analyzers {
    pub mod analyzer;
    pub use analyzer::*;

    pub mod basic_use_analyzer;
    pub use basic_use_analyzer::*;

    pub mod nested_analyzer;
    pub use nested_analyzer::*;

    pub mod use_analyzer;
    pub use use_analyzer::*;
}

pub mod passes {
    mod enter_symbols;
    pub use enter_symbols::*;

    mod check_uses;
    pub use check_uses::*;

    mod check_use_def_cycles;
    pub use check_use_def_cycles::*;

    mod check_type_uses;
    pub use check_type_uses::*;

    mod check_expr_types;
    pub use check_expr_types::*;

    mod eval_implied_enum_consts;
    pub use eval_implied_enum_consts::*;

    mod eval_constant_exprs;
    pub use eval_constant_exprs::*;

    mod finalize_type_defs;
    pub use finalize_type_defs::*;

    mod check_port_defs;
    pub use check_port_defs::*;

    mod check_framework_defs;
    pub use check_framework_defs::*;

    mod check_framework_constant_values;
    pub use check_framework_constant_values::*;
}

pub mod semantics {
    mod symbol;
    pub use symbol::*;

    mod name;
    pub use name::*;

    mod implied_use;
    pub use implied_use::*;

    mod framework_definitions;
    pub use framework_definitions::*;

    mod scope;
    pub use scope::*;

    mod name_groups;
    pub use name_groups::*;

    mod use_def_matching;
    pub use use_def_matching::*;

    mod types;
    pub use types::*;

    mod value;
    pub use value::*;

    mod format;
    pub use format::*;

    mod generic_name_symbol_map;
    mod generic_nested_scope;
    mod generic_scope;
}

pub fn resolve_includes<Reader: FileReader>(
    a: &mut Analysis,
    reader: Reader,
    ast: &mut fpp_ast::TransUnit,
) -> ControlFlow<()> {
    fpp_parser::ResolveIncludes::new(reader).visit_trans_unit(&mut a.include_context_map, ast)
}

pub fn check_semantics(a: &mut Analysis, ast: Vec<&fpp_ast::TransUnit>) -> ControlFlow<()> {
    EnterSymbols::new().visit_trans_units(a, ast.iter().cloned())?;
    CheckUses::new().visit_trans_units(a, ast.iter().cloned())?;
    CheckUseDefCycles::new().visit_trans_units(a, ast.iter().cloned())?;
    CheckTypeUses::new().visit_trans_units(a, ast.iter().cloned())?;
    CheckExprTypes::new().visit_trans_units(a, ast.iter().cloned())?;
    CheckFrameworkDefs::new().visit_trans_units(a, ast.iter().cloned())?;
    EvalImpliedEnumConsts::new().visit_trans_units(a, ast.iter().cloned())?;
    EvalConstantExprs::new().visit_trans_units(a, ast.iter().cloned())?;
    FinalizeTypeDefs::new().visit_trans_units(a, ast.iter().cloned())?;
    CheckFrameworkConstantValues::new().check(a);
    CheckPortDefs::new().visit_trans_units(a, ast.iter().cloned())?;

    ControlFlow::Continue(())
}
