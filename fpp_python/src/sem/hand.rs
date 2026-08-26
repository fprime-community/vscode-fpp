//! Hand-written escape hatches for the generated semantic wrappers: the members
//! whose behavior cannot be produced mechanically by `fpp_sem_bindings!`.
//!
//! These live in a sibling module and reach the generated pyclasses' `pub(crate)`
//! handle fields. They are emitted as extra `#[pymethods]` blocks (enabled by the
//! `multiple-pymethods` PyO3 feature), so they compose with the generated block.
//!
//! * `build_*` entry points carry per-hierarchy quirks (e.g. the synthetic
//!   "unknown" `Type`) that the uniform generated `dispatch` cannot express.
//! * Identity (`__eq__`/`__hash__`) is non-structural — by definition node id /
//!   `Type::identical` — so it is never generated (a structural derive would
//!   violate the compiler's identity contract).

use crate::ast::{ComponentKind, DefState};
use crate::enums::GeneralKind;
use crate::ir_core::{Loc, ModelData};
use crate::model::Model;
use crate::sem::{
    Command, Component, ComponentInstance, Connection, Container, Endpoint, Event,
    GeneralPortInstance, InitSpecifier, Interface, InternalPortInstance, Param, PortInstance,
    PortInstanceIdentifier, PortMatching, Record, StateMachine, StateMachineElement,
    StateMachineElementRef, StateMachineInstance, Symbol, SymbolRef, System, TlmChannel, Topology,
    Type, Value, build_interface, component_by_symbol, component_instance_by_symbol,
    interface_by_symbol, symbol_ref, topology_by_symbol,
};
use fpp_analysis::semantics::state_machine::{
    State as SemState, StateMachine as SemStateMachine, StateMachineSymbol as SmSymbol,
};
use fpp_analysis::semantics::{
    GeneralKind as SemGeneralKind, InterfaceInstance, PortInstance as SemPortInstance,
    PortInstanceType, Symbol as SemSymbol, SymbolInterface, Type as SemType, Value as SemValue,
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
    fn __eq__(&self, other: &Bound<'_, PyAny>) -> bool {
        match other.downcast::<Type>() {
            Ok(o) => SemType::identical(&self.ty, &o.borrow().ty),
            Err(_) => false,
        }
    }
    fn __hash__(&self) -> u64 {
        match self.ty.def_node_id() {
            Some(n) => self.data.ids.get(&n).copied().unwrap_or(0) as u64,
            None => 0,
        }
    }
}

