//! Declaration emitter for the native FPP **semantic** bindings — the
//! semantic-layer analog of `fpp_bindgen` (which mirrors `fpp_ast`).
//!
//! Parses the `fpp_analysis` semantic source with `syn` and emits ONE checked-in
//! file — `fpp_python/src/sem/defs.rs` — containing a
//! `fpp_python_macros::fpp_sem_bindings! { … }` invocation: a mechanical mirror of
//! the semantic data structures (public fields + eligible `&self`/`&Arc<Self>`
//! methods). The `fpp_sem_bindings!` proc macro expands that declaration into the
//! read-only PyO3 wrappers.
//!
//! Unlike `fpp_ast`, the semantic types carry no marker-attribute vocabulary, so
//! the emitter is driven by a small hand-maintained config ([`unions`]): which
//! enums are closed unions, how each is stored (handle/accessor), its alias, and
//! its subclass-name suffix. Everything else — variants, payload struct fields,
//! and method eligibility — is reflected from source. Field/return types are
//! classified into the DSL's [`Shape`] vocabulary; a type we cannot convert is
//! emitted as `skip` (and logged), never a hard error.
//!
//! The `fpp_analysis` source dir + version are resolved from `cargo metadata`
//! (the version is stamped into the header so a dependency bump trips the CI
//! drift check). CLI: `[--fpp-src <dir>] [--fpp-version <v>] [--out <file>]`.

#![allow(dead_code)]

use std::collections::{BTreeMap, BTreeSet};
use std::path::{Path, PathBuf};
use std::process::Command;
use std::sync::LazyLock;
use syn::{Fields, GenericArgument, Item, PathArguments, ReturnType, Type};

// ---------------------------------------------------------------------------
// Config: the closed unions to mirror (hand-maintained; see module docs)
// ---------------------------------------------------------------------------

struct UnionCfg {
    /// Native enum name (the type reflected from source, e.g. `StateMachineSymbol`).
    enum_name: &'static str,
    /// Python union alias name (also the base Python name, e.g. `StateMachineElement`).
    alias: &'static str,
    /// Submodule under `fpp_analysis::semantics` (`""` for a top-level enum, or
    /// e.g. `"state_machine"` for `fpp_analysis::semantics::state_machine::…`).
    module: &'static str,
    /// How the wrapper stores the native value.
    handle: &'static str,
    /// The base struct field / accessor name.
    accessor: &'static str,
    /// Subclass-name prefix for non-struct-payload variants (e.g. `Sm`).
    prefix: &'static str,
    /// Subclass-name suffix for non-struct-payload variants (struct payloads use
    /// the payload struct's own name).
    suffix: &'static str,
    /// Whether the bare base joins the union alias (the synthetic unknown `Type`).
    include_base: bool,
    /// Whether this union is emitted in this pass (vs only loaded for rewrap
    /// classification of fields pointing at its payload structs).
    root: bool,
    /// Whether `build_*` is hand-written (carries a per-hierarchy quirk).
    custom_build: bool,
    /// Whether to emit a `loc` getter resolving the source location from the
    /// stored native value's node id (`accessor.node()` via `SymbolInterface`) —
    /// for `clone`-handle unions whose native carries a node rather than a span.
    loc_from_node: bool,
    /// Identity (`__eq__`/`__hash__`) directive: `""` (none — default object
    /// identity), `"node"` (native `==` + hash by node id), or `"identical"` (the
    /// `Type` quirk: `Type::identical` + hash by `def_node_id`).
    identity: &'static str,
    /// `__repr__` directive: `""` (none — hand-written), `"variant"`
    /// (`<Alias Variant>`), `"variant_qualified"` (`<Alias Variant 'qname'>`), or
    /// `"variant_unqualified"` (`<Alias Variant 'uname'>`).
    repr: &'static str,
}

fn unions() -> Vec<UnionCfg> {
    vec![
        UnionCfg {
            enum_name: "Type",
            alias: "Type",
            module: "",
            handle: "arc_type",
            accessor: "ty",
            prefix: "",
            suffix: "Type",
            include_base: true,
            root: true,
            custom_build: true,
            loc_from_node: false,
            // `Type` keeps its hand-written `__repr__` (the synthetic "unknown"
            // type quirk); its identity is by `Type::identical` + `def_node_id`.
            identity: "identical",
            repr: "",
        },
        UnionCfg {
            enum_name: "Value",
            alias: "Value",
            module: "",
            handle: "value",
            accessor: "val",
            prefix: "",
            suffix: "Value",
            include_base: false,
            root: true,
            custom_build: false,
            loc_from_node: false,
            identity: "",
            repr: "variant",
        },
        UnionCfg {
            enum_name: "Symbol",
            alias: "Symbol",
            module: "",
            handle: "symbol",
            accessor: "sym",
            prefix: "",
            suffix: "Symbol",
            include_base: false,
            root: true,
            custom_build: false,
            loc_from_node: false,
            identity: "node",
            repr: "variant_qualified",
        },
        UnionCfg {
            enum_name: "StateMachineSymbol",
            alias: "StateMachineElement",
            module: "state_machine",
            handle: "clone",
            accessor: "native",
            prefix: "Sm",
            suffix: "",
            include_base: false,
            root: true,
            custom_build: false,
            loc_from_node: true,
            identity: "",
            repr: "variant_unqualified",
        },
    ]
}

// ---------------------------------------------------------------------------
// Config: the standalone `entity` items to mirror (hand-maintained)
// ---------------------------------------------------------------------------

