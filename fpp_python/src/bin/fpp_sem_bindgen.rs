//! Declaration emitter for the native FPP **semantic** bindings — the
//! semantic-layer analog of `fpp_bindgen` (which mirrors `fpp_ast`).
//!
//! Reflects `fpp_analysis` from **rustdoc JSON** (compiler-resolved,
//! post-macro-expansion) and emits ONE checked-in file — by default
//! `fpp_python/src/sem/defs.rs` — containing a
//! `fpp_python_macros::fpp_sem_bindings! { … }` invocation: a mechanical 1:1
//! mirror of the semantic data structures rooted at `fpp_analysis::Analysis`.
//! The `fpp_sem_bindings!` proc macro expands that declaration into the
//! read-only PyO3 wrappers.
//!
//! Unlike the previous `syn`-driven emitter, there are **no hand tables**: the
//! set of unions / entities / leaf enums / payloads is the transitive closure of
//! reachable types from `Analysis`'s public fields + eligible `&self`/`&Arc<Self>`
//! methods. Type origin (`fpp_ast` vs `fpp_core` vs `fpp_analysis` vs `std`) is a
//! deterministic table lookup in the JSON's `paths`/`external_crates`, never a
//! name/prefix guess. A type we cannot convert is emitted as `skip` (and logged),
//! never a hard error.
//!
//! Input: with `--rustdoc-json <path>` the JSON is read directly; otherwise it is
//! produced by invoking nightly rustdoc via the `rustdoc-json` crate. The JSON's
//! `format_version` is asserted against `rustdoc_types::FORMAT_VERSION` at startup
//! so a schema bump fails loudly. CLI:
//! `[--rustdoc-json <file>] [--fpp-version <v>] [--out <file>]`.

#![allow(dead_code)]

use std::collections::{BTreeMap, BTreeSet, VecDeque};
use std::path::{Path, PathBuf};
use std::process::Command;

use rustdoc_types::{
    Crate, Enum, GenericArg, GenericArgs, GenericParamDefKind, Id, Item, ItemEnum, ItemKind,
    ItemSummary, Struct, StructKind, Type, Variant, VariantKind, Visibility,
};

// ---------------------------------------------------------------------------
// Shape vocabulary (mirrors fpp_python_macros::sem_bindings::Shape)
// ---------------------------------------------------------------------------

/// A field / method conversion shape. Local type references are carried by
/// rustdoc `Id` so the emitted Python name is resolved *after* the closure (once
/// name-disambiguation is known).
#[derive(Clone)]
enum Shape {
    Bool,
    I128,
    F64,
    Usize,
    Str,
    Node,
    Span,
    /// A payload-bearing local enum → the union wrapper (by `Id`).
    Union(Id),
    /// A bare-payload-struct wrapped back into its owning union variant. Carries
    /// the union `Id` and the **native** variant ident.
    Rewrap(Id, String),
    /// A reflected local struct / alias → its own entity wrapper (by `Id`).
    Entity(Id),
    /// An all-unit local enum → `leaf(crate::sem::<PyName>)` (by `Id`).
    LeafEnum(Id),
    /// An `fpp_ast` fieldless enum → `leaf(crate::ast::<Name>)`.
    LeafAst(String),
    /// An `fpp_ast` `DefX`/`SpecX` node bridged through `crate::ast::<Name>`.
    AstDef(String),
    Opt(Box<Shape>),
    List(Box<Shape>),
    Map(Box<Shape>, Box<Shape>),
    Tuple(Vec<Shape>),
    Skip(String),
}

impl Shape {
    fn is_skip(&self) -> bool {
        matches!(self, Shape::Skip(_))
    }
}

// ---------------------------------------------------------------------------
// Reflected method
// ---------------------------------------------------------------------------

