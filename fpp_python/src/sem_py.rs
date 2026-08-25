//! PyO3 wrappers for the semantic layer: `Symbol`, `Type`, `Value`, and the
//! `build_*` entry points used by node getters (`.definition`,
//! `.resolved_type`, `.resolved_value`) and `Model.lookup`.
//!
//! Each of `Symbol`, `Type` and `Value` is a base `#[pyclass(subclass)]` holding
//! a NATIVE handle read directly out of the live `fpp_analysis::Analysis`:
//! `Symbol` holds a `fpp_analysis::Symbol` (`Clone`), `Type` an
//! `Arc<fpp_analysis::Type>` (cloned cheaply out of `type_map`), and `Value` a
//! `fpp_analysis::Value` (`Clone`, cloned out of `value_map`). No owned mirror
//! is copied. Each base has one `#[pyclass(extends=Base)]` subclass per native
//! variant; the subclasses are unit structs whose variant-specific getters read
//! the base via `self_.as_super()`. Consumers discriminate with `isinstance` /
//! `match` instead of a `.kind` string, and each subclass exposes only its real
//! fields.

use crate::ast::AstNode;
use crate::ir_core::ModelData;
use crate::model::Model;
use fpp_analysis::semantics::{
    Symbol as SemSymbol, SymbolInterface, Type as SemType, Value as SemValue,
};
use fpp_ast::{FloatKind, IntegerKind};
use pyo3::PyClass;
use pyo3::prelude::*;
use pyo3_stub_gen::derive::gen_stub_pymethods;
use std::collections::BTreeMap;
use std::sync::Arc;

fn model_data(model: &Py<Model>, py: Python<'_>) -> Arc<ModelData> {
    model.borrow(py).data.clone()
}

/// Read the single native variant a subclass wraps. Every subclass is only ever
/// built (by the generated `dispatch`) for its own variant, so any other is
/// genuinely unreachable — this collapses the `match … _ => unreachable!()` that
/// every variant-specific getter would otherwise repeat.
macro_rules! variant {
    ($scrutinee:expr, $pat:pat => $body:expr $(,)?) => {
        match $scrutinee {
            $pat => $body,
            _ => unreachable!(),
        }
    };
}

// ---- integer/float kind helpers (formerly in `sem_lower`) -----------------

fn ikind_str(k: &IntegerKind) -> String {
    format!("{:?}", k)
}

fn ikind_signed(k: &IntegerKind) -> bool {
    use IntegerKind::*;
    matches!(k, I8 | I16 | I32 | I64)
}

fn ikind_bits(k: &IntegerKind) -> u32 {
    use IntegerKind::*;
    match k {
        U8 | I8 => 8,
        U16 | I16 => 16,
        U32 | I32 => 32,
        U64 | I64 => 64,
    }
}

fn fkind_str(k: &FloatKind) -> String {
    format!("{:?}", k)
}

fn fkind_bits(k: &FloatKind) -> u32 {
    match k {
        FloatKind::F32 => 32,
        FloatKind::F64 => 64,
    }
}

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