/// A standalone `clone`-handle `entity` to emit: a `#[pyclass(frozen)]` holding a
/// native `Clone`, whose members are reflected mechanically from source. Only the
/// entities with NO build-time extras and no rich hand-getters are described here;
/// the extras-bearing ones (`Command`/`Event`/…/`Connection`) and the top-level
/// symbol-keyed ones (`Component`/`Interface`/…) stay hand-authored in
/// `sem/defs_manual.rs`.
struct EntityCfg {
    /// Python (and, for these, native) type name.
    name: &'static str,
    /// The stored-handle field ident, or `None` for the macro default (`native`).
    field: Option<&'static str>,
    /// A synthetic `spec: spec(<Spec*>)` field bridged through the entity's `loc`
    /// span (the thin-element detail forwarder), if the entity carries one.
    spec: Option<&'static str>,
}

fn entities() -> Vec<EntityCfg> {
    vec![
        EntityCfg {
            name: "PortInterface",
            field: Some("pif"),
            spec: None,
        },
        EntityCfg {
            name: "PortInstanceIdentifier",
            field: Some("pid"),
            spec: None,
        },
        EntityCfg {
            name: "PortMatching",
            field: None,
            spec: None,
        },
        EntityCfg {
            name: "InitSpecifier",
            field: None,
            spec: None,
        },
        EntityCfg {
            name: "StateMachineInstance",
            field: None,
            spec: Some("SpecStateMachineInstance"),
        },
        // The per-element component dictionary entities. Their build-time id/opcode
        // is now a native struct field (populated in the add-to-id-map path), so
        // they carry no extras and reflect mechanically; the thin-element `spec`
        // detail forwarder is bridged through each entity's `loc` span.
        EntityCfg {
            name: "Command",
            field: None,
            spec: Some("SpecCommand"),
        },
        EntityCfg {
            name: "Event",
            field: None,
            spec: Some("SpecEvent"),
        },
        EntityCfg {
            name: "Param",
            field: None,
            spec: Some("SpecParam"),
        },
        EntityCfg {
            name: "TlmChannel",
            field: None,
            spec: Some("SpecTlmChannel"),
        },
        EntityCfg {
            name: "Record",
            field: None,
            spec: Some("SpecRecord"),
        },
        EntityCfg {
            name: "Container",
            field: None,
            spec: Some("SpecContainer"),
        },
    ]
}

// ---------------------------------------------------------------------------
// Config: the leaf (fieldless-discriminant) enums to MIRROR as Python enums
// (hand-maintained). These are the `fpp_analysis` enums with no `fpp_ast` leaf
// equivalent; the generator emits a `#[pyclass(eq, eq_int)]` mirror + a
// `From<&native>` for each, so `crate::sem` owns them (retiring `crate::enums`).
// The AST leaves (`IntegerKind`/`FloatKind`/`QueueFull`/…) are mirrored by the
// AST bindings and reused via `crate::ast`; they are NOT emitted here.
// ---------------------------------------------------------------------------

/// A leaf enum to mirror: its Python name, the native enum ident (reflected from
/// source for its variants), and the native enum's fully-qualified path.
struct LeafEnumCfg {
    /// Python (generated) enum name.
    py: &'static str,
    /// Native enum ident, as reflected from source (the key into `Model::enums`).
    enum_name: &'static str,
    /// The fully-qualified native enum path.
    native_path: &'static str,
}

fn leaf_enums() -> Vec<LeafEnumCfg> {
    vec![
        LeafEnumCfg {
            py: "Direction",
            enum_name: "Direction",
            native_path: "fpp_analysis::semantics::Direction",
        },
        LeafEnumCfg {
            py: "GeneralKind",
            enum_name: "GeneralKind",
            native_path: "fpp_analysis::semantics::GeneralKind",
        },
        LeafEnumCfg {
            py: "CommandKind",
            enum_name: "CommandKind",
            native_path: "fpp_analysis::semantics::CommandKind",
        },
        LeafEnumCfg {
            py: "StateMachineKind",
            enum_name: "Kind",
            native_path: "fpp_analysis::semantics::state_machine::Kind",
        },
    ]
}

// ---------------------------------------------------------------------------
// Type registry: one table mapping a domain type NAME to how it binds into the
// DSL / [`Shape`] vocabulary. This replaces the scattered `classify_named`
// special-cases (leaf paths, the union check, the `Span`/`Node` handling, and
// the `Def*` AST bridge) with a single lookup, so which domain types exist and
// how they convert is registry *data*, not hardcoded control flow.
// ---------------------------------------------------------------------------

