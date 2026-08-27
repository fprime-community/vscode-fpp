//! Hand-written core of the backing: the resolved [`Loc`] and the owned
//! [`ModelData`] — the live parsed AST, the live `fpp_analysis::Analysis`, and
//! the live `fpp_core::CompilerContext`, all kept alive for direct reads.
//!
//! There is **no owned per-node IR copy** and **no owned semantic mirror**:
//! AST wrappers read the live `fpp_ast` nodes through [`ModelData::node_as`],
//! the symbol/type/value/entity wrappers read `analysis` directly, and
//! locations/annotations are resolved lazily against the retained `ctx` via
//! `fpp_core::run_ref` (so they need no eager side-tables). The only owned
//! lookups are the dense ids, the node pointers, the span->node bridge, and the
//! `by_qualified_name` index.

use crate::diagnostics::SharedEmitter;
use crate::noderef::NodeRef;
use fpp_analysis::semantics::Symbol;
use fpp_core::{Annotated, CompilerContext, Node, Spanned};
use pyo3::prelude::*;
use pyo3_stub_gen::derive::{gen_stub_pyclass, gen_stub_pymethods};
use rustc_hash::FxHashMap;
use std::sync::Arc;

/// A resolved source location (0-indexed line/column, matching `fpp_core`).
#[gen_stub_pyclass]
#[pyclass(frozen, get_all)]
#[derive(Clone, Debug)]
pub struct Loc {
    pub uri: String,
    pub line: u32,
    pub column: u32,
    pub end_line: u32,
    pub end_column: u32,
}

#[gen_stub_pymethods]
#[pymethods]
impl Loc {
    fn __repr__(&self) -> String {
        format!("Loc({}:{}:{})", self.uri, self.line + 1, self.column + 1)
    }
}

/// A lazy handle to a source span.
///
/// Holds only the opaque `fpp_core::Span` (a `usize` handle) plus the backing
/// [`ModelData`]; the file/line/column are resolved on demand via
/// [`ModelData::loc_of_span`] (which re-enters the retained compiler context with
/// `run_ref`). Getters therefore never touch the context until a location is
/// actually read, and `__eq__`/`__hash__` operate on the raw handle — so a `Span`
/// is a cheap, context-free value usable as a `dict` key.
#[gen_stub_pyclass]
#[pyclass(frozen)]
#[derive(Clone)]
pub struct Span {
    data: Arc<ModelData>,
    span: fpp_core::Span,
}

impl Span {
    /// Wrap a native span with its backing model data.
    pub fn new(data: Arc<ModelData>, span: fpp_core::Span) -> Self {
        Span { data, span }
    }
}

#[gen_stub_pymethods]
#[pymethods]
impl Span {
    /// Resolve this span to a concrete source [`Loc`] (enters the compiler context).
    fn resolve(&self) -> Loc {
        self.data
            .loc_of_span(self.span)
            .expect("a recorded span resolves to a location")
    }

    /// The source file URI/path.
    #[getter]
    fn uri(&self) -> String {
        self.resolve().uri
    }

    /// The 0-indexed start line.
    #[getter]
    fn line(&self) -> u32 {
        self.resolve().line
    }

    /// The 0-indexed start column.
    #[getter]
    fn column(&self) -> u32 {
        self.resolve().column
    }

    /// The 0-indexed end line.
    #[getter]
    fn end_line(&self) -> u32 {
        self.resolve().end_line
    }

    /// The 0-indexed end column.
    #[getter]
    fn end_column(&self) -> u32 {
        self.resolve().end_column
    }

    fn __eq__(&self, other: &Bound<'_, PyAny>) -> bool {
        match other.downcast::<Span>() {
            Ok(o) => self.span == o.borrow().span,
            Err(_) => false,
        }
    }

    fn __hash__(&self) -> u64 {
        use std::hash::{Hash, Hasher};
        let mut h = std::collections::hash_map::DefaultHasher::new();
        self.span.hash(&mut h);
        h.finish()
    }

    fn __repr__(&self) -> String {
        let l = self.resolve();
        format!("<Span {}:{}:{}>", l.uri, l.line + 1, l.column + 1)
    }
}

/// A `dict[K, V]` return wrapper over a built `Py<PyDict>`.
///
/// The runtime object is a plain Python `dict`; the `K`/`V` phantoms exist only
/// to drive [`pyo3_stub_gen::PyStubType`] so the generated stub renders
/// `dict[Kstub, Vstub]` instead of the default `dict[typing.Any, typing.Any]`
/// that a bare `Py<PyDict>` would produce. This mirrors the union `*Ref`
/// newtypes: a hand-rolled `IntoPyObject` + `PyStubType` pair used purely as a
/// getter/method return type (never stored in a pyclass). The macro's `map(K, V)`
/// shape builds the dict, then wraps it as `DictStub::<Kty, Vty>::new(..)`.
///
/// `allow(dead_code)`: the shape that constructs this is only emitted once the
/// generator reflects `HashMap`/`BTreeMap` fields into `map(K, V)`; the type +
/// its `new` constructor are the target API for that (a later phase).
#[allow(dead_code)]
pub struct DictStub<K, V> {
    dict: Py<pyo3::types::PyDict>,
    _marker: std::marker::PhantomData<(K, V)>,
}

impl<K, V> DictStub<K, V> {
    /// Wrap an already-built `Py<PyDict>`.
    #[allow(dead_code)]
    pub fn new(dict: Py<pyo3::types::PyDict>) -> Self {
        DictStub {
            dict,
            _marker: std::marker::PhantomData,
        }
    }
}