#[derive(Clone)]
enum ArgKind {
    Analysis,
    Symbol,
    /// A scalar argkind token: `i128` / `bool` / `str` / `usize`.
    Scalar(&'static str),
}

#[derive(Clone)]
struct MethodDef {
    name: String,
    /// Associated fn whose first arg is the `&Arc<Self>` / `&Self` receiver.
    assoc: bool,
    /// (param name, kind) in source order (the receiver is excluded).
    params: Vec<(String, ArgKind)>,
    ret: Shape,
}

// ---------------------------------------------------------------------------
// Emission model
// ---------------------------------------------------------------------------

/// The `payloadkind` of a union variant (post-classification).
enum VariantPayload {
    Unit,
    /// A single-value variant → one `value`/`definition` getter of this shape.
    Value(Shape),
    /// A single-field tuple-struct payload → one `value` getter over `x.0`.
    Newtype(Shape),
    /// A bare multi-field payload struct → a `payload` decl (its `Id`).
    Struct(Id),
    /// An inline struct variant → one getter per named pub field.
    StructVariant(Vec<(String, Shape)>),
    /// A multi-field tuple variant (unsupported) → discarded (logged).
    Other,
}

struct VariantDef {
    native: String,
    payload: VariantPayload,
}

/// A reflected union (payload-bearing local enum).
struct UnionDef {
    id: Id,
    variants: Vec<VariantDef>,
    methods: Vec<MethodDef>,
}

/// A reflected entity / opaque (local struct, or an alias whose target is a local
/// struct). `impl_id` is the type whose impls supply the members (the alias
/// target, or the struct itself).
struct EntityDef {
    id: Id,
    impl_id: Id,
    fields: Vec<(String, Shape)>,
    methods: Vec<MethodDef>,
    /// `identity qualified_name` iff the type has a no-arg
    /// `qualified_name(&self)->String`.
    identity_qualified: bool,
}

/// A reflected `payload` struct (a union variant's bare payload).
struct PayloadDef {
    id: Id,
    fields: Vec<(String, Shape)>,
    methods: Vec<MethodDef>,
}

/// A reflected all-unit local enum (`leaf_enum`).
struct LeafEnumDef {
    id: Id,
    variants: Vec<(String, &'static str)>,
}

// ---------------------------------------------------------------------------
// Reflection context
// ---------------------------------------------------------------------------

struct Ctx<'a> {
    krate: &'a Crate,
    /// Shortest accessible public path per local item `Id` (glob-reexport aware).
    best_path: BTreeMap<u32, Vec<String>>,
    /// Struct `Id` → (owning union `Id`, native variant name).
    payload_index: BTreeMap<u32, (Id, String)>,
    /// Struct `Id`s consumed inline as a newtype variant (never emitted as a
    /// standalone payload/entity).
    newtype_payloads: BTreeSet<u32>,
    /// Type-alias `Id` → its target *struct* `Id` (only for aliases whose target
    /// peels to a local struct — the "entity alias" case, e.g. `Scope`).
    alias_struct: BTreeMap<u32, Id>,
    /// Diagnostics (types skipped, with reasons) — logged to stderr at the end.
    skips: Vec<String>,
}

impl<'a> Ctx<'a> {
    fn item(&self, id: Id) -> Option<&Item> {
        self.krate.index.get(&id)
    }
    fn summary(&self, id: Id) -> Option<&ItemSummary> {
        self.krate.paths.get(&id)
    }
    /// The origin crate name of a referenced `Id` (`"fpp_analysis"` for local).
    fn crate_name(&self, id: Id) -> Option<String> {
        let s = self.summary(id)?;
        if s.crate_id == 0 {
            Some("fpp_analysis".to_string())
        } else {
            self.krate
                .external_crates
                .get(&s.crate_id)
                .map(|c| c.name.clone())
        }
    }
    fn def_path(&self, id: Id) -> Option<&Vec<String>> {
        self.summary(id).map(|s| &s.path)
    }
    fn kind(&self, id: Id) -> Option<ItemKind> {
        self.summary(id).map(|s| s.kind)
    }
    fn is_local(&self, id: Id) -> bool {
        self.summary(id).map(|s| s.crate_id == 0).unwrap_or(false)
    }
    /// The shortest accessible public path (`fpp_analysis::…`); falls back to the
    /// canonical definition path.
    fn native_path(&self, id: Id) -> String {
        if let Some(p) = self.best_path.get(&id.0) {
            return p.join("::");
        }
        self.def_path(id).map(|p| p.join("::")).unwrap_or_default()
    }
    fn last_segment(&self, id: Id) -> String {
        self.def_path(id)
            .and_then(|p| p.last().cloned())
            .unwrap_or_else(|| format!("Item{}", id.0))
    }
    /// The CamelCased last *module* segment of the definition path (for
    /// name-collision disambiguation), e.g. `transition_graph` → `TransitionGraph`.
    fn module_prefix(&self, id: Id) -> String {
        let p = match self.def_path(id) {
            Some(p) if p.len() >= 2 => p,
            _ => return String::new(),
        };
        camel_case(&p[p.len() - 2])
    }
}

fn camel_case(s: &str) -> String {
    s.split('_')
        .filter(|seg| !seg.is_empty())
        .map(|seg| {
            let mut c = seg.chars();
            match c.next() {
                Some(f) => f.to_uppercase().collect::<String>() + c.as_str(),
                None => String::new(),
            }
        })
        .collect()
}

// ---------------------------------------------------------------------------
// Shortest-public-path BFS (glob-reexport aware)
// ---------------------------------------------------------------------------

fn build_best_paths(krate: &Crate) -> BTreeMap<u32, Vec<String>> {
    let mut best: BTreeMap<u32, Vec<String>> = BTreeMap::new();
    let mut seen: BTreeSet<u32> = BTreeSet::new();
    let mut q: VecDeque<(Id, Vec<String>)> = VecDeque::new();
    q.push_back((krate.root, vec!["fpp_analysis".to_string()]));

    let module_children = |id: Id| -> Vec<Id> {
        match krate.index.get(&id).map(|it| &it.inner) {
            Some(ItemEnum::Module(m)) => m.items.clone(),
            _ => Vec::new(),
        }
    };
    let is_pub = |id: Id| -> bool {
        matches!(
            krate.index.get(&id).map(|it| &it.visibility),
            Some(Visibility::Public)
        )
    };

    while let Some((mid, prefix)) = q.pop_front() {
        if !seen.insert(mid.0) {
            continue;
        }
        best.entry(mid.0).or_insert_with(|| prefix.clone());
        for cid in module_children(mid) {
            let Some(ci) = krate.index.get(&cid) else {
                continue;
            };
            match &ci.inner {
                ItemEnum::Use(u) => {
                    let Some(tgt) = u.id else { continue };
                    if u.is_glob {
                        // Glob re-export: bring the target module's public items
                        // into `prefix` (private target modules still expose their
                        // public items this way).
                        for gc in module_children(tgt) {
                            let Some(gci) = krate.index.get(&gc) else {
                                continue;
                            };
                            if !matches!(gci.visibility, Visibility::Public) {
                                continue;
                            }
                            if matches!(gci.inner, ItemEnum::Use(_)) {
                                continue;
                            }
                            let Some(nm) = &gci.name else { continue };
                            let mut newp = prefix.clone();
                            newp.push(nm.clone());
                            if matches!(gci.inner, ItemEnum::Module(_)) {
                                q.push_back((gc, newp.clone()));
                            }
                            insert_shorter(&mut best, gc.0, newp);
                        }
                    } else {
                        let mut newp = prefix.clone();
                        newp.push(u.name.clone());
                        if matches!(
                            krate.index.get(&tgt).map(|it| &it.inner),
                            Some(ItemEnum::Module(_))
                        ) {
                            q.push_back((tgt, newp.clone()));
                        }
                        insert_shorter(&mut best, tgt.0, newp);
                    }
                }
                ItemEnum::Module(_) if is_pub(cid) => {
                    let mut newp = prefix.clone();
                    newp.push(ci.name.clone().unwrap_or_default());
                    q.push_back((cid, newp));
                }
                _ if is_pub(cid) => {
                    if let Some(nm) = &ci.name {
                        let mut newp = prefix.clone();
                        newp.push(nm.clone());
                        insert_shorter(&mut best, cid.0, newp);
                    }
                }
                _ => {}
            }
        }
    }
    best
}

fn insert_shorter(best: &mut BTreeMap<u32, Vec<String>>, id: u32, p: Vec<String>) {
    match best.get(&id) {
        Some(existing) if existing.len() <= p.len() => {}
        _ => {
            best.insert(id, p);
        }
    }
}

// ---------------------------------------------------------------------------
// Small rustdoc helpers
// ---------------------------------------------------------------------------

fn as_struct(it: &Item) -> Option<&Struct> {
    match &it.inner {
        ItemEnum::Struct(s) => Some(s),
        _ => None,
    }
}
fn as_enum(it: &Item) -> Option<&Enum> {
    match &it.inner {
        ItemEnum::Enum(e) => Some(e),
        _ => None,
    }
}
fn as_variant(it: &Item) -> Option<&Variant> {
    match &it.inner {
        ItemEnum::Variant(v) => Some(v),
        _ => None,
    }
}
fn struct_field_ty(it: &Item) -> Option<&Type> {
    match &it.inner {
        ItemEnum::StructField(t) => Some(t),
        _ => None,
    }
}
fn is_public(it: &Item) -> bool {
    matches!(it.visibility, Visibility::Public)
}

/// The type args of a resolved path (only `GenericArg::Type`s).
fn path_type_args(args: &Option<Box<GenericArgs>>) -> Vec<&Type> {
    match args.as_deref() {
        Some(GenericArgs::AngleBracketed { args, .. }) => args
            .iter()
            .filter_map(|a| match a {
                GenericArg::Type(t) => Some(t),
                _ => None,
            })
            .collect(),
        _ => Vec::new(),
    }
}

const WRAPPERS: &[&str] = &["Box", "Arc", "Rc"];
const LISTS: &[&str] = &["Vec", "VecDeque", "HashSet", "BTreeSet", "FxHashSet"];
const MAPS: &[&str] = &["HashMap", "BTreeMap", "FxHashMap", "IndexMap"];

/// Bare type names that always get their CamelCased last-module-segment prefix
/// (even when unique among emitted classes), because the bare form shadows or
/// confuses a type already living in the generated module (e.g.
/// `transition_graph::Node` → `TransitionGraphNode`, `transition_graph::Arc` →
/// `TransitionGraphArc`, and `FormatReplacementKind::Default` → a subclass
/// `FormatReplacementKindDefault` so it does not shadow `std::default::Default`).
///
/// `Enum` and `DefPort` are semantic-layer names that collide with *other things
/// in the same emitted Python module*, invisible to the emitted-class uniqueness
/// pass: `Enum` (the `Symbol::Enum` variant) shadows the `enum.Enum` the stub
/// imports as the base of every leaf-enum mirror, and `DefPort` (the
/// `PortInstanceType::DefPort` variant) shadows the `fpp_ast` `DefPort` node
/// wrapper registered by the sibling AST bindings. Prefixing yields `SymbolEnum`
/// / `PortInstanceTypeDefPort`.
const RESERVED_TYPE_NAMES: &[&str] = &[
    "Arc", "Box", "Rc", "Node", "Cell", "RefCell", "Ref", "Cow", "Weak", "Default", "Enum",
    "DefPort",
];

/// `fpp_ast` enums that are payload-bearing (exposed as `union`s in the AST
/// bindings, not fieldless `leaf` mirrors), so a semantic reference to them cannot
/// bridge through `leaf(crate::ast::X)`. Skipped (logged) rather than mis-emitted.
const NON_LEAF_AST_ENUMS: &[&str] = &["QualIdent"];

/// Peel `Box`/`Arc`/`Rc` (transparent) → the innermost referenced type.
fn peel_wrappers(t: &Type) -> &Type {
    if let Type::ResolvedPath(p) = t {
        let last = p.path.rsplit("::").next().unwrap_or(&p.path);
        if WRAPPERS.contains(&last) {
            if let Some(inner) = path_type_args(&p.args).into_iter().next() {
                return peel_wrappers(inner);
            }
        }
    }
    t
}

// ---------------------------------------------------------------------------
// Payload index + alias index (built once, over ALL local items)
// ---------------------------------------------------------------------------

fn enum_variant_defs<'a>(ctx: &'a Ctx, e: &'a Enum) -> Vec<(&'a Item, &'a Variant)> {
    e.variants
        .iter()
        .filter_map(|vid| {
            let it = ctx.item(*vid)?;
            let v = as_variant(it)?;
            Some((it, v))
        })
        .collect()
}

