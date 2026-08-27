//! The `Model` pyclass: the graph root, the node memo (for `is`-identity), and
//! the `build` entry point that hands out lazy node wrappers. The per-variant
//! wrapper construction lives in `crate::ast::construct`.

use crate::ast::{self as py_ast, AstNode};
use crate::diagnostics::{Diagnostic, OwnedDiagnostic};
use crate::ir_core::ModelData;
use fpp_core::Node;
use pyo3::prelude::*;
use pyo3_stub_gen::derive::{gen_stub_pyclass, gen_stub_pymethods};
use rustc_hash::FxHashMap;
use std::sync::{Arc, Mutex};

#[gen_stub_pyclass]
#[pyclass]
pub struct Model {
    pub data: Arc<ModelData>,
    // Node memo giving `is`-identity across navigation and making cycles safe.
    // `Mutex` (not `RefCell`) because pyclasses must be `Sync`.
    memo: Mutex<FxHashMap<Node, Py<AstNode>>>,
    diagnostics: Vec<OwnedDiagnostic>,
    #[pyo3(get)]
    pub has_errors: bool,
    #[pyo3(get)]
    pub error_count: usize,
}

impl Model {
    pub fn new(data: ModelData, diagnostics: Vec<OwnedDiagnostic>) -> Self {
        let error_count = diagnostics.iter().filter(|d| d.is_error()).count();
        Model {
            data: Arc::new(data),
            memo: Mutex::new(FxHashMap::default()),
            diagnostics,
            has_errors: error_count > 0,
            error_count,
        }
    }

    /// Build (or return the memoized) Python wrapper for a node.
    pub fn build(model: &Py<Model>, py: Python<'_>, node: Node) -> PyResult<Py<AstNode>> {
        {
            let m = model.borrow(py);
            if let Some(obj) = m.memo.lock().unwrap().get(&node) {
                return Ok(obj.clone_ref(py));
            }
        }
        let obj = py_ast::construct(model, py, node)?;
        model
            .borrow(py)
            .memo
            .lock()
            .unwrap()
            .insert(node, obj.clone_ref(py));
        Ok(obj)
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl Model {
    /// The translation-unit top-level members.
    fn ast(slf: PyRef<'_, Self>) -> PyResult<Vec<Py<AstNode>>> {
        let py = slf.py();
        let roots = slf.data.roots.clone();
        let model: Py<Self> = slf.into();
        roots.iter().map(|n| Model::build(&model, py, *n)).collect()
    }

    /// The diagnostics (errors, warnings, notes) emitted during analysis.
    #[getter]
    fn diagnostics(&self) -> Vec<Diagnostic> {
        self.diagnostics
            .iter()
            .map(Diagnostic::from_owned)
            .collect()
    }

    /// Look up a symbol by its fully-qualified (dotted) name.
    fn lookup(
        slf: PyRef<'_, Self>,
        qualified_name: &str,
    ) -> PyResult<Option<crate::sem::SymbolRef>> {
        let py = slf.py();
        let sym = slf.data.by_qualified_name.get(qualified_name).cloned();
        let model: Py<Self> = slf.into();
        match sym {
            Some(s) => Ok(Some(crate::sem::symbol_ref(&model, py, s)?)),
            None => Ok(None),
        }
    }

    /// The semantic analysis result — the strict 1:1 mirror of
    /// `fpp_analysis::Analysis`. Navigate the model's semantics through its
    /// public maps (e.g. `model.analysis.component_map`) and methods (e.g.
    /// `model.analysis.get_qualified_name(sym)`).
    #[getter]
    fn analysis(slf: PyRef<'_, Self>) -> PyResult<Py<crate::sem::Analysis>> {
        let py = slf.py();
        let model: Py<Self> = slf.into();
        crate::sem::build_analysis(&model, py)
    }

    fn __repr__(&self) -> String {
        format!(
            "<Model nodes={} errors={}>",
            self.data.ids.len(),
            self.error_count
        )
    }
}
