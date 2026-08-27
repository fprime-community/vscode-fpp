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
use fpp_core::{Annotated, CompilerContext, Node, Span, Spanned};
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
    pub nodes_by_span: FxHashMap<Span, Node>,
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
    pub fn loc_of_span(&self, span: Span) -> Option<Loc> {
        Some(fpp_core::run_ref(&self.ctx, || {
            crate::lower_core::loc_of_span(&span)
        }))
    }

    /// The AST node whose span is `span`, if one was recorded during the walk.
    /// Used to bridge a thin analysis element to its `Spec*` AST node.
    pub fn node_of_span(&self, span: Span) -> Option<Node> {
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