/// Owned `(native variant name, Variant)` pairs — releases the borrow on `ctx` so
/// the variants can be classified with `&mut ctx`.
fn owned_variants(ctx: &Ctx, enum_id: Id) -> Vec<(String, Variant)> {
    let Some(e) = ctx.item(enum_id).and_then(as_enum) else {
        return Vec::new();
    };
    e.variants
        .iter()
        .filter_map(|vid| {
            let it = ctx.item(*vid)?;
            let v = as_variant(it)?;
            Some((it.name.clone().unwrap_or_default(), v.clone()))
        })
        .collect()
}

/// A single-field tuple variant's inner (peeled) resolved-struct `Id`, if any.
fn single_tuple_local_struct(ctx: &Ctx, v: &Variant) -> Option<Id> {
    let VariantKind::Tuple(fields) = &v.kind else {
        return None;
    };
    if fields.len() != 1 {
        return None;
    }
    let fid = fields[0]?;
    let ft = struct_field_ty(ctx.item(fid)?)?;
    let peeled = peel_wrappers(ft);
    if let Type::ResolvedPath(p) = peeled {
        if ctx.is_local(p.id) && matches!(ctx.kind(p.id), Some(ItemKind::Struct)) {
            return Some(p.id);
        }
    }
    None
}

fn is_newtype_struct(ctx: &Ctx, sid: Id) -> bool {
    match ctx.item(sid).and_then(as_struct) {
        Some(s) => matches!(&s.kind, StructKind::Tuple(fs) if fs.len() == 1),
        None => false,
    }
}

fn build_payload_index(ctx: &mut Ctx) {
    // Deterministic order: iterate local enums by native path.
    let mut enum_ids: Vec<Id> = ctx
        .krate
        .index
        .values()
        .filter(|it| matches!(it.inner, ItemEnum::Enum(_)) && ctx.is_local(it.id))
        .map(|it| it.id)
        .collect();
    enum_ids.sort_by_key(|id| ctx.native_path(*id));

    let mut index: BTreeMap<u32, (Id, String)> = BTreeMap::new();
    let mut newtypes: BTreeSet<u32> = BTreeSet::new();
    for eid in enum_ids {
        let e = ctx.item(eid).and_then(as_enum).unwrap();
        for (vit, v) in enum_variant_defs(ctx, e) {
            if let Some(sid) = single_tuple_local_struct(ctx, v) {
                // The `DefModuleStub` bridge is an astdef, never a payload.
                if ctx.last_segment(sid) == "DefModuleStub" {
                    continue;
                }
                let vname = vit.name.clone().unwrap_or_default();
                index.entry(sid.0).or_insert((eid, vname));
                if is_newtype_struct(ctx, sid) {
                    newtypes.insert(sid.0);
                }
            }
        }
    }
    ctx.payload_index = index;
    ctx.newtype_payloads = newtypes;
}

fn build_alias_index(ctx: &mut Ctx) {
    let mut map: BTreeMap<u32, Id> = BTreeMap::new();
    let alias_ids: Vec<Id> = ctx
        .krate
        .index
        .values()
        .filter(|it| matches!(it.inner, ItemEnum::TypeAlias(_)) && ctx.is_local(it.id))
        .map(|it| it.id)
        .collect();
    for aid in alias_ids {
        if let Some(sid) = resolve_alias_to_struct(ctx, aid) {
            map.insert(aid.0, sid);
        }
    }
    ctx.alias_struct = map;
}

/// Follow a type-alias chain; if it peels to a local struct, return that struct's
/// `Id` (the "entity alias" case). Container/primitive targets return `None`.
fn resolve_alias_to_struct(ctx: &Ctx, alias_id: Id) -> Option<Id> {
    let ItemEnum::TypeAlias(ta) = &ctx.item(alias_id)?.inner else {
        return None;
    };
    let peeled = peel_wrappers(&ta.type_);
    if let Type::ResolvedPath(p) = peeled {
        if !ctx.is_local(p.id) {
            return None;
        }
        match ctx.kind(p.id) {
            Some(ItemKind::Struct) => Some(p.id),
            Some(ItemKind::TypeAlias) => resolve_alias_to_struct(ctx, p.id),
            _ => None,
        }
    } else {
        None
    }
}

// ---------------------------------------------------------------------------
// Classification
// ---------------------------------------------------------------------------

/// Classify a resolved rustdoc `Type` into a [`Shape`], pushing referenced local
/// `Id`s onto `enq` for the transitive closure.
fn classify(ctx: &mut Ctx, t: &Type, enq: &mut Vec<Id>) -> Shape {
    match t {
        Type::Primitive(p) => match p.as_str() {
            "bool" => Shape::Bool,
            "i128" => Shape::I128,
            "f32" | "f64" => Shape::F64,
            "str" => Shape::Str,
            "i8" | "i16" | "i32" | "i64" | "isize" | "u8" | "u16" | "u32" | "u64" | "usize" => {
                Shape::Usize
            }
            other => Shape::Skip(format!("primitive {other}")),
        },
        Type::BorrowedRef { type_, .. } => classify(ctx, type_, enq),
        Type::Tuple(elems) => {
            let shapes: Vec<Shape> = elems.iter().map(|e| classify(ctx, e, enq)).collect();
            if let Some(s) = shapes.iter().find(|s| s.is_skip()) {
                return s.clone();
            }
            Shape::Tuple(shapes)
        }
        Type::ResolvedPath(p) => {
            let last = p.path.rsplit("::").next().unwrap_or(&p.path).to_string();
            // Containers (detected by last segment, any crate).
            if WRAPPERS.contains(&last.as_str()) {
                if let Some(inner) = path_type_args(&p.args).into_iter().next() {
                    return classify(ctx, inner, enq);
                }
            }
            if last == "Option" {
                if let Some(inner) = path_type_args(&p.args).into_iter().next() {
                    let s = classify(ctx, inner, enq);
                    return if s.is_skip() {
                        s
                    } else {
                        Shape::Opt(Box::new(s))
                    };
                }
            }
            if LISTS.contains(&last.as_str()) {
                if let Some(inner) = path_type_args(&p.args).into_iter().next() {
                    let s = classify(ctx, inner, enq);
                    return if s.is_skip() {
                        s
                    } else {
                        Shape::List(Box::new(s))
                    };
                }
            }
            if MAPS.contains(&last.as_str()) {
                let args = path_type_args(&p.args);
                if args.len() >= 2 {
                    let k = classify(ctx, args[0], enq);
                    let v = classify(ctx, args[1], enq);
                    if k.is_skip() {
                        return Shape::Skip(format!("map key: {}", skip_reason(&k)));
                    }
                    if v.is_skip() {
                        return Shape::Skip(format!("map value: {}", skip_reason(&v)));
                    }
                    return Shape::Map(Box::new(k), Box::new(v));
                }
            }
            if last == "String" {
                return Shape::Str;
            }
            // Origin-based classification.
            match ctx.crate_name(p.id).as_deref() {
                Some("fpp_core") => match last.as_str() {
                    "Node" => Shape::Node,
                    "Span" => Shape::Span,
                    _ => Shape::Skip(format!("fpp_core::{last}")),
                },
                Some("fpp_ast") => match ctx.kind(p.id) {
                    Some(ItemKind::Enum) if NON_LEAF_AST_ENUMS.contains(&last.as_str()) => {
                        Shape::Skip(format!(
                            "fpp_ast::{last} (payload-bearing enum; not a leaf mirror in crate::ast)"
                        ))
                    }
                    Some(ItemKind::Enum) => Shape::LeafAst(last),
                    Some(ItemKind::Struct)
                        if last.starts_with("Def") || last.starts_with("Spec") =>
                    {
                        Shape::AstDef(last)
                    }
                    other => Shape::Skip(format!("fpp_ast::{last} ({other:?})")),
                },
                Some("fpp_analysis") => classify_local(ctx, p.id, &last, enq),
                Some(other) => Shape::Skip(format!("{other}::{last}")),
                None => Shape::Skip(format!("unresolved {last}")),
            }
        }
        Type::Generic(g) => Shape::Skip(format!("generic {g}")),
        Type::Slice(_) => Shape::Skip("slice".into()),
        Type::Array { .. } => Shape::Skip("array".into()),
        Type::QualifiedPath { name, .. } => Shape::Skip(format!("qualified path {name}")),
        _ => Shape::Skip("unrecognized type".into()),
    }
}

fn skip_reason(s: &Shape) -> String {
    match s {
        Shape::Skip(r) => r.clone(),
        _ => "?".into(),
    }
}

