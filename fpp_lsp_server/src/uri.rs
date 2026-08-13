//! Minimal `file://` URI conversions.
//!
//! The server only ever needs to translate between absolute local filesystem
//! paths and `file://` URI strings (which are then parsed into [`lsp_types::Uri`]
//! or fed to path-based APIs). That is a tiny slice of what the `url` crate
//! offers, so instead of depending on `url` (and its `idna` /
//! `form_urlencoded` transitive tree) we implement just those two operations on
//! top of `percent-encoding`, which is already in the tree via `lsp-types`.
//!
//! Behavior mirrors `url::Url::{from_file_path, to_file_path}` for the local,
//! absolute paths the server deals with: percent-encoding of path bytes,
//! forward-slash separators, and (on Windows) a `file:///C:/...` drive-letter
//! layout.

use percent_encoding::{AsciiSet, NON_ALPHANUMERIC, percent_decode_str, percent_encode};
use std::path::{Path, PathBuf};

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
/// `url::Url::from_file_path`'s contract.
pub fn from_file_path(path: impl AsRef<Path>) -> Result<String, ()> {
    let path = path.as_ref();
    if !path.is_absolute() {
        return Err(());
    }

    let mut out = String::from("file://");

    #[cfg(not(windows))]
    {
        use std::os::unix::ffi::OsStrExt;
        // Unix paths already begin with `/`, so the empty authority is followed
        // directly by the encoded path bytes (e.g. `file:///home/a%20b.fpp`).
        out.extend(percent_encode(path.as_os_str().as_bytes(), PATH_SET));
    }

    #[cfg(windows)]
    {
        // Produce `file:///C:/dir/file`. Windows paths are not raw byte paths,
        // so require valid Unicode and normalize separators to `/`.
        let s = path.to_str().ok_or(())?;
        out.push('/');
        let normalized = s.replace('\\', "/");
        out.extend(percent_encode(normalized.as_bytes(), PATH_SET));
    }

    Ok(out)
}

/// Parse a `file://` URI string into a filesystem path.
///
/// Returns `None` if the string is not a `file://` URI or does not decode to
/// valid UTF-8. Mirrors the local-path handling of `url::Url::to_file_path`.
pub fn to_file_path(uri: &str) -> Option<PathBuf> {
    // `file://` + (empty authority) + path. For local files the authority is
    // empty, so what follows is the path starting with `/`.
    let rest = uri.strip_prefix("file://")?;
    let decoded = percent_decode_str(rest).decode_utf8().ok()?;

    #[cfg(not(windows))]
    {
        Some(PathBuf::from(decoded.into_owned()))
    }

    #[cfg(windows)]
    {
        // `/C:/dir/file` -> `C:\dir\file`.
        let decoded = decoded.into_owned();
        let trimmed = decoded.strip_prefix('/').unwrap_or(&decoded);
        Some(PathBuf::from(trimmed.replace('/', "\\")))
    }
}

#[cfg(all(test, not(windows)))]
mod tests {
    use super::*;

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
