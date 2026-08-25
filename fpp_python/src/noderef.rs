//! `NodeRef`: a type-tagged raw pointer into the live parsed AST.
//!
//! # Why raw pointers
//!
//! The hybrid backing keeps the parsed [`fpp_ast::TransUnit`] alive inside
//! [`crate::ir_core::ModelData`] and reads AST nodes directly instead of copying
//! them into an owned IR. A wrapper only stores the node's [`fpp_core::Node`]
//! handle (a `Copy`, `Send + Sync` index); to reach the concrete AST struct at
//! getter time it looks up a [`NodeRef`] in `ModelData::node_ptrs` and downcasts.
//!
//! # Soundness
//!
//! `NodeRef::ptr` points **into** `ModelData::tu` (the owned, parsed AST). This
//! is sound because:
//!
//! * `tu` is never mutated after the recording walk (semantic analysis runs on a
//!   *separate* augmented clone, never on `tu`), so no `Vec`/`Box` it owns is
//!   ever reallocated — the heap buffers the pointers reference never move.
//! * Moving `tu` (into `ModelData`, then into `Arc<ModelData>`, then across the
//!   `allow_threads` boundary) only copies `Vec`/`Box` *headers*; the heap
//!   allocations they own — where the pointed-to nodes live — stay put.
//! * `ModelData` is held behind `Arc` by [`crate::model::Model`], and every AST
//!   wrapper keeps that `Model` alive through its `Py<Model>`. So for as long as
//!   any wrapper can call [`NodeRef::downcast`], the `tu` it points into is
//!   alive and immutable.
//! * The `tag` is assigned together with `ptr` during the walk from the concrete
//!   static type of the node, so `downcast::<T>()` is only ever called with the
//!   `T` that matches `tag` (see `ModelData::node_as`).
//!
//! The `unsafe` in this crate is confined to the two `unsafe impl` markers below
//! and the single deref in [`NodeRef::downcast`]; every caller goes through the
//! safe [`crate::ir_core::ModelData::node_as`] helper.

use crate::ast::NodeKind;

/// A type tag plus a raw pointer to a node living inside `ModelData::tu`.
#[derive(Clone, Copy)]
pub struct NodeRef {
    /// Which AST struct `ptr` points at (drives wrapper construction).
    pub tag: NodeKind,
    /// `*const T` for the AST struct denoted by `tag`, erased to `*const ()`.
    pub ptr: *const (),
}

// SAFETY: `ptr` only ever aliases immutable data owned by `Arc<ModelData>` (see
// the module-level soundness argument). It is never used to mutate, and the data
// it points at outlives every `NodeRef` because the `Arc<ModelData>` is kept
// alive by the `Py<Model>` every wrapper holds.
unsafe impl Send for NodeRef {}
unsafe impl Sync for NodeRef {}

impl NodeRef {
    /// Reborrow the pointed-to node as `&T`.
    ///
    /// # Safety
    ///
    /// `T` must be the AST struct type that `self.tag` denotes. This holds by
    /// construction: `ptr`/`tag` are written together in the generated recording
    /// walk from a `&T`, and the only caller ([`crate::ir_core::ModelData::node_as`])
    /// is invoked with that same `T` by the wrapper for `tag`.
    pub unsafe fn downcast<T>(&self) -> &T {
        // SAFETY: forwarded from the caller's contract (see the fn-level docs).
        unsafe { &*(self.ptr as *const T) }
    }
}
