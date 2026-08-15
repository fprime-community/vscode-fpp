//! `file://` URI conversions.
//!
//! Path <-> `file://` URI conversion is delegated to the `url` crate, whose
//! [`Url::from_file_path`]/[`Url::to_file_path`] correctly handle the platform
//! edge cases a hand-rolled string mangler misses — notably Windows drive
//! letters, UNC paths (`\\server\share`, as seen under WSL/network mounts) and
//! verbatim (`\\?\`) prefixes. Only the purely lexical [`join_relative`] (which
//! resolves `include`/`locs` specifiers against a base URI without touching the
//! filesystem) is implemented locally on top of `percent-encoding`.

use percent_encoding::{AsciiSet, NON_ALPHANUMERIC, percent_encode};
use std::path::{Path, PathBuf};
use url::Url;

/// Characters left unencoded in a URI path. This is the RFC 3986 `pchar` set
/// (`unreserved` + `sub-delims` + `:` + `@`) plus `/` as the segment separator.
/// Everything else — spaces, control characters, non-ASCII bytes — is
/// percent-encoded.
const PATH_SET: &AsciiSet = &NON_ALPHANUMERIC
    // unreserved
    .remove(b'-')
    .remove(b'.')
    .remove(b'_')
    .remove(b'~')
    // sub-delims
    .remove(b'!')
    .remove(b'$')
    .remove(b'&')
    .remove(b'\'')
    .remove(b'(')
    .remove(b')')
    .remove(b'*')
    .remove(b'+')
    .remove(b',')
    .remove(b';')
    .remove(b'=')
    // pchar extras
    .remove(b':')
    .remove(b'@')
    // segment separator
    .remove(b'/');

/// Serialize an absolute filesystem path into a `file://` URI string.
///
/// Returns `Err(())` if the path is not absolute, mirroring
/// [`Url::from_file_path`]'s contract (which this delegates to).
pub fn from_file_path(path: impl AsRef<Path>) -> Result<String, ()> {
    Url::from_file_path(path).map(|url| url.as_str().to_string())
}

/// Parse a `file://` URI string into a filesystem path.
///
/// Returns `None` if the string is not a valid `file://` URI or does not map to
/// a local path. Delegates to [`Url::to_file_path`].
pub fn to_file_path(uri: &str) -> Option<PathBuf> {
    Url::parse(uri).ok()?.to_file_path().ok()
}

/// Resolve a `relative` path (as written in an `include`/`locs` specifier)
/// against a base `file://` URI, producing a new `file://` URI **purely
/// lexically** — no filesystem access.
///
/// This is deliberately not a path→`canonicalize`→URI round-trip. Canonicalizing
/// resolves symlinks (and `/var`→`/private/var` style aliases), which moves the
/// result into a *different* URI identity space than the one the editor uses to
/// key documents. Since document URIs are the keys for the VFS, the analysis
/// caches, and the use-def map, any such divergence silently breaks cross-file
/// symbol resolution (e.g. semantic highlighting of symbol uses). Keeping the
/// resolution lexical guarantees the include URI shares the base's space.
///
/// `.` and empty segments are dropped and `..` pops the preceding segment, the
/// same normalization a URL library performs for a relative reference. Segments
/// coming from `relative` are percent-encoded to match the URI space; segments
/// already in the base URI are left as-is (already encoded). Returns `None` if
/// `base_uri` is not a `file://` URI.
pub fn join_relative(base_uri: &str, relative: &str) -> Option<String> {
    let rest = base_uri.strip_prefix("file://")?;

    // Split the base path into its (already percent-encoded) segments and drop
    // the final one — the base file name — so `relative` resolves against the
    // base's *directory*, matching filesystem relative-path semantics.
    let mut segments: Vec<String> = rest.split('/').map(str::to_string).collect();
    segments.pop();

    // An absolute `relative` (rare, but valid) resets to the filesystem root.
    if relative.starts_with('/') {
        segments = vec![String::new()];
    }

    for part in relative.split(['/', '\\']) {
        match part {
            "" | "." => {}
            ".." => {
                // Keep the leading empty segment (the root) so we never escape
                // above `file:///`.
                if segments.len() > 1 {
                    segments.pop();
                }
            }
            seg => segments.push(percent_encode(seg.as_bytes(), PATH_SET).to_string()),
        }
    }

    Some(format!("file://{}", segments.join("/")))
}

#[cfg(all(test, not(windows)))]
mod tests {
    use super::*;

    #[test]
    fn join_relative_same_dir() {
        assert_eq!(
            join_relative("file:///a/b/Top.fpp", "Defs.fppi").unwrap(),
            "file:///a/b/Defs.fppi"
        );
    }

    #[test]
    fn join_relative_parent_and_subdir() {
        assert_eq!(
            join_relative("file:///a/b/Top.fpp", "../c/Defs.fppi").unwrap(),
            "file:///a/c/Defs.fppi"
        );
    }

    #[test]
    fn join_relative_encodes_new_segments() {
        assert_eq!(
            join_relative("file:///a/b/Top.fpp", "sub dir/D.fppi").unwrap(),
            "file:///a/b/sub%20dir/D.fppi"
        );
    }

    #[test]
    fn join_relative_preserves_base_encoding() {
        // A space already encoded in the base URI is not double-encoded.
        assert_eq!(
            join_relative("file:///a/my%20proj/Top.fpp", "D.fppi").unwrap(),
            "file:///a/my%20proj/D.fppi"
        );
    }

    #[test]
    fn join_relative_does_not_escape_root() {
        assert_eq!(
            join_relative("file:///Top.fpp", "../../x.fppi").unwrap(),
            "file:///x.fppi"
        );
    }

    #[test]
    fn roundtrips_plain_path() {
        let uri = from_file_path("/proj/custom/locs.fpp").unwrap();
        assert_eq!(uri, "file:///proj/custom/locs.fpp");
        assert_eq!(
            to_file_path(&uri).unwrap(),
            PathBuf::from("/proj/custom/locs.fpp")
        );
    }

    #[test]
    fn encodes_and_decodes_spaces() {
        let uri = from_file_path("/proj/a b/c.fpp").unwrap();
        assert_eq!(uri, "file:///proj/a%20b/c.fpp");
        assert_eq!(
            to_file_path(&uri).unwrap(),
            PathBuf::from("/proj/a b/c.fpp")
        );
    }

    #[test]
    fn relative_path_is_rejected() {
        assert!(from_file_path("relative/path.fpp").is_err());
    }

    #[test]
    fn non_file_uri_is_none() {
        assert!(to_file_path("http://example.com/x").is_none());
    }
}