/// Classify a local (`fpp_analysis`) resolved type by its `Id`.
fn classify_local(ctx: &mut Ctx, id: Id, last: &str, enq: &mut Vec<Id>) -> Shape {
    // The `DefModuleStub` bridge → the real `DefModule` AST node.
    if last == "DefModuleStub" {
        return Shape::AstDef("DefModule".into());
    }
    match ctx.kind(id) {
        Some(ItemKind::Enum) => {
            enq.push(id);
            if enum_all_unit(ctx, id) {
                Shape::LeafEnum(id)
            } else {
                Shape::Union(id)
            }
        }
        Some(ItemKind::Struct) => {
            if let Some((uid, variant)) = ctx.payload_index.get(&id.0).cloned() {
                enq.push(uid);
                Shape::Rewrap(uid, variant)
            } else {
                enq.push(id);
                Shape::Entity(id)
            }
        }
        Some(ItemKind::TypeAlias) => {
            // An alias to a local struct → an "entity alias" (reflected under the
            // alias's own name/path); anything else → inline the target.
            if ctx.alias_struct.contains_key(&id.0) {
                enq.push(id);
                Shape::Entity(id)
            } else if let ItemEnum::TypeAlias(ta) = &ctx.item(id).unwrap().inner {
                let target = ta.type_.clone();
                classify(ctx, &target, enq)
            } else {
                Shape::Skip(format!("alias {last}"))
            }
        }
        other => Shape::Skip(format!("fpp_analysis::{last} ({other:?})")),
    }
}

fn enum_all_unit(ctx: &Ctx, id: Id) -> bool {
    match ctx.item(id).and_then(as_enum) {
        Some(e) => e.variants.iter().all(|vid| {
            matches!(
                ctx.item(*vid).and_then(as_variant).map(|v| &v.kind),
                Some(VariantKind::Plain)
            )
        }),
        None => true,
    }
}

// ---------------------------------------------------------------------------
// Method reflection
// ---------------------------------------------------------------------------

/// Reflect eligible methods for a type from its inherent impls and from trait
/// impls whose trait is defined in `fpp_analysis`. `owner` is the reflected type;
/// `impl_owner` is the type whose `impls` list is walked (the alias target for an
/// entity alias). Deduped by name, sorted by name.
fn methods_for(ctx: &mut Ctx, impl_owner: Id, enq: &mut Vec<Id>) -> Vec<MethodDef> {
    let impl_ids: Vec<Id> = match ctx.item(impl_owner).map(|it| &it.inner) {
        Some(ItemEnum::Struct(s)) => s.impls.clone(),
        Some(ItemEnum::Enum(e)) => e.impls.clone(),
        _ => Vec::new(),
    };
    let mut out: BTreeMap<String, MethodDef> = BTreeMap::new();
    for iid in impl_ids {
        let Some(imp) = ctx.item(iid).and_then(|it| match &it.inner {
            ItemEnum::Impl(im) => Some(im.clone()),
            _ => None,
        }) else {
            continue;
        };
        // Inherent impls, or trait impls whose trait is defined in `fpp_analysis`.
        let is_trait = imp.trait_.is_some();
        if let Some(tr) = &imp.trait_ {
            if ctx.crate_name(tr.id).as_deref() != Some("fpp_analysis") {
                continue;
            }
        }
        for mid in &imp.items {
            // Inherent methods must be `pub`; trait-impl method items carry
            // `Default` visibility (they are accessible via the public trait).
            let Some(m) = classify_method(ctx, impl_owner, *mid, !is_trait, enq) else {
                continue;
            };
            out.entry(m.name.clone()).or_insert(m);
        }
    }
    out.into_values().collect()
}

fn classify_method(
    ctx: &mut Ctx,
    owner: Id,
    mid: Id,
    require_public: bool,
    enq: &mut Vec<Id>,
) -> Option<MethodDef> {
    // Snapshot the (owned) signature so the immutable borrow of `ctx` is dropped
    // before the mutable `classify` call on the return type.
    let (name, inputs, output) = {
        let it = ctx.item(mid)?;
        if require_public && !is_public(it) {
            return None;
        }
        let name = it.name.clone()?;
        let ItemEnum::Function(f) = &it.inner else {
            return None;
        };
        // Skip type/const generic params (lifetimes are fine).
        for pd in &f.generics.params {
            if matches!(
                pd.kind,
                GenericParamDefKind::Type { .. } | GenericParamDefKind::Const { .. }
            ) {
                return None;
            }
        }
        (name, f.sig.inputs.clone(), f.sig.output.clone())
    };

    let first = inputs.first()?;
    let (assoc, rest) = receiver(owner, first)?;

    // Every remaining arg must be a marshallable argkind.
    let mut params: Vec<(String, ArgKind)> = Vec::new();
    for (pname, pty) in &inputs[rest..] {
        let ak = arg_kind(ctx, pty)?;
        params.push((pname.clone(), ak));
    }

    // Return type must classify to a non-skip shape; a computed `span` (needs the
    // live context outside a plain getter) is skipped conservatively.
    let out = output.as_ref()?;
    let ret = classify(ctx, out, enq);
    if ret.is_skip() || matches!(ret, Shape::Span) {
        return None;
    }
    Some(MethodDef {
        name,
        assoc,
        params,
        ret,
    })
}

/// Interpret the first input as a receiver. Returns `(assoc, rest_start_index)`.
fn receiver(owner: Id, first: &(String, Type)) -> Option<(bool, usize)> {
    let (fname, ftype) = first;
    if fname == "self" {
        // `&self` / `&Arc<Self>` / `&Self`: a non-mut borrowed ref.
        match ftype {
            Type::BorrowedRef {
                is_mutable: false, ..
            } => Some((false, 1)),
            _ => None,
        }
    } else {
        // Associated receiver: `&Arc<Owner>` / `&Owner` / `&Self`.
        let Type::BorrowedRef {
            is_mutable: false,
            type_,
            ..
        } = ftype
        else {
            return None;
        };
        match peel_wrappers(type_) {
            Type::Generic(g) if g == "Self" => Some((true, 1)),
            Type::ResolvedPath(p) if p.id == owner => Some((true, 1)),
            _ => None,
        }
    }
}

fn arg_kind(ctx: &Ctx, t: &Type) -> Option<ArgKind> {
    let base = match t {
        Type::BorrowedRef { type_, .. } => type_.as_ref(),
        other => other,
    };
    match base {
        Type::Primitive(p) => match p.as_str() {
            "bool" => Some(ArgKind::Scalar("bool")),
            "i128" => Some(ArgKind::Scalar("i128")),
            "str" => Some(ArgKind::Scalar("str")),
            "i8" | "i16" | "i32" | "i64" | "isize" | "u8" | "u16" | "u32" | "u64" | "usize" => {
                Some(ArgKind::Scalar("usize"))
            }
            _ => None,
        },
        Type::ResolvedPath(p) => {
            let last = p.path.rsplit("::").next().unwrap_or(&p.path);
            match (last, ctx.crate_name(p.id).as_deref()) {
                ("Analysis", Some("fpp_analysis")) => Some(ArgKind::Analysis),
                ("Symbol", Some("fpp_analysis")) => Some(ArgKind::Symbol),
                ("String", _) => Some(ArgKind::Scalar("str")),
                _ => None,
            }
        }
        _ => None,
    }
}

// ---------------------------------------------------------------------------
// Union variant payloadkind
// ---------------------------------------------------------------------------

