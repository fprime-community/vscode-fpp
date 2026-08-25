//! The `Model` pyclass: the graph root, the node memo (for `is`-identity), and
//! the `build` entry point that hands out lazy node wrappers. The per-variant
//! wrapper construction lives in `crate::ast::construct`.

use crate::ast::{self as py_ast, AstNode};
use crate::diagnostics::{Diagnostic, OwnedDiagnostic};
use crate::ir_core::ModelData;
use fpp_analysis::semantics::Symbol as SemSymbol;
use fpp_core::Node;
use pyo3::PyClass;
use pyo3::prelude::*;
use pyo3_stub_gen::derive::{gen_stub_pyclass, gen_stub_pymethods};
use rustc_hash::FxHashMap;
use std::sync::{Arc, Mutex};

#[gen_stub_pyclass]
#[pyclass]
pub struct Model {
    pub data: Arc<ModelData>,
    // GIL-uncontended node memo keyed by `fpp_core::Node`; gives `is`-identity
    // across navigation and makes cycles safe. Mutex (not RefCell) because
    // pyclasses must be `Sync`. Values are the base `AstNode` (concrete subclass
    // instances up-cast via `into_super`).
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
    ) -> PyResult<Option<crate::unions::SymbolRef>> {
        let py = slf.py();
        let sym = slf.data.by_qualified_name.get(qualified_name).cloned();
        let model: Py<Self> = slf.into();
        match sym {
            Some(s) => Ok(Some(crate::sem_py::symbol_ref(&model, py, s)?)),
            None => Ok(None),
        }
    }

    /// All components in the model.
    fn components(slf: PyRef<'_, Self>) -> PyResult<Vec<Py<crate::entities_py::Component>>> {
        Self::entity_list(
            slf,
            |a| a.component_map.keys().cloned().collect(),
            crate::entities_py::build_component,
        )
    }
    /// All component instances in the model.
    fn component_instances(
        slf: PyRef<'_, Self>,
    ) -> PyResult<Vec<Py<crate::entities_py::ComponentInstance>>> {
        Self::entity_list(
            slf,
            |a| a.component_instance_map.keys().cloned().collect(),
            crate::entities_py::build_component_instance,
        )
    }
    /// All interfaces in the model.
    fn interfaces(slf: PyRef<'_, Self>) -> PyResult<Vec<Py<crate::entities_py::Interface>>> {
        Self::entity_list(
            slf,
            |a| a.interface_map.keys().cloned().collect(),
            crate::entities_py::build_interface,
        )
    }
    /// All topologies in the model.
    fn topologies(slf: PyRef<'_, Self>) -> PyResult<Vec<Py<crate::entities_py::Topology>>> {
        Self::entity_list(
            slf,
            |a| a.topology_map.keys().cloned().collect(),
            crate::entities_py::build_topology,
        )
    }
    /// All systems (deployments) in the model.
    fn systems(slf: PyRef<'_, Self>) -> PyResult<Vec<Py<crate::entities_py::System>>> {
        Self::entity_list(
            slf,
            |a| a.system_map.keys().cloned().collect(),
            crate::entities_py::build_system,
        )
    }
    /// All state machines in the model.
    fn state_machines(slf: PyRef<'_, Self>) -> PyResult<Vec<Py<crate::entities_py::StateMachine>>> {
        Self::entity_list(
            slf,
            |a| a.state_machine_map.keys().cloned().collect(),
            crate::entities_py::build_state_machine,
        )
    }

    fn __repr__(&self) -> String {
        format!(
            "<Model nodes={} errors={}>",
            self.data.ids.len(),
            self.error_count
        )
    }
}

impl Model {
    /// Build a list of entity wrappers, one per symbol keying an analysis entity
    /// map. Only symbols whose def node was recorded during the walk are kept,
    /// sorted by their walk id for deterministic (source) order.
    fn entity_list<T: PyClass>(
        slf: PyRef<'_, Self>,
        keys: impl Fn(&fpp_analysis::Analysis) -> Vec<SemSymbol>,
        build: impl Fn(&Py<Model>, Python<'_>, SemSymbol) -> PyResult<Py<T>>,
    ) -> PyResult<Vec<Py<T>>> {
        use fpp_analysis::semantics::SymbolInterface;
        let py = slf.py();
        let mut syms = keys(&slf.data.analysis);
        syms.retain(|s| slf.data.ids.contains_key(&s.node()));
        syms.sort_by_key(|s| slf.data.id(s.node()));
        let model: Py<Self> = slf.into();
        syms.into_iter().map(|s| build(&model, py, s)).collect()
    }
}
