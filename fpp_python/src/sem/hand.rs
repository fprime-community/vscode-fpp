//! Hand-written escape hatches for the generated semantic wrappers: the members
//! whose behavior cannot be produced mechanically by `fpp_sem_bindings!`.
//!
//! These live in a sibling module and reach the generated pyclasses' `pub(crate)`
//! handle fields. They are emitted as extra `#[pymethods]` blocks (enabled by the
//! `multiple-pymethods` PyO3 feature), so they compose with the generated block.
//!
//! * `build_*` entry points carry per-hierarchy quirks (e.g. the synthetic
//!   "unknown" `Type`) that the uniform generated `dispatch` cannot express.
//!
//! Non-structural identity (`__eq__`/`__hash__`, by definition node id or
//! `Type::identical`) and `__repr__` are emitted by the `identity`/`repr`
//! generator directives (never a structural derive, which would violate the
//! compiler's identity contract). `Type` keeps only its `__repr__` here — the
//! "unknown"-type discriminant is part of the `build_type` quirk.

use crate::ast::{ComponentKind, DefState};
use crate::ir_core::{Loc, ModelData};
use crate::sem::GeneralKind;
use crate::model::Model;
use crate::sem::{
    Command, Component, ComponentInstance, Connection, Container, Endpoint, Event,
    GeneralPortInstance, InitSpecifier, Interface, InternalPortInstance, Param, PortInstance,
    PortInstanceIdentifier, PortMatching, Record, StateMachine, StateMachineElement,
    StateMachineElementRef, StateMachineInstance, Symbol, SymbolRef, System, TlmChannel, Topology,
    Type, build_interface, component_by_symbol, component_instance_by_symbol, interface_by_symbol,
    symbol_ref, topology_by_symbol,
};
use fpp_analysis::semantics::state_machine::State as SemState;
use fpp_analysis::semantics::{
    InterfaceInstance, Symbol as SemSymbol, SymbolInterface, Type as SemType,
};
// The `AstNode` *trait* (`.id()`/`.node`) is imported anonymously (its methods
// are used on `QualIdent`, but the name is not).
use fpp_ast::AstNode as _;
use fpp_core::Node;
use pyo3::PyClass;
use pyo3::prelude::*;
use pyo3_stub_gen::derive::{gen_stub_pyclass, gen_stub_pymethods};
use std::sync::Arc;

/// Build (dispatching to the concrete subclass) the wrapper for a resolved type.
///
/// The synthetic "unknown" type — a named type whose definition node was never
/// recorded during the walk — is exposed as the bare base `Type` (repr kind
/// "Unknown"); it has no concrete subclass.
pub fn build_type(model: &Py<Model>, py: Python<'_>, ty: Arc<SemType>) -> PyResult<Py<Type>> {
    let data = model.borrow(py).data.clone();
    let unknown = match ty.def_node_id() {
        Some(n) => !data.ids.contains_key(&n),
        None => false,
    };
    let base = Type {
        data,
        model: model.clone_ref(py),
        ty: ty.clone(),
    };
    if unknown {
        return Py::new(py, base);
    }
    Type::dispatch(base, py, &ty)
}

