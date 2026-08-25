//! PyO3 wrappers for the entity layer: `Component`, `ComponentInstance`,
//! `Interface`, `PortInterface`, `PortInstance`, `Topology`, `Connection`,
//! `Endpoint`, `PortInstanceIdentifier`, `System`, `StateMachine`.
//!
//! Every wrapper reads the live `fpp_analysis::Analysis` directly. Top-level
//! entities (`Component`, `ComponentInstance`, `Interface`, `Topology`,
//! `System`, `StateMachine`) hold their defining `Symbol` and look up the
//! resolved entity map on each access. Nested entities (`PortInterface`,
//! `PortInstance`, `Connection`, `Endpoint`, `PortInstanceIdentifier`) hold a
//! cheap native `Clone` (all of these are `Clone`).
//!
//! Cross-entity references are resolved by symbol through the analysis maps.
//! Entity locations resolve through the node side-table (`Model::loc`); nested
//! sub-entity locations, whose native `loc` is a `Span`, resolve through the
//! `locs_by_span` index. Wrappers are built fresh on each access (like
//! `Symbol`/`Type`/`Value`); identity is value-based via `__eq__`.

use crate::ast::{
    AstNode, DefState, SpecCommand, SpecContainer, SpecEvent, SpecParam, SpecRecord,
    SpecStateMachineInstance, SpecTlmChannel,
};
use crate::enums::{CommandKind, Direction, GeneralKind, InstanceKind, StateMachineKind};
use crate::ir_core::{Loc, ModelData};
use crate::model::Model;
use crate::sem_py::{symbol_ref, type_ref, value_ref};
use crate::unions::{PortInstanceRef, StateMachineElementRef, SymbolRef, TypeRef, ValueRef};
use fpp_analysis::semantics::state_machine::{
    State as SemState, StateMachine as SemStateMachine, StateMachineSymbol as SmSymbol,
};
use fpp_analysis::semantics::{
    Command as SemCommand, CommandKind as SemCommandKind, Component as SemComponent,
    ComponentInstance as SemComponentInstance, Connection as SemConnection,
    Container as SemContainer, Endpoint as SemEndpoint, Event as SemEvent, FppSystem,
    GeneralKind as SemGeneralKind, InitSpecifier as SemInitSpecifier, Interface as SemInterface,
    InterfaceInstance, Param as SemParam, PortInstance as SemPortInstance,
    PortInstanceIdentifier as SemPii, PortInstanceType, PortInterface as SemPortInterface,
    PortMatching as SemPortMatching, Record as SemRecord, StateMachineInstance as SemSmi,
    Symbol as SemSymbol, SymbolInterface, TlmChannel as SemTlmChannel, Topology as SemTopology,
};
// The `AstNode` *trait* (`.id()`/`.node`) is imported anonymously so the name
// `AstNode` refers to the base pyclass imported above.
use fpp_ast::AstNode as _;
use fpp_core::Node;
use pyo3::prelude::*;
use pyo3_stub_gen::derive::{gen_stub_pyclass, gen_stub_pymethods};
use std::sync::Arc;

/// Build a thin element's `Spec*` AST node (bridged by its `loc` span) as the
/// concrete wrapper type `T` — the runtime object is exactly that type, so the
/// downcast is infallible in practice.
fn build_spec<T: pyo3::PyClass>(
    data: &ModelData,
    model: &Py<Model>,
    py: Python<'_>,
    span: fpp_core::Span,
) -> PyResult<Option<Py<T>>> {
    match data.node_of_span(span) {
        Some(n) => Ok(Some(
            Model::build(model, py, n)?
                .into_bound(py)
                .into_any()
                .downcast_into::<T>()?
                .unbind(),
        )),
        None => Ok(None),
    }
}

/// The constant-folded integer value of an AST expression node, if it folds to
/// one. Used to forward instance attributes (queue/stack/priority/cpu) that the
/// analysis validates then discards but the AST retains.
fn resolved_int(data: &ModelData, node: Node) -> Option<i128> {
    use fpp_analysis::semantics::Value as SemValue;
    match data.analysis.value_map.get(&node) {
        Some(SemValue::Integer(i)) => Some(i.0),
        Some(SemValue::PrimitiveInteger(p)) => Some(p.value),
        _ => None,
    }
}

// ---- build entry points ---------------------------------------------------
//
// The symbol-keyed entities and the nested wrappers (PortInterface,
// PortInstance + subclasses, PortInstanceIdentifier, Endpoint, Connection) all
// get their `build`/`build_*` constructors from the `#[symbol_entity]` /
// `#[semantic_wrapper]` attributes; the resolver helpers live there too.

