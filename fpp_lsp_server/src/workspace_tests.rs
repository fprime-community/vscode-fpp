//! End-to-end regression tests for URI keying across the workspace pipeline.
//!
//! The editor keys every document by the exact URI it opened. The server must
//! key its VFS and analysis caches under those same URIs, or cross-file symbol
//! resolution (hover, goto, semantic highlighting of symbol *uses*) silently
//! fails: the lookup misses, no `SourceFile` is found, and only the purely
//! syntactic tokens survive.
//!
//! These tests open a project through a *symlinked* root — the path the editor
//! hands us is not the canonical one — and assert the opened file is still
//! reachable and its uses are analyzed. This is the scenario that regressed
//! when include resolution canonicalized paths (resolving the symlink) before
//! turning them back into URIs.
#![cfg(test)]

use crate::global_state::{GlobalState, Task};
use crate::lsp::capabilities::ClientCapabilities;
use fpp_analysis::semantics::{NameGroup, SymbolInterface};
use lsp_types::{Uri, WorkspaceFolder};
use std::path::Path;
use std::str::FromStr;

/// Fresh, empty directory under `target/` for a test's fixture files.
fn fixture_dir(name: &str) -> std::path::PathBuf {
    let dir = Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("target")
        .join(name);
    let _ = std::fs::remove_dir_all(&dir);
    std::fs::create_dir_all(&dir).unwrap();
    dir
}

/// Index a workspace rooted at `folder` and run analysis to completion.
fn index_workspace(folder: &Path) -> GlobalState {
    let folder_uri = crate::uri::from_file_path(folder).unwrap();
    let workspace_folders = vec![WorkspaceFolder {
        uri: Uri::from_str(&folder_uri).unwrap(),
        name: "test".into(),
    }];

    let (tx, rx) = crossbeam_channel::unbounded();
    // Keep the receiver alive for the lifetime of the process so outgoing
    // notifications (e.g. progress) sent after this helper returns don't panic
    // on a closed channel.
    Box::leak(Box::new(rx));
    let mut state = GlobalState::new(
        Some(workspace_folders),
        tx,
        ClientCapabilities::new(Default::default()),
    );
    state.on_task(Task::ReloadWorkspace);
    state.run_pending_tasks();
    // Analysis is debounced behind a timer in the real loop; run it directly.
    state.on_task(Task::Analysis);
    state.run_pending_tasks();
    state
}

#[test]
fn scan_mode_resolves_uses_through_symlinked_root() {
    let real = fixture_dir("ws_scan_real");
    let link = Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("target")
        .join("ws_scan_link");
    let _ = std::fs::remove_file(&link);

    // `Top.fpp` includes `Defs.fppi` and uses the constant it defines.
    std::fs::write(real.join("Defs.fppi"), "constant A = 1\n").unwrap();
    std::fs::write(
        real.join("Top.fpp"),
        "module M {\n  include \"Defs.fppi\"\n  constant B = A\n}\n",
    )
    .unwrap();
    std::fs::write(real.join(".fpp-lsp"), "scanWorkspace: true\n").unwrap();
    std::os::unix::fs::symlink(&real, &link).unwrap();

    // The editor opened the project through the symlink.
    let state = index_workspace(&link);

    let top_uri = crate::uri::from_file_path(link.join("Top.fpp")).unwrap();
    assert!(
        state.source_file_for_uri(&top_uri).is_some(),
        "Top.fpp not reachable under the URI the editor opened ({top_uri})"
    );
    assert_eq!(
        state.use_def_count(),
        1,
        "the use of `A` in `constant B = A` was not resolved"
    );
}

/// A completion request can race ahead of analysis. Analysis is debounced, so
/// the compiler context can be rebuilt (dropping the nodes of a
/// no-longer-present translation unit) before the coalesced `Task::Analysis`
/// refreshes the snapshot. In that window `state.analysis` still holds
/// `Symbol`s pointing at node handles that are absent from the current context.
/// Building a completion item for such a stale symbol used to `unwrap()` the
/// missing node and panic; it must now degrade gracefully instead.
#[test]
fn completion_item_survives_stale_symbol_after_context_rebuild() {
    let dir = fixture_dir("ws_stale_symbol");

    // A pre-annotated constant. The annotation forces `symbol_to_completion_item`
    // down the branch that reads the symbol's backing node from the context.
    std::fs::write(
        dir.join("Top.fpp"),
        "module M {\n  @ doc\n  constant A = 1\n}\n",
    )
    .unwrap();
    std::fs::write(dir.join(".fpp-lsp"), "scanWorkspace: true\n").unwrap();

    let mut state = index_workspace(&dir);

    // Capture a symbol from the fresh analysis snapshot. Its node currently
    // resolves against the context.
    let symbol = state
        .snapshot_analysis()
        .global_scope
        .get(NameGroup::Value, "M")
        .and_then(|m| state.snapshot_analysis().symbol_scope_map.get(&m).cloned())
        .and_then(|scope| scope.get_group(NameGroup::Value).get("A"))
        .expect("constant `A` should be in module `M`'s scope");
    assert!(
        state.context.node_try_get(&symbol.node()).is_some(),
        "captured symbol's node should resolve before the rebuild"
    );

    // Delete the only source file and reindex. `Task::LoadFullWorkspace` builds a
    // fresh `CompilerContext` from the (now empty) file set, so the node handle
    // the captured symbol points at no longer exists. Run every task *except* the
    // debounced analysis so `state.analysis` remains the stale pre-rebuild
    // snapshot — exactly the racing-completion window.
    std::fs::remove_file(dir.join("Top.fpp")).unwrap();
    state.on_task(Task::LoadFullWorkspace);
    state.run_pending_tasks_except_analysis();
    assert!(
        state.context.node_try_get(&symbol.node()).is_none(),
        "captured symbol's node should have been dropped by the context rebuild"
    );

    // Building a completion item for the stale symbol must not panic.
    let item = crate::util::symbol_to_completion_item(&state, &symbol);
    assert_eq!(item.label, symbol.name().data);
}

