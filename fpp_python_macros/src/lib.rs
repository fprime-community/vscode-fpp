//! Attribute macros that remove the boilerplate from the hand-written semantic
//! and entity PyO3 wrappers in the `fpp_python` crate. These macros only emit
//! scaffolding (struct shape, constructors, uniform getters, dispatch) — they
//! never mirror the `fpp_analysis` data, so wrappers still read the live
//! `Analysis`/AST.
//!
//! * [`macro@semantic_wrapper`] — a leaf wrapper holding a native `Clone` (plus
//!   any extra scalar fields): injects the `data`/`model`/`native` fields, the
//!   `#[pyclass]`/stub attributes, and a `build` constructor. Field getters are
//!   hand-written in a separate `#[pymethods]` block.
//! * [`macro@symbol_entity`] — a top-level entity keyed by an `fpp_analysis`
//!   `Symbol` and looked up in an `Analysis` map: emits the struct, a `native()`
//!   accessor, the `build_*` constructor and `*_by_symbol` resolver, and injects
//!   the uniform `loc`/`symbol`/`definition`/`__eq__`/`__hash__` methods into the
//!   hand-written `#[pymethods]` impl.
//! * [`macro@semantic_subclasses`] — a `#[pyclass(subclass)]` base that
//!   dispatches on a native enum: emits one `#[pyclass(extends = Base)]` unit
//!   subclass per variant, a private `dispatch(base, py, disc)` that boxes the
//!   base as the concrete subclass, and a `register(m)` that adds the base and
//!   every subclass. The base's own methods and each subclass's field getters
//!   stay hand-written (in separate `#[pymethods]` impls), and the `build_*`
//!   entry point stays hand-written so per-hierarchy quirks (an absent `data`
//!   field, a fallback bare base) live in plain code, not macro knobs.

use proc_macro::TokenStream;
use quote::{format_ident, quote};
use syn::parse::{Parse, ParseStream};
use syn::{Field, Fields, ItemImpl, ItemStruct, Token, Type, parse_macro_input};

mod ast_bindings;

/// Expand a declarative mirror of the `fpp_ast` grammar (emitted by
/// `codegen/fpp_bindgen` into `native/src/ast/defs.rs`) into the PyO3 AST-node
/// wrappers + the recording walk — the code formerly checked in as
/// `generated/{py_ast,walk}.rs`. The DSL has `leaves {…}`, `shadowed {…}`,
/// `node X { field: Type, … }`, `union X { Variant(Inner), … }`, and
/// `kind X { … }` sections; cardinality is `T` / `T?` / `[T]` / `[T]?`. See
/// [`mod@ast_bindings`] for the grammar + classification rules.
#[proc_macro]
pub fn fpp_ast_bindings(input: TokenStream) -> TokenStream {
    ast_bindings::expand(input.into()).into()
}

// ---------------------------------------------------------------------------
// #[semantic_wrapper(native = SemX)]
// ---------------------------------------------------------------------------

struct WrapperArgs {
    native: Type,
    /// The struct field holding the native value (defaults to `native`). Letting
    /// callers keep an existing field name means migrating a hand-written wrapper
    /// needs no getter-body edits.
    field: syn::Ident,
    /// `native variant => wrapper` pairs. When non-empty the wrapper is a
    /// `#[pyclass(subclass)]` base and `build` dispatches on the native enum
    /// variant to the matching `#[pyclass(extends = Base)]` subclass.
    subclasses: Vec<(syn::Ident, syn::Ident)>,
}

struct SubclassPair {
    variant: syn::Ident,
    wrapper: syn::Ident,
}

impl Parse for SubclassPair {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let variant = input.parse()?;
        input.parse::<Token![=>]>()?;
        let wrapper = input.parse()?;
        Ok(SubclassPair { variant, wrapper })
    }
}