/// The owning instance of a port identifier: a `ComponentInstance` or a
/// `Topology`. `IntoPyObject` hands back the concrete object; the stub renders
/// the precise `ComponentInstance | Topology` union.
pub struct InstanceRef(PyObject);
pyo3_stub_gen::impl_stub_type!(InstanceRef = ComponentInstance | Topology);
impl<'py> IntoPyObject<'py> for InstanceRef {
    type Target = PyAny;
    type Output = Bound<'py, PyAny>;
    type Error = std::convert::Infallible;
    fn into_pyobject(self, py: Python<'py>) -> Result<Self::Output, Self::Error> {
        Ok(self.0.into_bound(py))
    }
}

// ===========================================================================
// Component
// ===========================================================================

#[fpp_python_macros::symbol_entity(native = SemComponent, map = component_map, def = DefComponent)]
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
    fn kind(&self) -> crate::ast::ComponentKind {
        crate::ast::ComponentKind::from(&self.native().node.kind)
    }
    #[getter]
    fn port_interface(&self, py: Python<'_>) -> PyResult<Py<PortInterface>> {
        PortInterface::build(&self.model, py, self.native().port_interface.clone())
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

// ===========================================================================
// ComponentInstance
// ===========================================================================

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

#[fpp_python_macros::symbol_entity(native = SemComponentInstance, map = component_instance_map, def = DefComponentInstance)]
impl ComponentInstance {
    #[getter]
    fn name(&self) -> String {
        self.native().name.clone()
    }
    #[getter]
    fn qualified_name(&self) -> String {
        self.native().qualified_name.clone()
    }
    #[getter]
    fn base_id(&self) -> i128 {
        self.native().base_id
    }
    #[getter]
    fn max_id(&self) -> i128 {
        self.native().max_id
    }
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

// ===========================================================================
// Interface
// ===========================================================================

#[fpp_python_macros::symbol_entity(native = SemInterface, map = interface_map, def = DefInterface)]
impl Interface {
    #[getter]
    fn name(&self) -> String {
        self.sym.name().data.clone()
    }
    #[getter]
    fn qualified_name(&self) -> String {
        self.data.analysis.get_qualified_name(&self.sym)
    }
    #[getter]
    fn port_interface(&self, py: Python<'_>) -> PyResult<Py<PortInterface>> {
        PortInterface::build(&self.model, py, self.native().port_interface.clone())
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

// ===========================================================================
// PortInterface
// ===========================================================================

#[fpp_python_macros::semantic_wrapper(native = SemPortInterface, field = pif)]
pub struct PortInterface;

#[gen_stub_pymethods]
#[pymethods]
impl PortInterface {
    #[getter]
    fn instance_type(&self) -> String {
        self.pif.instance_type.clone()
    }
    #[getter]
    fn ports(&self, py: Python<'_>) -> PyResult<Vec<PortInstanceRef>> {
        let mut ports: Vec<&SemPortInstance> = self.pif.port_map.values().collect();
        ports.sort_by(|a, b| a.get_unqualified_name().cmp(b.get_unqualified_name()));
        ports
            .iter()
            .map(|pi| port_instance_ref(&self.model, py, pi))
            .collect()
    }
    #[getter]
    fn special_ports(&self, py: Python<'_>) -> PyResult<Vec<PortInstanceRef>> {
        let mut ports: Vec<&SemPortInstance> = self.pif.special_port_map.values().collect();
        ports.sort_by(|a, b| a.get_unqualified_name().cmp(b.get_unqualified_name()));
        ports
            .iter()
            .map(|pi| port_instance_ref(&self.model, py, pi))
            .collect()
    }
    fn __repr__(&self) -> String {
        format!(
            "<PortInterface {} ports={}>",
            self.pif.instance_type,
            self.pif.port_map.len()
        )
    }
}

// ===========================================================================
// PortInstance
// ===========================================================================

/// A port instance. The concrete subclass reflects the variant
/// (`GeneralPortInstance`, `SpecialPortInstance`, `InternalPortInstance`,
/// `TopologyPortInstance`); the shared fields live on the base.
#[fpp_python_macros::semantic_wrapper(
    native = SemPortInstance,
    field = pi,
    subclasses(
        General => GeneralPortInstance,
        Special => SpecialPortInstance,
        Internal => InternalPortInstance,
        Topology => TopologyPortInstance
    )
)]
pub struct PortInstance;

impl PortInstance {
    /// The variant name, for `__repr__` only (the public discriminant is the
    /// concrete subclass identity / union alias, not a string).
    fn variant_name(&self) -> &'static str {
        match self.pi {
            SemPortInstance::General { .. } => "General",
            SemPortInstance::Special { .. } => "Special",
            SemPortInstance::Internal { .. } => "Internal",
            SemPortInstance::Topology { .. } => "Topology",
        }
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl PortInstance {
    #[getter]
    fn name(&self) -> String {
        self.pi.get_unqualified_name().to_string()
    }
    #[getter]
    fn loc(&self) -> Option<Loc> {
        self.data.loc_of_span(self.pi.get_loc())
    }
    /// Port direction, if any.
    #[getter]
    fn direction(&self) -> Option<Direction> {
        self.pi.get_direction().map(|d| Direction::from(&d))
    }
    #[getter]
    fn array_size(&self) -> i128 {
        self.pi.get_array_size()
    }
    /// Whether this port dispatches asynchronously.
    #[getter]
    fn is_async_input(&self) -> bool {
        self.pi.is_async_input()
    }
    /// Locations of the interface-import specs that pulled this port in.
    #[getter]
    fn import_locs(&self) -> Vec<Loc> {
        self.pi
            .get_import_locs()
            .iter()
            .filter_map(|s| self.data.loc_of_span(*s))
            .collect()
    }
    fn __repr__(&self) -> String {
        format!("<PortInstance {} '{}'>", self.variant_name(), self.name())
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
impl SpecialPortInstance {
    /// Special port kind (e.g. telemetry, command recv).
    #[getter]
    fn special_kind(self_: PyRef<'_, Self>) -> Option<crate::ast::SpecialPortInstanceKind> {
        self_
            .as_super()
            .pi
            .get_special_kind()
            .map(|k| crate::ast::SpecialPortInstanceKind::from(&k))
    }
    #[getter]
    fn priority(self_: PyRef<'_, Self>) -> Option<i128> {
        match &self_.as_super().pi {
            SemPortInstance::Special { priority, .. } => *priority,
            _ => None,
        }
    }
    #[getter]
    fn queue_full(self_: PyRef<'_, Self>) -> Option<crate::ast::QueueFull> {
        match &self_.as_super().pi {
            SemPortInstance::Special { queue_full, .. } => {
                queue_full.as_ref().map(crate::ast::QueueFull::from)
            }
            _ => None,
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
    #[getter]
    fn priority(self_: PyRef<'_, Self>) -> Option<i128> {
        match &self_.as_super().pi {
            SemPortInstance::Internal { priority, .. } => *priority,
            _ => None,
        }
    }
    #[getter]
    fn queue_full(self_: PyRef<'_, Self>) -> Option<crate::ast::QueueFull> {
        match &self_.as_super().pi {
            SemPortInstance::Internal { queue_full, .. } => {
                Some(crate::ast::QueueFull::from(queue_full))
            }
            _ => None,
        }
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl TopologyPortInstance {
    /// The underlying aliased port instance.
    #[getter]
    fn underlying(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Option<PortInstanceRef>> {
        let base = self_.as_super();
        match &base.pi {
            SemPortInstance::Topology { underlying, .. } => {
                Ok(Some(port_instance_ref(&base.model, py, underlying)?))
            }
            _ => Ok(None),
        }
    }
}

// ===========================================================================
// PortInstanceIdentifier
// ===========================================================================

#[fpp_python_macros::semantic_wrapper(native = SemPii, field = pid)]
pub struct PortInstanceIdentifier;

#[gen_stub_pymethods]
#[pymethods]
impl PortInstanceIdentifier {
    #[getter]
    fn qualified_name(&self) -> String {
        self.pid.qualified_name()
    }
    /// Fully-qualified name of the owning interface instance.
    #[getter]
    fn instance_name(&self) -> String {
        self.pid.interface_instance.qualified_name()
    }
    #[getter]
    fn port_name(&self) -> String {
        self.pid.port_instance.get_unqualified_name().to_string()
    }
    /// Whether the owning instance is a component instance or a topology.
    #[getter]
    fn instance_kind(&self) -> InstanceKind {
        InstanceKind::from(&self.pid.interface_instance)
    }
    #[getter]
    fn port_instance(&self, py: Python<'_>) -> PyResult<PortInstanceRef> {
        port_instance_ref(&self.model, py, &self.pid.port_instance)
    }
    /// The owning `ComponentInstance` (or `Topology` for topology instances).
    #[getter]
    fn instance(&self, py: Python<'_>) -> PyResult<Option<InstanceRef>> {
        match &self.pid.interface_instance {
            InterfaceInstance::Topology(t) => {
                Ok(
                    topology_by_symbol(&self.data, &self.model, py, Some(&t.symbol))?
                        .map(|o| InstanceRef(o.into_any())),
                )
            }
            InterfaceInstance::Component(ci) => {
                let sym = self.data.by_qualified_name.get(&ci.qualified_name).cloned();
                Ok(
                    component_instance_by_symbol(&self.data, &self.model, py, sym.as_ref())?
                        .map(|o| InstanceRef(o.into_any())),
                )
            }
        }
    }
    fn __repr__(&self) -> String {
        format!("<PortInstanceIdentifier '{}'>", self.pid.qualified_name())
    }
}

// ===========================================================================
// Endpoint
// ===========================================================================

#[fpp_python_macros::semantic_wrapper(native = SemEndpoint, field = ep)]
pub struct Endpoint {
    port_number: Option<i128>,
}

#[gen_stub_pymethods]
#[pymethods]
impl Endpoint {
    #[getter]
    fn loc(&self) -> Option<Loc> {
        self.data.loc_of_span(self.ep.loc)
    }
    #[getter]
    fn port(&self, py: Python<'_>) -> PyResult<Py<PortInstanceIdentifier>> {
        PortInstanceIdentifier::build(&self.model, py, self.ep.port.clone())
    }
    #[getter]
    fn port_number(&self) -> Option<i128> {
        self.port_number
    }
    fn __repr__(&self) -> String {
        format!(
            "<Endpoint '{}'{}>",
            self.ep.port.qualified_name(),
            match self.port_number {
                Some(n) => format!("[{}]", n),
                None => String::new(),
            }
        )
    }
}

// ===========================================================================
// Connection
// ===========================================================================

#[fpp_python_macros::semantic_wrapper(native = SemConnection, field = conn)]
pub struct Connection {
    graph_name: String,
    from_pn: Option<i128>,
    to_pn: Option<i128>,
}

#[gen_stub_pymethods]
#[pymethods]
impl Connection {
    #[getter]
    fn graph_name(&self) -> String {
        self.graph_name.clone()
    }
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
    #[getter]
    fn is_unmatched(&self) -> bool {
        self.conn.is_unmatched
    }
    fn __repr__(&self) -> String {
        format!(
            "<Connection {} -> {}>",
            self.conn.from.port.qualified_name(),
            self.conn.to.port.qualified_name()
        )
    }
}

// ===========================================================================
// System
// ===========================================================================

#[fpp_python_macros::symbol_entity(native = FppSystem, map = system_map, def = DefSystem)]
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

// ===========================================================================
// Topology
// ===========================================================================

#[fpp_python_macros::symbol_entity(native = SemTopology, map = topology_map, def = DefTopology)]
impl Topology {
    #[getter]
    fn name(&self) -> String {
        self.native().name.clone()
    }
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
    /// The topology-level port interface (its exported top-level ports).
    #[getter]
    fn port_interface(&self, py: Python<'_>) -> PyResult<Py<PortInterface>> {
        PortInterface::build(&self.model, py, self.native().port_interface.clone())
    }
    fn __repr__(&self) -> String {
        format!("<Topology '{}'>", self.name())
    }
}

// ===========================================================================
// StateMachine
// ===========================================================================

#[fpp_python_macros::symbol_entity(native = SemStateMachine, map = state_machine_map, def = DefStateMachine)]
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
    fn kind(&self) -> StateMachineKind {
        StateMachineKind::from(&self.native().get_kind())
    }
    /// The actions, as typed elements.
    #[getter]
    fn actions(&self, py: Python<'_>) -> PyResult<Vec<StateMachineElementRef>> {
        self.native()
            .actions
            .iter()
            .map(|s| sm_element_ref(&self.model, py, s))
            .collect()
    }
    /// The guards, as typed elements.
    #[getter]
    fn guards(&self, py: Python<'_>) -> PyResult<Vec<StateMachineElementRef>> {
        self.native()
            .guards
            .iter()
            .map(|s| sm_element_ref(&self.model, py, s))
            .collect()
    }
    /// The signals, as typed elements.
    #[getter]
    fn signals(&self, py: Python<'_>) -> PyResult<Vec<StateMachineElementRef>> {
        self.native()
            .signals
            .iter()
            .map(|s| sm_element_ref(&self.model, py, s))
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

// ---- state-machine symbols & states ---------------------------------------

/// A definition inside a state machine. The concrete subclass reflects the kind
/// (`SmAction`, `SmGuard`, `SmSignal`, `SmState`, `SmChoice`); the shared fields
/// live on the base.
#[fpp_python_macros::semantic_wrapper(native = SmSymbol, subclasses(
    Action => SmAction,
    Guard => SmGuard,
    Signal => SmSignal,
    State => SmState,
    Choice => SmChoice,
))]
pub struct StateMachineElement;

impl StateMachineElement {
    /// The element-kind name, for `__repr__` only (the public discriminant is the
    /// concrete subclass identity / union alias).
    fn kind_name(&self) -> &'static str {
        match &self.native {
            SmSymbol::Action(_) => "Action",
            SmSymbol::Guard(_) => "Guard",
            SmSymbol::Signal(_) => "Signal",
            SmSymbol::State(_) => "State",
            SmSymbol::Choice(_) => "Choice",
        }
    }
    /// The declared payload-type node of an action/guard/signal, if any.
    fn payload_type_node(&self) -> Option<Node> {
        match &self.native {
            SmSymbol::Action(d) => d.type_name.as_ref().map(|t| t.node_id),
            SmSymbol::Guard(d) => d.type_name.as_ref().map(|t| t.node_id),
            SmSymbol::Signal(d) => d.type_name.as_ref().map(|t| t.node_id),
            _ => None,
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
    fn loc(&self) -> Option<Loc> {
        self.data.loc_of_span(self.native.get_span())
    }
    /// The defining AST node.
    #[getter]
    fn definition(&self, py: Python<'_>) -> PyResult<Py<AstNode>> {
        use fpp_analysis::semantics::SymbolInterface;
        Model::build(&self.model, py, self.native.node())
    }
    fn __repr__(&self) -> String {
        format!(
            "<StateMachineElement {} '{}'>",
            self.kind_name(),
            self.native.get_unqualified_name()
        )
    }
}

/// The declared payload type of an action/guard/signal, if any.
fn sm_element_type(base: &StateMachineElement, py: Python<'_>) -> PyResult<Option<TypeRef>> {
    match base.payload_type_node() {
        Some(n) => forward_type(&base.data, &base.model, py, n),
        None => Ok(None),
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl SmAction {
    /// The declared payload type, if any.
    #[getter]
    fn get_type(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Option<TypeRef>> {
        sm_element_type(self_.as_super(), py)
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl SmGuard {
    /// The declared payload type, if any.
    #[getter]
    fn get_type(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Option<TypeRef>> {
        sm_element_type(self_.as_super(), py)
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl SmSignal {
    /// The declared payload type, if any.
    #[getter]
    fn get_type(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Option<TypeRef>> {
        sm_element_type(self_.as_super(), py)
    }
}

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

// ===========================================================================
// Component sub-elements — typed wrappers replacing the former list[dict]s.
//
// The analysis structs are thin (loc + name + a few scalars); the rich detail
// (arg types, severity, format, limits, defaults) lives in the `Spec*` AST node,
// reachable via the `loc` span bridge (`element.loc == SpecNode.span()`). Each
// wrapper exposes its retained fields, a typed `.spec` cross-ref to that AST
// node (whose children carry `.resolved_type`/`.resolved_value`), and the
// high-value forwarded fields.
// ===========================================================================

/// Resolve a `Node`'s resolved type via the analysis `type_map`.
fn forward_type(
    data: &ModelData,
    model: &Py<Model>,
    py: Python<'_>,
    node: Node,
) -> PyResult<Option<TypeRef>> {
    match data.analysis.type_map.get(&node).cloned() {
        Some(ty) => Ok(Some(type_ref(model, py, ty)?)),
        None => Ok(None),
    }
}

/// Resolve a `Node`'s constant-folded value via the analysis `value_map`.
fn forward_value(
    data: &ModelData,
    model: &Py<Model>,
    py: Python<'_>,
    node: Node,
) -> PyResult<Option<ValueRef>> {
    match data.analysis.value_map.get(&node).cloned() {
        Some(ref v) => Ok(Some(value_ref(model, py, v)?)),
        None => Ok(None),
    }
}

/// Build a `PortInstance` (dispatched to its subclass) as the union ref.
fn port_instance_ref(
    model: &Py<Model>,
    py: Python<'_>,
    pi: &SemPortInstance,
) -> PyResult<PortInstanceRef> {
    Ok(PortInstanceRef(
        PortInstance::build(model, py, pi)?.into_any(),
    ))
}

/// Build a `StateMachineElement` (dispatched to its subclass) as the union ref.
fn sm_element_ref(
    model: &Py<Model>,
    py: Python<'_>,
    sym: &SmSymbol,
) -> PyResult<StateMachineElementRef> {
    Ok(StateMachineElementRef(
        StateMachineElement::build(model, py, sym)?.into_any(),
    ))
}

#[fpp_python_macros::semantic_wrapper(native = SemCommand)]
pub struct Command {
    opcode: i128,
}
#[gen_stub_pymethods]
#[pymethods]
impl Command {
    #[getter]
    fn opcode(&self) -> i128 {
        self.opcode
    }
    #[getter]
    fn name(&self) -> String {
        self.native.name.clone()
    }
    /// Dispatch kind, or None for a synthesized param set/save command.
    #[getter]
    fn kind(&self) -> Option<CommandKind> {
        self.native.kind.as_ref().map(CommandKind::from)
    }
    #[getter]
    fn priority(&self) -> Option<i128> {
        match &self.native.kind {
            Some(SemCommandKind::Async { priority, .. }) => *priority,
            _ => None,
        }
    }
    #[getter]
    fn queue_full(&self) -> Option<crate::ast::QueueFull> {
        match &self.native.kind {
            Some(SemCommandKind::Async { queue_full, .. }) => {
                Some(crate::ast::QueueFull::from(queue_full))
            }
            _ => None,
        }
    }
    #[getter]
    fn loc(&self) -> Option<Loc> {
        self.data.loc_of_span(self.native.loc)
    }
    /// The `SpecCommand` AST node (formal params, opcode expr, annotations).
    #[getter]
    fn spec(&self, py: Python<'_>) -> PyResult<Option<Py<SpecCommand>>> {
        build_spec::<SpecCommand>(&self.data, &self.model, py, self.native.loc)
    }
    fn __repr__(&self) -> String {
        format!("<Command 0x{:x} '{}'>", self.opcode, self.native.name)
    }
}

#[fpp_python_macros::semantic_wrapper(native = SemEvent)]
pub struct Event {
    id: i128,
}
#[gen_stub_pymethods]
#[pymethods]
impl Event {
    #[getter]
    fn id(&self) -> i128 {
        self.id
    }
    #[getter]
    fn name(&self) -> String {
        self.native.name.clone()
    }
    #[getter]
    fn loc(&self) -> Option<Loc> {
        self.data.loc_of_span(self.native.loc)
    }
    /// Event severity, from the AST spec.
    #[getter]
    fn severity(&self) -> Option<crate::ast::EventSeverity> {
        self.data.node_of_span(self.native.loc).map(|n| {
            crate::ast::EventSeverity::from(&self.data.node_as::<fpp_ast::SpecEvent>(n).severity)
        })
    }
    /// The event format string, from the AST spec.
    #[getter]
    fn format(&self) -> Option<String> {
        self.data.node_of_span(self.native.loc).map(|n| {
            self.data
                .node_as::<fpp_ast::SpecEvent>(n)
                .format
                .data
                .clone()
        })
    }
    /// The `SpecEvent` AST node (params, throttle, annotations).
    #[getter]
    fn spec(&self, py: Python<'_>) -> PyResult<Option<Py<SpecEvent>>> {
        build_spec::<SpecEvent>(&self.data, &self.model, py, self.native.loc)
    }
    fn __repr__(&self) -> String {
        format!("<Event {} '{}'>", self.id, self.native.name)
    }
}

#[fpp_python_macros::semantic_wrapper(native = SemParam)]
pub struct Param {
    id: i128,
}
#[gen_stub_pymethods]
#[pymethods]
impl Param {
    #[getter]
    fn id(&self) -> i128 {
        self.id
    }
    #[getter]
    fn name(&self) -> String {
        self.native.name.clone()
    }
    #[getter]
    fn set_opcode(&self) -> i128 {
        self.native.set_opcode
    }
    #[getter]
    fn save_opcode(&self) -> i128 {
        self.native.save_opcode
    }
    #[getter]
    fn is_external(&self) -> bool {
        self.native.is_external
    }
    #[getter]
    fn loc(&self) -> Option<Loc> {
        self.data.loc_of_span(self.native.loc)
    }
    /// The parameter's resolved type, from the AST spec.
    #[getter]
    fn get_type(&self, py: Python<'_>) -> PyResult<Option<TypeRef>> {
        let Some(n) = self.data.node_of_span(self.native.loc) else {
            return Ok(None);
        };
        let tn = self.data.node_as::<fpp_ast::SpecParam>(n).type_name.node_id;
        forward_type(&self.data, &self.model, py, tn)
    }
    /// The parameter's default value, if any.
    #[getter]
    fn default(&self, py: Python<'_>) -> PyResult<Option<ValueRef>> {
        let Some(n) = self.data.node_of_span(self.native.loc) else {
            return Ok(None);
        };
        match &self.data.node_as::<fpp_ast::SpecParam>(n).default {
            Some(e) => forward_value(&self.data, &self.model, py, e.node_id),
            None => Ok(None),
        }
    }
    #[getter]
    fn spec(&self, py: Python<'_>) -> PyResult<Option<Py<SpecParam>>> {
        build_spec::<SpecParam>(&self.data, &self.model, py, self.native.loc)
    }
    fn __repr__(&self) -> String {
        format!("<Param {} '{}'>", self.id, self.native.name)
    }
}

#[fpp_python_macros::semantic_wrapper(native = SemTlmChannel)]
pub struct TlmChannel {
    id: i128,
}
#[gen_stub_pymethods]
#[pymethods]
impl TlmChannel {
    #[getter]
    fn id(&self) -> i128 {
        self.id
    }
    #[getter]
    fn name(&self) -> String {
        self.native.name.clone()
    }
    #[getter]
    fn loc(&self) -> Option<Loc> {
        self.data.loc_of_span(self.native.loc)
    }
    /// The channel's resolved type, from the AST spec.
    #[getter]
    fn get_type(&self, py: Python<'_>) -> PyResult<Option<TypeRef>> {
        let Some(n) = self.data.node_of_span(self.native.loc) else {
            return Ok(None);
        };
        let tn = self
            .data
            .node_as::<fpp_ast::SpecTlmChannel>(n)
            .type_name
            .node_id;
        forward_type(&self.data, &self.model, py, tn)
    }
    /// The channel's format string, if specified.
    #[getter]
    fn format(&self) -> Option<String> {
        let n = self.data.node_of_span(self.native.loc)?;
        self.data
            .node_as::<fpp_ast::SpecTlmChannel>(n)
            .format
            .as_ref()
            .map(|f| f.data.clone())
    }
    /// The `SpecTlmChannel` AST node (limits, update kind, annotations).
    #[getter]
    fn spec(&self, py: Python<'_>) -> PyResult<Option<Py<SpecTlmChannel>>> {
        build_spec::<SpecTlmChannel>(&self.data, &self.model, py, self.native.loc)
    }
    fn __repr__(&self) -> String {
        format!("<TlmChannel {} '{}'>", self.id, self.native.name)
    }
}

#[fpp_python_macros::semantic_wrapper(native = SemRecord)]
pub struct Record {
    id: i128,
}
#[gen_stub_pymethods]
#[pymethods]
impl Record {
    #[getter]
    fn id(&self) -> i128 {
        self.id
    }
    #[getter]
    fn name(&self) -> String {
        self.native.name.clone()
    }
    #[getter]
    fn loc(&self) -> Option<Loc> {
        self.data.loc_of_span(self.native.loc)
    }
    /// The record's resolved element type, from the AST spec.
    #[getter]
    fn get_type(&self, py: Python<'_>) -> PyResult<Option<TypeRef>> {
        let Some(n) = self.data.node_of_span(self.native.loc) else {
            return Ok(None);
        };
        let tn = self
            .data
            .node_as::<fpp_ast::SpecRecord>(n)
            .record_type
            .node_id;
        forward_type(&self.data, &self.model, py, tn)
    }
    /// Whether the record is an array record.
    #[getter]
    fn is_array(&self) -> bool {
        self.data
            .node_of_span(self.native.loc)
            .map(|n| self.data.node_as::<fpp_ast::SpecRecord>(n).is_array)
            .unwrap_or(false)
    }
    #[getter]
    fn spec(&self, py: Python<'_>) -> PyResult<Option<Py<SpecRecord>>> {
        build_spec::<SpecRecord>(&self.data, &self.model, py, self.native.loc)
    }
    fn __repr__(&self) -> String {
        format!("<Record {} '{}'>", self.id, self.native.name)
    }
}

#[fpp_python_macros::semantic_wrapper(native = SemContainer)]
pub struct Container {
    id: i128,
}
#[gen_stub_pymethods]
#[pymethods]
impl Container {
    #[getter]
    fn id(&self) -> i128 {
        self.id
    }
    #[getter]
    fn name(&self) -> String {
        self.native.name.clone()
    }
    #[getter]
    fn loc(&self) -> Option<Loc> {
        self.data.loc_of_span(self.native.loc)
    }
    /// The `SpecContainer` AST node (default priority, annotations).
    #[getter]
    fn spec(&self, py: Python<'_>) -> PyResult<Option<Py<SpecContainer>>> {
        build_spec::<SpecContainer>(&self.data, &self.model, py, self.native.loc)
    }
    fn __repr__(&self) -> String {
        format!("<Container {} '{}'>", self.id, self.native.name)
    }
}

#[fpp_python_macros::semantic_wrapper(native = SemSmi)]
pub struct StateMachineInstance;
#[gen_stub_pymethods]
#[pymethods]
impl StateMachineInstance {
    #[getter]
    fn name(&self) -> String {
        self.native.name.clone()
    }
    #[getter]
    fn loc(&self) -> Option<Loc> {
        self.data.loc_of_span(self.native.loc)
    }
    /// The state machine this is an instance of.
    #[getter]
    fn state_machine(&self, py: Python<'_>) -> PyResult<Option<Py<StateMachine>>> {
        state_machine_by_symbol(&self.data, &self.model, py, Some(&self.native.symbol))
    }
    #[getter]
    fn spec(&self, py: Python<'_>) -> PyResult<Option<Py<SpecStateMachineInstance>>> {
        build_spec::<SpecStateMachineInstance>(&self.data, &self.model, py, self.native.loc)
    }
    fn __repr__(&self) -> String {
        format!("<StateMachineInstance '{}'>", self.native.name)
    }
}

#[fpp_python_macros::semantic_wrapper(native = SemPortMatching)]
pub struct PortMatching;
#[gen_stub_pymethods]
#[pymethods]
impl PortMatching {
    #[getter]
    fn instance1(&self, py: Python<'_>) -> PyResult<PortInstanceRef> {
        port_instance_ref(&self.model, py, &self.native.instance1)
    }
    #[getter]
    fn instance2(&self, py: Python<'_>) -> PyResult<PortInstanceRef> {
        port_instance_ref(&self.model, py, &self.native.instance2)
    }
    #[getter]
    fn loc(&self) -> Option<Loc> {
        self.data.loc_of_span(self.native.loc)
    }
    fn __repr__(&self) -> String {
        format!(
            "<PortMatching {} {}>",
            self.native.instance1.get_unqualified_name(),
            self.native.instance2.get_unqualified_name()
        )
    }
}

#[fpp_python_macros::semantic_wrapper(native = SemInitSpecifier)]
pub struct InitSpecifier;
#[gen_stub_pymethods]
#[pymethods]
impl InitSpecifier {
    #[getter]
    fn phase(&self) -> i128 {
        self.native.phase
    }
    #[getter]
    fn loc(&self) -> Option<Loc> {
        self.data.loc_of_span(self.native.loc)
    }
    fn __repr__(&self) -> String {
        format!("<InitSpecifier phase={}>", self.native.phase)
    }
}

pub fn register(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_class::<Command>()?;
    m.add_class::<Event>()?;
    m.add_class::<Param>()?;
    m.add_class::<TlmChannel>()?;
    m.add_class::<Record>()?;
    m.add_class::<Container>()?;
    m.add_class::<StateMachineInstance>()?;
    m.add_class::<PortMatching>()?;
    m.add_class::<InitSpecifier>()?;
    m.add_class::<Component>()?;
    m.add_class::<ComponentInstance>()?;
    m.add_class::<Interface>()?;
    m.add_class::<PortInterface>()?;
    m.add_class::<PortInstance>()?;
    m.add_class::<GeneralPortInstance>()?;
    m.add_class::<SpecialPortInstance>()?;
    m.add_class::<InternalPortInstance>()?;
    m.add_class::<TopologyPortInstance>()?;
    m.add_class::<PortInstanceIdentifier>()?;
    m.add_class::<Endpoint>()?;
    m.add_class::<Connection>()?;
    m.add_class::<System>()?;
    m.add_class::<Topology>()?;
    m.add_class::<StateMachine>()?;
    m.add_class::<StateMachineElement>()?;
    m.add_class::<SmAction>()?;
    m.add_class::<SmGuard>()?;
    m.add_class::<SmSignal>()?;
    m.add_class::<SmState>()?;
    m.add_class::<SmChoice>()?;
    m.add_class::<State>()?;
    Ok(())
}
