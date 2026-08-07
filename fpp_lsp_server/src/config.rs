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

/// F´ settings file that records the project layout.
const FPRIME_SETTINGS_FILE: &str = "settings.ini";

/// Default build cache directory produced by `fprime-util generate`.
const DEFAULT_BUILD_CACHE: &str = "build-fprime-automatic-native";

/// Unit-test build cache directory, offered as a commented alternative.
const UT_BUILD_CACHE: &str = "build-fprime-automatic-native-ut";

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

/// Read the `project_root` from an F´ `settings.ini`, if present.
///
/// `settings.ini` is a small INI file with a `[fprime]` section. `project_root`
/// (default `.`) is the directory, relative to `settings.ini`, where build caches
/// such as `build-fprime-automatic-native` live. Only the keys we need are parsed;
/// this intentionally avoids taking on an INI-parser dependency for the format.
pub fn read_fprime_project_root(dir: &Path) -> Option<String> {
    let contents = std::fs::read_to_string(dir.join(FPRIME_SETTINGS_FILE)).ok()?;

    let mut in_fprime_section = false;
    for raw in contents.lines() {
        let line = raw.trim();
        if line.is_empty() || line.starts_with(';') || line.starts_with('#') {
            continue;
        }
        if let Some(section) = line.strip_prefix('[').and_then(|s| s.strip_suffix(']')) {
            in_fprime_section = section.trim().eq_ignore_ascii_case("fprime");
            continue;
        }
        if !in_fprime_section {
            continue;
        }
        // Keys may use `:` or `=` as the separator.
        let sep = line.find([':', '=']);
        if let Some(idx) = sep {
            let key = line[..idx].trim();
            let value = line[idx + 1..].trim();
            if key.eq_ignore_ascii_case("project_root") && !value.is_empty() {
                return Some(value.to_string());
            }
        }
    }

    None
}

/// Render the default `.fpp-lsp` file contents for a project.
///
/// `build_cache` is the resolved (project-root-relative) default build cache
/// directory. The unit-test cache is included as a commented alternative.
pub fn default_config_yaml(build_cache: &str) -> String {
    format!(
        "# FPP language server project configuration.\n\
         # See https://github.com/fprime-community/fpp-tools for the full schema.\n\
         #\n\
         # `buildCache` points at an F´ build cache directory; the server indexes\n\
         # `<buildCache>/{locs}` to resolve references across the project.\n\
         buildCache: {build_cache}\n\
         # For unit-test builds, point at the UT cache instead:\n\
         # buildCache: {ut}\n\
         #\n\
         # Alternatively, set an explicit locs file or scan the whole workspace:\n\
         # locs: path/to/{locs}\n\
         # scanWorkspace: true\n",
        locs = LOCS_FILE_NAME,
        build_cache = build_cache,
        ut = UT_BUILD_CACHE,
    )
}

/// Generate a default `.fpp-lsp` in `dir`, exiting early if one already exists.
///
/// The build cache path is derived from the F´ `settings.ini` `project_root`
/// (default `.`) so it points at the right directory even when the project lives
/// in a subdirectory. Returns the path written.
pub fn generate_config(dir: &Path) -> std::io::Result<PathBuf> {
    let config_path = dir.join(CONFIG_FILE_NAME);
    if config_path.exists() {
        return Err(std::io::Error::new(
            std::io::ErrorKind::AlreadyExists,
            format!("{} already exists", config_path.display()),
        ));
    }

    let build_cache = default_build_cache(dir);
    std::fs::write(&config_path, default_config_yaml(&build_cache))?;
    Ok(config_path)
}