impl Parse for WrapperArgs {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let mut native: Option<Type> = None;
        let mut field: Option<syn::Ident> = None;
        let mut subclasses: Vec<(syn::Ident, syn::Ident)> = Vec::new();
        while !input.is_empty() {
            let key: syn::Ident = input.parse()?;
            match key.to_string().as_str() {
                "native" => {
                    input.parse::<Token![=]>()?;
                    native = Some(input.parse()?);
                }
                "field" => {
                    input.parse::<Token![=]>()?;
                    field = Some(input.parse()?);
                }
                "subclasses" => {
                    let content;
                    syn::parenthesized!(content in input);
                    let pairs = content.parse_terminated(SubclassPair::parse, Token![,])?;
                    subclasses = pairs.into_iter().map(|p| (p.variant, p.wrapper)).collect();
                }
                other => {
                    return Err(syn::Error::new(
                        key.span(),
                        format!("unknown key `{other}` (expected `native`, `field`, `subclasses`)"),
                    ));
                }
            }
            if input.peek(Token![,]) {
                input.parse::<Token![,]>()?;
            }
        }
        Ok(WrapperArgs {
            native: native
                .ok_or_else(|| syn::Error::new(input.span(), "missing `native = <Type>`"))?,
            field: field.unwrap_or_else(|| format_ident!("native")),
            subclasses,
        })
    }
}

/// Turn `#[semantic_wrapper(native = SemX)] pub struct W { <extra fields> }` into
/// a frozen pyclass `W { data, model, native: SemX, <extra fields> }` plus a
/// `W::build(model, py, native, <extra...>) -> PyResult<Py<W>>` constructor. The
/// field getters live in a separate hand-written `#[pymethods] impl W`.
///
/// `field = <ident>` renames the native field (default `native`). With
/// `subclasses(Variant => Wrapper, ...)` the wrapper becomes a subclassable base
/// and `build(model, py, &native)` dispatches on the native enum variant to the
/// matching subclass (each emitted as `#[pyclass(extends = Base)]`).
#[proc_macro_attribute]
pub fn semantic_wrapper(attr: TokenStream, item: TokenStream) -> TokenStream {
    let args = parse_macro_input!(attr as WrapperArgs);
    let input = parse_macro_input!(item as ItemStruct);
    let native = &args.native;
    let field = &args.field;
    let name = &input.ident;
    let vis = &input.vis;
    // Forward the struct's own attributes (notably its doc comment, which
    // pyo3-stub-gen turns into the class docstring) onto the emitted struct.
    let attrs = &input.attrs;

    // Extra (user-declared) named fields beyond data/model/<field>.
    let extra: Vec<Field> = match &input.fields {
        Fields::Named(f) => f.named.iter().cloned().collect(),
        Fields::Unit => Vec::new(),
        Fields::Unnamed(_) => {
            return syn::Error::new_spanned(
                &input,
                "#[semantic_wrapper] structs must have named fields or be a unit struct",
            )
            .to_compile_error()
            .into();
        }
    };
    let extra_names: Vec<_> = extra.iter().map(|f| f.ident.clone().unwrap()).collect();
    let extra_tys: Vec<_> = extra.iter().map(|f| f.ty.clone()).collect();
    let extra_decls = &extra;

    if args.subclasses.is_empty() {
        let expanded = quote! {
            #(#attrs)*
            #[::pyo3_stub_gen::derive::gen_stub_pyclass]
            #[::pyo3::pyclass(frozen)]
            #vis struct #name {
                #[allow(dead_code)]
                data: ::std::sync::Arc<crate::ir_core::ModelData>,
                model: ::pyo3::Py<crate::model::Model>,
                #field: #native,
                #(#extra_decls,)*
            }

            impl #name {
                /// Build a `Py`-boxed wrapper from a native value (+ extra fields).
                #[allow(clippy::too_many_arguments)]
                pub(crate) fn build(
                    model: &::pyo3::Py<crate::model::Model>,
                    py: ::pyo3::Python<'_>,
                    #field: #native,
                    #(#extra_names: #extra_tys,)*
                ) -> ::pyo3::PyResult<::pyo3::Py<Self>> {
                    ::pyo3::Py::new(
                        py,
                        #name {
                            data: model.borrow(py).data.clone(),
                            model: model.clone_ref(py),
                            #field,
                            #(#extra_names,)*
                        },
                    )
                }
            }
        };
        return expanded.into();
    }

    // Subclass mode: a base + one `extends` subclass per native enum variant.
    if !extra.is_empty() {
        return syn::Error::new_spanned(
            &input,
            "#[semantic_wrapper(subclasses(...))] does not support extra fields",
        )
        .to_compile_error()
        .into();
    }
    let variants: Vec<_> = args.subclasses.iter().map(|(v, _)| v).collect();
    let wrappers: Vec<_> = args.subclasses.iter().map(|(_, w)| w).collect();
    // The base is exposed to Python as `<Name>Base`, freeing `<Name>` for the
    // union alias registered in `crate::unions`.
    let base_name = syn::LitStr::new(&format!("{name}Base"), name.span());
    let expanded = quote! {
        #(#attrs)*
        #[::pyo3_stub_gen::derive::gen_stub_pyclass]
        #[::pyo3::pyclass(subclass, frozen, name = #base_name)]
        #vis struct #name {
            #[allow(dead_code)]
            data: ::std::sync::Arc<crate::ir_core::ModelData>,
            model: ::pyo3::Py<crate::model::Model>,
            #field: #native,
        }

        #(
            #[::pyo3_stub_gen::derive::gen_stub_pyclass]
            #[::pyo3::pyclass(extends = #name, frozen)]
            #vis struct #wrappers;
        )*

        impl #name {
            /// Build the concrete subclass wrapper for `native`'s variant, returned
            /// as the base `Py<Self>` (the runtime object is the concrete subclass).
            pub(crate) fn build(
                model: &::pyo3::Py<crate::model::Model>,
                py: ::pyo3::Python<'_>,
                #field: &#native,
            ) -> ::pyo3::PyResult<::pyo3::Py<Self>> {
                let base = #name {
                    data: model.borrow(py).data.clone(),
                    model: model.clone_ref(py),
                    #field: #field.clone(),
                };
                Ok(match #field {
                    #(
                        #native::#variants { .. } => {
                            ::pyo3::Bound::new(
                                py,
                                ::pyo3::PyClassInitializer::from(base).add_subclass(#wrappers),
                            )?
                            .into_super()
                            .unbind()
                        }
                    )*
                })
            }
        }
    };
    expanded.into()
}