impl Value {
    /// The value-kind name, for `__repr__` only (the public discriminant is the
    /// concrete subclass identity / `Value` union alias).
    fn kind_name(&self) -> &'static str {
        match &self.val {
            SemValue::Integer(_) => "Integer",
            SemValue::PrimitiveInteger(_) => "PrimitiveInteger",
            SemValue::Float(_) => "Float",
            SemValue::Boolean(_) => "Boolean",
            SemValue::String(_) => "String",
            SemValue::EnumConstant(_) => "EnumConstant",
            SemValue::Array(_) => "Array",
            SemValue::AnonArray(_) => "AnonArray",
            SemValue::Struct(_) => "Struct",
            SemValue::AnonStruct(_) => "AnonStruct",
            SemValue::AbsType(_) => "AbsType",
        }
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl Value {
    fn __repr__(&self) -> String {
        format!("<Value {}>", self.kind_name())
    }
}

// ---- Symbol escape hatches ------------------------------------------------
//
// `Symbol`'s navigation is not a field/method mirror: `qualified_name`/`parent`
// are `Analysis` operations over the symbol, `name` projects `fpp_ast::Name.data`,
// and the `as_*` bridges resolve the symbol to an entity through the analysis
// maps. Identity is by definition node id. These stay hand-written; the macro
// generates the base/subclasses, `dispatch`, `build_symbol`, `symbol_ref`, the
// `SymbolRef` alias, the `is_dictionary_def` method, and each subclass's concrete
// `definition` getter.

fn symbol_kind(s: &SemSymbol) -> &'static str {
    match s {
        SemSymbol::AbsType(_) => "AbsType",
        SemSymbol::AliasType(_) => "AliasType",
        SemSymbol::Array(_) => "Array",
        SemSymbol::Component(_) => "Component",
        SemSymbol::ComponentInstance(_) => "ComponentInstance",
        SemSymbol::Constant(_) => "Constant",
        SemSymbol::Enum(_) => "Enum",
        SemSymbol::EnumConstant(_) => "EnumConstant",
        SemSymbol::Interface(_) => "Interface",
        SemSymbol::Module(_) => "Module",
        SemSymbol::Port(_) => "Port",
        SemSymbol::StateMachine(_) => "StateMachine",
        SemSymbol::Struct(_) => "Struct",
        SemSymbol::System(_) => "System",
        SemSymbol::Topology(_) => "Topology",
    }
}

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
        self.sym.name().data.clone()
    }
    #[getter]
    fn qualified_name(&self) -> String {
        self.data.analysis.get_qualified_name(&self.sym)
    }
    #[getter]
    fn node_id(&self) -> u32 {
        self.data.id(self.sym.node())
    }
    #[getter]
    fn parent(&self, py: Python<'_>) -> PyResult<Option<SymbolRef>> {
        match self.data.analysis.parent_symbol_map.get(&self.sym) {
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

    fn __repr__(&self) -> String {
        format!(
            "<Symbol {} '{}'>",
            symbol_kind(&self.sym),
            self.data.analysis.get_qualified_name(&self.sym)
        )
    }
    fn __eq__(&self, other: &Bound<'_, PyAny>) -> bool {
        match other.downcast::<Symbol>() {
            Ok(o) => {
                let o = o.borrow();
                self.sym == o.sym
            }
            Err(_) => false,
        }
    }
    fn __hash__(&self) -> u64 {
        self.data.ids.get(&self.sym.node()).copied().unwrap_or(0) as u64
    }
}

// ---- StateMachineElement escape hatches -----------------------------------
//
// The element's name and location are not native fields: `name` projects
// `get_unqualified_name`, and `loc` resolves the element's node id to a source
// location (via `ModelData::loc`, whose `run_ref` scope reads the node's span).
// `__repr__` renders the kind discriminant (not a public getter). The
// macro generates the base/subclasses, `dispatch`, `build_state_machine_element`,
// `state_machine_element_ref`, the `StateMachineElement` alias, and each
// subclass's concrete `definition` getter.

impl StateMachineElement {
    /// The element-kind name, for `__repr__` only (the public discriminant is the
    /// concrete subclass identity / `StateMachineElement` union alias).
    fn kind_name(&self) -> &'static str {
        match &self.native {
            SmSymbol::Action(_) => "Action",
            SmSymbol::Guard(_) => "Guard",
            SmSymbol::Choice(_) => "Choice",
            SmSymbol::Signal(_) => "Signal",
            SmSymbol::State(_) => "State",
        }
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl StateMachineElement {
    #[getter]
    fn name(&self) -> String {
        self.native.get_unqualified_name().to_string()
    }
    #[getter]
    fn loc(&self) -> Option<crate::ir_core::Loc> {
        // The element's `get_span()` reads the compiler context (node -> span), so
        // it must run inside a `run_ref` scope: resolve via the node id, and let
        // `ModelData::loc` take the span inside its own scope.
        self.data.loc(self.native.node())
    }
    fn __repr__(&self) -> String {
        format!(
            "<StateMachineElement {} '{}'>",
            self.kind_name(),
            self.native.get_unqualified_name()
        )
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
// endpoints carry the connection's resolved port numbers into a fresh `Endpoint`.

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
        match &self_.as_super().pi {
            SemPortInstance::General { kind, .. } => Some(GeneralKind::from(kind)),
            _ => None,
        }
    }
    #[getter]
    fn priority(self_: PyRef<'_, Self>) -> Option<i128> {
        match &self_.as_super().pi {
            SemPortInstance::General {
                kind: SemGeneralKind::AsyncInput { priority, .. },
                ..
            } => *priority,
            _ => None,
        }
    }
    #[getter]
    fn queue_full(self_: PyRef<'_, Self>) -> Option<crate::ast::QueueFull> {
        match &self_.as_super().pi {
            SemPortInstance::General {
                kind: SemGeneralKind::AsyncInput { queue_full, .. },
                ..
            } => Some(crate::ast::QueueFull::from(queue_full)),
            _ => None,
        }
    }
    #[getter]
    fn is_serial(self_: PyRef<'_, Self>) -> bool {
        matches!(
            self_.as_super().pi.get_type(),
            Some(PortInstanceType::Serial)
        )
    }
    /// The port-definition symbol for a typed port, else None (serial).
    #[getter]
    fn type_symbol(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Option<SymbolRef>> {
        let base = self_.as_super();
        match base.pi.get_type() {
            Some(PortInstanceType::DefPort(sym)) if base.data.ids.contains_key(&sym.node()) => {
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
    /// keyword; `source` is an alias.
    #[getter]
    fn from_(&self, py: Python<'_>) -> PyResult<Py<Endpoint>> {
        Endpoint::build(&self.model, py, self.conn.from.clone(), self.from_pn)
    }
    #[getter]
    fn source(&self, py: Python<'_>) -> PyResult<Py<Endpoint>> {
        Endpoint::build(&self.model, py, self.conn.from.clone(), self.from_pn)
    }
    /// The input (destination) endpoint.
    #[getter]
    fn to(&self, py: Python<'_>) -> PyResult<Py<Endpoint>> {
        Endpoint::build(&self.model, py, self.conn.to.clone(), self.to_pn)
    }
    #[getter]
    fn target(&self, py: Python<'_>) -> PyResult<Py<Endpoint>> {
        Endpoint::build(&self.model, py, self.conn.to.clone(), self.to_pn)
    }
}

// ---- top-level symbol-keyed entity escape hatches -------------------------
//
// These read the `pub(crate)` fields (`data`/`model`/`sym`) and the `native()`
// accessor of the symbol-keyed entities generated in `crate::sem::defs_manual`.
// They are the members that cannot be produced mechanically by the `symbol_keyed`
// handle: the sorted nested-entity maps (built with per-element extras), the
// `DefComponentInstance` attribute + constant-fold reads, the `run_ref`
// connection-number resolution, the cross-layer symbol resolvers, the sym-derived
// `name`/`qualified_name`, `kind`, and the state-machine element/state walks.

/// The constant-folded integer value of an AST expression node, if it folds to
/// one. Used to forward instance attributes (queue/stack/priority/cpu) that the
/// analysis validates then discards but the AST retains.
fn resolved_int(data: &ModelData, node: Node) -> Option<i128> {
    match data.analysis.value_map.get(&node) {
        Some(SemValue::Integer(i)) => Some(i.0),
        Some(SemValue::PrimitiveInteger(p)) => Some(p.value),
        _ => None,
    }
}

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
        ComponentKind::from(&self.native().node.kind)
    }
    /// The commands, ordered by opcode.
    #[getter]
    fn commands(&self, py: Python<'_>) -> PyResult<Vec<Py<Command>>> {
        let mut items: Vec<_> = self.native().command_map.iter().collect();
        items.sort_by_key(|(op, _)| **op);
        items
            .into_iter()
            .map(|(op, cmd)| Command::build(&self.model, py, cmd.clone(), *op))
            .collect()
    }
    /// The telemetry channels, ordered by id.
    #[getter]
    fn telemetry(&self, py: Python<'_>) -> PyResult<Vec<Py<TlmChannel>>> {
        let mut items: Vec<_> = self.native().tlm_channel_map.iter().collect();
        items.sort_by_key(|(id, _)| **id);
        items
            .into_iter()
            .map(|(id, t)| TlmChannel::build(&self.model, py, t.clone(), *id))
            .collect()
    }
    /// The events, ordered by id.
    #[getter]
    fn events(&self, py: Python<'_>) -> PyResult<Vec<Py<Event>>> {
        let mut items: Vec<_> = self.native().event_map.iter().collect();
        items.sort_by_key(|(id, _)| **id);
        items
            .into_iter()
            .map(|(id, e)| Event::build(&self.model, py, e.clone(), *id))
            .collect()
    }
    /// The parameters, ordered by id.
    #[getter]
    fn params(&self, py: Python<'_>) -> PyResult<Vec<Py<Param>>> {
        let mut items: Vec<_> = self.native().param_map.iter().collect();
        items.sort_by_key(|(id, _)| **id);
        items
            .into_iter()
            .map(|(id, p)| Param::build(&self.model, py, p.clone(), *id))
            .collect()
    }
    /// The data-product containers, ordered by id.
    #[getter]
    fn containers(&self, py: Python<'_>) -> PyResult<Vec<Py<Container>>> {
        let mut items: Vec<_> = self.native().container_map.iter().collect();
        items.sort_by_key(|(id, _)| **id);
        items
            .into_iter()
            .map(|(id, ct)| Container::build(&self.model, py, ct.clone(), *id))
            .collect()
    }
    /// The data-product records, ordered by id.
    #[getter]
    fn records(&self, py: Python<'_>) -> PyResult<Vec<Py<Record>>> {
        let mut items: Vec<_> = self.native().record_map.iter().collect();
        items.sort_by_key(|(id, _)| **id);
        items
            .into_iter()
            .map(|(id, r)| Record::build(&self.model, py, r.clone(), *id))
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
            .port_matching_list
            .iter()
            .map(|pm| PortMatching::build(&self.model, py, pm.clone()))
            .collect()
    }
    fn __repr__(&self) -> String {
        format!("<Component '{}'>", self.qualified_name())
    }
}

// ---- ComponentInstance ----------------------------------------------------

impl ComponentInstance {
    /// The instance's `DefComponentInstance` AST node (retains the attributes
    /// the analysis validates then discards: queue/stack/priority/cpu/impl/file).
    fn def(&self) -> &fpp_ast::DefComponentInstance {
        self.data
            .node_as::<fpp_ast::DefComponentInstance>(self.sym.node())
    }
    /// Forward a constant-folded integer attribute from the AST.
    fn attr_int(
        &self,
        f: impl Fn(&fpp_ast::DefComponentInstance) -> Option<&fpp_ast::Expr>,
    ) -> Option<i128> {
        f(self.def()).and_then(|e| resolved_int(&self.data, e.node_id))
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl ComponentInstance {
    /// Declared queue size (constant-folded), if any.
    #[getter]
    fn queue_size(&self) -> Option<i128> {
        self.attr_int(|d| d.queue_size.as_ref())
    }
    /// Declared stack size (constant-folded), if any.
    #[getter]
    fn stack_size(&self) -> Option<i128> {
        self.attr_int(|d| d.stack_size.as_ref())
    }
    /// Declared priority (constant-folded), if any.
    #[getter]
    fn priority(&self) -> Option<i128> {
        self.attr_int(|d| d.priority.as_ref())
    }
    /// Declared CPU affinity (constant-folded), if any.
    #[getter]
    fn cpu(&self) -> Option<i128> {
        self.attr_int(|d| d.cpu.as_ref())
    }
    /// The C++ implementation type name, if given.
    #[getter]
    fn impl_type(&self) -> Option<String> {
        self.def().impl_type.as_ref().map(|s| s.data.clone())
    }
    /// The header file, if given.
    #[getter]
    fn file(&self) -> Option<String> {
        self.def().file.as_ref().map(|s| s.data.clone())
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
        let mut items: Vec<_> = self.native().init_specifier_map.values().collect();
        items.sort_by_key(|s| s.phase);
        items
            .into_iter()
            .map(|s| InitSpecifier::build(&self.model, py, s.clone()))
            .collect()
    }
    fn __repr__(&self) -> String {
        format!("<ComponentInstance '{}'>", self.native().qualified_name)
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
    fn __repr__(&self) -> String {
        format!("<Interface '{}'>", self.qualified_name())
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
    fn __repr__(&self) -> String {
        format!("<System '{}'>", self.qualified_name())
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
    /// The connections of this topology (across all connection graphs).
    fn connections(&self, py: Python<'_>) -> PyResult<Vec<Py<Connection>>> {
        let top = self.native();
        // Resolve all port numbers up front inside one `run_ref`: the lookup keys
        // on `Connection`, whose `Ord`/`Hash` reads span files through the live
        // context. Then zip them back on by position (iteration order is stable).
        let pns: Vec<(Option<i128>, Option<i128>)> = fpp_core::run_ref(&self.data.ctx, || {
            let mut v = Vec::new();
            for conns in top.connection_map.values() {
                for conn in conns {
                    let from_pn = top
                        .from_port_number_map
                        .get(conn)
                        .copied()
                        .or(conn.from.port_number);
                    let to_pn = top
                        .to_port_number_map
                        .get(conn)
                        .copied()
                        .or(conn.to.port_number);
                    v.push((from_pn, to_pn));
                }
            }
            v
        });
        let mut out = Vec::new();
        let mut idx = 0usize;
        for (graph_name, conns) in &top.connection_map {
            for conn in conns {
                let (from_pn, to_pn) = pns
                    .get(idx)
                    .copied()
                    .unwrap_or((conn.from.port_number, conn.to.port_number));
                idx += 1;
                out.push(Connection::build(
                    &self.model,
                    py,
                    conn.clone(),
                    graph_name.clone(),
                    from_pn,
                    to_pn,
                )?);
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
    fn __repr__(&self) -> String {
        format!("<Topology '{}'>", self.native().name)
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
    fn kind(&self) -> crate::enums::StateMachineKind {
        crate::enums::StateMachineKind::from(&self.native().get_kind())
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
        SemStateMachine::get_leaf_states(&self.native().node)
            .iter()
            .map(|s| s.name.data.clone())
            .collect()
    }
    /// Whether a blocking analysis error was recorded for this state machine.
    #[getter]
    fn blocking_error(&self) -> bool {
        self.native().sma.blocking_error
    }
    fn __repr__(&self) -> String {
        format!("<StateMachine '{}'>", self.qualified_name())
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