/// Build a `CompletionParams` for `uri` at a zero-based `line`/`character`.
fn completion_params_at(uri: &str, line: u32, character: u32) -> lsp_types::CompletionParams {
    lsp_types::CompletionParams {
        text_document_position: lsp_types::TextDocumentPositionParams {
            text_document: lsp_types::TextDocumentIdentifier {
                uri: Uri::from_str(uri).unwrap(),
            },
            position: lsp_types::Position { line, character },
        },
        work_done_progress_params: Default::default(),
        partial_result_params: Default::default(),
        context: None,
    }
}

/// Flatten a completion response into its item list (empty when `None`).
fn completion_items(resp: Option<lsp_types::CompletionResponse>) -> Vec<lsp_types::CompletionItem> {
    match resp {
        None => vec![],
        Some(lsp_types::CompletionResponse::Array(items)) => items,
        Some(lsp_types::CompletionResponse::List(list)) => list.items,
    }
}

/// Completion must not fire while the cursor is inside a `#` comment. Comments
/// are trivia the completion resolver skips over, so without an explicit guard
/// a cursor parked in a trailing comment resolves against the preceding code
/// token (here the dangling `M.`) and wrongly offers that scope's members.
#[test]
fn completion_suppressed_inside_comment() {
    let dir = fixture_dir("ws_comment_completion");

    // `type T = M.` leaves a dangling member access; the trailing `# comment`
    // is where the cursor sits. Line/column are zero-based: the `#` is at
    // column 14 of line 1, so column 16 is inside the comment text.
    let text = "module M {\n  type T = M. # comment\n}\n";
    std::fs::write(dir.join("Top.fpp"), text).unwrap();
    std::fs::write(dir.join(".fpp-lsp"), "scanWorkspace: true\n").unwrap();

    let mut state = index_workspace(&dir);

    let top_uri = crate::uri::from_file_path(dir.join("Top.fpp")).unwrap();
    // Open the document in the VFS so the completion handler can read it.
    state.vfs.did_open(lsp_types::DidOpenTextDocumentParams {
        text_document: lsp_types::TextDocumentItem {
            uri: Uri::from_str(&top_uri).unwrap(),
            language_id: "fpp".into(),
            version: 1,
            text: text.to_string(),
        },
    });

    // Sanity check: completion at the dangling dot (before the comment) *does*
    // resolve `M`'s members, so this fixture exercises the resolving path.
    let at_dot = completion_items(
        crate::handlers::handle_completion(&state, completion_params_at(&top_uri, 1, 13))
            .expect("completion at dot should not error"),
    );
    assert!(
        at_dot.iter().any(|i| i.label == "T"),
        "fixture precondition: dangling `M.` should offer member `T`, got {at_dot:?}"
    );

    // Cursor inside the trailing comment must yield no completions.
    let in_comment = completion_items(
        crate::handlers::handle_completion(&state, completion_params_at(&top_uri, 1, 16))
            .expect("completion inside comment should not error"),
    );
    assert!(
        in_comment.is_empty(),
        "expected no completions inside a comment, got {in_comment:?}"
    );
}

#[test]
fn locs_mode_resolves_uses_through_symlinked_root() {
    let real = fixture_dir("ws_locs_real");
    let link = Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("target")
        .join("ws_locs_link");
    let _ = std::fs::remove_file(&link);

    std::fs::write(real.join("Defs.fppi"), "constant A = 1\n").unwrap();
    std::fs::write(
        real.join("Top.fpp"),
        "module M {\n  include \"Defs.fppi\"\n  constant B = A\n}\n",
    )
    .unwrap();
    std::fs::write(
        real.join("locs.fpp"),
        "locate constant M.B at \"Top.fpp\"\nlocate constant M.A at \"Defs.fppi\"\n",
    )
    .unwrap();
    std::fs::write(real.join(".fpp-lsp"), "locs: locs.fpp\n").unwrap();
    std::os::unix::fs::symlink(&real, &link).unwrap();

    let state = index_workspace(&link);

    let top_uri = crate::uri::from_file_path(link.join("Top.fpp")).unwrap();
    assert!(
        state.source_file_for_uri(&top_uri).is_some(),
        "Top.fpp not reachable under the URI the editor opened ({top_uri})"
    );
    assert_eq!(
        state.use_def_count(),
        1,
        "the use of `A` in `constant B = A` was not resolved"
    );
}