fn variant_payload(ctx: &mut Ctx, v: &Variant, enq: &mut Vec<Id>) -> VariantPayload {
    match &v.kind {
        VariantKind::Plain => VariantPayload::Unit,
        VariantKind::Struct { fields, .. } => {
            // Enum struct-variant fields are always accessible (rustdoc labels them
            // `Default`, not `Public`) — do not filter by visibility.
            let mut fs = Vec::new();
            for fid in fields {
                let Some(fit) = ctx.item(*fid) else { continue };
                let name = fit.name.clone().unwrap_or_default();
                let ty = struct_field_ty(fit).cloned();
                let sh = match ty {
                    Some(t) => classify(ctx, &t, enq),
                    None => Shape::Skip("no field type".into()),
                };
                fs.push((name, sh));
            }
            VariantPayload::StructVariant(fs)
        }
        VariantKind::Tuple(fields) => {
            if fields.len() != 1 {
                return VariantPayload::Other;
            }
            let Some(fid) = fields[0] else {
                return VariantPayload::Other;
            };
            let ft = match ctx.item(fid).and_then(struct_field_ty) {
                Some(t) => t.clone(),
                None => return VariantPayload::Other,
            };
            let peeled = peel_wrappers(&ft).clone();
            // A local struct payload (not the DefModuleStub bridge).
            if let Type::ResolvedPath(p) = &peeled {
                if ctx.is_local(p.id)
                    && matches!(ctx.kind(p.id), Some(ItemKind::Struct))
                    && ctx.last_segment(p.id) != "DefModuleStub"
                {
                    if ctx.newtype_payloads.contains(&p.id.0) {
                        // Single-field tuple struct → inline as a `newtype`.
                        let f0 = newtype_field_shape(ctx, p.id, enq);
                        return VariantPayload::Newtype(f0);
                    }
                    enq.push(p.id);
                    return VariantPayload::Struct(p.id);
                }
            }
            // A single-value variant (scalar / leaf / astdef / union / …).
            VariantPayload::Value(classify(ctx, &ft, enq))
        }
    }
}

fn newtype_field_shape(ctx: &mut Ctx, sid: Id, enq: &mut Vec<Id>) -> Shape {
    let field_id = match ctx.item(sid).and_then(as_struct).map(|s| &s.kind) {
        Some(StructKind::Tuple(fs)) if fs.len() == 1 => fs[0],
        _ => None,
    };
    match field_id
        .and_then(|fid| ctx.item(fid))
        .and_then(struct_field_ty)
    {
        Some(t) => {
            let t = t.clone();
            classify(ctx, &t, enq)
        }
        None => Shape::Skip("newtype field".into()),
    }
}

// ---------------------------------------------------------------------------
// Struct fields
// ---------------------------------------------------------------------------

fn struct_pub_fields(ctx: &mut Ctx, sid: Id, enq: &mut Vec<Id>) -> Vec<(String, Shape)> {
    let kind = match ctx.item(sid).and_then(as_struct).map(|s| s.kind.clone()) {
        Some(k) => k,
        None => return Vec::new(),
    };
    let mut out = Vec::new();
    match kind {
        StructKind::Plain { fields, .. } => {
            for fid in fields {
                let Some(fit) = ctx.item(fid) else { continue };
                if !is_public(fit) {
                    continue;
                }
                let name = fit.name.clone().unwrap_or_default();
                let ty = struct_field_ty(fit).cloned();
                let sh = match ty {
                    Some(t) => classify(ctx, &t, enq),
                    None => Shape::Skip("no field type".into()),
                };
                out.push((name, sh));
            }
        }
        StructKind::Tuple(fields) => {
            // Tuple-struct fields are positional (`0`, `1`, …) — not addressable
            // as Python attributes and not valid DSL identifiers. Classify them to
            // drive the closure (so referenced types are still reached), but never
            // emit them; such a struct's usable surface is its methods.
            for fid in &fields {
                let Some(fid) = fid else { continue };
                let Some(fit) = ctx.item(*fid) else { continue };
                if !is_public(fit) {
                    continue;
                }
                if let Some(t) = struct_field_ty(fit).cloned() {
                    let _ = classify(ctx, &t, enq);
                }
            }
        }
        StructKind::Unit => {}
    }
    out
}

/// Whether a type has a no-arg `qualified_name(&self) -> String` inherent/trait
/// method (→ `identity qualified_name`).
fn has_qualified_name(ctx: &Ctx, impl_owner: Id) -> bool {
    let impl_ids: Vec<Id> = match ctx.item(impl_owner).map(|it| &it.inner) {
        Some(ItemEnum::Struct(s)) => s.impls.clone(),
        Some(ItemEnum::Enum(e)) => e.impls.clone(),
        _ => Vec::new(),
    };
    for iid in impl_ids {
        let Some(it) = ctx.item(iid) else { continue };
        let ItemEnum::Impl(imp) = &it.inner else {
            continue;
        };
        for mid in &imp.items {
            let Some(mi) = ctx.item(*mid) else { continue };
            if mi.name.as_deref() != Some("qualified_name") {
                continue;
            }
            let ItemEnum::Function(f) = &mi.inner else {
                continue;
            };
            // No-arg: only the `&self` receiver.
            if f.sig.inputs.len() == 1 && f.sig.inputs[0].0 == "self" {
                return true;
            }
        }
    }
    false
}

// ---------------------------------------------------------------------------
// Closure
// ---------------------------------------------------------------------------

struct Reflected {
    analysis_id: Id,
    analysis_fields: Vec<(String, Shape)>,
    analysis_methods: Vec<MethodDef>,
    unions: Vec<UnionDef>,
    payloads: Vec<PayloadDef>,
    entities: Vec<EntityDef>,
    leaf_enums: Vec<LeafEnumDef>,
}

fn reflect(ctx: &mut Ctx) -> Reflected {
    let analysis_id = find_analysis(ctx).expect("fpp_analysis::Analysis struct not found");

    let mut reached: BTreeSet<u32> = BTreeSet::new();
    let mut queue: Vec<Id> = Vec::new();
    let push = |reached: &mut BTreeSet<u32>, queue: &mut Vec<Id>, ids: Vec<Id>| {
        for id in ids {
            if reached.insert(id.0) {
                queue.push(id);
            }
        }
    };

    // Seed: Analysis public fields + eligible methods.
    let mut enq = Vec::new();
    let analysis_fields = struct_pub_fields(ctx, analysis_id, &mut enq);
    let analysis_methods = methods_for(ctx, analysis_id, &mut enq);
    push(&mut reached, &mut queue, std::mem::take(&mut enq));

    // Process the closure to a fixpoint.
    while let Some(id) = queue.pop() {
        let mut enq = Vec::new();
        match ctx.item(id).map(|it| &it.inner) {
            Some(ItemEnum::Enum(_)) => {
                // Enqueue variant payloads + method returns.
                for (_native, v) in owned_variants(ctx, id) {
                    let _ = variant_payload(ctx, &v, &mut enq);
                }
                let _ = methods_for(ctx, id, &mut enq);
            }
            Some(ItemEnum::Struct(_)) => {
                let _ = struct_pub_fields(ctx, id, &mut enq);
                let _ = methods_for(ctx, id, &mut enq);
            }
            Some(ItemEnum::TypeAlias(_)) => {
                // Entity alias: reflect the target struct's members.
                if let Some(sid) = ctx.alias_struct.get(&id.0).copied() {
                    let _ = struct_pub_fields(ctx, sid, &mut enq);
                    let _ = methods_for(ctx, sid, &mut enq);
                }
            }
            _ => {}
        }
        push(&mut reached, &mut queue, enq);
    }

    // Partition the reached set into DSL items.
    let mut unions = Vec::new();
    let mut payloads = Vec::new();
    let mut entities = Vec::new();
    let mut leaf_enums = Vec::new();

    let mut ids: Vec<u32> = reached.iter().copied().collect();
    ids.sort();
    for raw in ids {
        let id = Id(raw);
        if id == analysis_id {
            continue;
        }
        match ctx.item(id).map(|it| &it.inner) {
            Some(ItemEnum::Enum(_)) => {
                if enum_all_unit(ctx, id) {
                    leaf_enums.push(build_leaf_enum(ctx, id));
                } else {
                    unions.push(build_union(ctx, id));
                }
            }
            Some(ItemEnum::Struct(_)) => {
                if ctx.newtype_payloads.contains(&id.0) {
                    // Consumed inline as a newtype variant — never emitted.
                    continue;
                }
                if ctx.payload_index.contains_key(&id.0) {
                    payloads.push(build_payload(ctx, id));
                } else {
                    entities.push(build_entity(ctx, id, id));
                }
            }
            Some(ItemEnum::TypeAlias(_)) => {
                if let Some(sid) = ctx.alias_struct.get(&id.0).copied() {
                    entities.push(build_entity(ctx, id, sid));
                }
            }
            _ => {}
        }
    }

    Reflected {
        analysis_id,
        analysis_fields,
        analysis_methods,
        unions,
        payloads,
        entities,
        leaf_enums,
    }
}

