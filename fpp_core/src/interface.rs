use line_index::LineIndex;

use crate::context::CompilerContext;
use crate::{
    BytePos, Diagnostic, DiagnosticEmitter, GarbageCollectionSet, Node, Position, SourceFile, Span,
};
use std::cell::{Cell, Ref, RefCell};

struct Container<'ctx, E: DiagnosticEmitter> {
    ctx: RefCell<&'ctx mut CompilerContext<E>>,
}

impl<'ctx, E: DiagnosticEmitter> Container<'ctx, E> {
    pub fn new(ctx: &'ctx mut CompilerContext<E>) -> Container<'ctx, E> {
        Container {
            ctx: RefCell::new(ctx),
        }
    }
}

impl<'ctx, E: DiagnosticEmitter> CompilerInterface for Container<'ctx, E> {
    fn node_add(&self, span: &Span) -> Node {
        self.ctx.borrow_mut().node_add(span)
    }

    fn node_span(&self, node: &Node) -> Span {
        self.ctx.borrow().node_get_span(node)
    }

    fn node_pre_annotation(&self, node: &Node) -> Vec<String> {
        self.ctx.borrow().node_get(node).pre_annotation.clone()
    }

    fn node_post_annotation(&self, node: &Node) -> Vec<String> {
        self.ctx.borrow().node_get(node).post_annotation.clone()
    }

    fn node_add_annotation(&self, node: &Node, pre: Vec<String>, post: Vec<String>) {
        let mut ctx = self.ctx.borrow_mut();
        let node = ctx.node_get_mut(node);
        node.pre_annotation = pre;
        node.post_annotation = post;
    }

    fn file_new(&self, uri: &str, content: String, parent: Option<SourceFile>) -> SourceFile {
        self.ctx.borrow_mut().file_new(uri, content, parent)
    }

    fn file_uri(&self, file: &SourceFile) -> String {
        self.ctx.borrow().file_get(file).uri.clone()
    }

    fn file_parent(&self, file: &SourceFile) -> Option<SourceFile> {
        self.ctx.borrow_mut().file_get(file).parent
    }

    fn file_content(&self, file: &SourceFile) -> Ref<'_, String> {
        // self.ctx.borrow().file_get(file).content.clone()
        let ctx = self.ctx.borrow();
        Ref::map(ctx, |c| &c.file_get(file).content)
    }

    fn file_lines(&self, file: &SourceFile) -> Ref<'_, LineIndex> {
        let ctx = self.ctx.borrow();
        Ref::map(ctx, |c| &c.file_get(file).lines)
    }

    fn file_len(&self, file: &SourceFile) -> usize {
        self.ctx.borrow().file_get(file).content.len()
    }

    fn span_add(
        &self,
        file: SourceFile,
        start: BytePos,
        length: BytePos,
        include_span: Option<Span>,
    ) -> Span {
        self.ctx
            .borrow_mut()
            .span_add(file, start, length, include_span)
    }

    fn span_start(&self, s: &Span) -> Position {
        let ctx = self.ctx.borrow();
        let data = ctx.span_get(s);
        data.file.upgrade().unwrap().position(data.start)
    }

    fn span_end(&self, s: &Span) -> Position {
        let ctx = self.ctx.borrow();
        let data = ctx.span_get(s);
        data.file
            .upgrade()
            .unwrap()
            .position(data.start + (data.length as BytePos))
    }

    fn span_len(&self, s: &Span) -> usize {
        let ctx = self.ctx.borrow();
        let data = ctx.span_get(s);
        data.length as usize
    }

    fn span_file(&self, s: &Span) -> SourceFile {
        let ctx = self.ctx.borrow();
        SourceFile {
            handle: ctx.span_get(s).file.upgrade().unwrap().handle,
        }
    }

    fn span_include_span(&self, s: &Span) -> Option<Span> {
        let ctx = self.ctx.borrow();
        Some(Span {
            handle: ctx.span_get(s).include_span.clone()?.handle,
        })
    }

    fn diagnostic_emit(&self, diag: Diagnostic) {
        self.ctx.borrow_mut().diagnostic_emit(diag)
    }

    fn garbage_collection_start(&self) {
        self.ctx.borrow_mut().garbage_collection_start();
    }

    fn garbage_collection_finish(&self) -> GarbageCollectionSet {
        self.ctx.borrow_mut().garbage_collection_finish()
    }

    fn garbage_collection_cleanup(&self, gc: &GarbageCollectionSet) {
        self.ctx.borrow_mut().garbage_collection_cleanup(gc);
    }
}

pub(crate) trait CompilerInterface {
    /** Ast Node related functions */
    fn node_add(&self, span: &Span) -> Node;
    fn node_span(&self, node: &Node) -> Span;
    fn node_pre_annotation(&self, node: &Node) -> Vec<String>;
    fn node_post_annotation(&self, node: &Node) -> Vec<String>;
    fn node_add_annotation(&self, node: &Node, pre: Vec<String>, post: Vec<String>);

    /** Source file related functions */
    fn file_new(&self, uri: &str, content: String, parent: Option<SourceFile>) -> SourceFile;
    fn file_uri(&self, file: &SourceFile) -> String;
    fn file_parent(&self, file: &SourceFile) -> Option<SourceFile>;
    fn file_content(&self, file: &SourceFile) -> Ref<'_, String>;
    fn file_lines(&self, file: &SourceFile) -> Ref<'_, LineIndex>;
    fn file_len(&self, file: &SourceFile) -> usize;

    /** Span related functions */
    fn span_add(
        &self,
        file: SourceFile,
        start: BytePos,
        length: BytePos,
        include_span: Option<Span>,
    ) -> Span;
    fn span_start(&self, s: &Span) -> Position;
    fn span_end(&self, s: &Span) -> Position;
    fn span_len(&self, s: &Span) -> usize;
    fn span_file(&self, s: &Span) -> SourceFile;
    fn span_include_span(&self, s: &Span) -> Option<Span>;

    /** Diagnostic related functions */
    fn diagnostic_emit(&self, diag: Diagnostic);

    /** Garbage collection related functions */
    fn garbage_collection_start(&self);
    fn garbage_collection_finish(&self) -> GarbageCollectionSet;
    fn garbage_collection_cleanup(&self, gc: &GarbageCollectionSet);
}

// A thread local variable that stores a pointer to [`CompilerInterface`].
scoped_tls::scoped_thread_local!(static TLV: Cell<*const ()>);

/// Run the compiler under a closure with a compiler context
///
/// # Arguments
///
/// * `ctx`: Context to attach to the core compiler
/// * `f`: Function closure to run
pub fn run<F, T, E>(ctx: &mut CompilerContext<E>, f: F) -> T
where
    F: FnOnce() -> T,
    E: DiagnosticEmitter,
{
    let container = Container::new(ctx);
    run1(&container, f)
}

fn run1<F, T>(interface: &dyn CompilerInterface, f: F) -> T
where
    F: FnOnce() -> T,
{
    if TLV.is_set() {
        panic!("fpp_core already running");
    }

    let ptr: *const () = (&raw const interface) as _;
    TLV.set(&Cell::new(ptr), f)
}

/// Execute the given function with access the [`CompilerInterface`].
///
/// I.e., This function will load the current interface and calls a function with it.
/// Do not nest these, as that will ICE.
pub(crate) fn with<R>(f: impl FnOnce(&'static dyn CompilerInterface) -> R) -> R {
    assert!(TLV.is_set());
    TLV.with(|tlv| {
        let ptr = tlv.get();
        assert!(!ptr.is_null());
        f(unsafe { *(ptr as *const &dyn CompilerInterface) })
    })
}