impl Type {
    /// Whether this is the synthetic "unknown" type: a named type whose def node
    /// was never recorded during the walk.
    fn is_unknown(&self) -> bool {
        match self.ty.def_node_id() {
            Some(n) => !self.data.ids.contains_key(&n),
            None => false,
        }
    }
    /// The type-shape name, for `__repr__` only (the public discriminant is the
    /// concrete subclass identity / union alias, not a string).
    fn kind_name(&self) -> &'static str {
        if self.is_unknown() {
            return "Unknown";
        }
        match &*self.ty {
            SemType::PrimitiveInt(_) => "PrimitiveInt",
            SemType::Float(_) => "Float",
            SemType::Boolean => "Boolean",
            SemType::Integer => "Integer",
            SemType::String(_) => "String",
            SemType::AbsType(_) => "AbsType",
            SemType::AliasType(_) => "Alias",
            SemType::Array(_) => "Array",
            SemType::AnonArray(_) => "AnonArray",
            SemType::Enum(_) => "Enum",
            SemType::Struct(_) => "Struct",
            SemType::AnonStruct(_) => "AnonStruct",
        }
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl Type {
    fn __repr__(&self) -> String {
        format!("<Type {}>", self.kind_name())
    }
}

// ---- Symbol escape hatches ------------------------------------------------
//
// `Symbol`'s navigation is not a field/method mirror: `qualified_name`/`parent`
// are `Analysis` operations over the symbol, `name` projects `fpp_ast::Name.data`,
// and the `as_*` bridges resolve the symbol to an entity through the analysis
// maps. These stay hand-written; the macro generates the base/subclasses,
// `dispatch`, `build_symbol`, `symbol_ref`, the `SymbolRef` alias, the
// `is_dictionary_def` method, each subclass's concrete `definition` getter, and —
// via the `identity node` / `repr variant_qualified` directives — `__eq__` (by
// node id), `__hash__`, and `__repr__`.

impl Symbol {
    /// Build the entity wrapper for this symbol iff it defines one of that kind.
    fn as_entity<T: PyClass>(
        &self,
        py: Python<'_>,
        present: impl Fn(&fpp_analysis::Analysis, &SemSymbol) -> bool,
        build: impl Fn(&Py<Model>, Python<'_>, SemSymbol) -> PyResult<Py<T>>,
    ) -> PyResult<Option<Py<T>>> {
        if present(&self.data.analysis, &self.sym) {
            Ok(Some(build(&self.model, py, self.sym.clone())?))
        } else {
            Ok(None)
        }
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl Symbol {
    #[getter]
    fn name(&self) -> String {
        self.sym.unqualified_name().to_string()
    }
    #[getter]
    fn node_id(&self) -> u32 {
        self.data.id(self.sym.node())
    }
    #[getter]
    fn parent(&self, py: Python<'_>) -> PyResult<Option<SymbolRef>> {
        match self.sym.parent(&self.data.analysis) {
            Some(p) if self.data.ids.contains_key(&p.node()) => {
                Ok(Some(symbol_ref(&self.model, py, p.clone())?))
            }
            _ => Ok(None),
        }
    }

    /// The `Component` entity this symbol defines, or None.
    fn as_component(&self, py: Python<'_>) -> PyResult<Option<Py<Component>>> {
        self.as_entity(
            py,
            |a, s| a.component_map.contains_key(s),
            crate::sem::build_component,
        )
    }
    /// The `ComponentInstance` entity this symbol defines, or None.
    fn as_component_instance(&self, py: Python<'_>) -> PyResult<Option<Py<ComponentInstance>>> {
        self.as_entity(
            py,
            |a, s| a.component_instance_map.contains_key(s),
            crate::sem::build_component_instance,
        )
    }
    /// The `Interface` entity this symbol defines, or None.
    fn as_interface(&self, py: Python<'_>) -> PyResult<Option<Py<Interface>>> {
        self.as_entity(
            py,
            |a, s| a.interface_map.contains_key(s),
            crate::sem::build_interface,
        )
    }
    /// The `Topology` entity this symbol defines, or None.
    fn as_topology(&self, py: Python<'_>) -> PyResult<Option<Py<Topology>>> {
        self.as_entity(
            py,
            |a, s| a.topology_map.contains_key(s),
            crate::sem::build_topology,
        )
    }
    /// The `System` entity this symbol defines, or None.
    fn as_system(&self, py: Python<'_>) -> PyResult<Option<Py<System>>> {
        self.as_entity(
            py,
            |a, s| a.system_map.contains_key(s),
            crate::sem::build_system,
        )
    }
    /// The `StateMachine` entity this symbol defines, or None.
    fn as_state_machine(&self, py: Python<'_>) -> PyResult<Option<Py<StateMachine>>> {
        self.as_entity(
            py,
            |a, s| a.state_machine_map.contains_key(s),
            crate::sem::build_state_machine,
        )
    }
}

// ---- StateMachineElement escape hatches -----------------------------------
//
// The element's `name` is not a native field — it projects `get_unqualified_name`
// (a `&str` return the reflector does not classify) — so it stays hand-written.
// The macro generates the base/subclasses, `dispatch`,
// `build_state_machine_element`, `state_machine_element_ref`, the
// `StateMachineElement` alias, each subclass's concrete `definition` getter, the
// `loc` getter (via the `loc_from_node` directive), and `__repr__` (via the
// `repr variant_unqualified` directive).

#[gen_stub_pymethods]
#[pymethods]
impl StateMachineElement {
    #[getter]
    fn name(&self) -> String {
        self.native.get_unqualified_name().to_string()
    }
}

// ---- entity-layer escape hatches ------------------------------------------
//
// These read the `pub(crate)` fields of the entities generated in
// `crate::sem::defs_manual`. They cannot be a mechanical field/method mirror:
// `build_spec` bridges a `Span` to its `Spec*` AST node; `instance_ref` resolves
// an `InterfaceInstance` to its top-level entity (may be `None`, cross-layer);
// the `PortInstance` subclass getters decode nested `GeneralKind`/`PortInstanceType`
// payloads; `import_locs` is a `Vec<Span>` filter-map; and `Connection`'s
// `from_`/`source`/`to`/`target` endpoint aliases forward the resolved endpoints
// (`from` is a Python keyword, so they cannot be generated by field name).

/// Build a thin element's `Spec*` AST node (bridged by its `loc` span) as the
/// concrete wrapper type `T`, or `None`.
///
/// `None` covers two cases: no AST node was recorded at the span, and the node at
/// the span is not a `T`. The latter happens for compiler-synthesized entities
/// with no source spec — e.g. the `PARAMETER_SET`/`PARAMETER_SAVE` commands
/// synthesized for a `param` carry that param's span, so a `Command`'s
/// `spec(SpecCommand)` bridge lands on a `SpecParam` node and must report `None`
/// (its declared type is `Option<Py<SpecCommand>>`).
pub(crate) fn build_spec<T: PyClass>(
    data: &ModelData,
    model: &Py<Model>,
    py: Python<'_>,
    span: fpp_core::Span,
) -> PyResult<Option<Py<T>>> {
    match data.node_of_span(span) {
        Some(n) => Ok(Model::build(model, py, n)?
            .into_bound(py)
            .into_any()
            .downcast_into::<T>()
            .ok()
            .map(|o| o.unbind())),
        None => Ok(None),
    }
}

/// The owning instance of a port identifier: a `ComponentInstance` or a
/// `Topology`. `IntoPyObject` hands back the concrete object; the stub renders
/// the precise `ComponentInstance | Topology` union.
pub struct InstanceRef(pub PyObject);
pyo3_stub_gen::impl_stub_type!(InstanceRef = ComponentInstance | Topology);
impl<'py> IntoPyObject<'py> for InstanceRef {
    type Target = PyAny;
    type Output = Bound<'py, PyAny>;
    type Error = std::convert::Infallible;
    fn into_pyobject(self, py: Python<'py>) -> Result<Self::Output, Self::Error> {
        Ok(self.0.into_bound(py))
    }
}

/// Resolve an `InterfaceInstance` to its owning `ComponentInstance` / `Topology`
/// entity, or `None` if unresolved.
pub(crate) fn instance_ref(
    data: &Arc<ModelData>,
    model: &Py<Model>,
    py: Python<'_>,
    ii: &InterfaceInstance,
) -> PyResult<Option<InstanceRef>> {
    match ii {
        InterfaceInstance::Topology(t) => Ok(topology_by_symbol(data, model, py, Some(&t.symbol))?
            .map(|o| InstanceRef(o.into_any()))),
        InterfaceInstance::Component(ci) => {
            let sym = data.by_qualified_name.get(&ci.qualified_name).cloned();
            Ok(component_instance_by_symbol(data, model, py, sym.as_ref())?
                .map(|o| InstanceRef(o.into_any())))
        }
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl PortInstance {
    /// Locations of the interface-import specs that pulled this port in.
    #[getter]
    fn import_locs(&self) -> Vec<Loc> {
        self.pi
            .get_import_locs()
            .iter()
            .filter_map(|s| self.data.loc_of_span(*s))
            .collect()
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl GeneralPortInstance {
    /// General port kind (async / guarded / sync input, or output).
    #[getter]
    fn kind(self_: PyRef<'_, Self>) -> Option<GeneralKind> {
        self_.as_super().pi.general_kind().map(|k| GeneralKind::from(&k))
    }
    #[getter]
    fn priority(self_: PyRef<'_, Self>) -> Option<i128> {
        self_.as_super().pi.priority()
    }
    #[getter]
    fn queue_full(self_: PyRef<'_, Self>) -> Option<crate::ast::QueueFull> {
        self_
            .as_super()
            .pi
            .queue_full()
            .map(|q| crate::ast::QueueFull::from(&q))
    }
    #[getter]
    fn is_serial(self_: PyRef<'_, Self>) -> bool {
        self_.as_super().pi.is_serial()
    }
    /// The port-definition symbol for a typed port, else None (serial).
    #[getter]
    fn type_symbol(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Option<SymbolRef>> {
        let base = self_.as_super();
        match base.pi.type_symbol() {
            Some(sym) if base.data.ids.contains_key(&sym.node()) => {
                Ok(Some(symbol_ref(&base.model, py, sym)?))
            }
            _ => Ok(None),
        }
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl InternalPortInstance {
    #[getter]
    fn input_kind(self_: PyRef<'_, Self>) -> Option<crate::ast::InputPortKind> {
        // The native `Internal` variant carries no input kind.
        let _ = self_;
        None
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl Connection {
    /// The output (source) endpoint. Named `from_` because `from` is a Python
    /// keyword; `source` is an alias. The endpoint already carries the resolved
    /// port number (baked into `ResolvedConnection` by port numbering).
    #[getter]
    fn from_(&self, py: Python<'_>) -> PyResult<Py<Endpoint>> {
        Endpoint::build(&self.model, py, self.resolved.from.clone())
    }
    #[getter]
    fn source(&self, py: Python<'_>) -> PyResult<Py<Endpoint>> {
        Endpoint::build(&self.model, py, self.resolved.from.clone())
    }
    /// The input (destination) endpoint.
    #[getter]
    fn to(&self, py: Python<'_>) -> PyResult<Py<Endpoint>> {
        Endpoint::build(&self.model, py, self.resolved.to.clone())
    }
    #[getter]
    fn target(&self, py: Python<'_>) -> PyResult<Py<Endpoint>> {
        Endpoint::build(&self.model, py, self.resolved.to.clone())
    }
}

// ---- top-level symbol-keyed entity escape hatches -------------------------
//
// These read the `pub(crate)` fields (`data`/`model`/`sym`) and the `native()`
// accessor of the symbol-keyed entities generated in `crate::sem::defs_manual`.
// They are the members that cannot be produced mechanically by the `symbol_keyed`
// handle: the sorted nested-entity maps (built with per-element extras), the
// `DefComponentInstance` attribute + constant-fold reads, the cross-layer symbol
// resolvers, the sym-derived `name`/`qualified_name`, `kind`, and the
// state-machine element/state walks.

// ---- Component ------------------------------------------------------------

#[gen_stub_pymethods]
#[pymethods]
impl Component {
    #[getter]
    fn name(&self) -> String {
        self.sym.name().data.clone()
    }
    #[getter]
    fn qualified_name(&self) -> String {
        self.data.analysis.get_qualified_name(&self.sym)
    }
    /// Component kind: active, passive, or queued.
    #[getter]
    fn kind(&self) -> ComponentKind {
        ComponentKind::from(&self.native().kind())
    }
    /// The commands, ordered by opcode.
    #[getter]
    fn commands(&self, py: Python<'_>) -> PyResult<Vec<Py<Command>>> {
        self.native()
            .commands()
            .into_iter()
            .map(|cmd| Command::build(&self.model, py, cmd.clone()))
            .collect()
    }
    /// The telemetry channels, ordered by id.
    #[getter]
    fn telemetry(&self, py: Python<'_>) -> PyResult<Vec<Py<TlmChannel>>> {
        self.native()
            .tlm()
            .into_iter()
            .map(|t| TlmChannel::build(&self.model, py, t.clone()))
            .collect()
    }
    /// The events, ordered by id.
    #[getter]
    fn events(&self, py: Python<'_>) -> PyResult<Vec<Py<Event>>> {
        self.native()
            .events()
            .into_iter()
            .map(|e| Event::build(&self.model, py, e.clone()))
            .collect()
    }
    /// The parameters, ordered by id.
    #[getter]
    fn params(&self, py: Python<'_>) -> PyResult<Vec<Py<Param>>> {
        self.native()
            .params()
            .into_iter()
            .map(|p| Param::build(&self.model, py, p.clone()))
            .collect()
    }
    /// The data-product containers, ordered by id.
    #[getter]
    fn containers(&self, py: Python<'_>) -> PyResult<Vec<Py<Container>>> {
        self.native()
            .containers()
            .into_iter()
            .map(|ct| Container::build(&self.model, py, ct.clone()))
            .collect()
    }
    /// The data-product records, ordered by id.
    #[getter]
    fn records(&self, py: Python<'_>) -> PyResult<Vec<Py<Record>>> {
        self.native()
            .records()
            .into_iter()
            .map(|r| Record::build(&self.model, py, r.clone()))
            .collect()
    }
    /// The state-machine instances, ordered by name.
    #[getter]
    fn state_machine_instances(&self, py: Python<'_>) -> PyResult<Vec<Py<StateMachineInstance>>> {
        let mut items: Vec<_> = self.native().state_machine_instance_map.values().collect();
        items.sort_by(|a, b| a.name.cmp(&b.name));
        items
            .into_iter()
            .map(|smi| StateMachineInstance::build(&self.model, py, smi.clone()))
            .collect()
    }
    /// The port-matching specifiers.
    #[getter]
    fn port_matchings(&self, py: Python<'_>) -> PyResult<Vec<Py<PortMatching>>> {
        self.native()
            .port_matchings()
            .iter()
            .map(|pm| PortMatching::build(&self.model, py, pm.clone()))
            .collect()
    }
}

// ---- ComponentInstance ----------------------------------------------------

#[gen_stub_pymethods]
#[pymethods]
impl ComponentInstance {
    /// Declared queue size (constant-folded), if any.
    #[getter]
    fn queue_size(&self) -> Option<i128> {
        self.native().queue_size
    }
    /// Declared stack size (constant-folded), if any.
    #[getter]
    fn stack_size(&self) -> Option<i128> {
        self.native().stack_size
    }
    /// Declared priority (constant-folded), if any.
    #[getter]
    fn priority(&self) -> Option<i128> {
        self.native().priority
    }
    /// Declared CPU affinity (constant-folded), if any.
    #[getter]
    fn cpu(&self) -> Option<i128> {
        self.native().cpu
    }
    /// The C++ implementation type name, if given.
    #[getter]
    fn impl_type(&self) -> Option<String> {
        self.native().impl_type.clone()
    }
    /// The header file, if given.
    #[getter]
    fn file(&self) -> Option<String> {
        self.native().file.clone()
    }
    /// The component this is an instance of.
    #[getter]
    fn component(&self, py: Python<'_>) -> PyResult<Option<Py<Component>>> {
        component_by_symbol(
            &self.data,
            &self.model,
            py,
            Some(&self.native().component_symbol),
        )
    }
    /// The init specifiers, ordered by phase.
    #[getter]
    fn init_specifiers(&self, py: Python<'_>) -> PyResult<Vec<Py<InitSpecifier>>> {
        self.native()
            .init_specifiers()
            .into_iter()
            .map(|s| InitSpecifier::build(&self.model, py, s.clone()))
            .collect()
    }
}

// ---- Interface ------------------------------------------------------------

#[gen_stub_pymethods]
#[pymethods]
impl Interface {
    #[getter]
    fn name(&self) -> String {
        self.sym.name().data.clone()
    }
    #[getter]
    fn qualified_name(&self) -> String {
        self.data.analysis.get_qualified_name(&self.sym)
    }
    /// Imported interfaces.
    #[getter]
    fn imports(&self, py: Python<'_>) -> PyResult<Vec<Py<Interface>>> {
        let mut syms: Vec<SemSymbol> = self
            .native()
            .import_map
            .keys()
            .filter(|s| {
                self.data.ids.contains_key(&s.node())
                    && self.data.analysis.interface_map.contains_key(*s)
            })
            .cloned()
            .collect();
        syms.sort_by_key(|s| self.data.id(s.node()));
        let mut out = Vec::new();
        for s in syms {
            out.push(build_interface(&self.model, py, s)?);
        }
        Ok(out)
    }
}

// ---- System ---------------------------------------------------------------

#[gen_stub_pymethods]
#[pymethods]
impl System {
    #[getter]
    fn name(&self) -> String {
        self.sym.name().data.clone()
    }
    #[getter]
    fn qualified_name(&self) -> String {
        self.data.analysis.get_qualified_name(&self.sym)
    }
    /// The deployment topology named by this system.
    #[getter]
    fn topology(&self, py: Python<'_>) -> PyResult<Option<Py<Topology>>> {
        topology_by_symbol(&self.data, &self.model, py, Some(&self.native().topology))
    }
}

// ---- Topology -------------------------------------------------------------

#[gen_stub_pymethods]
#[pymethods]
impl Topology {
    #[getter]
    fn qualified_name(&self) -> String {
        self.data.analysis.get_qualified_name(&self.sym)
    }
    /// The component instances declared in this topology (resolved).
    #[getter]
    fn instances(&self, py: Python<'_>) -> PyResult<Vec<Py<ComponentInstance>>> {
        let mut out = Vec::new();
        for (ci, _loc) in self.native().component_instance_map() {
            let sym = self.data.by_qualified_name.get(&ci.qualified_name).cloned();
            if let Some(obj) =
                component_instance_by_symbol(&self.data, &self.model, py, sym.as_ref())?
            {
                out.push(obj);
            }
        }
        Ok(out)
    }
    /// The interfaces this topology implements (resolved).
    #[getter]
    fn implements(&self, py: Python<'_>) -> PyResult<Vec<Py<Interface>>> {
        let top = self.native();
        let mut syms: Vec<SemSymbol> = top
            .implements
            .iter()
            .filter_map(|q| self.data.analysis.use_def_map.get(&q.id()).cloned())
            .filter(|s| {
                self.data.ids.contains_key(&s.node())
                    && self.data.analysis.interface_map.contains_key(s)
            })
            .collect();
        syms.sort_by_key(|s| self.data.id(s.node()));
        let mut out = Vec::new();
        for s in syms {
            if let Some(obj) = interface_by_symbol(&self.data, &self.model, py, Some(&s))? {
                out.push(obj);
            }
        }
        Ok(out)
    }
    /// Ports with a direction that have no connections in this topology.
    #[getter]
    fn unconnected_ports(&self, py: Python<'_>) -> PyResult<Vec<Py<PortInstanceIdentifier>>> {
        self.native()
            .unconnected_port_set
            .iter()
            .map(|pii| PortInstanceIdentifier::build(&self.model, py, pii.clone()))
            .collect()
    }
}

// ---- StateMachine ---------------------------------------------------------

#[gen_stub_pymethods]
#[pymethods]
impl StateMachine {
    #[getter]
    fn name(&self) -> String {
        self.sym.name().data.clone()
    }
    #[getter]
    fn qualified_name(&self) -> String {
        self.data.analysis.get_qualified_name(&self.sym)
    }
    /// External (F Prime-generated) vs internal state machine.
    #[getter]
    fn kind(&self) -> crate::sem::StateMachineKind {
        crate::sem::StateMachineKind::from(&self.native().get_kind())
    }
    /// The actions, as typed elements.
    #[getter]
    fn actions(&self, py: Python<'_>) -> PyResult<Vec<StateMachineElementRef>> {
        self.native()
            .actions
            .iter()
            .map(|s| crate::sem::state_machine_element_ref(&self.model, py, s))
            .collect()
    }
    /// The guards, as typed elements.
    #[getter]
    fn guards(&self, py: Python<'_>) -> PyResult<Vec<StateMachineElementRef>> {
        self.native()
            .guards
            .iter()
            .map(|s| crate::sem::state_machine_element_ref(&self.model, py, s))
            .collect()
    }
    /// The signals, as typed elements.
    #[getter]
    fn signals(&self, py: Python<'_>) -> PyResult<Vec<StateMachineElementRef>> {
        self.native()
            .signals
            .iter()
            .map(|s| crate::sem::state_machine_element_ref(&self.model, py, s))
            .collect()
    }
    /// The top-level states (each may nest substates).
    #[getter]
    fn states(&self, py: Python<'_>) -> PyResult<Vec<Py<State>>> {
        use fpp_ast::StateMachineMember;
        let nodes: Vec<Node> = self
            .native()
            .node
            .members
            .as_deref()
            .unwrap_or(&[])
            .iter()
            .filter_map(|m| match m {
                StateMachineMember::DefState(s) => Some(s.node_id),
                _ => None,
            })
            .collect();
        nodes
            .into_iter()
            .map(|n| build_state(&self.model, py, n))
            .collect()
    }
    /// The unqualified names of the leaf states.
    #[getter]
    fn leaf_states(&self) -> Vec<String> {
        self.native().leaf_state_names()
    }
    /// Whether a blocking analysis error was recorded for this state machine.
    #[getter]
    fn blocking_error(&self) -> bool {
        self.native().blocking_error()
    }
}

// ---- state-machine states -------------------------------------------------
//
// `State` is node-backed (it wraps a `fpp_core::Node` and reads its `DefState`
// via `data.node_as`) and self-recursive (`substates`), so it fits none of the
// macro handles and stays a plain hand-written `#[pyclass]`.

/// A state of a state machine (may nest substates).
#[gen_stub_pyclass]
#[pyclass(frozen)]
pub struct State {
    data: Arc<ModelData>,
    model: Py<Model>,
    node: Node,
}

impl State {
    fn def(&self) -> &fpp_ast::DefState {
        self.data.node_as::<fpp_ast::DefState>(self.node)
    }
}

fn build_state(model: &Py<Model>, py: Python<'_>, node: Node) -> PyResult<Py<State>> {
    Py::new(
        py,
        State {
            data: model.borrow(py).data.clone(),
            model: model.clone_ref(py),
            node,
        },
    )
}

#[gen_stub_pymethods]
#[pymethods]
impl State {
    #[getter]
    fn name(&self) -> String {
        self.def().name.data.clone()
    }
    #[getter]
    fn loc(&self) -> Option<Loc> {
        self.data.loc(self.node)
    }
    /// The defining `DefState` AST node.
    #[getter]
    fn definition(&self, py: Python<'_>) -> PyResult<Py<DefState>> {
        Ok(Model::build(&self.model, py, self.node)?
            .into_bound(py)
            .into_any()
            .downcast_into::<DefState>()?
            .unbind())
    }
    /// Names of the entry actions, in order.
    #[getter]
    fn entry_actions(&self) -> Vec<String> {
        SemState::get_entry_actions(self.def())
            .iter()
            .map(|i| i.data.clone())
            .collect()
    }
    /// Names of the exit actions, in order.
    #[getter]
    fn exit_actions(&self) -> Vec<String> {
        SemState::get_exit_actions(self.def())
            .iter()
            .map(|i| i.data.clone())
            .collect()
    }
    /// The nested substates.
    #[getter]
    fn substates(&self, py: Python<'_>) -> PyResult<Vec<Py<State>>> {
        let nodes: Vec<Node> = SemState::get_substates(self.def())
            .iter()
            .map(|s| s.node_id)
            .collect();
        nodes
            .into_iter()
            .map(|n| build_state(&self.model, py, n))
            .collect()
    }
    /// Whether this is a leaf state (no substates).
    #[getter]
    fn is_leaf(&self) -> bool {
        SemState::get_substates(self.def()).is_empty()
    }
    fn __repr__(&self) -> String {
        format!("<State '{}'>", self.def().name.data)
    }
}

/// Register the hand-written semantic pyclasses that fit none of the macro
/// handles (currently just the node-backed `State`).
pub(crate) fn register(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_class::<State>()?;
    Ok(())
}