fn value_kind_name(v: &SemValue) -> &'static str {
    match v {
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

pub fn build_symbol(model: &Py<Model>, py: Python<'_>, sym: SemSymbol) -> PyResult<Py<Symbol>> {
    let data = model_data(model, py);
    let base = Symbol {
        data,
        model: model.clone_ref(py),
        sym: sym.clone(),
    };
    Symbol::dispatch(base, py, &sym)
}

pub fn build_type(model: &Py<Model>, py: Python<'_>, ty: Arc<SemType>) -> PyResult<Py<Type>> {
    let data = model_data(model, py);
    // The synthetic "unknown" type (a named type whose def node was never
    // recorded during the walk) is exposed as the bare base `Type` with kind
    // "Unknown", matching the previous mirror's dedicated unknown variant.
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

pub fn build_value(model: &Py<Model>, py: Python<'_>, v: &SemValue) -> PyResult<Py<Value>> {
    let base = Value {
        model: model.clone_ref(py),
        val: v.clone(),
    };
    Value::dispatch(base, py, v)
}

// ===========================================================================
// Symbol
// ===========================================================================

/// A resolved symbol. The concrete subclass reflects the symbol's kind
/// (`ComponentSymbol`, `PortSymbol`, ...); navigation and identity live here.
#[fpp_python_macros::semantic_subclasses(over = SemSymbol, variants(
    AbsType => AbsTypeSymbol,
    AliasType => AliasTypeSymbol,
    Array => ArraySymbol,
    Component => ComponentSymbol,
    ComponentInstance => ComponentInstanceSymbol,
    Constant => ConstantSymbol,
    Enum => EnumSymbol,
    EnumConstant => EnumConstantSymbol,
    Interface => InterfaceSymbol,
    Module => ModuleSymbol,
    Port => PortSymbol,
    StateMachine => StateMachineSymbol,
    Struct => StructSymbol,
    System => SystemSymbol,
    Topology => TopologySymbol,
))]
pub struct Symbol {
    data: Arc<ModelData>,
    model: Py<Model>,
    sym: SemSymbol,
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
    fn kind(&self) -> &'static str {
        symbol_kind(&self.sym)
    }
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
    fn is_dictionary_def(&self) -> bool {
        self.sym.is_dictionary_def()
    }
    /// The defining AST node wrapper.
    #[getter]
    fn definition(&self, py: Python<'_>) -> PyResult<Py<AstNode>> {
        Model::build(&self.model, py, self.sym.node())
    }
    #[getter]
    fn parent(&self, py: Python<'_>) -> PyResult<Option<Py<Symbol>>> {
        match self.data.analysis.parent_symbol_map.get(&self.sym) {
            Some(p) if self.data.ids.contains_key(&p.node()) => {
                Ok(Some(build_symbol(&self.model, py, p.clone())?))
            }
            _ => Ok(None),
        }
    }

    /// The `Component` entity this symbol defines, or None.
    fn as_component(&self, py: Python<'_>) -> PyResult<Option<Py<crate::entities_py::Component>>> {
        self.as_entity(
            py,
            |a, s| a.component_map.contains_key(s),
            crate::entities_py::build_component,
        )
    }
    /// The `ComponentInstance` entity this symbol defines, or None.
    fn as_component_instance(
        &self,
        py: Python<'_>,
    ) -> PyResult<Option<Py<crate::entities_py::ComponentInstance>>> {
        self.as_entity(
            py,
            |a, s| a.component_instance_map.contains_key(s),
            crate::entities_py::build_component_instance,
        )
    }
    /// The `Interface` entity this symbol defines, or None.
    fn as_interface(&self, py: Python<'_>) -> PyResult<Option<Py<crate::entities_py::Interface>>> {
        self.as_entity(
            py,
            |a, s| a.interface_map.contains_key(s),
            crate::entities_py::build_interface,
        )
    }
    /// The `Topology` entity this symbol defines, or None.
    fn as_topology(&self, py: Python<'_>) -> PyResult<Option<Py<crate::entities_py::Topology>>> {
        self.as_entity(
            py,
            |a, s| a.topology_map.contains_key(s),
            crate::entities_py::build_topology,
        )
    }
    /// The `System` entity this symbol defines, or None.
    fn as_system(&self, py: Python<'_>) -> PyResult<Option<Py<crate::entities_py::System>>> {
        self.as_entity(
            py,
            |a, s| a.system_map.contains_key(s),
            crate::entities_py::build_system,
        )
    }
    /// The `StateMachine` entity this symbol defines, or None.
    fn as_state_machine(
        &self,
        py: Python<'_>,
    ) -> PyResult<Option<Py<crate::entities_py::StateMachine>>> {
        self.as_entity(
            py,
            |a, s| a.state_machine_map.contains_key(s),
            crate::entities_py::build_state_machine,
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

// ===========================================================================
// Type
// ===========================================================================

/// A structurally-interned type. The concrete subclass reflects the type's
/// shape (`ArrayType`, `EnumType`, ...); `.kind`, the `is_*` predicates,
/// `.definition` and identity live on the base.
#[fpp_python_macros::semantic_subclasses(over = SemType, variants(
    PrimitiveInt => PrimitiveIntType,
    Float => FloatType,
    Boolean => BooleanType,
    Integer => IntegerType,
    String => StringType,
    AbsType => AbsType,
    AliasType => AliasType,
    Array => ArrayType,
    AnonArray => AnonArrayType,
    Enum => EnumType,
    Struct => StructType,
    AnonStruct => AnonStructType,
))]
pub struct Type {
    data: Arc<ModelData>,
    model: Py<Model>,
    ty: Arc<SemType>,
}