/// Compute the default build cache path relative to `dir`, honoring the F´
/// `settings.ini` `project_root` when present.
fn default_build_cache(dir: &Path) -> String {
    match read_fprime_project_root(dir) {
        Some(root) if root != "." && !root.is_empty() => {
            // Keep it forward-slashed and relative for the YAML.
            format!("{}/{DEFAULT_BUILD_CACHE}", root.trim_end_matches('/'))
        }
        _ => DEFAULT_BUILD_CACHE.to_string(),
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
        let cfg =
            FppLspConfig::parse("buildCache: build-fprime-automatic-native\nscanWorkspace: true\n")
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
                assert!(
                    uri.as_str()
                        .ends_with("/proj/build-fprime-automatic-native/locs.fpp")
                )
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

    // A unique temp dir per test without pulling in a tempfile dependency.
    fn temp_dir(tag: &str) -> PathBuf {
        let dir =
            std::env::temp_dir().join(format!("fpp-lsp-config-test-{tag}-{}", std::process::id()));
        let _ = std::fs::remove_dir_all(&dir);
        std::fs::create_dir_all(&dir).unwrap();
        dir
    }

    #[test]
    fn reads_project_root_from_settings_ini() {
        let dir = temp_dir("settings-root");
        std::fs::write(
            dir.join("settings.ini"),
            "; a comment\n[fprime]\nframework_path: ..\nproject_root: .\n",
        )
        .unwrap();
        assert_eq!(read_fprime_project_root(&dir).as_deref(), Some("."));
        std::fs::remove_dir_all(&dir).unwrap();
    }

    #[test]
    fn reads_project_root_with_equals_separator() {
        let dir = temp_dir("settings-eq");
        std::fs::write(
            dir.join("settings.ini"),
            "[fprime]\nproject_root = subdir\n",
        )
        .unwrap();
        assert_eq!(read_fprime_project_root(&dir).as_deref(), Some("subdir"));
        std::fs::remove_dir_all(&dir).unwrap();
    }

    #[test]
    fn ignores_project_root_outside_fprime_section() {
        let dir = temp_dir("settings-section");
        std::fs::write(dir.join("settings.ini"), "[other]\nproject_root: nope\n").unwrap();
        assert_eq!(read_fprime_project_root(&dir), None);
        std::fs::remove_dir_all(&dir).unwrap();
    }

    #[test]
    fn missing_settings_ini_is_none() {
        let dir = temp_dir("settings-missing");
        assert_eq!(read_fprime_project_root(&dir), None);
        std::fs::remove_dir_all(&dir).unwrap();
    }

    #[test]
    fn default_yaml_has_native_default_and_ut_comment() {
        let yaml = default_config_yaml(DEFAULT_BUILD_CACHE);
        // Active default is the native cache.
        assert!(yaml.contains("\nbuildCache: build-fprime-automatic-native\n"));
        // UT cache is present but commented.
        assert!(yaml.contains("# buildCache: build-fprime-automatic-native-ut"));
        // The generated file should itself parse back into a valid config.
        let cfg = FppLspConfig::parse(&yaml).unwrap();
        assert_eq!(
            cfg.build_cache.as_deref(),
            Some("build-fprime-automatic-native")
        );
    }

    #[test]
    fn generate_writes_file_and_refuses_to_clobber() {
        let dir = temp_dir("generate");
        let path = generate_config(&dir).unwrap();
        assert!(path.exists());
        assert_eq!(path.file_name().unwrap(), CONFIG_FILE_NAME);

        // Second call must not overwrite.
        let err = generate_config(&dir).unwrap_err();
        assert_eq!(err.kind(), std::io::ErrorKind::AlreadyExists);
        std::fs::remove_dir_all(&dir).unwrap();
    }

    #[test]
    fn generate_uses_project_root_from_settings() {
        let dir = temp_dir("generate-subdir");
        std::fs::write(dir.join("settings.ini"), "[fprime]\nproject_root: nested\n").unwrap();
        let path = generate_config(&dir).unwrap();
        let contents = std::fs::read_to_string(&path).unwrap();
        assert!(contents.contains("\nbuildCache: nested/build-fprime-automatic-native\n"));
        std::fs::remove_dir_all(&dir).unwrap();
    }
}
