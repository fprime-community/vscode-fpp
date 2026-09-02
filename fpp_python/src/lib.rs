//! Native PyO3 bindings to the Rust FPP compiler (`fpp-tools`).
//!
//! `analyze()` runs the full compiler pipeline in one `fpp_core::run` scope and
//! returns a [`model::Model`] backed by an owned [`ir_core::ModelData`]: the
//! *live* parsed AST, `fpp_analysis::Analysis`, and `fpp_core::CompilerContext`,
//! plus small `fpp_core::Node`-keyed side-tables. There is no owned per-node IR
//! copy and no owned semantic mirror — wrappers read the live nodes and the live
//! `Analysis` directly, resolving locations/annotations lazily by re-entering the
//! retained context via `fpp_core::run_ref`.
//!
//! Two wrapper layers are expanded at compile time from checked-in declaration
//! files: the AST-node wrappers + recording walk from `fpp_ast_bindings!` over
//! [`crate::ast`], and the semantic wrappers from `fpp_sem_bindings!` over
//! [`crate::sem`] (with `sem::hand` supplying `build_type`, the one escape hatch
//! the macro cannot produce). The same AST macro also emits the typed `visit_*`
//! methods of [`crate::visitor`]'s `NodeVisitor`, whose traversal logic is
//! hand-written. Everything else is the hand-written core: `ir_core`,
//! `lower_core`, `noderef`, `model`, `visitor`, and `diagnostics`.

use pyo3::exceptions::PyRuntimeError;
use pyo3::prelude::*;
use pyo3_stub_gen::derive::gen_stub_pyfunction;
use std::panic::{AssertUnwindSafe, catch_unwind};

mod ast;
mod diagnostics;
mod ir_core;
mod lower_core;
mod model;
mod noderef;
mod sem;
mod visitor;

use diagnostics::{Diagnostic, OwnedDiagnostic, SharedEmitter};
use model::Model;

/// Run the full pipeline on one in-memory source, collecting diagnostics.
/// Parse + analysis + the recording walk happen inside one `fpp_core::run`
/// scope (mirrors `fpp-tools/fpp/src/main.rs`). The compiler context is **not**
/// dropped when `run` returns: it is moved into the returned
/// [`ir_core::ModelData`] so locations/annotations resolve lazily via `run_ref`.
fn run_pipeline(uri: &str, content: String) -> (ir_core::ModelData, Vec<OwnedDiagnostic>) {
    let emitter = SharedEmitter::default();
    let mut ctx = fpp_core::CompilerContext::new(emitter.clone());
    let (tu, analysis, roots, tables, by_qualified_name): (
        fpp_ast::TransUnit,
        fpp_analysis::Analysis,
        Vec<fpp_core::Node>,
        lower_core::WalkTables,
        _,
    ) = fpp_core::run(&mut ctx, || {
        let src = fpp_core::SourceFile::new(uri, content);
        let mut ast = fpp_parser::parse(src, |p| p.trans_unit(), None);
        let mut analysis = fpp_analysis::Analysis::new();
        let _ = fpp_analysis::resolve_includes(&mut analysis, fpp_fs::FsReader {}, &mut ast);
        fpp_analysis::add_state_enums(&mut ast);
        let _ = fpp_analysis::check_semantics(&mut analysis, vec![&ast]);
        let mut walker = lower_core::Walker::new();
        let roots = crate::ast::walk_trans_unit(&mut walker, &ast);
        let tables = walker.finish();
        let by_qualified_name = lower_core::build_indexes(&analysis, &tables.ids);
        (ast, analysis, roots, tables, by_qualified_name)
    });
    let data = ir_core::ModelData {
        tu,
        analysis,
        ctx: std::sync::Arc::new(ctx),
        roots,
        ids: tables.ids,
        node_ptrs: tables.node_ptrs,
        children: tables.children,
        by_qualified_name,
    };
    (data, emitter.take())
}

/// Analyze FPP source text and return a [`Model`].
#[gen_stub_pyfunction]
#[pyfunction]
#[pyo3(signature = (source, uri = "<string>"))]
fn analyze(py: Python<'_>, source: String, uri: &str) -> PyResult<Py<Model>> {
    let uri = uri.to_owned();
    let (data, diags) = py
        .allow_threads(move || catch_unwind(AssertUnwindSafe(move || run_pipeline(&uri, source))))
        .map_err(|_| PyRuntimeError::new_err("internal FPP compiler panic"))?;
    Py::new(py, Model::new(data, diags))
}

#[pymodule]
fn fpp_python(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(analyze, m)?)?;
    m.add_class::<Model>()?;
    m.add_class::<Diagnostic>()?;
    m.add_class::<ir_core::Loc>()?;
    m.add_class::<ir_core::Span>()?;
    m.add_class::<visitor::NodeVisitor>()?;
    ast::register(m)?;
    sem::register(m)?;
    Ok(())
}

/// Gather the pyo3-stub-gen [`StubInfo`] for this extension.
///
/// The inventory of `#[gen_stub_*]` submissions lives in this (`fpp_python`)
/// crate, so this gatherer must too. The `stub_gen` binary calls it to write the
/// stub. The output location is resolved from this crate's `pyproject.toml`
/// (`[tool.maturin] module-name`, pure-Rust layout), which sits beside
/// `Cargo.toml`: the stub is written as `fpp_python.pyi` and maturin ships it in
/// the wheel as `fpp_python/__init__.pyi`.
pub fn stub_info() -> pyo3_stub_gen::Result<pyo3_stub_gen::StubInfo> {
    let manifest_dir: &std::path::Path = env!("CARGO_MANIFEST_DIR").as_ref();
    pyo3_stub_gen::StubInfo::from_pyproject_toml(manifest_dir.join("pyproject.toml"))
}

/// `(alias name, `Sub1 | Sub2 | …` RHS)` for every closed-union type. Consumed by
/// the `stub_gen` binary to inject `<Alias>: typing.TypeAlias = …` lines that
/// pyo3-stub-gen cannot express natively.
pub fn union_aliases() -> Vec<(&'static str, String)> {
    sem::union_aliases()
}