// ---------------------------------------------------------------------------
// #[semantic_subclasses(over = SemX, variants(Variant => Subclass, ...))]
// ---------------------------------------------------------------------------

struct SubclassesArgs {
    /// The native enum the base wraps; `dispatch` matches on `&over`.
    over: Type,
    /// `native variant => subclass wrapper` pairs, in registration order.
    variants: Vec<(syn::Ident, syn::Ident)>,
}

impl Parse for SubclassesArgs {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let mut over: Option<Type> = None;
        let mut variants: Vec<(syn::Ident, syn::Ident)> = Vec::new();
        while !input.is_empty() {
            let key: syn::Ident = input.parse()?;
            match key.to_string().as_str() {
                "over" => {
                    input.parse::<Token![=]>()?;
                    over = Some(input.parse()?);
                }
                "variants" => {
                    let content;
                    syn::parenthesized!(content in input);
                    let pairs = content.parse_terminated(SubclassPair::parse, Token![,])?;
                    variants = pairs.into_iter().map(|p| (p.variant, p.wrapper)).collect();
                }
                other => {
                    return Err(syn::Error::new(
                        key.span(),
                        format!("unknown key `{other}` (expected `over`, `variants`)"),
                    ));
                }
            }
            if input.peek(Token![,]) {
                input.parse::<Token![,]>()?;
            }
        }
        Ok(SubclassesArgs {
            over: over.ok_or_else(|| syn::Error::new(input.span(), "missing `over = <Type>`"))?,
            variants,
        })
    }
}