impl Type {
    fn t(&self) -> &SemType {
        &self.ty
    }
    /// Whether this is the synthetic "unknown" type: a named type whose def
    /// node was never recorded during the walk.
    fn is_unknown(&self) -> bool {
        match self.ty.def_node_id() {
            Some(n) => !self.data.ids.contains_key(&n),
            None => false,
        }
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl Type {
    #[getter]
    fn kind(&self) -> &'static str {
        if self.is_unknown() {
            return "Unknown";
        }
        match self.t() {
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
    #[getter]
    fn is_int(&self) -> bool {
        matches!(self.t(), SemType::PrimitiveInt(_) | SemType::Integer)
    }
    #[getter]
    fn is_float(&self) -> bool {
        matches!(self.t(), SemType::Float(_))
    }
    #[getter]
    fn is_numeric(&self) -> bool {
        matches!(
            self.t(),
            SemType::PrimitiveInt(_) | SemType::Integer | SemType::Float(_)
        )
    }
    #[getter]
    fn is_bool(&self) -> bool {
        matches!(self.t(), SemType::Boolean)
    }
    #[getter]
    fn is_string(&self) -> bool {
        matches!(self.t(), SemType::String(_))
    }
    #[getter]
    fn is_primitive(&self) -> bool {
        matches!(
            self.t(),
            SemType::PrimitiveInt(_) | SemType::Float(_) | SemType::Boolean
        )
    }
    #[getter]
    fn is_enum(&self) -> bool {
        matches!(self.t(), SemType::Enum(_))
    }
    #[getter]
    fn is_array(&self) -> bool {
        matches!(self.t(), SemType::Array(_) | SemType::AnonArray(_))
    }
    #[getter]
    fn is_struct(&self) -> bool {
        matches!(self.t(), SemType::Struct(_) | SemType::AnonStruct(_))
    }
    #[getter]
    fn is_abs_type(&self) -> bool {
        !self.is_unknown() && matches!(self.t(), SemType::AbsType(_))
    }
    #[getter]
    fn is_alias(&self) -> bool {
        matches!(self.t(), SemType::AliasType(_))
    }
    #[getter]
    fn is_displayable(&self) -> bool {
        matches!(
            self.t(),
            SemType::PrimitiveInt(_)
                | SemType::Integer
                | SemType::Float(_)
                | SemType::Boolean
                | SemType::String(_)
                | SemType::Enum(_)
        )
    }
    /// The defining AST node (for named types), else None.
    #[getter]
    fn definition(&self, py: Python<'_>) -> PyResult<Option<Py<AstNode>>> {
        match self.ty.def_node_id() {
            Some(n) if self.data.ids.contains_key(&n) => {
                Ok(Some(Model::build(&self.model, py, n)?))
            }
            _ => Ok(None),
        }
    }
    fn __repr__(&self) -> String {
        format!("<Type {}>", self.kind())
    }
    fn __eq__(&self, other: &Bound<'_, PyAny>) -> bool {
        match other.downcast::<Type>() {
            Ok(o) => {
                let o = o.borrow();
                SemType::identical(&self.ty, &o.ty)
            }
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

#[gen_stub_pymethods]
#[pymethods]
impl AbsType {
    /// The declared default value, if any.
    #[getter]
    fn default_value(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Option<Py<Value>>> {
        let base = self_.as_super();
        let d = variant!(base.t(), SemType::AbsType(a) => a.default_value.clone());
        match d {
            Some(av) => Ok(Some(build_value(&base.model, py, &SemValue::AbsType(av))?)),
            None => Ok(None),
        }
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl PrimitiveIntType {
    /// Integer representation kind, e.g. "U32".
    #[getter]
    fn rep_type(self_: PyRef<'_, Self>) -> String {
        variant!(self_.as_super().t(), SemType::PrimitiveInt(k) => ikind_str(k))
    }
    #[getter]
    fn signed(self_: PyRef<'_, Self>) -> bool {
        variant!(self_.as_super().t(), SemType::PrimitiveInt(k) => ikind_signed(k))
    }
    #[getter]
    fn bits(self_: PyRef<'_, Self>) -> u32 {
        variant!(self_.as_super().t(), SemType::PrimitiveInt(k) => ikind_bits(k))
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl FloatType {
    /// Float representation kind, e.g. "F32".
    #[getter]
    fn rep_type(self_: PyRef<'_, Self>) -> String {
        variant!(self_.as_super().t(), SemType::Float(k) => fkind_str(k))
    }
    #[getter]
    fn bits(self_: PyRef<'_, Self>) -> u32 {
        variant!(self_.as_super().t(), SemType::Float(k) => fkind_bits(k))
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl StringType {
    /// String size, if bounded.
    #[getter]
    fn size(self_: PyRef<'_, Self>) -> Option<i128> {
        variant!(self_.as_super().t(), SemType::String(size) => *size)
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl AliasType {
    /// The underlying type, following alias chains.
    #[getter]
    fn underlying(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Py<Type>> {
        let base = self_.as_super();
        let u = SemType::underlying_type(&base.ty);
        build_type(&base.model, py, u)
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl ArrayType {
    #[getter]
    fn array_size(self_: PyRef<'_, Self>) -> Option<i128> {
        variant!(self_.as_super().t(), SemType::Array(a) => a.anon_array.size.map(|s| s as i128))
    }
    #[getter]
    fn element_type(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Py<Type>> {
        let base = self_.as_super();
        let elt = variant!(base.t(), SemType::Array(a) => a.anon_array.elt_type.clone());
        build_type(&base.model, py, elt)
    }
    /// The declared default value, if any.
    #[getter]
    fn default(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Option<Py<Value>>> {
        let base = self_.as_super();
        let d = variant!(base.t(), SemType::Array(a) => a.default.clone());
        match d {
            Some(v) => Ok(Some(build_value(&base.model, py, &v)?)),
            None => Ok(None),
        }
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl AnonArrayType {
    #[getter]
    fn array_size(self_: PyRef<'_, Self>) -> Option<i128> {
        variant!(self_.as_super().t(), SemType::AnonArray(a) => a.size.map(|s| s as i128))
    }
    #[getter]
    fn element_type(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Py<Type>> {
        let base = self_.as_super();
        let elt = variant!(base.t(), SemType::AnonArray(a) => a.elt_type.clone());
        build_type(&base.model, py, elt)
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl EnumType {
    /// Integer representation kind, e.g. "I32".
    #[getter]
    fn rep_type(self_: PyRef<'_, Self>) -> String {
        variant!(self_.as_super().t(), SemType::Enum(e) => ikind_str(&e.rep_type))
    }
    #[getter]
    fn signed(self_: PyRef<'_, Self>) -> bool {
        variant!(self_.as_super().t(), SemType::Enum(e) => ikind_signed(&e.rep_type))
    }
    #[getter]
    fn bits(self_: PyRef<'_, Self>) -> u32 {
        variant!(self_.as_super().t(), SemType::Enum(e) => ikind_bits(&e.rep_type))
    }
    /// The declared default value, if any. (Enum constants are reachable via
    /// `.definition`, the `DefEnum` AST node.)
    #[getter]
    fn default(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Option<Py<Value>>> {
        let base = self_.as_super();
        let d = variant!(base.t(), SemType::Enum(e) => e.default.clone());
        match d {
            Some(v) => Ok(Some(build_value(&base.model, py, &v)?)),
            None => Ok(None),
        }
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl StructType {
    #[getter]
    fn members(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<BTreeMap<String, Py<Type>>> {
        let base = self_.as_super();
        let members = variant!(base.t(), SemType::Struct(s) => &s.anon_struct.members);
        let mut out = BTreeMap::new();
        for (name, mty) in members {
            out.insert(name.clone(), build_type(&base.model, py, mty.clone())?);
        }
        Ok(out)
    }
    /// The declared default value, if any.
    #[getter]
    fn default(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Option<Py<Value>>> {
        let base = self_.as_super();
        let d = variant!(base.t(), SemType::Struct(s) => s.default.clone());
        match d {
            Some(sv) => Ok(Some(build_value(&base.model, py, &SemValue::Struct(sv))?)),
            None => Ok(None),
        }
    }
    /// Per-member array multiplicity (member name -> size).
    #[getter]
    fn member_sizes(self_: PyRef<'_, Self>) -> BTreeMap<String, u32> {
        variant!(self_.as_super().t(), SemType::Struct(s) => s.sizes.iter().map(|(k, v)| (k.clone(), *v)).collect())
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl AnonStructType {
    #[getter]
    fn members(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<BTreeMap<String, Py<Type>>> {
        let base = self_.as_super();
        let members = variant!(base.t(), SemType::AnonStruct(s) => &s.members);
        let mut out = BTreeMap::new();
        for (name, mty) in members {
            out.insert(name.clone(), build_type(&base.model, py, mty.clone())?);
        }
        Ok(out)
    }
}

// ===========================================================================
// Value
// ===========================================================================

/// A resolved (constant-folded) value. The concrete subclass reflects the value
/// kind (`IntegerValue`, `ArrayValue`, ...); `.kind` lives on the base.
#[fpp_python_macros::semantic_subclasses(over = SemValue, variants(
    Integer => IntegerValue,
    PrimitiveInteger => PrimitiveIntegerValue,
    Float => FloatValue,
    Boolean => BooleanValue,
    String => StringValue,
    EnumConstant => EnumConstantValue,
    Array => ArrayValue,
    AnonArray => AnonArrayValue,
    Struct => StructValue,
    AnonStruct => AnonStructValue,
    AbsType => AbsTypeValue,
))]
pub struct Value {
    model: Py<Model>,
    val: SemValue,
}

impl Value {
    fn v(&self) -> &SemValue {
        &self.val
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl Value {
    #[getter]
    fn kind(&self) -> &'static str {
        value_kind_name(&self.val)
    }
    fn __repr__(&self) -> String {
        format!("<Value {}>", value_kind_name(&self.val))
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl IntegerValue {
    #[getter]
    fn value(self_: PyRef<'_, Self>) -> i128 {
        variant!(self_.as_super().v(), SemValue::Integer(i) => i.0)
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl PrimitiveIntegerValue {
    #[getter]
    fn value(self_: PyRef<'_, Self>) -> i128 {
        variant!(self_.as_super().v(), SemValue::PrimitiveInteger(p) => p.value)
    }
    /// Integer representation kind, e.g. "U32".
    #[getter]
    fn rep_type(self_: PyRef<'_, Self>) -> String {
        variant!(self_.as_super().v(), SemValue::PrimitiveInteger(p) => ikind_str(&p.kind))
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl FloatValue {
    #[getter]
    fn value(self_: PyRef<'_, Self>) -> f64 {
        variant!(self_.as_super().v(), SemValue::Float(f) => f.value)
    }
    /// Float representation kind, e.g. "F32".
    #[getter]
    fn rep_type(self_: PyRef<'_, Self>) -> String {
        variant!(self_.as_super().v(), SemValue::Float(f) => fkind_str(&f.kind))
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl BooleanValue {
    #[getter]
    fn value(self_: PyRef<'_, Self>) -> bool {
        variant!(self_.as_super().v(), SemValue::Boolean(b) => b.0)
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl StringValue {
    #[getter]
    fn value(self_: PyRef<'_, Self>) -> String {
        variant!(self_.as_super().v(), SemValue::String(s) => s.0.clone())
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl EnumConstantValue {
    /// The enum-constant member name.
    #[getter]
    fn name(self_: PyRef<'_, Self>) -> String {
        variant!(self_.as_super().v(), SemValue::EnumConstant(e) => e.value.0.clone())
    }
    #[getter]
    fn value(self_: PyRef<'_, Self>) -> i128 {
        variant!(self_.as_super().v(), SemValue::EnumConstant(e) => e.value.1)
    }
    /// The enum type.
    #[getter]
    fn get_type(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Py<Type>> {
        let base = self_.as_super();
        let ty = variant!(base.v(), SemValue::EnumConstant(e) => e.ty.clone());
        build_type(&base.model, py, ty)
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl ArrayValue {
    #[getter]
    fn elements(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Vec<Py<Value>>> {
        let base = self_.as_super();
        let elems = variant!(base.v(), SemValue::Array(a) => &a.anon_array.elements);
        elems
            .iter()
            .map(|e| build_value(&base.model, py, e))
            .collect()
    }
    /// The array type, if known.
    #[getter]
    fn get_type(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Option<Py<Type>>> {
        let base = self_.as_super();
        let ty = variant!(base.v(), SemValue::Array(a) => a.ty.clone());
        Ok(Some(build_type(&base.model, py, ty)?))
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl AnonArrayValue {
    #[getter]
    fn elements(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Vec<Py<Value>>> {
        let base = self_.as_super();
        let elems = variant!(base.v(), SemValue::AnonArray(a) => &a.elements);
        elems
            .iter()
            .map(|e| build_value(&base.model, py, e))
            .collect()
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl StructValue {
    #[getter]
    fn members(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<BTreeMap<String, Py<Value>>> {
        let base = self_.as_super();
        let members = variant!(base.v(), SemValue::Struct(s) => &s.anon_struct.members);
        let mut out = BTreeMap::new();
        for (name, v) in members {
            out.insert(name.clone(), build_value(&base.model, py, v)?);
        }
        Ok(out)
    }
    /// The struct type, if known.
    #[getter]
    fn get_type(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Option<Py<Type>>> {
        let base = self_.as_super();
        let ty = variant!(base.v(), SemValue::Struct(s) => s.ty.clone());
        Ok(Some(build_type(&base.model, py, ty)?))
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl AnonStructValue {
    #[getter]
    fn members(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<BTreeMap<String, Py<Value>>> {
        let base = self_.as_super();
        let members = variant!(base.v(), SemValue::AnonStruct(s) => &s.members);
        let mut out = BTreeMap::new();
        for (name, v) in members {
            out.insert(name.clone(), build_value(&base.model, py, v)?);
        }
        Ok(out)
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl AbsTypeValue {
    /// The abstract type, if known.
    #[getter]
    fn get_type(self_: PyRef<'_, Self>, py: Python<'_>) -> PyResult<Option<Py<Type>>> {
        let base = self_.as_super();
        let ty = variant!(base.v(), SemValue::AbsType(a) => a.ty.clone());
        Ok(Some(build_type(&base.model, py, ty)?))
    }
}

pub fn register(m: &Bound<'_, PyModule>) -> PyResult<()> {
    // Each `register` (from `#[semantic_subclasses]`) adds its base then every
    // subclass, in declaration order.
    Symbol::register(m)?;
    Type::register(m)?;
    Value::register(m)?;
    Ok(())
}
