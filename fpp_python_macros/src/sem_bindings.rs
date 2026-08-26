//! The `fpp_sem_bindings!` function-like macro: expands a declarative mirror of
//! the `fpp_analysis` semantic layer (emitted by `fpp_sem_bindgen` into
//! `fpp_python/src/sem/defs.rs`) into the read-only PyO3 wrappers for the
//! semantic data structures — the `Symbol`/`Type`/`Value` closed-union
//! hierarchies, the entity structs, their union `*Ref` newtypes + Python
//! aliases, and the leaf-enum mirrors.
//!
//! This is the semantic-layer analog of `fpp_ast_bindings!` (see
//! [`crate::ast_bindings`]). Unlike the AST — a faithful 1:1 mirror of uniformly
//! `#[ast]`-annotated nodes — the semantic types are plain hand-written
//! structs/enums, so the DSL carries an explicit per-type *handle* (how the
//! wrapper stores its native value) and an explicit *method* list, and every
//! field/method records its resolved *shape* (how the native value converts to a
//! Python object). The macro is a dumb emitter over those shapes; all
//! classification happens in `fpp_sem_bindgen`. The macro never reads
//! `fpp_analysis` source — only its DSL tokens.
//!
//! # Grammar
//!
//! ```text
//! union <PyName> native <path> handle <arc_type|value|symbol> ref "<Alias>"
//!       accessor <ident> [include_base] {
//!     variants { <NativeVariant> => <Subclass> : <payloadkind>, … }
//!     methods  { [assoc] <name> [(analysis)] -> <shape>, … }
//! }
//! payload <PyName> native <path> {
//!     fields  { <name>: <shape>, … }
//!     methods { … }
//! }
//! entity <PyName> native <path>
//!        [ field <ident> | handle symbol_keyed(<map>) def <DefX> ] {
//!     extras  { <name>: <shape>, … }   // clone-handle only: build-time scalars
//!     fields  { <name>: <shape>, … }
//!     methods { … }
//! }
//! ```
//!
//! An `entity` is a standalone `#[pyclass(frozen)]` (not a union subclass). A
//! `clone`-handle entity (default, or `field <ident>`) stores a native `Clone`;
//! a `symbol_keyed(<map>)`-handle entity stores only its defining `Symbol`, looks
//! the native value up in `data.analysis.<map>`, and gains the uniform
//! `loc`/`symbol`/`definition`(→`Py<DefX>`)/`__eq__`/`__hash__` scaffolding plus a
//! `build_<snake>` constructor and a `<snake>_by_symbol` resolver.
//!
//! `payloadkind` is `unit` (no data), `payload` (fields from a matching `payload`
//! decl), or a bare `<shape>` (a single-value variant → one `value` getter).
//! `shape` is the conversion vocabulary: `bool i128 f64 usize str node type value
//! symbol skip`, `leaf(<path>)`, `astdef(<Ident>)`, `rewrap(<Union>::<Variant>)`,
//! `opt(<shape>)`, `list(<shape>)`, `dict(<shape>)`.

use proc_macro2::TokenStream;
use quote::{format_ident, quote};
use syn::parse::{Parse, ParseStream};
use syn::{Ident, LitStr, Path, Token, braced, parenthesized};

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------

#[derive(Clone, Copy, PartialEq, Eq)]
enum UnionKind {
    Type,
    Value,
    Symbol,
}

impl UnionKind {
    /// The native `fpp_analysis` enum path this union mirrors.
    fn native(self) -> TokenStream {
        match self {
            UnionKind::Type => quote!(fpp_analysis::semantics::Type),
            UnionKind::Value => quote!(fpp_analysis::semantics::Value),
            UnionKind::Symbol => quote!(fpp_analysis::semantics::Symbol),
        }
    }
    /// The `crate::sem` `*_ref` builder that wraps a native value as the union.
    fn ref_fn(self) -> TokenStream {
        match self {
            UnionKind::Type => quote!(crate::sem::type_ref),
            UnionKind::Value => quote!(crate::sem::value_ref),
            UnionKind::Symbol => quote!(crate::sem::symbol_ref),
        }
    }
    /// The `crate::sem` `*Ref` newtype the builder returns.
    fn ref_ty(self) -> TokenStream {
        match self {
            UnionKind::Type => quote!(crate::sem::TypeRef),
            UnionKind::Value => quote!(crate::sem::ValueRef),
            UnionKind::Symbol => quote!(crate::sem::SymbolRef),
        }
    }
    fn from_ident(id: &Ident) -> Option<UnionKind> {
        match id.to_string().as_str() {
            "Type" => Some(UnionKind::Type),
            "Value" => Some(UnionKind::Value),
            "Symbol" => Some(UnionKind::Symbol),
            _ => None,
        }
    }
}

/// A field/method conversion shape: a native value → a Python object.
enum Shape {
    Bool,
    I128,
    F64,
    Usize,
    Str,
    Node,
    Union(UnionKind),
    /// A bare payload struct rewrapped into its enum before conversion, e.g.
    /// `rewrap(Type::AnonArray)` on a field of type `AnonArrayType`.
    Rewrap(UnionKind, Ident),
    Leaf(Path),
    AstDef(Ident),
    Opt(Box<Shape>),
    List(Box<Shape>),
    /// A `String`-keyed map → a Python `dict[str, V]`.
    Dict(Box<Shape>),
    /// A Rust tuple → a Python `tuple`, e.g. `(String, i128)`.
    Tuple(Vec<Shape>),
    /// A `fpp_core::Span` → `Option<crate::ir_core::Loc>` (resolved location).
    Loc,
    /// A `fpp_core::Span` bridged to its `Spec*` AST node →
    /// `Option<Py<crate::ast::SpecX>>` (the thin-element detail forwarder).
    Spec(Ident),
    /// A nested entity value → `Py<crate::sem::Wrapper>` via `Wrapper::build`
    /// (only valid for entities with no build-time extras).
    Entity(Ident),
    /// A native `PortInstance` → `PortInstanceRef` (its closed-union wrapper).
    PortInstance,
    /// A native `InterfaceInstance` → `Option<InstanceRef>` (the hand-written
    /// component-instance / topology resolver).
    Instance,
    Skip,
}

impl Shape {
    /// Whether emission touches the union builders (needs `py` + the model).
    fn needs_py(&self) -> bool {
        match self {
            Shape::Union(_) | Shape::Rewrap(..) | Shape::AstDef(_) => true,
            Shape::Spec(_) | Shape::Entity(_) | Shape::PortInstance | Shape::Instance => true,
            Shape::Opt(s) | Shape::List(s) | Shape::Dict(s) => s.needs_py(),
            Shape::Tuple(v) => v.iter().any(Shape::needs_py),
            _ => false,
        }
    }