/// Applied to a subclassable semantic base's struct declaration. Emits the base
/// pyclass (its own attrs/doc forwarded), one `#[pyclass(extends = Base)]` unit
/// subclass per `variants(Native::Variant => Subclass, ...)` entry, a private
/// `Base::dispatch(base, py, disc: &Native)` that boxes `base` as the concrete
/// subclass for `disc`'s variant (returned as the base `Py<Base>`), and a
/// `Base::register(m)` adding the base then every subclass.
///
/// The base's methods and each subclass's field getters are hand-written in
/// separate `#[pymethods]` impls; `build_*` is hand-written and calls `dispatch`.
#[proc_macro_attribute]
pub fn semantic_subclasses(attr: TokenStream, item: TokenStream) -> TokenStream {
    let args = parse_macro_input!(attr as SubclassesArgs);
    let input = parse_macro_input!(item as ItemStruct);
    if args.variants.is_empty() {
        return syn::Error::new_spanned(
            &input,
            "#[semantic_subclasses] needs at least one `variants(...)` entry",
        )
        .to_compile_error()
        .into();
    }
    let name = &input.ident;
    let vis = &input.vis;
    let attrs = &input.attrs;
    let fields = &input.fields;
    let over = &args.over;
    let variants: Vec<_> = args.variants.iter().map(|(v, _)| v).collect();
    let subs: Vec<_> = args.variants.iter().map(|(_, s)| s).collect();
    // The base is exposed to Python as `<Name>Base`, freeing `<Name>` for the
    // union alias registered in `crate::unions`.
    let base_name = syn::LitStr::new(&format!("{name}Base"), name.span());

    let expanded = quote! {
        #(#attrs)*
        #[::pyo3_stub_gen::derive::gen_stub_pyclass]
        #[::pyo3::pyclass(subclass, frozen, name = #base_name)]
        #vis struct #name #fields

        #(
            #[::pyo3_stub_gen::derive::gen_stub_pyclass]
            #[::pyo3::pyclass(extends = #name, frozen)]
            #vis struct #subs;
        )*

        impl #name {
            /// Box `base` as the concrete subclass matching `disc`'s variant,
            /// returned as the base `Py<Self>` (the object *is* the subclass).
            fn dispatch(
                base: Self,
                py: ::pyo3::Python<'_>,
                disc: &#over,
            ) -> ::pyo3::PyResult<::pyo3::Py<Self>> {
                Ok(match disc {
                    #(
                        #over::#variants { .. } => {
                            ::pyo3::Bound::new(
                                py,
                                ::pyo3::PyClassInitializer::from(base).add_subclass(#subs),
                            )?
                            .into_super()
                            .unbind()
                        }
                    )*
                })
            }

            /// Register the base and every subclass (base first).
            pub(crate) fn register(
                m: &::pyo3::Bound<'_, ::pyo3::types::PyModule>,
            ) -> ::pyo3::PyResult<()> {
                use ::pyo3::prelude::*;
                m.add_class::<#name>()?;
                #( m.add_class::<#subs>()?; )*
                Ok(())
            }
        }
    };
    expanded.into()
}

// ---------------------------------------------------------------------------
// #[symbol_entity(native = SemX, map = the_map)]
// ---------------------------------------------------------------------------

struct EntityArgs {
    native: Type,
    map: syn::Ident,
    /// The concrete `Def*` AST wrapper type this entity's `definition` resolves
    /// to (a single type per entity). When given, `definition` is typed
    /// `Py<Def*>`; otherwise it falls back to the `AstNode` base.
    def: Option<Type>,
}

impl Parse for EntityArgs {
    fn parse(input: ParseStream) -> syn::Result<Self> {
        let mut native: Option<Type> = None;
        let mut map: Option<syn::Ident> = None;
        let mut def: Option<Type> = None;
        while !input.is_empty() {
            let key: syn::Ident = input.parse()?;
            input.parse::<Token![=]>()?;
            match key.to_string().as_str() {
                "native" => native = Some(input.parse()?),
                "map" => map = Some(input.parse()?),
                "def" => def = Some(input.parse()?),
                other => {
                    return Err(syn::Error::new(
                        key.span(),
                        format!("unknown key `{other}` (expected `native`, `map`, or `def`)"),
                    ));
                }
            }
            if input.peek(Token![,]) {
                input.parse::<Token![,]>()?;
            }
        }
        Ok(EntityArgs {
            native: native
                .ok_or_else(|| syn::Error::new(input.span(), "missing `native = <Type>`"))?,
            map: map.ok_or_else(|| syn::Error::new(input.span(), "missing `map = <ident>`"))?,
            def,
        })
    }
}