/// How a named type binds into the [`Shape`] vocabulary.
#[derive(Clone)]
enum Binding {
    /// A primitive scalar (`bool`/int/float/`String`): the concrete `Shape` is
    /// derived from the name itself (see [`scalar_shape`]).
    Scalar,
    /// A fieldless discriminant enum mirrored as a Python enum at this path.
    Leaf(&'static str),
    /// A `fpp_core::Span`-backed detail materialized on access: `"loc"` (source
    /// location) or `"instance"` (the owning component-instance/topology of an
    /// `InterfaceInstance`).
    Materialize(&'static str),
    /// `fpp_core::Node` → a dense `u32` id.
    DenseId,
    /// An `Arc<fpp_ast::DefX>` bridged to the concrete `crate::ast::DefX` wrapper.
    BridgeAst,
    /// A registered closed union (its enum reflected from source).
    Union,
    /// A registered reflected struct/entity → recursively wrapped as its own
    /// wrapper (the entity layer emitted in a later pass).
    Struct,
    /// Not convertible.
    Skip,
}

/// One table mapping a type NAME to its [`Binding`]. Explicit rows cover the
/// scalars, leaf enums, span-materialized details, dense ids, and the registered
/// unions; the `Def*` AST bridge and everything else fall through in [`binding`].
///
/// [`binding`]: TypeRegistry::binding
struct TypeRegistry {
    rows: BTreeMap<&'static str, Binding>,
}

impl TypeRegistry {
    fn build() -> Self {
        let mut rows: BTreeMap<&'static str, Binding> = BTreeMap::new();

        // Primitive scalars (widened to Python int/float/str/bool on access).
        for n in [
            "bool", "i128", "f64", "f32", "usize", "isize", "u8", "u16", "u32", "u64", "i8",
            "i16", "i32", "i64", "String",
        ] {
            rows.insert(n, Binding::Scalar);
        }

        // Dense node id and span-materialized details.
        rows.insert("Node", Binding::DenseId);
        rows.insert("Span", Binding::Materialize("loc"));
        rows.insert("InterfaceInstance", Binding::Materialize("instance"));

        // Fieldless discriminant enums → their Python-enum mirror path. The AST
        // leaves live in `crate::ast` (mirrored by the AST bindings); the
        // analysis-only leaves are emitted by this binary (see [`leaf_enums`]) and
        // live in `crate::sem`.
        for (name, path) in [
            ("IntegerKind", "crate::ast::IntegerKind"),
            ("FloatKind", "crate::ast::FloatKind"),
            ("Direction", "crate::sem::Direction"),
            ("GeneralKind", "crate::sem::GeneralKind"),
            ("CommandKind", "crate::sem::CommandKind"),
            ("QueueFull", "crate::ast::QueueFull"),
            ("SpecialPortInstanceKind", "crate::ast::SpecialPortInstanceKind"),
            ("ComponentKind", "crate::ast::ComponentKind"),
            // `fpp_analysis::semantics::state_machine::Kind` (external/internal).
            ("Kind", "crate::sem::StateMachineKind"),
        ] {
            rows.insert(name, Binding::Leaf(path));
        }

        // The registered closed unions (their native enums, reflected from source).
        for u in unions() {
            rows.insert(u.enum_name, Binding::Union);
        }
        // `PortInstance` is a registered closed union too (its wrapper lives in the
        // hand-authored `defs_manual`), so a `PortInstance`-typed field renders as
        // the `port_instance` token. It is not emitted by this binary.
        rows.insert("PortInstance", Binding::Union);

        TypeRegistry { rows }
    }

    /// The binding for a type NAME. Explicit rows win; otherwise a `Def*` name
    /// bridges to its AST wrapper and anything else is [`Binding::Skip`].
    fn binding(&self, name: &str) -> Binding {
        if let Some(b) = self.rows.get(name) {
            return b.clone();
        }
        // `DefModuleStub` and any other `Def*` bridge to a `crate::ast::DefX`.
        if name == "DefModuleStub" || name.starts_with("Def") {
            return Binding::BridgeAst;
        }
        Binding::Skip
    }
}

/// The process-wide registry (stateless; built once from [`unions`] + the static
/// rows).
static REGISTRY: LazyLock<TypeRegistry> = LazyLock::new(TypeRegistry::build);

/// The `Shape` for a primitive scalar name, or `None` if `name` is not a scalar.
fn scalar_shape(name: &str) -> Option<Shape> {
    Some(match name {
        "bool" => Shape::Bool,
        "i128" => Shape::I128,
        "f64" | "f32" => Shape::F64,
        "usize" | "isize" | "u8" | "u16" | "u32" | "u64" | "i8" | "i16" | "i32" | "i64" => {
            Shape::Int(name.to_string())
        }
        "String" => Shape::Str,
        _ => return None,
    })
}

/// The concrete `crate::ast::Def*` wrapper a `Def*` name bridges to. `DefModuleStub`
/// is a fpp_analysis type (not an AST node) whose `node_id` points at the real
/// `DefModule` AST node.
fn ast_bridge_target(name: &str) -> String {
    if name == "DefModuleStub" {
        "DefModule".to_string()
    } else {
        name.to_string()
    }
}

/// Native module path prefix for a semantic type name (all payload/leaf semantic
/// types live in `fpp_analysis::semantics`).
fn native_path(name: &str) -> String {
    format!("fpp_analysis::semantics::{name}")
}

/// The fully-qualified native enum path for a union, honoring its submodule.
fn union_native_path(cfg: &UnionCfg) -> String {
    if cfg.module.is_empty() {
        format!("fpp_analysis::semantics::{}", cfg.enum_name)
    } else {
        format!("fpp_analysis::semantics::{}::{}", cfg.module, cfg.enum_name)
    }
}

// ---------------------------------------------------------------------------
// Shape vocabulary (mirrors fpp_python_macros::sem_bindings::Shape)
// ---------------------------------------------------------------------------

#[derive(Clone)]
enum Shape {
    Bool,
    I128,
    F64,
    Int(String), // narrower int, rendered by its type name (widened to py int)
    Str,
    Node,
    Union(String),          // Type/Value/Symbol
    Rewrap(String, String), // (union, variant) — a bare payload struct
    Leaf(String),           // python enum path
    AstDef(String),         // fpp_ast::DefX
    Loc,                    // fpp_core::Span -> resolved source location
    Instance,               // InterfaceInstance -> owning component-instance/topology
    Spec(String),           // synthetic: a Span bridged to its Spec* AST node
    Entity(String),         // a nested reflected entity -> its own wrapper
    Opt(Box<Shape>),
    List(Box<Shape>),
    Dict(Box<Shape>),
    Tuple(Vec<Shape>),
    Skip(String), // reason (logged)
}

impl Shape {
    fn render(&self) -> String {
        match self {
            Shape::Bool => "bool".into(),
            Shape::I128 => "i128".into(),
            Shape::F64 => "f64".into(),
            Shape::Int(n) => n.clone(),
            Shape::Str => "str".into(),
            Shape::Node => "node".into(),
            Shape::Union(u) => match u.as_str() {
                "Type" => "type".into(),
                "Value" => "value".into(),
                "Symbol" => "symbol".into(),
                "PortInstance" => "port_instance".into(),
                other => other.to_lowercase(),
            },
            Shape::Rewrap(u, v) => format!("rewrap({u}::{v})"),
            Shape::Leaf(p) => format!("leaf({p})"),
            Shape::AstDef(d) => format!("astdef({d})"),
            Shape::Loc => "loc".into(),
            Shape::Instance => "instance".into(),
            Shape::Spec(s) => format!("spec({s})"),
            Shape::Entity(e) => format!("entity({e})"),
            Shape::Opt(s) => format!("opt({})", s.render()),
            Shape::List(s) => format!("list({})", s.render()),
            Shape::Dict(s) => format!("dict({})", s.render()),
            Shape::Tuple(v) => {
                let parts: Vec<String> = v.iter().map(Shape::render).collect();
                format!("tuple({})", parts.join(", "))
            }
            Shape::Skip(_) => "skip".into(),
        }
    }
    fn is_skip(&self) -> bool {
        matches!(self, Shape::Skip(_))
    }
}

// ---------------------------------------------------------------------------
// Reflected model
// ---------------------------------------------------------------------------

#[derive(Clone)]
enum VariantPayload {
    Unit,
    /// A single unnamed field (newtype variant): its inner type.
    Newtype(Type),
    Other,
}

#[derive(Clone)]
struct StructDef {
    /// (field name, type). Tuple-struct fields are named "0", "1", …
    fields: Vec<(String, Type)>,
}

#[derive(Clone)]
struct MethodDef {
    name: String,
    assoc: bool,
    needs_analysis: bool,
    ret: Shape,
}

#[derive(Default)]
struct Model {
    /// enum name → [(variant, payload)]
    enums: BTreeMap<String, Vec<(String, VariantPayload)>>,
    /// struct name → its pub fields
    structs: BTreeMap<String, StructDef>,
    /// type name → its eligible methods
    methods: BTreeMap<String, Vec<MethodDef>>,
    /// payload struct name → (union, variant)
    payload_index: BTreeMap<String, (String, String)>,
}

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

fn main() {
    let cfg = resolve_config();
    let files = [
        "types.rs",
        "value.rs",
        "symbol.rs",
        "state_machine/symbol.rs",
        // The state-machine `Kind` leaf enum (external/internal) lives here.
        "state_machine/mod.rs",
        // Entity-layer sources: the native structs/enums for the standalone
        // `entity` items emitted by [`entities`] (and the `PortInstance` union,
        // reflected for its `port_instance`-typed fields). The extras-bearing and
        // symbol-keyed entities stay hand-authored in `sem/defs_manual.rs`; their
        // sources (topology.rs/system.rs/state_machine/machine.rs) are added when
        // those entities move here.
        "interface.rs",
        "connection.rs",
        "component.rs",
        "component_instance.rs",
    ];
    let mut items: Vec<Item> = Vec::new();
    for f in files {
        let path = cfg.fpp_src.join("semantics").join(f);
        let src = std::fs::read_to_string(&path)
            .unwrap_or_else(|e| panic!("read {}: {e}", path.display()));
        let file =
            syn::parse_file(&src).unwrap_or_else(|e| panic!("parse {}: {e}", path.display()));
        items.extend(file.items);
    }

    let mut model = collect(&items);
    index_payloads(&mut model);
    collect_methods(&items, &mut model);
    let text = emit(&model, &cfg.version);
    write_out(&cfg.out_file, &text);

    eprintln!(
        "fpp_sem_bindgen: fpp_analysis v{} (src {}) -> {}",
        cfg.version,
        cfg.fpp_src.display(),
        cfg.out_file.display()
    );
}

/// Pass 1: collect enums, structs, and (later, once payloads are indexed)
/// methods. Methods need the payload index to classify returns, so they are
/// gathered here raw and classified in [`emit`].
fn collect(items: &[Item]) -> Model {
    let mut model = Model::default();
    for item in items {
        match item {
            Item::Enum(e) => {
                let variants = e
                    .variants
                    .iter()
                    .map(|v| {
                        let payload = match &v.fields {
                            Fields::Unit => VariantPayload::Unit,
                            Fields::Unnamed(f) if f.unnamed.len() == 1 => {
                                VariantPayload::Newtype(f.unnamed[0].ty.clone())
                            }
                            _ => VariantPayload::Other,
                        };
                        (v.ident.to_string(), payload)
                    })
                    .collect();
                model.enums.insert(e.ident.to_string(), variants);
            }
            Item::Struct(s) => {
                let mut fields = Vec::new();
                match &s.fields {
                    Fields::Named(named) => {
                        for f in &named.named {
                            if !matches!(f.vis, syn::Visibility::Public(_)) {
                                continue;
                            }
                            fields.push((f.ident.as_ref().unwrap().to_string(), f.ty.clone()));
                        }
                    }
                    Fields::Unnamed(unnamed) => {
                        for (i, f) in unnamed.unnamed.iter().enumerate() {
                            if !matches!(f.vis, syn::Visibility::Public(_)) {
                                continue;
                            }
                            fields.push((i.to_string(), f.ty.clone()));
                        }
                    }
                    Fields::Unit => {}
                }
                model
                    .structs
                    .insert(s.ident.to_string(), StructDef { fields });
            }
            _ => {}
        }
    }
    model
}

/// Pass 2: index which struct is the payload of which union variant (so a field
/// pointing at that struct is classified as a `rewrap`).
fn index_payloads(model: &mut Model) {
    let cfgs = unions();
    let mut index = BTreeMap::new();
    for u in &cfgs {
        if let Some(variants) = model.enums.get(u.enum_name) {
            for (variant, payload) in variants {
                if let VariantPayload::Newtype(ty) = payload {
                    if let Some(inner) = type_last_ident(ty) {
                        if model.structs.contains_key(&inner) {
                            index.insert(inner, (u.enum_name.to_string(), variant.clone()));
                        }
                    }
                }
            }
        }
    }
    model.payload_index = index;
}

/// Pass 3: gather eligible methods from inherent `impl` blocks (return
/// classification needs the payload index, so this runs after [`index_payloads`]).
fn collect_methods(items: &[Item], model: &mut Model) {
    // Snapshot for classification (avoids borrowing `model` mutably + immutably).
    let snapshot = Model {
        enums: model.enums.clone(),
        structs: model.structs.clone(),
        methods: BTreeMap::new(),
        payload_index: model.payload_index.clone(),
    };
    for item in items {
        let Item::Impl(im) = item else { continue };
        if im.trait_.is_some() {
            continue; // inherent impls only (trait methods lifted in later phases)
        }
        let Some(self_ty) = type_last_ident(&im.self_ty) else {
            continue;
        };
        let mut methods = Vec::new();
        for it in &im.items {
            if let syn::ImplItem::Fn(f) = it {
                if let Some(md) = classify_method(&self_ty, f, &snapshot) {
                    methods.push(md);
                }
            }
        }
        if !methods.is_empty() {
            model.methods.entry(self_ty).or_default().extend(methods);
        }
    }
}

// ---------------------------------------------------------------------------
// Classification
// ---------------------------------------------------------------------------

/// Classify a field/return type into a [`Shape`].
fn classify(ty: &Type, model: &Model) -> Shape {
    // Decompose containers first (Box/Arc transparent).
    if let Type::Path(p) = ty {
        let seg = p.path.segments.last().unwrap();
        let name = seg.ident.to_string();
        match name.as_str() {
            "Box" | "Arc" | "Rc" => {
                if let Some(inner) = first_generic(seg) {
                    return classify(&inner, model);
                }
            }
            "Option" => {
                if let Some(inner) = first_generic(seg) {
                    let s = classify(&inner, model);
                    // A container of an inconvertible element is itself skipped.
                    return if s.is_skip() {
                        s
                    } else {
                        Shape::Opt(Box::new(s))
                    };
                }
            }
            "Vec" | "HashSet" | "BTreeSet" | "FxHashSet" => {
                if let Some(inner) = first_generic(seg) {
                    let s = classify(&inner, model);
                    return if s.is_skip() {
                        s
                    } else {
                        Shape::List(Box::new(s))
                    };
                }
            }
            "HashMap" | "BTreeMap" | "FxHashMap" => {
                let (k, v) = two_generics(seg);
                if let (Some(k), Some(v)) = (k, v) {
                    let kname = type_last_ident(&k).unwrap_or_default();
                    let vshape = classify(&v, model);
                    if vshape.is_skip() {
                        return vshape;
                    }
                    if kname == "String" {
                        return Shape::Dict(Box::new(vshape));
                    }
                    // Non-string keyed maps are exposed as list[tuple] (Phase 3).
                    return Shape::Skip(format!("non-string-keyed map<{kname},_>"));
                }
            }
            _ => {}
        }
        // Leaf scalars / named types.
        return classify_named(&name, model);
    }
    if let Type::Tuple(t) = ty {
        let elems: Vec<Shape> = t.elems.iter().map(|e| classify(e, model)).collect();
        if let Some(skip) = elems.iter().find(|s| s.is_skip()) {
            return skip.clone();
        }
        return Shape::Tuple(elems);
    }
    Shape::Skip("unrecognized type".into())
}

fn classify_named(name: &str, model: &Model) -> Shape {
    match REGISTRY.binding(name) {
        Binding::Scalar => scalar_shape(name).expect("scalar binding <=> scalar name"),
        Binding::DenseId => Shape::Node,
        Binding::Union => Shape::Union(name.to_string()),
        Binding::Leaf(path) => Shape::Leaf(path.to_string()),
        Binding::BridgeAst => Shape::AstDef(ast_bridge_target(name)),
        // Span-materialized details: a source location, or the owning
        // component-instance / topology of an `InterfaceInstance`.
        Binding::Materialize("loc") => Shape::Loc,
        Binding::Materialize("instance") => Shape::Instance,
        Binding::Materialize(kind) => Shape::Skip(format!("materialize {kind} `{name}`")),
        // A reflected struct/entity → its own wrapper (recursively wrapped).
        Binding::Struct => Shape::Entity(name.to_string()),
        Binding::Skip => {
            // A payload struct pointing into a union is rewrapped into its enum
            // before conversion (dynamic: keyed by the reflected payload index).
            if let Some((u, v)) = model.payload_index.get(name) {
                Shape::Rewrap(u.clone(), v.clone())
            } else {
                Shape::Skip(format!("unmodeled type `{name}`"))
            }
        }
    }
}

/// The subclass Python name for a union variant.
fn subclass_name(cfg: &UnionCfg, variant: &str, payload: &VariantPayload, model: &Model) -> String {
    if let VariantPayload::Newtype(ty) = payload {
        if let Some(inner) = type_last_ident(ty) {
            if model.structs.contains_key(&inner) && model.payload_index.contains_key(&inner) {
                return inner; // struct payload → the struct's own name
            }
        }
    }
    format!("{}{variant}{}", cfg.prefix, cfg.suffix)
}

/// The `payloadkind` DSL token for a union variant, plus whether it references a
/// payload struct (so its decl must be emitted).
fn variant_payloadkind(payload: &VariantPayload, model: &Model) -> (String, Option<String>) {
    match payload {
        VariantPayload::Unit => ("unit".into(), None),
        VariantPayload::Newtype(ty) => {
            let inner = type_last_ident(ty).unwrap_or_default();
            if let Some(sd) = model.structs.get(&inner) {
                // A single-field tuple struct (field "0") → `newtype(<shape>)`
                // (one `value` getter over `x.0`); any other struct → `payload`.
                if sd.fields.len() == 1 && sd.fields[0].0 == "0" {
                    let shape = classify(&sd.fields[0].1, model);
                    (format!("newtype({})", shape.render()), None)
                } else {
                    ("payload".into(), Some(inner))
                }
            } else {
                // A single-value variant → the field shape (leaf/scalar).
                (classify(ty, model).render(), None)
            }
        }
        VariantPayload::Other => ("unit".into(), None),
    }
}

// ---------------------------------------------------------------------------
// Method eligibility
// ---------------------------------------------------------------------------

/// Classify an impl method into an eligible [`MethodDef`], or `None` to skip.
fn classify_method(self_ty: &str, m: &syn::ImplItemFn, model: &Model) -> Option<MethodDef> {
    if !matches!(m.vis, syn::Visibility::Public(_)) {
        return None;
    }
    let name = m.sig.ident.to_string();
    let inputs: Vec<&syn::FnArg> = m.sig.inputs.iter().collect();
    let first = inputs.first()?;

    let (assoc, rest_start) = match first {
        syn::FnArg::Receiver(r) => {
            if r.mutability.is_some() {
                return None; // &mut self / self-by-value → mutating / consuming
            }
            (false, 1)
        }
        syn::FnArg::Typed(pt) => {
            // Associated fn whose first arg is &Self / &Arc<Self> / &<SelfTy> / &Arc<<SelfTy>>.
            if receiver_like(&pt.ty, self_ty) {
                (true, 1)
            } else {
                return None;
            }
        }
    };

    // Every remaining arg must be `&Analysis` (auto-injected).
    let mut needs_analysis = false;
    for arg in &inputs[rest_start..] {
        match arg {
            syn::FnArg::Typed(pt) if is_analysis_ref(&pt.ty) => needs_analysis = true,
            _ => return None,
        }
    }

    // Return type must be convertible.
    let ret = match &m.sig.output {
        ReturnType::Default => return None, // -> () : nothing to expose
        ReturnType::Type(_, ty) => classify(ty, model),
    };
    if ret.is_skip() {
        return None;
    }
    // Span-materialized details are only mechanical for *stored* fields: a method
    // that computes one (e.g. `get_span` → `node.span()`) reads the compiler
    // context and would panic outside a `run_ref` scope, so it is not reflected.
    if matches!(ret, Shape::Loc | Shape::Instance | Shape::Spec(_)) {
        return None;
    }

    Some(MethodDef {
        name,
        assoc,
        needs_analysis,
        ret,
    })
}

/// Whether `ty` is `&Self`, `&Arc<Self>`, `&<SelfTy>`, or `&Arc<<SelfTy>>`.
fn receiver_like(ty: &Type, self_ty: &str) -> bool {
    let Type::Reference(r) = ty else { return false };
    let inner = &*r.elem;
    // Peel Arc/Box/Rc.
    let peeled = peel_wrappers(inner);
    match type_last_ident(&peeled).as_deref() {
        Some("Self") => true,
        Some(n) => n == self_ty,
        None => false,
    }
}

fn is_analysis_ref(ty: &Type) -> bool {
    let Type::Reference(r) = ty else { return false };
    matches!(type_last_ident(&r.elem).as_deref(), Some("Analysis"))
}

fn peel_wrappers(ty: &Type) -> Type {
    if let Type::Path(p) = ty {
        let seg = p.path.segments.last().unwrap();
        if matches!(seg.ident.to_string().as_str(), "Arc" | "Box" | "Rc") {
            if let Some(inner) = first_generic(seg) {
                return peel_wrappers(&inner);
            }
        }
    }
    ty.clone()
}

// ---------------------------------------------------------------------------
// syn helpers
// ---------------------------------------------------------------------------

fn type_last_ident(ty: &Type) -> Option<String> {
    match ty {
        Type::Path(p) => p.path.segments.last().map(|s| s.ident.to_string()),
        Type::Reference(r) => type_last_ident(&r.elem),
        _ => None,
    }
}

fn first_generic(seg: &syn::PathSegment) -> Option<Type> {
    if let PathArguments::AngleBracketed(a) = &seg.arguments {
        for arg in &a.args {
            if let GenericArgument::Type(t) = arg {
                return Some(t.clone());
            }
        }
    }
    None
}

fn two_generics(seg: &syn::PathSegment) -> (Option<Type>, Option<Type>) {
    let mut it = None;
    let mut it2 = None;
    if let PathArguments::AngleBracketed(a) = &seg.arguments {
        let tys: Vec<Type> = a
            .args
            .iter()
            .filter_map(|arg| match arg {
                GenericArgument::Type(t) => Some(t.clone()),
                _ => None,
            })
            .collect();
        it = tys.first().cloned();
        it2 = tys.get(1).cloned();
    }
    (it, it2)
}

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------

fn emit(model: &Model, version: &str) -> String {
    let mut out = String::new();
    out.push_str(&header(version));
    out.push_str("fpp_python_macros::fpp_sem_bindings! {\n");

    let cfgs = unions();
    let mut needed_payloads: BTreeSet<String> = BTreeSet::new();

    for u in cfgs.iter().filter(|u| u.root) {
        emit_union(&mut out, u, model, &mut needed_payloads);
    }

    // Transitively include payload structs referenced by already-needed payloads.
    let mut frontier: Vec<String> = needed_payloads.iter().cloned().collect();
    while let Some(p) = frontier.pop() {
        if let Some(sd) = model.structs.get(&p) {
            for (_, ty) in &sd.fields {
                if let Shape::Rewrap(_, _) = classify(ty, model) {
                    if let Some(inner) = payload_of(ty, model) {
                        if needed_payloads.insert(inner.clone()) {
                            frontier.push(inner);
                        }
                    }
                }
            }
        }
    }

    for name in &needed_payloads {
        emit_payload(&mut out, name, model);
    }

    for e in &entities() {
        emit_entity(&mut out, e, model);
    }

    for le in &leaf_enums() {
        emit_leaf_enum(&mut out, le, model);
    }

    out.push_str("}\n");
    out
}

/// Emit a `leaf_enum` block: the native enum's variant idents (reflected from
/// source) each tagged with its binding pattern (`unit`/`tuple`/`struct`), so the
/// macro can emit a fieldless Python-enum mirror plus a `From<&native>` whose
/// per-variant match arm uses the right pattern.
fn emit_leaf_enum(out: &mut String, le: &LeafEnumCfg, model: &Model) {
    let variants = model
        .enums
        .get(le.enum_name)
        .unwrap_or_else(|| panic!("leaf enum `{}` not found in source", le.enum_name));
    out.push_str(&format!(
        "    leaf_enum {} native {} {{\n",
        le.py, le.native_path
    ));
    for (variant, payload) in variants {
        let pattern = match payload {
            VariantPayload::Unit => "unit",
            VariantPayload::Newtype(_) => "tuple",
            VariantPayload::Other => "struct",
        };
        out.push_str(&format!("        {variant}: {pattern},\n"));
    }
    out.push_str("    }\n\n");
}

/// Emit a standalone `clone`-handle `entity` block: the native struct's public
/// fields (classified into shapes), an optional synthetic `spec` field, and the
/// eligible `&self`/associated methods — all reflected mechanically from source.
fn emit_entity(out: &mut String, e: &EntityCfg, model: &Model) {
    let sd = model
        .structs
        .get(e.name)
        .unwrap_or_else(|| panic!("entity `{}` not found in source", e.name));
    let field = match e.field {
        Some(f) => format!(" field {f}"),
        None => String::new(),
    };
    out.push_str(&format!(
        "    entity {} native {}{} {{\n",
        e.name,
        native_path(e.name),
        field
    ));
    out.push_str("        fields {\n");
    for (fname, ty) in &sd.fields {
        let shape = classify(ty, model);
        if let Shape::Skip(reason) = &shape {
            eprintln!("  skip {}.{fname}: {reason}", e.name);
        }
        out.push_str(&format!("            {fname}: {},\n", shape.render()));
    }
    // The synthetic `spec` field (bridged through the entity's `loc` span).
    if let Some(spec) = e.spec {
        out.push_str(&format!("            spec: spec({spec}),\n"));
    }
    out.push_str("        }\n");

    let methods = model.methods.get(e.name).cloned().unwrap_or_default();
    if !methods.is_empty() {
        out.push_str("        methods {\n");
        for m in &methods {
            out.push_str(&format!("            {}\n", render_method(m)));
        }
        out.push_str("        }\n");
    }
    out.push_str("    }\n\n");
}

/// If `ty` (possibly wrapped) is a payload struct, its name.
fn payload_of(ty: &Type, model: &Model) -> Option<String> {
    let peeled = peel_containers(ty);
    let name = type_last_ident(&peeled)?;
    if model.payload_index.contains_key(&name) {
        Some(name)
    } else {
        None
    }
}

fn peel_containers(ty: &Type) -> Type {
    if let Type::Path(p) = ty {
        let seg = p.path.segments.last().unwrap();
        if matches!(
            seg.ident.to_string().as_str(),
            "Box" | "Arc" | "Rc" | "Option" | "Vec"
        ) {
            if let Some(inner) = first_generic(seg) {
                return peel_containers(&inner);
            }
        }
    }
    ty.clone()
}

fn emit_union(out: &mut String, u: &UnionCfg, model: &Model, needed: &mut BTreeSet<String>) {
    let variants = model
        .enums
        .get(u.enum_name)
        .unwrap_or_else(|| panic!("union `{}` not found in source", u.enum_name));
    let base = if u.include_base { " include_base" } else { "" };
    let build = if u.custom_build { " custom_build" } else { "" };
    let locfn = if u.loc_from_node {
        " loc_from_node"
    } else {
        ""
    };
    let identity = if u.identity.is_empty() {
        String::new()
    } else {
        format!(" identity {}", u.identity)
    };
    let repr = if u.repr.is_empty() {
        String::new()
    } else {
        format!(" repr {}", u.repr)
    };
    out.push_str(&format!(
        "    union {} native {} handle {} alias \"{}\" accessor {}{}{}{}{}{} {{\n",
        u.alias,
        union_native_path(u),
        u.handle,
        u.alias,
        u.accessor,
        base,
        build,
        locfn,
        identity,
        repr
    ));
    out.push_str("        variants {\n");
    for (variant, payload) in variants {
        let sub = subclass_name(u, variant, payload, model);
        let (kind, pstruct) = variant_payloadkind(payload, model);
        if let Some(p) = pstruct {
            needed.insert(p);
        }
        out.push_str(&format!("            {variant} => {sub} : {kind},\n"));
    }
    out.push_str("        }\n");

    // Methods (source order).
    let methods = model.methods.get(u.enum_name).cloned().unwrap_or_default();
    if !methods.is_empty() {
        out.push_str("        methods {\n");
        for m in &methods {
            out.push_str(&format!("            {}\n", render_method(m)));
        }
        out.push_str("        }\n");
    }
    out.push_str("    }\n\n");
}

fn emit_payload(out: &mut String, name: &str, model: &Model) {
    let sd = match model.structs.get(name) {
        Some(s) => s,
        None => return,
    };
    out.push_str(&format!(
        "    payload {} native {} {{\n",
        name,
        native_path(name)
    ));
    out.push_str("        fields {\n");
    for (fname, ty) in &sd.fields {
        let shape = classify(ty, model);
        if let Shape::Skip(reason) = &shape {
            eprintln!("  skip {name}.{fname}: {reason}");
        }
        out.push_str(&format!("            {fname}: {},\n", shape.render()));
    }
    out.push_str("        }\n");

    let methods = model.methods.get(name).cloned().unwrap_or_default();
    if !methods.is_empty() {
        out.push_str("        methods {\n");
        for m in &methods {
            out.push_str(&format!("            {}\n", render_method(m)));
        }
        out.push_str("        }\n");
    }
    out.push_str("    }\n\n");
}

fn render_method(m: &MethodDef) -> String {
    let assoc = if m.assoc { "assoc " } else { "" };
    let analysis = if m.needs_analysis { "(analysis)" } else { "" };
    format!("{assoc}{}{analysis} -> {},", m.name, m.ret.render())
}

fn header(version: &str) -> String {
    format!(
        "// @generated by fpp_sem_bindgen from fpp_analysis v{version} — do not edit\n\
         //! Declarative mirror of the `fpp_analysis` semantic layer, expanded by the\n\
         //! `fpp_python_macros::fpp_sem_bindings!` proc macro into the read-only PyO3\n\
         //! wrappers for the semantic data structures. GENERATED by `fpp_sem_bindgen` —\n\
         //! do not edit by hand; regenerate with\n\
         //! `cargo run -p fpp_python --features bindgen --bin fpp_sem_bindgen`.\n\
         #![allow(dead_code, unused_variables, clippy::all)]\n\n"
    )
}

fn write_out(path: &Path, text: &str) {
    if let Some(dir) = path.parent() {
        std::fs::create_dir_all(dir).unwrap();
    }
    std::fs::write(path, text).unwrap();
}

// ---------------------------------------------------------------------------
// Config resolution (mirrors fpp_bindgen)
// ---------------------------------------------------------------------------

struct Config {
    fpp_src: PathBuf,
    version: String,
    out_file: PathBuf,
}

fn resolve_config() -> Config {
    let mut cli_src: Option<PathBuf> = None;
    let mut cli_version: Option<String> = None;
    let mut cli_out: Option<PathBuf> = None;
    let mut it = std::env::args().skip(1);
    while let Some(arg) = it.next() {
        match arg.as_str() {
            "--fpp-src" => cli_src = it.next().map(PathBuf::from),
            "--fpp-version" => cli_version = it.next(),
            "--out" => cli_out = it.next().map(PathBuf::from),
            _ => {}
        }
    }
    let (meta_src, meta_version) = cargo_metadata_fpp_analysis();
    Config {
        fpp_src: cli_src
            .or(meta_src)
            .unwrap_or_else(|| PathBuf::from("fpp_analysis/src")),
        version: cli_version
            .or(meta_version)
            .unwrap_or_else(|| "unknown".to_string()),
        out_file: cli_out.unwrap_or_else(|| PathBuf::from("fpp_python/src/sem/defs.rs")),
    }
}

fn cargo_metadata_fpp_analysis() -> (Option<PathBuf>, Option<String>) {
    let cargo = std::env::var("CARGO").unwrap_or_else(|_| "cargo".to_string());
    let output = match Command::new(cargo)
        .args(["metadata", "--format-version", "1"])
        .output()
    {
        Ok(o) if o.status.success() => o,
        _ => return (None, None),
    };
    let meta: serde_json::Value = match serde_json::from_slice(&output.stdout) {
        Ok(v) => v,
        Err(_) => return (None, None),
    };
    let Some(packages) = meta.get("packages").and_then(|p| p.as_array()) else {
        return (None, None);
    };
    for pkg in packages {
        if pkg.get("name").and_then(|n| n.as_str()) != Some("fpp_analysis") {
            continue;
        }
        let version = pkg
            .get("version")
            .and_then(|v| v.as_str())
            .map(|s| s.to_string());
        let src = pkg.get("manifest_path").and_then(|m| m.as_str()).map(|m| {
            let mut pb = PathBuf::from(m);
            pb.pop();
            pb.push("src");
            pb
        });
        return (src, version);
    }
    (None, None)
}