fn find_analysis(ctx: &Ctx) -> Option<Id> {
    ctx.krate
        .index
        .values()
        .filter(|it| {
            it.name.as_deref() == Some("Analysis")
                && matches!(it.inner, ItemEnum::Struct(_))
                && ctx.is_local(it.id)
        })
        .map(|it| it.id)
        // The crate-level `Analysis` (def path `fpp_analysis::analysis::Analysis`).
        .find(|id| {
            ctx.def_path(*id)
                .map(|p| p.last().map(String::as_str) == Some("Analysis"))
                .unwrap_or(false)
        })
}

fn build_union(ctx: &mut Ctx, id: Id) -> UnionDef {
    let mut variants = Vec::new();
    let mut enq = Vec::new();
    for (native, v) in owned_variants(ctx, id) {
        let payload = variant_payload(ctx, &v, &mut enq);
        variants.push(VariantDef { native, payload });
    }
    let methods = methods_for(ctx, id, &mut enq);
    UnionDef {
        id,
        variants,
        methods,
    }
}

fn build_payload(ctx: &mut Ctx, id: Id) -> PayloadDef {
    let mut enq = Vec::new();
    let fields = struct_pub_fields(ctx, id, &mut enq);
    let mut methods = methods_for(ctx, id, &mut enq);
    drop_field_shadowing_methods(ctx, &ctx.last_segment(id), &fields, &mut methods);
    PayloadDef {
        id,
        fields,
        methods,
    }
}

/// Drop methods whose name collides with a struct field name (a field getter and
/// a method getter cannot coexist in one `#[pymethods]` block). The field is the
/// canonical data member and wins; the shadowed method is dropped (logged).
fn drop_field_shadowing_methods(
    ctx: &mut Ctx,
    owner: &str,
    fields: &[(String, Shape)],
    methods: &mut Vec<MethodDef>,
) {
    let field_names: BTreeSet<String> = fields.iter().map(|(n, _)| n.clone()).collect();
    let mut dropped: Vec<String> = Vec::new();
    methods.retain(|m| {
        if field_names.contains(&m.name) {
            dropped.push(m.name.clone());
            false
        } else {
            true
        }
    });
    for m in dropped {
        ctx.skips.push(format!(
            "  skip {owner}.{m}() (method shadowed by field of the same name)"
        ));
    }
}

fn build_entity(ctx: &mut Ctx, id: Id, impl_id: Id) -> EntityDef {
    let mut enq = Vec::new();
    let fields = struct_pub_fields(ctx, impl_id, &mut enq);
    let mut methods = methods_for(ctx, impl_id, &mut enq);
    drop_field_shadowing_methods(ctx, &ctx.last_segment(id), &fields, &mut methods);
    let identity_qualified = has_qualified_name(ctx, impl_id);
    EntityDef {
        id,
        impl_id,
        fields,
        methods,
        identity_qualified,
    }
}

fn build_leaf_enum(ctx: &Ctx, id: Id) -> LeafEnumDef {
    let e = ctx.item(id).and_then(as_enum).unwrap();
    let mut variants = Vec::new();
    for vid in &e.variants {
        let Some(vit) = ctx.item(*vid) else { continue };
        let Some(v) = as_variant(vit) else { continue };
        let pat = match v.kind {
            VariantKind::Plain => "unit",
            VariantKind::Tuple(_) => "tuple",
            VariantKind::Struct { .. } => "struct",
        };
        variants.push((vit.name.clone().unwrap_or_default(), pat));
    }
    LeafEnumDef { id, variants }
}

// ---------------------------------------------------------------------------
// Name resolution (Python-name disambiguation)
// ---------------------------------------------------------------------------

/// Python names for every emitted class, keyed by rustdoc `Id` for primaries and
/// by `(union_id, native_variant)` for subclasses.
struct Names {
    /// Primary py name per `Id` (union / entity / leaf_enum). For unions the
    /// special `Type`/`Value`/`Symbol` are kept verbatim.
    primary: BTreeMap<u32, String>,
    /// Subclass py name per `(union_id, native_variant)`.
    subclass: BTreeMap<(u32, String), String>,
}

impl Names {
    fn union(&self, id: Id) -> &str {
        self.primary.get(&id.0).map(String::as_str).unwrap_or("?")
    }
    fn entity(&self, id: Id) -> &str {
        self.primary.get(&id.0).map(String::as_str).unwrap_or("?")
    }
}

fn resolve_names(ctx: &Ctx, r: &Reflected) -> Names {
    // 1) Primary names: unions, entities, leaf_enums.
    let mut primary_ids: Vec<Id> = Vec::new();
    for u in &r.unions {
        primary_ids.push(u.id);
    }
    for e in &r.entities {
        primary_ids.push(e.id);
    }
    for l in &r.leaf_enums {
        primary_ids.push(l.id);
    }
    // Count bare last-segment usage among primaries.
    let mut prim_count: BTreeMap<String, usize> = BTreeMap::new();
    for id in &primary_ids {
        *prim_count.entry(ctx.last_segment(*id)).or_default() += 1;
    }
    let mut primary: BTreeMap<u32, String> = BTreeMap::new();
    for id in &primary_ids {
        let bare = ctx.last_segment(*id);
        // Prefix when the bare name collides among emitted classes *or* is a
        // reserved name that shadows/confuses a std/crate type.
        let name = if prim_count.get(&bare).copied().unwrap_or(0) > 1
            || RESERVED_TYPE_NAMES.contains(&bare.as_str())
        {
            format!("{}{}", ctx.module_prefix(*id), bare)
        } else {
            bare
        };
        primary.insert(id.0, name);
    }

    // 2) Subclass names, unique against primaries + each other.
    let mut used: BTreeMap<String, usize> = BTreeMap::new();
    for n in primary.values() {
        *used.entry(n.clone()).or_default() += 1;
    }
    // Tentative subclass names.
    let mut tentatives: Vec<(u32, String, String)> = Vec::new(); // (union_id, variant, tentative)
    for u in &r.unions {
        for v in &u.variants {
            let tentative = match &v.payload {
                VariantPayload::Struct(sid) => ctx.last_segment(*sid),
                _ => v.native.clone(),
            };
            *used.entry(tentative.clone()).or_default() += 1;
            tentatives.push((u.id.0, v.native.clone(), tentative));
        }
    }
    let mut subclass: BTreeMap<(u32, String), String> = BTreeMap::new();
    for (uid, variant, tentative) in tentatives {
        // Prefix when the tentative name collides among emitted classes *or* is a
        // reserved name that shadows/confuses a std/crate type.
        let name = if used.get(&tentative).copied().unwrap_or(0) > 1
            || RESERVED_TYPE_NAMES.contains(&tentative.as_str())
        {
            format!(
                "{}{}",
                primary.get(&uid).cloned().unwrap_or_default(),
                variant
            )
        } else {
            tentative
        };
        subclass.insert((uid, variant), name);
    }

    Names { primary, subclass }
}

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------

fn union_shape_token(pyname: &str) -> Option<&'static str> {
    match pyname {
        "Type" => Some("type"),
        "Value" => Some("value"),
        "Symbol" => Some("symbol"),
        "PortInstance" => Some("port_instance"),
        _ => None,
    }
}

fn render_shape(ctx: &Ctx, names: &Names, s: &Shape) -> String {
    match s {
        Shape::Bool => "bool".into(),
        Shape::I128 => "i128".into(),
        Shape::F64 => "f64".into(),
        Shape::Usize => "usize".into(),
        Shape::Str => "str".into(),
        Shape::Node => "node".into(),
        Shape::Span => "span".into(),
        Shape::Union(id) => {
            let py = names.union(*id);
            match union_shape_token(py) {
                Some(tok) => tok.into(),
                None => format!("union({py})"),
            }
        }
        Shape::Rewrap(uid, variant) => {
            format!("rewrap({}::{})", names.union(*uid), variant)
        }
        Shape::Entity(id) => format!("entity({})", names.entity(*id)),
        Shape::LeafEnum(id) => format!("leaf(crate::sem::{})", names.entity(*id)),
        Shape::LeafAst(name) => format!("leaf(crate::ast::{name})"),
        Shape::AstDef(name) => format!("astdef({name})"),
        Shape::Opt(s) => format!("opt({})", render_shape(ctx, names, s)),
        Shape::List(s) => format!("list({})", render_shape(ctx, names, s)),
        Shape::Map(k, v) => format!(
            "map({}, {})",
            render_shape(ctx, names, k),
            render_shape(ctx, names, v)
        ),
        Shape::Tuple(v) => {
            let parts: Vec<String> = v.iter().map(|e| render_shape(ctx, names, e)).collect();
            format!("tuple({})", parts.join(", "))
        }
        Shape::Skip(_) => "skip".into(),
    }
}