impl<'py, K, V> IntoPyObject<'py> for DictStub<K, V> {
    type Target = pyo3::types::PyDict;
    type Output = Bound<'py, pyo3::types::PyDict>;
    type Error = std::convert::Infallible;
    fn into_pyobject(self, py: Python<'py>) -> Result<Self::Output, Self::Error> {
        Ok(self.dict.into_bound(py))
    }
}

impl<K: pyo3_stub_gen::PyStubType, V: pyo3_stub_gen::PyStubType> pyo3_stub_gen::PyStubType
    for DictStub<K, V>
{
    fn type_output() -> pyo3_stub_gen::TypeInfo {
        let k = K::type_output();
        let v = V::type_output();
        let mut import = k.import;
        import.extend(v.import);
        import.insert("builtins".into());
        pyo3_stub_gen::TypeInfo {
            name: format!("builtins.dict[{}, {}]", k.name, v.name),
            import,
        }
    }
}

/// A fully analyzed model: the live parsed AST and the live
/// `fpp_analysis::Analysis` kept alive for direct reads, plus the
/// `fpp_core::Node`-keyed side-tables recorded during the walk (see
/// `crate::lower_core::Walker`) and two small indexes derived from `analysis`.
///
/// `tu` is immutable for the life of this struct; `node_ptrs` aliases into it
/// (see [`crate::noderef`] for the soundness argument). `analysis` references
/// the *augmented clone*'s AST defs through `Symbol(Arc<DefX>)`; cross-refs to
/// AST wrappers go through the shared `fpp_core::Node` handles into `tu`'s
/// `node_ptrs`. Everything here is `Send + Sync` (including `ctx`), so it may
/// live behind the `Sync` `Model` pyclass; wrappers resolve locations and
/// annotations by re-entering the retained `ctx` via `fpp_core::run_ref`.
pub struct ModelData {
    /// The live parsed AST (never mutated after the walk).
    pub tu: fpp_ast::TransUnit,
    /// The live semantic analysis, read directly by the symbol/type/value and
    /// entity wrappers.
    pub analysis: fpp_analysis::Analysis,
    /// The live compiler context, kept alive so locations and annotations can be
    /// resolved lazily via `run_ref` at getter time. `Send + Sync` (its fields
    /// are `HashMap`/`Vec`/`Arc`/`Weak` and the
    /// owned `SharedEmitter`), so it may live in the `Sync` `Model` pyclass.
    pub ctx: Arc<CompilerContext<SharedEmitter>>,
    /// Translation-unit top-level member nodes, in source order.
    pub roots: Vec<Node>,
    /// Dense id per node (exposed as the `.node_id` attribute), assigned in
    /// walk pre-order.
    pub ids: FxHashMap<Node, u32>,
    /// Type-tag + raw pointer into `tu` per node (drives wrapper construction
    /// and field reads).
    pub node_ptrs: FxHashMap<Node, NodeRef>,
    /// `Span -> Node`, bridging a thin analysis element (keyed by its `Spec*`
    /// node's span) to that AST node for detail forwarding.
    pub nodes_by_span: FxHashMap<fpp_core::Span, Node>,
    /// Fully-qualified name -> symbol, for `Model.lookup` (only symbols whose
    /// def node was recorded during the walk).
    pub by_qualified_name: FxHashMap<String, Symbol>,
}

impl ModelData {
    /// The dense id assigned to `node` during the walk.
    pub fn id(&self, node: Node) -> u32 {
        self.ids[&node]
    }

    /// The resolved location of `node` (resolved lazily against the live ctx).
    pub fn loc(&self, node: Node) -> Option<Loc> {
        Some(fpp_core::run_ref(&self.ctx, || {
            crate::lower_core::loc_of_span(&node.span())
        }))
    }

    /// The resolved location of a `Span` (resolved lazily against the live ctx).
    pub fn loc_of_span(&self, span: fpp_core::Span) -> Option<Loc> {
        Some(fpp_core::run_ref(&self.ctx, || {
            crate::lower_core::loc_of_span(&span)
        }))
    }

    /// The AST node whose span is `span`, if one was recorded during the walk.
    /// Used to bridge a thin analysis element to its `Spec*` AST node.
    pub fn node_of_span(&self, span: fpp_core::Span) -> Option<Node> {
        self.nodes_by_span.get(&span).copied()
    }

    /// The pre-annotations of `node` (resolved lazily against the live ctx).
    pub fn pre_anno(&self, node: Node) -> Vec<String> {
        fpp_core::run_ref(&self.ctx, || Annotated::pre_annotation(&node))
    }

    /// The post-annotations of `node` (resolved lazily against the live ctx).
    pub fn post_anno(&self, node: Node) -> Vec<String> {
        fpp_core::run_ref(&self.ctx, || Annotated::post_annotation(&node))
    }

    /// Reborrow the live AST node for `node` as `&T`.
    ///
    /// `T` must match the node's recorded tag; callers are the generated
    /// wrappers, each of which passes the AST type its `tag` denotes. The single
    /// `unsafe` deref is confined to [`NodeRef::downcast`]; the returned
    /// reference borrows `self`, whose `Arc<ModelData>` keeps `tu` alive.
    pub fn node_as<T>(&self, node: Node) -> &T {
        let nr = self
            .node_ptrs
            .get(&node)
            .expect("node was recorded during the walk");
        // SAFETY: `nr.ptr` points into `self.tu` (alive and immutable for the
        // life of `self`); `T` matches `nr.tag` by construction.
        unsafe { nr.downcast::<T>() }
    }
}