/// Applied to a symbol-keyed entity's `#[pymethods] impl E { <specific getters> }`.
/// Emits (as siblings) the `struct E { data, model, sym }`, a `native()` accessor
/// into the analysis map, a `build_<snake>` constructor, and a `<snake>_by_symbol`
/// resolver; injects the uniform `loc`/`symbol`/`definition`/`__eq__`/`__hash__`
/// into the impl, then re-emits it under the stub + pymethods attributes.
#[proc_macro_attribute]
pub fn symbol_entity(attr: TokenStream, item: TokenStream) -> TokenStream {
    let args = parse_macro_input!(attr as EntityArgs);
    let mut input = parse_macro_input!(item as ItemImpl);
    let native = &args.native;
    let map = &args.map;
    let name = match &*input.self_ty {
        Type::Path(p) => p.path.segments.last().unwrap().ident.clone(),
        _ => {
            return syn::Error::new_spanned(&input.self_ty, "expected a plain type")
                .to_compile_error()
                .into();
        }
    };
    let snake = to_snake(&name.to_string());
    let build_fn = format_ident!("build_{}", snake);
    let by_symbol_fn = format_ident!("{}_by_symbol", snake);
    let expect_msg = format!("{name} symbol is present in {}", quote!(#map));

    // `definition`: concrete `Py<Def*>` when `def` is given, else the base.
    let definition_getter = match &args.def {
        Some(def) => quote! {
            /// The defining AST node.
            #[getter]
            fn definition(&self, py: ::pyo3::Python<'_>) -> ::pyo3::PyResult<::pyo3::Py<crate::ast::#def>> {
                Ok(crate::model::Model::build(&self.model, py, self.sym.node())?
                    .into_bound(py)
                    .into_any()
                    .downcast_into::<crate::ast::#def>()?
                    .unbind())
            }
        },
        None => quote! {
            /// The defining AST node wrapper.
            #[getter]
            fn definition(&self, py: ::pyo3::Python<'_>) -> ::pyo3::PyResult<::pyo3::Py<crate::ast::AstNode>> {
                crate::model::Model::build(&self.model, py, self.sym.node())
            }
        },
    };

    // Uniform getters injected into the hand-written impl.
    let uniform: proc_macro2::TokenStream = quote! {
        /// The source location of the definition.
        #[getter]
        fn loc(&self) -> Option<crate::ir_core::Loc> {
            self.data.loc(self.sym.node())
        }
        /// The symbol that names this entity.
        #[getter]
        fn symbol(&self, py: ::pyo3::Python<'_>) -> ::pyo3::PyResult<crate::unions::SymbolRef> {
            Ok(crate::unions::SymbolRef(
                crate::sem_py::build_symbol(&self.model, py, self.sym.clone())?.into_any(),
            ))
        }
        #definition_getter
        fn __eq__(&self, other: &::pyo3::Bound<'_, ::pyo3::PyAny>) -> bool {
            match other.downcast::<#name>() {
                Ok(o) => self.sym == o.borrow().sym,
                Err(_) => false,
            }
        }
        fn __hash__(&self) -> u64 {
            self.data.ids.get(&self.sym.node()).copied().unwrap_or(0) as u64
        }
    };
    let uniform_items: syn::ItemImpl = syn::parse2(quote! { impl #name { #uniform } }).unwrap();
    // Prepend uniform methods so hand-written ones win on any name clash-free merge.
    let mut items = uniform_items.items;
    items.append(&mut input.items);
    input.items = items;

    let expanded = quote! {
        #[::pyo3_stub_gen::derive::gen_stub_pyclass]
        #[::pyo3::pyclass(frozen)]
        pub struct #name {
            data: ::std::sync::Arc<crate::ir_core::ModelData>,
            model: ::pyo3::Py<crate::model::Model>,
            sym: fpp_analysis::semantics::Symbol,
        }

        impl #name {
            /// The native analysis struct for this entity.
            fn native(&self) -> &#native {
                self.data.analysis.#map.get(&self.sym).expect(#expect_msg)
            }
        }

        /// Build the entity wrapper for `sym`.
        pub fn #build_fn(
            model: &::pyo3::Py<crate::model::Model>,
            py: ::pyo3::Python<'_>,
            sym: fpp_analysis::semantics::Symbol,
        ) -> ::pyo3::PyResult<::pyo3::Py<#name>> {
            ::pyo3::Py::new(
                py,
                #name { data: model.borrow(py).data.clone(), model: model.clone_ref(py), sym },
            )
        }

        /// Resolve `sym` to this entity iff it keys the analysis map.
        #[allow(dead_code)]
        fn #by_symbol_fn(
            data: &::std::sync::Arc<crate::ir_core::ModelData>,
            model: &::pyo3::Py<crate::model::Model>,
            py: ::pyo3::Python<'_>,
            sym: Option<&fpp_analysis::semantics::Symbol>,
        ) -> ::pyo3::PyResult<Option<::pyo3::Py<#name>>> {
            match sym {
                Some(s) if data.analysis.#map.contains_key(s) => {
                    Ok(Some(#build_fn(model, py, s.clone())?))
                }
                _ => Ok(None),
            }
        }

        #[::pyo3_stub_gen::derive::gen_stub_pymethods]
        #[::pyo3::pymethods]
        #input
    };
    expanded.into()
}

fn to_snake(s: &str) -> String {
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