    /// The Rust return type of a getter yielding this shape.
    fn ty(&self) -> TokenStream {
        match self {
            Shape::Bool => quote!(bool),
            Shape::I128 => quote!(i128),
            Shape::F64 => quote!(f64),
            Shape::Usize => quote!(i128),
            Shape::Str => quote!(String),
            Shape::Node => quote!(u32),
            Shape::Union(k) => k.ref_ty(),
            Shape::Rewrap(k, _) => k.ref_ty(),
            Shape::Leaf(p) => quote!(#p),
            Shape::AstDef(id) => quote!(::pyo3::Py<crate::ast::#id>),
            Shape::Opt(s) => {
                let inner = s.ty();
                quote!(Option<#inner>)
            }
            Shape::List(s) => {
                let inner = s.ty();
                quote!(Vec<#inner>)
            }
            Shape::Dict(s) => {
                let inner = s.ty();
                quote!(::std::collections::BTreeMap<String, #inner>)
            }
            Shape::Tuple(v) => {
                let tys = v.iter().map(Shape::ty);
                quote!((#(#tys),*))
            }
            Shape::Loc => quote!(Option<crate::ir_core::Loc>),
            Shape::Spec(id) => quote!(Option<::pyo3::Py<crate::ast::#id>>),
            Shape::Entity(id) => quote!(::pyo3::Py<crate::sem::#id>),
            Shape::PortInstance => quote!(crate::sem::PortInstanceRef),
            Shape::Instance => quote!(Option<crate::sem::InstanceRef>),
            Shape::Skip => quote!(()),
        }
    }

    /// Emit an expression of type [`Shape::ty`] converting `vref`, a **already
    /// parenthesized** expression yielding a `&Native` reference to the
    /// field/return value (parenthesized so appended `.method()` binds to the
    /// whole reference, not its inner field access). `model`/`data` are
    /// place-expressions yielding the wrapper's `Py<Model>` handle and
    /// `Arc<ModelData>`. The expression may contain `?`, so the enclosing fn must
    /// return `PyResult`.
    fn expr(&self, vref: &TokenStream, model: &TokenStream, data: &TokenStream) -> TokenStream {
        match self {
            Shape::Bool | Shape::I128 | Shape::F64 => quote!(*#vref),
            Shape::Usize => quote!((*#vref as i128)),
            // `to_string` accepts both `&String` (owned fields) and `&str`
            // (method returns like `PortInstance::get_unqualified_name`).
            Shape::Str => quote!((#vref).to_string()),
            Shape::Node => quote!(#data.ids.get(#vref).copied().unwrap_or(0)),
            Shape::Union(k) => {
                let f = k.ref_fn();
                match k {
                    // value_ref takes `&Value`; type_ref/symbol_ref take an owned
                    // clone (Arc<Type> / Symbol).
                    UnionKind::Value => quote!(#f(#model, py, #vref)?),
                    _ => quote!(#f(#model, py, ::std::clone::Clone::clone(#vref))?),
                }
            }
            Shape::Rewrap(k, variant) => {
                let f = k.ref_fn();
                let native = k.native();
                match k {
                    UnionKind::Type => {
                        quote!(#f(#model, py, ::std::sync::Arc::new(#native::#variant(::std::clone::Clone::clone(#vref))))?)
                    }
                    UnionKind::Value => {
                        quote!(#f(#model, py, &#native::#variant(::std::clone::Clone::clone(#vref)))?)
                    }
                    UnionKind::Symbol => {
                        quote!(#f(#model, py, #native::#variant(::std::clone::Clone::clone(#vref)))?)
                    }
                }
            }
            Shape::Leaf(p) => quote!(#p::from(#vref)),
            Shape::AstDef(id) => quote! {
                crate::model::Model::build(#model, py, #vref.node_id)?
                    .into_bound(py)
                    .into_any()
                    .downcast_into::<crate::ast::#id>()?
                    .unbind()
            },
            Shape::Opt(s) => {
                let inner = s.expr(&quote!((v)), model, data);
                quote!(match #vref.as_ref() { Some(v) => Some(#inner), None => None })
            }
            Shape::List(s) => {
                let inner = s.expr(&quote!((__e)), model, data);
                quote!({
                    let mut __v = Vec::new();
                    for __e in #vref.iter() { __v.push(#inner); }
                    __v
                })
            }
            Shape::Dict(s) => {
                let inner = s.expr(&quote!((__e)), model, data);
                quote!({
                    let mut __m = ::std::collections::BTreeMap::new();
                    for (__k, __e) in #vref.iter() { __m.insert(__k.clone(), #inner); }
                    __m
                })
            }
            Shape::Tuple(v) => {
                let elems = v.iter().enumerate().map(|(i, s)| {
                    let idx = syn::Index::from(i);
                    s.expr(&quote!((&(#vref).#idx)), model, data)
                });
                quote!((#(#elems),*))
            }
            // `#vref` is a `&Span`; dereference to the `Copy` `Span`.
            Shape::Loc => quote!(#data.loc_of_span(*#vref)),
            Shape::Spec(id) => {
                quote!(crate::sem::build_spec::<crate::ast::#id>(&#data, #model, py, *#vref)?)
            }
            Shape::Entity(id) => {
                quote!(crate::sem::#id::build(#model, py, ::std::clone::Clone::clone(#vref))?)
            }
            Shape::PortInstance => quote!(crate::sem::port_instance_ref(#model, py, #vref)?),
            Shape::Instance => quote!(crate::sem::instance_ref(&#data, #model, py, #vref)?),
            Shape::Skip => quote!(()),
        }
    }
}

enum PayloadKind {
    Unit,
    /// Fields come from a matching `payload` decl (keyed by the subclass name).
    Struct,
    /// A single-value variant → one getter named `value` with this shape,
    /// projecting the bound payload directly (`x`).
    Value(Shape),
    /// A single-field tuple-struct payload → one getter named `value` with this
    /// shape, projecting the inner field (`x.0`), e.g. `IntegerValue(pub i128)`.
    Newtype(Shape),
    /// An inline struct variant (`Native::Variant { f1, f2, .. }`) → one getter
    /// per listed named field, matched by name. Used by the `clone`-handle
    /// `PortInstance` union whose variants are inline structs.
    StructVariant(Vec<FieldDecl>),
}

struct VariantDecl {
    native_variant: Ident,
    subclass: Ident,
    payload: PayloadKind,
}

struct MethodDecl {
    assoc: bool,
    name: Ident,
    needs_analysis: bool,
    shape: Shape,
}

struct FieldDecl {
    name: Ident,
    shape: Shape,
}

#[derive(Clone, Copy, PartialEq, Eq)]
enum Handle {
    ArcType,
    Value,
    Symbol,
    /// Store the union's native enum by value (matched via `&base.native`).
    Clone,
}

impl Handle {
    /// Whether the stored native is behind an `Arc` (matched via `.as_ref()`).
    fn is_arc(self) -> bool {
        matches!(self, Handle::ArcType)
    }
    /// The base struct field type storing the native handle. `native` is the
    /// union's native enum path (used by the by-value `Clone` handle).
    fn field_ty(self, native: &Path) -> TokenStream {
        match self {
            Handle::ArcType => quote!(::std::sync::Arc<fpp_analysis::semantics::Type>),
            Handle::Value => quote!(fpp_analysis::semantics::Value),
            Handle::Symbol => quote!(fpp_analysis::semantics::Symbol),
            Handle::Clone => quote!(#native),
        }
    }
}

struct UnionDecl {
    py: Ident,
    native: Path,
    handle: Handle,
    alias: LitStr,
    accessor: Ident,
    include_base: bool,
    /// When set, `build_*` is hand-written (a per-hierarchy quirk, e.g. the
    /// unknown `Type`); otherwise the macro generates a default dispatch build.
    custom_build: bool,
    variants: Vec<VariantDecl>,
    methods: Vec<MethodDecl>,
}

struct PayloadDecl {
    name: Ident,
    #[allow(dead_code)]
    native: Path,
    fields: Vec<FieldDecl>,
    methods: Vec<MethodDecl>,
}

/// How a standalone `entity` item stores + reaches its native value.
enum EntityHandle {
    /// A `clone`-handle entity: a `#[pyclass(frozen)]` holding a native `Clone`
    /// (+ any build-time extra scalars its parent supplies), *not* a union
    /// subclass. Field/method getters project the stored `field`; `extras` are
    /// plain stored scalars set by the `build` constructor.
    Clone { field: Ident },
    /// A `symbol_keyed`-handle entity: a top-level entity keyed by an
    /// `fpp_analysis` `Symbol` and looked up in an `Analysis` map. Stores
    /// `{data, model, sym}`; `native()` = `data.analysis.<map>.get(&sym)`;
    /// field/method getters
    /// read `self.native().<field>` / call `self.native().<method>()`. Emits the
    /// uniform `loc`/`symbol`/`definition`(concrete `Py<DefX>`)/`__eq__`/`__hash__`
    /// plus a `build_<snake>` constructor and a `<snake>_by_symbol` resolver.
    SymbolKeyed { map: Ident, def: Ident },
}

/// A standalone `entity` item (see [`EntityHandle`] for the two storage shapes).
struct EntityDecl {
    py: Ident,
    native: Path,
    handle: EntityHandle,
    extras: Vec<FieldDecl>,
    fields: Vec<FieldDecl>,
    methods: Vec<MethodDecl>,
}

struct Dsl {
    unions: Vec<UnionDecl>,
    payloads: Vec<PayloadDecl>,
    entities: Vec<EntityDecl>,
}

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

impl Parse for Shape {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        // `type` is a reserved keyword; the rest are plain idents.
        if input.peek(Token![type]) {
            input.parse::<Token![type]>()?;
            return Ok(Shape::Union(UnionKind::Type));
        }
        let kw: Ident = input.parse()?;
        let s = kw.to_string();
        Ok(match s.as_str() {
            "bool" => Shape::Bool,
            "i128" => Shape::I128,
            "f64" => Shape::F64,
            // Any narrower integer is widened to a Python int via `as i128`.
            "usize" | "isize" | "u8" | "u16" | "u32" | "u64" | "i8" | "i16" | "i32" | "i64" => {
                Shape::Usize
            }
            "str" => Shape::Str,
            "node" => Shape::Node,
            "value" => Shape::Union(UnionKind::Value),
            "symbol" => Shape::Union(UnionKind::Symbol),
            "loc" => Shape::Loc,
            "port_instance" => Shape::PortInstance,
            "instance" => Shape::Instance,
            "skip" => Shape::Skip,
            "opt" | "list" | "dict" => {
                let content;
                parenthesized!(content in input);
                let inner: Shape = content.parse()?;
                match s.as_str() {
                    "opt" => Shape::Opt(Box::new(inner)),
                    "list" => Shape::List(Box::new(inner)),
                    _ => Shape::Dict(Box::new(inner)),
                }
            }
            "tuple" => {
                let content;
                parenthesized!(content in input);
                let elems = content.parse_terminated(Shape::parse, Token![,])?;
                Shape::Tuple(elems.into_iter().collect())
            }
            "leaf" => {
                let content;
                parenthesized!(content in input);
                Shape::Leaf(content.parse()?)
            }
            "astdef" => {
                let content;
                parenthesized!(content in input);
                Shape::AstDef(content.parse()?)
            }
            "spec" => {
                let content;
                parenthesized!(content in input);
                Shape::Spec(content.parse()?)
            }
            "entity" => {
                let content;
                parenthesized!(content in input);
                Shape::Entity(content.parse()?)
            }
            "rewrap" => {
                let content;
                parenthesized!(content in input);
                let path: Path = content.parse()?;
                let seg0 = &path.segments[0].ident;
                let kind = UnionKind::from_ident(seg0).ok_or_else(|| {
                    syn::Error::new(seg0.span(), "rewrap union must be Type/Value/Symbol")
                })?;
                let variant = path.segments[1].ident.clone();
                Shape::Rewrap(kind, variant)
            }
            other => {
                return Err(syn::Error::new(
                    kw.span(),
                    format!("unknown shape `{other}`"),
                ));
            }
        })
    }
}

impl Parse for FieldDecl {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let name: Ident = input.parse()?;
        input.parse::<Token![:]>()?;
        let shape: Shape = input.parse()?;
        Ok(FieldDecl { name, shape })
    }
}

impl Parse for MethodDecl {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let assoc = if input.peek(Ident) && input.fork().parse::<Ident>()? == "assoc" {
            input.parse::<Ident>()?;
            true
        } else {
            false
        };
        let name: Ident = input.parse()?;
        let needs_analysis = if input.peek(syn::token::Paren) {
            let content;
            parenthesized!(content in input);
            let arg: Ident = content.parse()?;
            if arg != "analysis" {
                return Err(syn::Error::new(
                    arg.span(),
                    "only `(analysis)` is supported",
                ));
            }
            true
        } else {
            false
        };
        input.parse::<Token![->]>()?;
        let shape: Shape = input.parse()?;
        Ok(MethodDecl {
            assoc,
            name,
            needs_analysis,
            shape,
        })
    }
}

impl Parse for VariantDecl {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let native_variant: Ident = input.parse()?;
        input.parse::<Token![=>]>()?;
        let subclass: Ident = input.parse()?;
        input.parse::<Token![:]>()?;
        // `struct { … }` | `unit` | `payload` | `newtype(<shape>)` | <shape>
        // (`struct` is a reserved keyword, so it is peeked separately.)
        let payload = if input.peek(Token![struct]) {
            input.parse::<Token![struct]>()?;
            let content;
            braced!(content in input);
            let fields = content.parse_terminated(FieldDecl::parse, Token![,])?;
            PayloadKind::StructVariant(fields.into_iter().collect())
        } else if input.peek(Ident) {
            let fork = input.fork();
            let kw: Ident = fork.parse()?;
            match kw.to_string().as_str() {
                "unit" => {
                    input.parse::<Ident>()?;
                    PayloadKind::Unit
                }
                "payload" => {
                    input.parse::<Ident>()?;
                    PayloadKind::Struct
                }
                "newtype" => {
                    input.parse::<Ident>()?;
                    let content;
                    parenthesized!(content in input);
                    PayloadKind::Newtype(content.parse()?)
                }
                _ => PayloadKind::Value(input.parse()?),
            }
        } else {
            PayloadKind::Value(input.parse()?)
        };
        Ok(VariantDecl {
            native_variant,
            subclass,
            payload,
        })
    }
}

/// Parse a `<section> { <T>,* }` braced, comma-terminated list.
fn parse_section<T: Parse>(input: ParseStream, name: &str) -> syn::Result<Vec<T>> {
    let kw: Ident = input.parse()?;
    if kw != name {
        return Err(syn::Error::new(kw.span(), format!("expected `{name}`")));
    }
    let content;
    braced!(content in input);
    let items = content.parse_terminated(T::parse, Token![,])?;
    Ok(items.into_iter().collect())
}

/// Peek whether the next section keyword matches `name` (for optional sections).
fn peek_section(input: ParseStream, name: &str) -> bool {
    input.peek(Ident)
        && input
            .fork()
            .parse::<Ident>()
            .map(|i| i == name)
            .unwrap_or(false)
}

impl Parse for UnionDecl {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let py: Ident = input.parse()?;
        expect_kw(input, "native")?;
        let native: Path = input.parse()?;
        expect_kw(input, "handle")?;
        let handle_id: Ident = input.parse()?;
        let handle = match handle_id.to_string().as_str() {
            "arc_type" => Handle::ArcType,
            "value" => Handle::Value,
            "symbol" => Handle::Symbol,
            "clone" => Handle::Clone,
            other => {
                return Err(syn::Error::new(
                    handle_id.span(),
                    format!("unknown handle `{other}`"),
                ));
            }
        };
        expect_kw(input, "alias")?;
        let alias: LitStr = input.parse()?;
        expect_kw(input, "accessor")?;
        let accessor: Ident = input.parse()?;
        let include_base = if peek_kw(input, "include_base") {
            input.parse::<Ident>()?;
            true
        } else {
            false
        };
        let custom_build = if peek_kw(input, "custom_build") {
            input.parse::<Ident>()?;
            true
        } else {
            false
        };
        let body;
        braced!(body in input);
        let variants = parse_section::<VariantDecl>(&body, "variants")?;
        let methods = if peek_section(&body, "methods") {
            parse_section::<MethodDecl>(&body, "methods")?
        } else {
            Vec::new()
        };
        Ok(UnionDecl {
            py,
            native,
            handle,
            alias,
            accessor,
            include_base,
            custom_build,
            variants,
            methods,
        })
    }
}

impl Parse for PayloadDecl {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let name: Ident = input.parse()?;
        expect_kw(input, "native")?;
        let native: Path = input.parse()?;
        let body;
        braced!(body in input);
        let fields = if peek_section(&body, "fields") {
            parse_section::<FieldDecl>(&body, "fields")?
        } else {
            Vec::new()
        };
        let methods = if peek_section(&body, "methods") {
            parse_section::<MethodDecl>(&body, "methods")?
        } else {
            Vec::new()
        };
        Ok(PayloadDecl {
            name,
            native,
            fields,
            methods,
        })
    }
}

impl Parse for EntityDecl {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let py: Ident = input.parse()?;
        expect_kw(input, "native")?;
        let native: Path = input.parse()?;
        // `handle symbol_keyed(<map>) def <DefX>` selects the symbol-keyed shape;
        // otherwise an optional `field <ident>` names the clone handle's field.
        let handle = if peek_kw(input, "handle") {
            input.parse::<Ident>()?; // consume `handle`
            let kind: Ident = input.parse()?;
            match kind.to_string().as_str() {
                "symbol_keyed" => {
                    let content;
                    parenthesized!(content in input);
                    let map: Ident = content.parse()?;
                    expect_kw(input, "def")?;
                    let def: Ident = input.parse()?;
                    EntityHandle::SymbolKeyed { map, def }
                }
                other => {
                    return Err(syn::Error::new(
                        kind.span(),
                        format!("unknown entity handle `{other}` (expected `symbol_keyed`)"),
                    ));
                }
            }
        } else if peek_kw(input, "field") {
            input.parse::<Ident>()?; // consume `field`
            EntityHandle::Clone {
                field: input.parse()?,
            }
        } else {
            EntityHandle::Clone {
                field: format_ident!("native"),
            }
        };
        let body;
        braced!(body in input);
        let extras = if peek_section(&body, "extras") {
            parse_section::<FieldDecl>(&body, "extras")?
        } else {
            Vec::new()
        };
        let fields = if peek_section(&body, "fields") {
            parse_section::<FieldDecl>(&body, "fields")?
        } else {
            Vec::new()
        };
        let methods = if peek_section(&body, "methods") {
            parse_section::<MethodDecl>(&body, "methods")?
        } else {
            Vec::new()
        };
        Ok(EntityDecl {
            py,
            native,
            handle,
            extras,
            fields,
            methods,
        })
    }
}

fn expect_kw(input: ParseStream, name: &str) -> syn::Result<()> {
    let kw: Ident = input.parse()?;
    if kw != name {
        return Err(syn::Error::new(kw.span(), format!("expected `{name}`")));
    }
    Ok(())
}

fn peek_kw(input: ParseStream, name: &str) -> bool {
    input.peek(Ident)
        && input
            .fork()
            .parse::<Ident>()
            .map(|i| i == name)
            .unwrap_or(false)
}

impl Parse for Dsl {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let mut unions = Vec::new();
        let mut payloads = Vec::new();
        let mut entities = Vec::new();
        while !input.is_empty() {
            let kw: Ident = input.parse()?;
            match kw.to_string().as_str() {
                "union" => unions.push(input.parse()?),
                "payload" => payloads.push(input.parse()?),
                "entity" => entities.push(input.parse()?),
                other => {
                    return Err(syn::Error::new(
                        kw.span(),
                        format!("unknown section `{other}` (expected union/payload/entity)"),
                    ));
                }
            }
        }
        Ok(Dsl {
            unions,
            payloads,
            entities,
        })
    }
}

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------

fn snake(s: &str) -> String {
    let mut out = String::new();
    for (i, ch) in s.chars().enumerate() {
        if ch.is_uppercase() {
            if i != 0 {
                out.push('_');
            }
            out.extend(ch.to_lowercase());
        } else {
            out.push(ch);
        }
    }
    out
}

/// Emit a getter over a base-handle union member. `scrut` binds the payload; the
/// body reads `base`/`self`. `owner` is the place-expr holding data/model (`base`
/// or `self`), `via_super` selects `PyRef` vs `&self` receiver.
struct Getter {
    name: Ident,
    shape_ty: TokenStream,
    needs_py: bool,
    body: TokenStream,
    via_super: bool,
}

fn getter_tokens(g: &Getter) -> TokenStream {
    let name = &g.name;
    let ty = &g.shape_ty;
    let body = &g.body;
    let py_param = if g.needs_py {
        quote!(, py: ::pyo3::Python<'_>)
    } else {
        quote!()
    };
    if g.via_super {
        quote! {
            #[getter]
            fn #name(self_: ::pyo3::PyRef<'_, Self> #py_param) -> ::pyo3::PyResult<#ty> {
                let base = self_.as_super();
                #body
            }
        }
    } else {
        quote! {
            #[getter]
            fn #name(&self #py_param) -> ::pyo3::PyResult<#ty> {
                #body
            }
        }
    }
}

/// Emit the base method getters (shared by every subclass via inheritance).
fn emit_union_methods(u: &UnionDecl) -> Vec<TokenStream> {
    let accessor = &u.accessor;
    let native = &u.native;
    let model = quote!(&self.model);
    let data = quote!(self.data);
    u.methods
        .iter()
        .map(|m| {
            let mname = &m.name;
            let analysis_arg = if m.needs_analysis {
                quote!(&self.data.analysis)
            } else {
                quote!()
            };
            let call = if m.assoc {
                // Associated fn over `&Arc<Self>` / `&Self`, e.g. underlying_type.
                quote!(#native::#mname(&self.#accessor, #analysis_arg))
            } else {
                // `&self` method (the Arc/enum derefs to the receiver).
                quote!(self.#accessor.#mname(#analysis_arg))
            };
            let vref = quote!((&__r));
            let expr = m.shape.expr(&vref, &model, &data);
            let ty = m.shape.ty();
            let body = quote! {
                let __r = #call;
                Ok(#expr)
            };
            getter_tokens(&Getter {
                name: mname.clone(),
                shape_ty: ty,
                needs_py: m.shape.needs_py(),
                body,
                via_super: false,
            })
        })
        .collect()
}

/// Emit a subclass's field getters (projected through the base handle).
fn emit_subclass_getters(
    u: &UnionDecl,
    v: &VariantDecl,
    payload: Option<&PayloadDecl>,
) -> Vec<TokenStream> {
    let accessor = &u.accessor;
    let native = &u.native;
    let variant = &v.native_variant;
    let model = quote!(&base.model);
    let data = quote!(base.data);
    // Scrutinee: `&Native` from the base handle.
    let scrut = if u.handle.is_arc() {
        quote!(base.#accessor.as_ref())
    } else {
        quote!(&base.#accessor)
    };

    let emit_one = |gname: &Ident, shape: &Shape, field_access: &TokenStream| -> TokenStream {
        let expr = shape.expr(field_access, &model, &data);
        let ty = shape.ty();
        let body = quote! {
            match #scrut {
                #native::#variant(x) => Ok(#expr),
                _ => unreachable!(),
            }
        };
        getter_tokens(&Getter {
            name: gname.clone(),
            shape_ty: ty,
            needs_py: shape.needs_py(),
            body,
            via_super: true,
        })
    };

    match &v.payload {
        PayloadKind::Unit => Vec::new(),
        PayloadKind::Value(shape) => {
            // A single-value variant: one getter, payload bound as `x`. An
            // `astdef` payload (a `Symbol` variant's `Arc<DefX>`) is named
            // `definition` and typed to the concrete AST wrapper; otherwise `value`.
            let gname = if matches!(shape, Shape::AstDef(_)) {
                format_ident!("definition")
            } else {
                format_ident!("value")
            };
            vec![emit_one(&gname, shape, &quote!((x)))]
        }
        PayloadKind::Newtype(shape) => {
            // A single-field tuple-struct payload: one getter `value` over `x.0`.
            let gname = format_ident!("value");
            vec![emit_one(&gname, shape, &quote!((&x.0)))]
        }
        PayloadKind::StructVariant(fields) => {
            // Inline struct variant: bind each listed field by name, matching
            // `&Native::Variant { field, .. }` (not the tuple `Variant(x)` form).
            let mut out = Vec::new();
            for f in fields {
                if matches!(f.shape, Shape::Skip) {
                    continue;
                }
                let fname = &f.name;
                let expr = f.shape.expr(&quote!((#fname)), &model, &data);
                let ty = f.shape.ty();
                let body = quote! {
                    match #scrut {
                        #native::#variant { #fname, .. } => Ok(#expr),
                        _ => unreachable!(),
                    }
                };
                out.push(getter_tokens(&Getter {
                    name: fname.clone(),
                    shape_ty: ty,
                    needs_py: f.shape.needs_py(),
                    body,
                    via_super: true,
                }));
            }
            out
        }
        PayloadKind::Struct => {
            let p = payload.expect("payload decl present for a `payload` variant");
            let mut out = Vec::new();
            for f in &p.fields {
                if matches!(f.shape, Shape::Skip) {
                    continue;
                }
                let access = {
                    let fname = &f.name;
                    quote!((&x.#fname))
                };
                out.push(emit_one(&f.name, &f.shape, &access));
            }
            // Payload struct methods (e.g. a `&self` accessor) project the payload.
            for m in &p.methods {
                let mname = &m.name;
                let analysis_arg = if m.needs_analysis {
                    quote!(&base.data.analysis)
                } else {
                    quote!()
                };
                let call = if m.assoc {
                    let pnative = &p.native;
                    quote!(#pnative::#mname(x, #analysis_arg))
                } else {
                    quote!(x.#mname(#analysis_arg))
                };
                let vref = quote!((&__r));
                let expr = m.shape.expr(&vref, &model, &data);
                let ty = m.shape.ty();
                let body = quote! {
                    match #scrut {
                        #native::#variant(x) => { let __r = #call; Ok(#expr) },
                        _ => unreachable!(),
                    }
                };
                out.push(getter_tokens(&Getter {
                    name: mname.clone(),
                    shape_ty: ty,
                    needs_py: m.shape.needs_py(),
                    body,
                    via_super: true,
                }));
            }
            out
        }
    }
}

fn emit_union(
    u: &UnionDecl,
    payloads: &[PayloadDecl],
) -> (
    TokenStream,
    Vec<TokenStream>,
    Vec<TokenStream>,
    (String, TokenStream),
) {
    let base = &u.py;
    let base_name = LitStr::new(&format!("{}Base", base), base.span());
    let handle_field = &u.accessor;
    let handle_ty = u.handle.field_ty(&u.native);

    // Base struct: data/model + the native handle.
    let base_struct = quote! {
        #[::pyo3_stub_gen::derive::gen_stub_pyclass]
        #[::pyo3::pyclass(subclass, frozen, name = #base_name)]
        pub struct #base {
            pub(crate) data: ::std::sync::Arc<crate::ir_core::ModelData>,
            pub(crate) model: ::pyo3::Py<crate::model::Model>,
            pub(crate) #handle_field: #handle_ty,
        }
    };

    // Subclasses + their field getters.
    let mut subclass_defs = Vec::new();
    let mut register_calls = vec![quote!(m.add_class::<#base>()?;)];
    let mut dispatch_arms = Vec::new();
    let mut ref_members: Vec<TokenStream> = Vec::new();

    for v in &u.variants {
        let sub = &v.subclass;
        let variant = &v.native_variant;
        let native = &u.native;
        register_calls.push(quote!(m.add_class::<#sub>()?;));
        ref_members.push(quote!(#sub));
        dispatch_arms.push(quote! {
            #native::#variant { .. } => ::pyo3::Bound::new(
                py,
                ::pyo3::PyClassInitializer::from(base).add_subclass(#sub),
            )?.into_super().unbind()
        });

        let payload = payloads.iter().find(|p| p.name == v.subclass);
        let getters = emit_subclass_getters(u, v, payload);
        subclass_defs.push(quote! {
            #[::pyo3_stub_gen::derive::gen_stub_pyclass]
            #[::pyo3::pyclass(extends = #base, frozen)]
            pub struct #sub;
            #[::pyo3_stub_gen::derive::gen_stub_pymethods]
            #[::pyo3::pymethods]
            impl #sub {
                #(#getters)*
            }
        });
    }
    if u.include_base {
        ref_members.push(quote!(#base));
    }

    let methods = emit_union_methods(u);

    // Dispatch + register (base + subclasses + the runtime union object).
    let native = &u.native;
    let alias = &u.alias;
    let ref_ty = format_ident!("{}Ref", base);
    let dispatch = quote! {
        #[::pyo3_stub_gen::derive::gen_stub_pymethods]
        #[::pyo3::pymethods]
        impl #base {
            #(#methods)*
        }

        impl #base {
            /// Box `base` as the concrete subclass matching `disc`'s variant.
            pub(crate) fn dispatch(
                base: Self,
                py: ::pyo3::Python<'_>,
                disc: &#native,
            ) -> ::pyo3::PyResult<::pyo3::Py<Self>> {
                Ok(match disc {
                    #(#dispatch_arms,)*
                })
            }

            /// Register the base + every subclass, then add the runtime union.
            pub(crate) fn register(
                m: &::pyo3::Bound<'_, ::pyo3::types::PyModule>,
            ) -> ::pyo3::PyResult<()> {
                use ::pyo3::prelude::*;
                #(#register_calls)*
                let __classes: ::std::vec::Vec<::pyo3::Bound<'_, ::pyo3::PyAny>> =
                    ::std::vec![ #( m.py().get_type::<#ref_members>().into_any() ),* ];
                let mut __it = __classes.into_iter();
                let mut __acc = __it.next().expect("a union has at least one member");
                for __c in __it {
                    __acc = __acc.call_method1("__or__", (__c,))?;
                }
                m.add(#alias, __acc)?;
                Ok(())
            }
        }
    };

    // The `*Ref` return newtype: runtime object is the concrete subclass; its
    // stub type renders as the union alias.
    let ref_newtype = quote! {
        pub struct #ref_ty(pub ::pyo3::PyObject);
        impl<'py> ::pyo3::IntoPyObject<'py> for #ref_ty {
            type Target = ::pyo3::PyAny;
            type Output = ::pyo3::Bound<'py, ::pyo3::PyAny>;
            type Error = ::std::convert::Infallible;
            fn into_pyobject(self, py: ::pyo3::Python<'py>) -> ::std::result::Result<Self::Output, Self::Error> {
                ::std::result::Result::Ok(self.0.into_bound(py))
            }
        }
        impl ::pyo3_stub_gen::PyStubType for #ref_ty {
            fn type_output() -> ::pyo3_stub_gen::TypeInfo {
                ::pyo3_stub_gen::TypeInfo::unqualified(#alias)
            }
        }
        impl #ref_ty {
            /// The `Sub1 | Sub2 | …` expansion used as the `.pyi` alias RHS.
            pub fn union_typeinfo() -> ::pyo3_stub_gen::TypeInfo {
                let parts: ::std::vec::Vec<::pyo3_stub_gen::TypeInfo> = ::std::vec![
                    #( <#ref_members as ::pyo3_stub_gen::PyStubType>::type_output() ),*
                ];
                parts.into_iter().reduce(|a, b| a | b).expect("a union has at least one member")
            }
        }
    };

    // The `*_ref` builder wraps the concrete subclass (built by `build_*`) as the
    // `*Ref` newtype. `build_*` is generated here (default dispatch) unless the
    // union is `custom_build` (a per-hierarchy quirk lives in `crate::sem::hand`,
    // e.g. the unknown `Type`).
    let snake_name = snake(&base.to_string());
    let ref_fn = format_ident!("{}_ref", snake_name);
    let build_fn = format_ident!("build_{}", snake_name);
    let native = &u.native;
    let (ref_arg, build_arg) = match u.handle {
        Handle::ArcType => (
            quote!(ty: ::std::sync::Arc<fpp_analysis::semantics::Type>),
            quote!(ty),
        ),
        Handle::Value => (quote!(v: &fpp_analysis::semantics::Value), quote!(v)),
        Handle::Symbol => (quote!(s: fpp_analysis::semantics::Symbol), quote!(s)),
        Handle::Clone => (quote!(n: &#native), quote!(n)),
    };
    let ref_builder = quote! {
        pub fn #ref_fn(
            model: &::pyo3::Py<crate::model::Model>,
            py: ::pyo3::Python<'_>,
            #ref_arg,
        ) -> ::pyo3::PyResult<#ref_ty> {
            Ok(#ref_ty(crate::sem::#build_fn(model, py, #build_arg)?.into_any()))
        }
    };

    // Default (quirk-free) `build_*`: construct the base handle then dispatch.
    let build_default = if u.custom_build {
        quote!()
    } else {
        let (b_arg, owned, disc) = match u.handle {
            Handle::ArcType => (
                quote!(ty: ::std::sync::Arc<fpp_analysis::semantics::Type>),
                quote!(ty.clone()),
                quote!(&ty),
            ),
            Handle::Value => (
                quote!(v: &fpp_analysis::semantics::Value),
                quote!(v.clone()),
                quote!(v),
            ),
            Handle::Symbol => (
                quote!(s: fpp_analysis::semantics::Symbol),
                quote!(s.clone()),
                quote!(&s),
            ),
            Handle::Clone => (quote!(n: &#native), quote!(n.clone()), quote!(n)),
        };
        quote! {
            /// Build (dispatching to the concrete subclass) the wrapper for a
            /// native value.
            pub fn #build_fn(
                model: &::pyo3::Py<crate::model::Model>,
                py: ::pyo3::Python<'_>,
                #b_arg,
            ) -> ::pyo3::PyResult<::pyo3::Py<#base>> {
                let base = #base {
                    data: model.borrow(py).data.clone(),
                    model: model.clone_ref(py),
                    #handle_field: #owned,
                };
                #base::dispatch(base, py, #disc)
            }
        }
    };

    let alias_str = u.alias.value();
    let alias_entry = quote!(#ref_ty::union_typeinfo().name);

    (
        quote! { #base_struct #(#subclass_defs)* #dispatch #ref_newtype #ref_builder #build_default },
        vec![quote!(#base::register(m)?;)],
        Vec::new(),
        (alias_str, alias_entry),
    )
}

/// Emit a standalone `entity` item, dispatching on its storage handle. Returns
/// `(definition, register_call)`.
fn emit_entity(e: &EntityDecl) -> (TokenStream, TokenStream) {
    match &e.handle {
        EntityHandle::Clone { field } => emit_entity_clone(e, field),
        EntityHandle::SymbolKeyed { map, def } => emit_entity_symbol_keyed(e, map, def),
    }
}

/// Emit a standalone `clone`-handle entity: the pyclass struct, its `build`
/// constructor, and the getter block. Returns `(definition, register_call)`.
fn emit_entity_clone(e: &EntityDecl, field: &Ident) -> (TokenStream, TokenStream) {
    let py = &e.py;
    let native = &e.native;
    let model = quote!(&self.model);
    let data = quote!(self.data);

    let extra_names: Vec<&Ident> = e.extras.iter().map(|f| &f.name).collect();
    let extra_tys: Vec<TokenStream> = e.extras.iter().map(|f| f.shape.ty()).collect();
    let extra_decls = e.extras.iter().map(|f| {
        let n = &f.name;
        let t = f.shape.ty();
        quote!(pub(crate) #n: #t)
    });

    let mut getters: Vec<TokenStream> = Vec::new();

    // Build-time extras: plain stored scalars, read directly off `self`.
    for f in &e.extras {
        if matches!(f.shape, Shape::Skip) {
            continue;
        }
        let n = &f.name;
        let expr = f.shape.expr(&quote!((&self.#n)), &model, &data);
        getters.push(getter_tokens(&Getter {
            name: n.clone(),
            shape_ty: f.shape.ty(),
            needs_py: f.shape.needs_py(),
            body: quote!(Ok(#expr)),
            via_super: false,
        }));
    }

    // Native fields: projected through the stored handle. A `spec(SpecX)` field
    // bridges through the entity's `loc` span (the uniform Span->AST-node bridge).
    for f in &e.fields {
        if matches!(f.shape, Shape::Skip) {
            continue;
        }
        let n = &f.name;
        let access = if matches!(f.shape, Shape::Spec(_)) {
            quote!((&self.#field.loc))
        } else {
            quote!((&self.#field.#n))
        };
        let expr = f.shape.expr(&access, &model, &data);
        getters.push(getter_tokens(&Getter {
            name: n.clone(),
            shape_ty: f.shape.ty(),
            needs_py: f.shape.needs_py(),
            body: quote!(Ok(#expr)),
            via_super: false,
        }));
    }

    // Methods: `&self` accessors (or associated fns over `&Native`).
    for m in &e.methods {
        if matches!(m.shape, Shape::Skip) {
            continue;
        }
        let mname = &m.name;
        let analysis_arg = if m.needs_analysis {
            quote!(&self.data.analysis)
        } else {
            quote!()
        };
        let call = if m.assoc {
            quote!(#native::#mname(&self.#field, #analysis_arg))
        } else {
            quote!(self.#field.#mname(#analysis_arg))
        };
        let expr = m.shape.expr(&quote!((&__r)), &model, &data);
        getters.push(getter_tokens(&Getter {
            name: mname.clone(),
            shape_ty: m.shape.ty(),
            needs_py: m.shape.needs_py(),
            body: quote! { let __r = #call; Ok(#expr) },
            via_super: false,
        }));
    }

    let def = quote! {
        #[::pyo3_stub_gen::derive::gen_stub_pyclass]
        #[::pyo3::pyclass(frozen)]
        pub struct #py {
            pub(crate) data: ::std::sync::Arc<crate::ir_core::ModelData>,
            pub(crate) model: ::pyo3::Py<crate::model::Model>,
            pub(crate) #field: #native,
            #(#extra_decls,)*
        }

        impl #py {
            /// Build a `Py`-boxed wrapper from a native value (+ build-time extras).
            #[allow(clippy::too_many_arguments)]
            pub(crate) fn build(
                model: &::pyo3::Py<crate::model::Model>,
                py: ::pyo3::Python<'_>,
                #field: #native,
                #(#extra_names: #extra_tys,)*
            ) -> ::pyo3::PyResult<::pyo3::Py<Self>> {
                ::pyo3::Py::new(py, #py {
                    data: model.borrow(py).data.clone(),
                    model: model.clone_ref(py),
                    #field,
                    #(#extra_names,)*
                })
            }
        }

        #[::pyo3_stub_gen::derive::gen_stub_pymethods]
        #[::pyo3::pymethods]
        impl #py {
            #(#getters)*
        }
    };
    (def, quote!(m.add_class::<#py>()?;))
}

/// Emit a standalone `symbol_keyed`-handle entity: a top-level entity keyed by an
/// `fpp_analysis` `Symbol` and looked up in an `Analysis` map.
///
/// Emits the pyclass `struct #py { data, model, sym }` (all `pub(crate)` so the
/// hand-written escape hatches in `crate::sem::hand` can read them), a `native()`
/// accessor into `data.analysis.<map>`, a `build_<snake>` constructor, a
/// `<snake>_by_symbol` resolver, the uniform `loc`/`symbol`/`definition`
/// (concrete `Py<DefX>`)/`__eq__`/`__hash__` getters, and one getter per
/// mechanical `fields {}`/`methods {}` entry (projected through `native()`). The
/// rich, non-mechanical getters (sorted maps, cross-layer resolvers, AST bridges)
/// stay hand-written in `crate::sem::hand`.
fn emit_entity_symbol_keyed(
    e: &EntityDecl,
    map: &Ident,
    def: &Ident,
) -> (TokenStream, TokenStream) {
    let py = &e.py;
    let native = &e.native;
    let model = quote!(&self.model);
    let data = quote!(self.data);
    let snake_name = snake(&py.to_string());
    let build_fn = format_ident!("build_{}", snake_name);
    let by_symbol_fn = format_ident!("{}_by_symbol", snake_name);
    let expect_msg = format!("{} symbol is present in {}", py, quote!(#map));

    let mut getters: Vec<TokenStream> = Vec::new();

    // Uniform getters (identical for every symbol-keyed entity).
    getters.push(quote! {
        /// The source location of the definition.
        #[getter]
        fn loc(&self) -> ::std::option::Option<crate::ir_core::Loc> {
            self.data.loc(self.sym.node())
        }
    });
    getters.push(quote! {
        /// The symbol that names this entity.
        #[getter]
        fn symbol(&self, py: ::pyo3::Python<'_>) -> ::pyo3::PyResult<crate::sem::SymbolRef> {
            ::std::result::Result::Ok(crate::sem::SymbolRef(
                crate::sem::build_symbol(&self.model, py, ::std::clone::Clone::clone(&self.sym))?
                    .into_any(),
            ))
        }
    });
    getters.push(quote! {
        /// The defining AST node.
        #[getter]
        fn definition(
            &self,
            py: ::pyo3::Python<'_>,
        ) -> ::pyo3::PyResult<::pyo3::Py<crate::ast::#def>> {
            ::std::result::Result::Ok(
                crate::model::Model::build(&self.model, py, self.sym.node())?
                    .into_bound(py)
                    .into_any()
                    .downcast_into::<crate::ast::#def>()?
                    .unbind(),
            )
        }
    });
    getters.push(quote! {
        fn __eq__(&self, other: &::pyo3::Bound<'_, ::pyo3::PyAny>) -> bool {
            match other.downcast::<#py>() {
                ::std::result::Result::Ok(o) => self.sym == o.borrow().sym,
                ::std::result::Result::Err(_) => false,
            }
        }
    });
    getters.push(quote! {
        fn __hash__(&self) -> u64 {
            self.data.ids.get(&self.sym.node()).copied().unwrap_or(0) as u64
        }
    });

    // Mechanical field getters: project through `native()`.
    for f in &e.fields {
        if matches!(f.shape, Shape::Skip) {
            continue;
        }
        let n = &f.name;
        let access = quote!((&self.native().#n));
        let expr = f.shape.expr(&access, &model, &data);
        getters.push(getter_tokens(&Getter {
            name: n.clone(),
            shape_ty: f.shape.ty(),
            needs_py: f.shape.needs_py(),
            body: quote!(Ok(#expr)),
            via_super: false,
        }));
    }

    // Mechanical method getters: `&self` accessors (or associated fns over the
    // `&Native` returned by `native()`).
    for m in &e.methods {
        if matches!(m.shape, Shape::Skip) {
            continue;
        }
        let mname = &m.name;
        let analysis_arg = if m.needs_analysis {
            quote!(&self.data.analysis)
        } else {
            quote!()
        };
        let call = if m.assoc {
            quote!(#native::#mname(self.native(), #analysis_arg))
        } else {
            quote!(self.native().#mname(#analysis_arg))
        };
        let expr = m.shape.expr(&quote!((&__r)), &model, &data);
        getters.push(getter_tokens(&Getter {
            name: mname.clone(),
            shape_ty: m.shape.ty(),
            needs_py: m.shape.needs_py(),
            body: quote! { let __r = #call; Ok(#expr) },
            via_super: false,
        }));
    }

    let def_ts = quote! {
        #[::pyo3_stub_gen::derive::gen_stub_pyclass]
        #[::pyo3::pyclass(frozen)]
        pub struct #py {
            pub(crate) data: ::std::sync::Arc<crate::ir_core::ModelData>,
            pub(crate) model: ::pyo3::Py<crate::model::Model>,
            pub(crate) sym: fpp_analysis::semantics::Symbol,
        }

        impl #py {
            /// The native analysis struct for this entity.
            pub(crate) fn native(&self) -> &#native {
                self.data.analysis.#map.get(&self.sym).expect(#expect_msg)
            }
        }

        /// Build the entity wrapper for `sym`.
        pub fn #build_fn(
            model: &::pyo3::Py<crate::model::Model>,
            py: ::pyo3::Python<'_>,
            sym: fpp_analysis::semantics::Symbol,
        ) -> ::pyo3::PyResult<::pyo3::Py<#py>> {
            ::pyo3::Py::new(
                py,
                #py {
                    data: model.borrow(py).data.clone(),
                    model: model.clone_ref(py),
                    sym,
                },
            )
        }

        /// Resolve `sym` to this entity iff it keys the analysis map.
        #[allow(dead_code)]
        pub(crate) fn #by_symbol_fn(
            data: &::std::sync::Arc<crate::ir_core::ModelData>,
            model: &::pyo3::Py<crate::model::Model>,
            py: ::pyo3::Python<'_>,
            sym: ::std::option::Option<&fpp_analysis::semantics::Symbol>,
        ) -> ::pyo3::PyResult<::std::option::Option<::pyo3::Py<#py>>> {
            match sym {
                ::std::option::Option::Some(s) if data.analysis.#map.contains_key(s) => {
                    ::std::result::Result::Ok(::std::option::Option::Some(
                        #build_fn(model, py, ::std::clone::Clone::clone(s))?,
                    ))
                }
                _ => ::std::result::Result::Ok(::std::option::Option::None),
            }
        }

        #[::pyo3_stub_gen::derive::gen_stub_pymethods]
        #[::pyo3::pymethods]
        impl #py {
            #(#getters)*
        }
    };
    (def_ts, quote!(m.add_class::<#py>()?;))
}

pub fn expand(input: TokenStream) -> TokenStream {
    let dsl = match syn::parse2::<Dsl>(input) {
        Ok(d) => d,
        Err(e) => return e.to_compile_error(),
    };

    let mut defs = Vec::new();
    let mut register_calls = Vec::new();
    let mut alias_names = Vec::new();
    let mut alias_exprs = Vec::new();

    for u in &dsl.unions {
        let (def, reg, _extra, (alias_name, alias_expr)) = emit_union(u, &dsl.payloads);
        defs.push(def);
        register_calls.extend(reg);
        alias_names.push(alias_name);
        alias_exprs.push(alias_expr);
    }

    for e in &dsl.entities {
        let (def, reg) = emit_entity(e);
        defs.push(def);
        register_calls.push(reg);
    }

    quote! {
        use fpp_analysis::semantics::SymbolInterface as _;
        use ::pyo3::prelude::*;

        #(#defs)*

        /// Register every generated semantic pyclass with the module.
        pub fn register(m: &::pyo3::Bound<'_, ::pyo3::types::PyModule>) -> ::pyo3::PyResult<()> {
            #(#register_calls)*
            Ok(())
        }

        /// `(alias name, `Sub1 | Sub2 | …` RHS)` for every generated closed union.
        pub fn union_aliases() -> ::std::vec::Vec<(&'static str, ::std::string::String)> {
            ::std::vec![ #( (#alias_names, #alias_exprs) ),* ]
        }
    }
}
