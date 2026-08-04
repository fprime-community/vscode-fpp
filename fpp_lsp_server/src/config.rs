//! Discovery and parsing of the `.fpp-lsp` project configuration file.
//!
//! `.fpp-lsp` is a `.clangd`-style YAML file placed at a workspace root. It is
//! the single, editor-agnostic source of truth for how the server indexes a
//! project. All keys are optional:
//!
//! ```yaml
//! buildCache: build-fprime-automatic-native   # dir; server resolves <buildCache>/locs.fpp
//! locs: path/to/locs.fpp                       # explicit locs file; wins over buildCache
//! scanWorkspace: false                         # if true, scan the whole workspace for .fpp
//! ```
//!
//! Resolution precedence: `locs` -> `<buildCache>/locs.fpp` -> if `scanWorkspace`
//! is set (or nothing else resolved) scan the entire workspace. Relative paths are
//! resolved against the directory containing the `.fpp-lsp` file.

use crate::global_state::Workspace;
use lsp_types::{Uri, WorkspaceFolder};
use serde::Deserialize;
use std::path::{Path, PathBuf};
use std::str::FromStr;
use url::Url;

/// Name of the project configuration file, searched for at each workspace root.
pub const CONFIG_FILE_NAME: &str = ".fpp-lsp";

/// The locs file name resolved inside a `buildCache` directory.
const LOCS_FILE_NAME: &str = "locs.fpp";

#[derive(Debug, Default, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase", default)]
pub struct FppLspConfig {
    /// Build cache directory containing a `locs.fpp` (relative to the config file).
    pub build_cache: Option<String>,
    /// Explicit path to a `locs.fpp` file (relative to the config file). Takes
    /// precedence over `build_cache`.
    pub locs: Option<String>,
    /// Scan the entire workspace for `.fpp` files instead of using a locs file.
    pub scan_workspace: bool,
}

impl FppLspConfig {
    /// Parse a `.fpp-lsp` from its YAML contents. Returns `None` on parse error
    /// (logged), so a malformed config is treated as absent rather than fatal.
    pub fn parse(contents: &str) -> Option<FppLspConfig> {
        match serde_yaml_ng::from_str(contents) {
            Ok(cfg) => Some(cfg),
            Err(err) => {
                tracing::warn!(err = %err, "failed to parse .fpp-lsp config");
                None
            }
        }
    }

    /// Resolve this config against the directory containing the `.fpp-lsp` file
    /// into a concrete [`Workspace`].
    pub fn resolve(&self, base_dir: &Path) -> Workspace {
        // 1. Explicit locs file wins.
        if let Some(locs) = &self.locs {
            match locs_uri(base_dir, locs) {
                Some(uri) => return Workspace::LocsFile(uri),
                None => {
                    tracing::warn!(locs = %locs, "failed to resolve `locs` path in .fpp-lsp");
                }
            }
        }

        // 2. Build cache directory -> <buildCache>/locs.fpp.
        if let Some(build_cache) = &self.build_cache {
            let locs = Path::new(build_cache).join(LOCS_FILE_NAME);
            match locs_uri(base_dir, &locs) {
                Some(uri) => return Workspace::LocsFile(uri),
                None => {
                    tracing::warn!(build_cache = %build_cache, "failed to resolve `buildCache` locs in .fpp-lsp");
                }
            }
        }

        // 3. Full workspace scan.
        if self.scan_workspace {
            return Workspace::Full;
        }

        Workspace::None
    }
}

/// Build a file `Uri` for a locs path relative to `base_dir`.
fn locs_uri(base_dir: &Path, relative: impl AsRef<Path>) -> Option<Uri> {
    let path = base_dir.join(relative);
    let url = Url::from_file_path(&path).ok()?;
    Uri::from_str(url.as_str()).ok()
}

/// Search the given workspace folders for a `.fpp-lsp` file and resolve it into a
/// [`Workspace`]. Returns the first configuration found (folders are searched in
/// order). Returns `Workspace::None` when no config is present.
pub fn discover(workspace_folders: Option<&[WorkspaceFolder]>) -> Workspace {
    let Some(folders) = workspace_folders else {
        return Workspace::None;
    };

    for folder in folders {
        let Some(root) = folder_path(folder) else {
            continue;
        };
        let config_path = root.join(CONFIG_FILE_NAME);
        match std::fs::read_to_string(&config_path) {
            Ok(contents) => {
                if let Some(cfg) = FppLspConfig::parse(&contents) {
                    tracing::info!(path = %config_path.display(), config = ?cfg, "discovered .fpp-lsp");
                    return cfg.resolve(&root);
                }
            }
            Err(err) if err.kind() == std::io::ErrorKind::NotFound => {}
            Err(err) => {
                tracing::warn!(path = %config_path.display(), err = %err, "failed to read .fpp-lsp");
            }
        }
    }

    Workspace::None
}

/// Convert a workspace folder `Uri` into a filesystem path.
fn folder_path(folder: &WorkspaceFolder) -> Option<PathBuf> {
    Url::from_str(folder.uri.as_str())
        .ok()
        .and_then(|url| url.to_file_path().ok())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_empty_is_default() {
        assert_eq!(FppLspConfig::parse("").unwrap(), FppLspConfig::default());
    }

    #[test]
    fn parse_camel_case_keys() {
        let cfg = FppLspConfig::parse(
            "buildCache: build-fprime-automatic-native\nscanWorkspace: true\n",
        )
        .unwrap();
        assert_eq!(
            cfg.build_cache.as_deref(),
            Some("build-fprime-automatic-native")
        );
        assert!(cfg.scan_workspace);
        assert!(cfg.locs.is_none());
    }

    #[test]
    fn parse_invalid_yaml_is_none() {
        assert!(FppLspConfig::parse("locs: [unterminated").is_none());
    }

    #[test]
    fn resolve_locs_wins_over_build_cache() {
        let base = Path::new("/proj");
        let cfg = FppLspConfig {
            build_cache: Some("build-dir".into()),
            locs: Some("custom/locs.fpp".into()),
            scan_workspace: true,
        };
        match cfg.resolve(base) {
            Workspace::LocsFile(uri) => assert!(uri.as_str().ends_with("/proj/custom/locs.fpp")),
            other => panic!("expected LocsFile, got {other:?}"),
        }
    }

    #[test]
    fn resolve_build_cache_appends_locs_file() {
        let base = Path::new("/proj");
        let cfg = FppLspConfig {
            build_cache: Some("build-fprime-automatic-native".into()),
            ..Default::default()
        };
        match cfg.resolve(base) {
            Workspace::LocsFile(uri) => {
                assert!(uri.as_str().ends_with("/proj/build-fprime-automatic-native/locs.fpp"))
            }
            other => panic!("expected LocsFile, got {other:?}"),
        }
    }

    #[test]
    fn resolve_scan_workspace() {
        let cfg = FppLspConfig {
            scan_workspace: true,
            ..Default::default()
        };
        assert_eq!(cfg.resolve(Path::new("/proj")), Workspace::Full);
    }

    #[test]
    fn resolve_empty_is_none() {
        assert_eq!(
            FppLspConfig::default().resolve(Path::new("/proj")),
            Workspace::None
        );
    }
}
