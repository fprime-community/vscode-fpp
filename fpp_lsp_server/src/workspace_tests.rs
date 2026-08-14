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

    let (tx, _rx) = crossbeam_channel::unbounded();
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