fn render_method(ctx: &Ctx, names: &Names, m: &MethodDef) -> String {
    let assoc = if m.assoc { "assoc " } else { "" };
    let ret = render_shape(ctx, names, &m.ret);
    if m.params.is_empty() {
        format!("{assoc}{} -> {ret},", m.name)
    } else {
        let params: Vec<String> = m
            .params
            .iter()
            .map(|(n, k)| {
                let kw = match k {
                    ArgKind::Analysis => "analysis",
                    ArgKind::Symbol => "symbol",
                    ArgKind::Scalar(s) => s,
                };
                format!("{n}: {kw}")
            })
            .collect();
        format!("{assoc}{}({}) -> {ret},", m.name, params.join(", "))
    }
}

fn log_skips(
    ctx: &Ctx,
    names: &Names,
    prefix: &str,
    fields: &[(String, Shape)],
    out: &mut Vec<String>,
) {
    for (fname, sh) in fields {
        if let Shape::Skip(reason) = sh {
            out.push(format!("  skip {prefix}.{fname}: {reason}"));
        } else if let Shape::Map(k, _) = sh {
            let _ = k;
            let _ = render_shape(ctx, names, sh);
        }
    }
}

fn emit(ctx: &Ctx, r: &Reflected, names: &Names, version: &str, skips: &mut Vec<String>) -> String {
    let mut out = String::new();
    out.push_str(&header(version));
    out.push_str("fpp_python_macros::fpp_sem_bindings! {\n");

    // --- analysis root ---
    out.push_str(&format!(
        "    analysis native {} {{\n",
        ctx.native_path(r.analysis_id)
    ));
    out.push_str("        fields {\n");
    for (fname, sh) in &r.analysis_fields {
        if let Shape::Skip(reason) = sh {
            skips.push(format!("  skip Analysis.{fname}: {reason}"));
        }
        out.push_str(&format!(
            "            {fname}: {},\n",
            render_shape(ctx, names, sh)
        ));
    }
    out.push_str("        }\n");
    if !r.analysis_methods.is_empty() {
        out.push_str("        methods {\n");
        for m in &r.analysis_methods {
            out.push_str(&format!("            {}\n", render_method(ctx, names, m)));
        }
        out.push_str("        }\n");
    }
    out.push_str("    }\n\n");

    // --- unions (sorted by py name) ---
    let mut unions: Vec<&UnionDef> = r.unions.iter().collect();
    unions.sort_by_key(|u| names.union(u.id).to_string());
    for u in unions {
        emit_union(ctx, names, u, &mut out, skips);
    }

    // --- payloads (sorted by py name = subclass name) ---
    let mut payloads: Vec<&PayloadDef> = r.payloads.iter().collect();
    payloads.sort_by_key(|p| payload_name(ctx, names, p.id));
    for p in payloads {
        emit_payload(ctx, names, p, &mut out, skips);
    }

    // --- entities (sorted by py name) ---
    let mut entities: Vec<&EntityDef> = r.entities.iter().collect();
    entities.sort_by_key(|e| names.entity(e.id).to_string());
    for e in entities {
        emit_entity(ctx, names, e, &mut out, skips);
    }

    // --- leaf enums (sorted by py name) ---
    let mut leaves: Vec<&LeafEnumDef> = r.leaf_enums.iter().collect();
    leaves.sort_by_key(|l| names.entity(l.id).to_string());
    for l in leaves {
        emit_leaf_enum(ctx, names, l, &mut out);
    }

    out.push_str("}\n");
    out
}

/// The py name of a payload = the subclass name of the variant that owns it.
fn payload_name(ctx: &Ctx, names: &Names, sid: Id) -> String {
    if let Some((uid, variant)) = ctx.payload_index.get(&sid.0) {
        if let Some(n) = names.subclass.get(&(uid.0, variant.clone())) {
            return n.clone();
        }
    }
    ctx.last_segment(sid)
}

fn union_directives(
    ctx: &Ctx,
    u: &UnionDef,
    py: &str,
) -> (String, String, String, String, String, String) {
    // (handle, accessor, extras, identity, repr, ...) — kept simple + matching the
    // known-good Type/Value/Symbol/StateMachineElement conventions.
    let (handle, accessor, mut extras) = match py {
        "Type" => ("arc_type", "ty", " include_base custom_build".to_string()),
        "Value" => ("value", "val", String::new()),
        "Symbol" => ("symbol", "sym", String::new()),
        _ => ("clone", "native", String::new()),
    };
    // `loc_from_node` for clone unions whose native carries a node (SymbolInterface).
    if handle == "clone" && has_no_arg_node(ctx, u.id) {
        extras.push_str(" loc_from_node");
    }
    let identity = match py {
        "Type" => " identity identical".to_string(),
        "Symbol" => " identity node".to_string(),
        _ => String::new(),
    };
    let repr = match py {
        "Type" => String::new(),
        "Value" => " repr variant".to_string(),
        "Symbol" => " repr variant_qualified".to_string(),
        _ => {
            if has_unqualified_name(ctx, u.id) {
                " repr variant_unqualified".to_string()
            } else {
                " repr variant".to_string()
            }
        }
    };
    (
        handle.to_string(),
        accessor.to_string(),
        extras,
        identity,
        repr,
        String::new(),
    )
}

fn has_no_arg_node(ctx: &Ctx, id: Id) -> bool {
    has_no_arg_method_returning_node(ctx, id, "node")
}
fn has_unqualified_name(ctx: &Ctx, id: Id) -> bool {
    method_names(ctx, id).contains(&"get_unqualified_name".to_string())
}

fn method_names(ctx: &Ctx, id: Id) -> Vec<String> {
    let impl_ids: Vec<Id> = match ctx.item(id).map(|it| &it.inner) {
        Some(ItemEnum::Struct(s)) => s.impls.clone(),
        Some(ItemEnum::Enum(e)) => e.impls.clone(),
        _ => Vec::new(),
    };
    let mut out = Vec::new();
    for iid in impl_ids {
        if let Some(ItemEnum::Impl(imp)) = ctx.item(iid).map(|it| &it.inner) {
            for mid in &imp.items {
                if let Some(mi) = ctx.item(*mid) {
                    if matches!(mi.inner, ItemEnum::Function(_)) {
                        if let Some(n) = &mi.name {
                            out.push(n.clone());
                        }
                    }
                }
            }
        }
    }
    out
}

fn has_no_arg_method_returning_node(ctx: &Ctx, id: Id, name: &str) -> bool {
    let impl_ids: Vec<Id> = match ctx.item(id).map(|it| &it.inner) {
        Some(ItemEnum::Struct(s)) => s.impls.clone(),
        Some(ItemEnum::Enum(e)) => e.impls.clone(),
        _ => Vec::new(),
    };
    for iid in impl_ids {
        let Some(ItemEnum::Impl(imp)) = ctx.item(iid).map(|it| &it.inner) else {
            continue;
        };
        for mid in &imp.items {
            let Some(mi) = ctx.item(*mid) else { continue };
            if mi.name.as_deref() != Some(name) {
                continue;
            }
            let ItemEnum::Function(f) = &mi.inner else {
                continue;
            };
            if f.sig.inputs.len() == 1 && f.sig.inputs[0].0 == "self" {
                if let Some(Type::ResolvedPath(p)) = &f.sig.output {
                    let last = p.path.rsplit("::").next().unwrap_or(&p.path);
                    if last == "Node" && ctx.crate_name(p.id).as_deref() == Some("fpp_core") {
                        return true;
                    }
                }
            }
        }
    }
    false
}

