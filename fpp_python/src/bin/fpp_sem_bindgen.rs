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
        },
    ]
}

/// Known fieldless / discriminant enums → the Python-enum mirror path.
fn leaf_path(name: &str) -> Option<&'static str> {
    match name {
        "IntegerKind" => Some("crate::ast::IntegerKind"),
        "FloatKind" => Some("crate::ast::FloatKind"),
        "Direction" => Some("crate::enums::Direction"),
        "GeneralKind" => Some("crate::enums::GeneralKind"),
        "CommandKind" => Some("crate::enums::CommandKind"),
        _ => None,
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
                other => other.to_lowercase(),
            },
            Shape::Rewrap(u, v) => format!("rewrap({u}::{v})"),
            Shape::Leaf(p) => format!("leaf({p})"),
            Shape::AstDef(d) => format!("astdef({d})"),
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

fn is_union(name: &str) -> bool {
    unions().iter().any(|u| u.enum_name == name)
}

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
    match name {
        "bool" => Shape::Bool,
        "i128" => Shape::I128,
        "f64" | "f32" => Shape::F64,
        "usize" | "isize" | "u8" | "u16" | "u32" | "u64" | "i8" | "i16" | "i32" | "i64" => {
            Shape::Int(name.to_string())
        }
        "String" => Shape::Str,
        "Node" => Shape::Node,
        _ if is_union(name) => Shape::Union(name.to_string()),
        _ if model.payload_index.contains_key(name) => {
            let (u, v) = model.payload_index[name].clone();
            Shape::Rewrap(u, v)
        }
        _ if leaf_path(name).is_some() => Shape::Leaf(leaf_path(name).unwrap().to_string()),
        // `DefModuleStub` is a fpp_analysis type (not an AST node) whose `node_id`
        // points at the real `DefModule` AST node — bridge to that wrapper.
        "DefModuleStub" => Shape::AstDef("DefModule".to_string()),
        _ if name.starts_with("Def") => Shape::AstDef(name.to_string()),
        _ => Shape::Skip(format!("unmodeled type `{name}`")),
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

    out.push_str("}\n");
    out
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
    out.push_str(&format!(
        "    union {} native {} handle {} alias \"{}\" accessor {}{}{} {{\n",
        u.alias,
        union_native_path(u),
        u.handle,
        u.alias,
        u.accessor,
        base,
        build
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