fn emit_union(ctx: &Ctx, names: &Names, u: &UnionDef, out: &mut String, skips: &mut Vec<String>) {
    let py = names.union(u.id).to_string();
    let (handle, accessor, extras, identity, repr, _) = union_directives(ctx, u, &py);
    out.push_str(&format!(
        "    union {py} native {} handle {handle} alias \"{py}\" accessor {accessor}{extras}{identity}{repr} {{\n",
        ctx.native_path(u.id)
    ));
    out.push_str("        variants {\n");
    for v in &u.variants {
        let sub = names
            .subclass
            .get(&(u.id.0, v.native.clone()))
            .cloned()
            .unwrap_or_else(|| v.native.clone());
        let kind = match &v.payload {
            VariantPayload::Unit => "unit".to_string(),
            VariantPayload::Value(sh) => render_shape(ctx, names, sh),
            VariantPayload::Newtype(sh) => format!("newtype({})", render_shape(ctx, names, sh)),
            VariantPayload::Struct(_) => "payload".to_string(),
            VariantPayload::StructVariant(fs) => {
                let parts: Vec<String> = fs
                    .iter()
                    .map(|(n, sh)| {
                        if let Shape::Skip(reason) = sh {
                            skips.push(format!("  skip {py}::{}.{n}: {reason}", v.native));
                        }
                        format!("{n}: {}", render_shape(ctx, names, sh))
                    })
                    .collect();
                format!("struct {{ {} }}", parts.join(", "))
            }
            VariantPayload::Other => {
                skips.push(format!(
                    "  skip {py}::{} (multi-field tuple variant unsupported)",
                    v.native
                ));
                "unit".to_string()
            }
        };
        out.push_str(&format!("            {} => {sub} : {kind},\n", v.native));
    }
    out.push_str("        }\n");
    emit_methods(ctx, names, &u.methods, out);
    out.push_str("    }\n\n");
}

fn emit_payload(
    ctx: &Ctx,
    names: &Names,
    p: &PayloadDef,
    out: &mut String,
    skips: &mut Vec<String>,
) {
    let name = payload_name(ctx, names, p.id);
    out.push_str(&format!(
        "    payload {name} native {} {{\n",
        ctx.native_path(p.id)
    ));
    out.push_str("        fields {\n");
    for (fname, sh) in &p.fields {
        if let Shape::Skip(reason) = sh {
            skips.push(format!("  skip {name}.{fname}: {reason}"));
        }
        out.push_str(&format!(
            "            {fname}: {},\n",
            render_shape(ctx, names, sh)
        ));
    }
    out.push_str("        }\n");
    emit_methods(ctx, names, &p.methods, out);
    out.push_str("    }\n\n");
}

fn emit_entity(ctx: &Ctx, names: &Names, e: &EntityDef, out: &mut String, skips: &mut Vec<String>) {
    let name = names.entity(e.id).to_string();
    let identity = if e.identity_qualified {
        " identity qualified_name"
    } else {
        ""
    };
    out.push_str(&format!(
        "    entity {name} native {}{identity} {{\n",
        ctx.native_path(e.id)
    ));
    // Opaque = empty entity (no fields / methods).
    if e.fields.is_empty() && e.methods.is_empty() {
        out.push_str("    }\n\n");
        return;
    }
    if !e.fields.is_empty() {
        out.push_str("        fields {\n");
        for (fname, sh) in &e.fields {
            if let Shape::Skip(reason) = sh {
                skips.push(format!("  skip {name}.{fname}: {reason}"));
            }
            out.push_str(&format!(
                "            {fname}: {},\n",
                render_shape(ctx, names, sh)
            ));
        }
        out.push_str("        }\n");
    }
    emit_methods(ctx, names, &e.methods, out);
    out.push_str("    }\n\n");
}

fn emit_methods(ctx: &Ctx, names: &Names, methods: &[MethodDef], out: &mut String) {
    if methods.is_empty() {
        return;
    }
    out.push_str("        methods {\n");
    for m in methods {
        out.push_str(&format!("            {}\n", render_method(ctx, names, m)));
    }
    out.push_str("        }\n");
}

fn emit_leaf_enum(ctx: &Ctx, names: &Names, l: &LeafEnumDef, out: &mut String) {
    let name = names.entity(l.id);
    out.push_str(&format!(
        "    leaf_enum {name} native {} {{\n",
        ctx.native_path(l.id)
    ));
    for (variant, pat) in &l.variants {
        out.push_str(&format!("        {variant}: {pat},\n"));
    }
    out.push_str("    }\n\n");
}

fn header(version: &str) -> String {
    format!(
        "// @generated by fpp_sem_bindgen from fpp_analysis v{version} — do not edit\n\
         //! Declarative mirror of the `fpp_analysis` semantic layer, expanded by the\n\
         //! `fpp_python_macros::fpp_sem_bindings!` proc macro into the read-only PyO3\n\
         //! wrappers for the semantic data structures. GENERATED by `fpp_sem_bindgen`\n\
         //! (rustdoc-JSON reflection of `fpp_analysis`, rooted at `Analysis`) — do not\n\
         //! edit by hand; regenerate with\n\
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
// Main / config
// ---------------------------------------------------------------------------

fn main() {
    let cfg = resolve_config();

    let json = match &cfg.rustdoc_json {
        Some(p) => std::fs::read_to_string(p)
            .unwrap_or_else(|e| panic!("read rustdoc JSON {}: {e}", p.display())),
        None => {
            let manifest = cfg
                .manifest
                .clone()
                .unwrap_or_else(|| PathBuf::from("fpp_analysis/Cargo.toml"));
            let path = rustdoc_json::Builder::default()
                .toolchain("nightly")
                .manifest_path(&manifest)
                .document_private_items(true)
                .build()
                .unwrap_or_else(|e| panic!("rustdoc-json build failed: {e}"));
            std::fs::read_to_string(&path)
                .unwrap_or_else(|e| panic!("read rustdoc JSON {}: {e}", path.display()))
        }
    };

    let krate: Crate =
        serde_json::from_str(&json).unwrap_or_else(|e| panic!("parse rustdoc JSON: {e}"));
    assert_eq!(
        krate.format_version,
        rustdoc_types::FORMAT_VERSION,
        "rustdoc JSON format_version {} != rustdoc_types::FORMAT_VERSION {} — pin the \
         `rustdoc-types` version to the emitting nightly",
        krate.format_version,
        rustdoc_types::FORMAT_VERSION
    );

    let best_path = build_best_paths(&krate);
    let mut ctx = Ctx {
        krate: &krate,
        best_path,
        payload_index: BTreeMap::new(),
        newtype_payloads: BTreeSet::new(),
        alias_struct: BTreeMap::new(),
        skips: Vec::new(),
    };
    build_payload_index(&mut ctx);
    build_alias_index(&mut ctx);

    let reflected = reflect(&mut ctx);
    let names = resolve_names(&ctx, &reflected);
    let mut skips = Vec::new();
    let text = emit(&ctx, &reflected, &names, &cfg.version, &mut skips);
    write_out(&cfg.out_file, &text);

    // Fold in the notes recorded during reflection (field/method-collision drops).
    skips.extend(ctx.skips.iter().cloned());
    for s in &skips {
        eprintln!("{s}");
    }
    eprintln!(
        "fpp_sem_bindgen: fpp_analysis v{} -> {} ({} unions, {} payloads, {} entities, {} leaf_enums; {} skips)",
        cfg.version,
        cfg.out_file.display(),
        reflected.unions.len(),
        reflected.payloads.len(),
        reflected.entities.len(),
        reflected.leaf_enums.len(),
        skips.len(),
    );
}

struct Config {
    rustdoc_json: Option<PathBuf>,
    manifest: Option<PathBuf>,
    version: String,
    out_file: PathBuf,
}

fn resolve_config() -> Config {
    let mut cli_json: Option<PathBuf> = None;
    let mut cli_version: Option<String> = None;
    let mut cli_out: Option<PathBuf> = None;
    let mut it = std::env::args().skip(1);
    while let Some(arg) = it.next() {
        match arg.as_str() {
            "--rustdoc-json" => cli_json = it.next().map(PathBuf::from),
            "--fpp-version" => cli_version = it.next(),
            "--out" => cli_out = it.next().map(PathBuf::from),
            // Accepted for compatibility with the old CLI (ignored).
            "--fpp-src" => {
                let _ = it.next();
            }
            _ => {}
        }
    }
    let (manifest, meta_version) = cargo_metadata_fpp_analysis();
    Config {
        rustdoc_json: cli_json,
        manifest,
        version: cli_version
            .or(meta_version)
            .unwrap_or_else(|| "unknown".to_string()),
        out_file: cli_out.unwrap_or_else(|| PathBuf::from("fpp_python/src/sem/defs.rs")),
    }
}

/// The `fpp_analysis` manifest path + version from `cargo metadata`.
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
        let manifest = pkg
            .get("manifest_path")
            .and_then(|m| m.as_str())
            .map(PathBuf::from);
        return (manifest, version);
    }
    (None, None)
}
