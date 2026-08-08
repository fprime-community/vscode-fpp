mod file;
pub use file::*;

use fpp_core::{Error, LineIndex, SourceFile};
use lsp_types::{
    DidChangeTextDocumentParams, DidCloseTextDocumentParams, DidOpenTextDocumentParams, Uri,
};
use rustc_hash::FxHashMap;
use std::str::FromStr;
use std::sync::{Arc, RwLock};
use url::Url;

use crate::lsp::capabilities::PositionEncoding;

#[derive(Clone)]
pub struct Vfs {
    files: Arc<RwLock<FxHashMap<String, File>>>,
}

impl Default for Vfs {
    fn default() -> Self {
        Self::new()
    }
}

impl Vfs {
    pub fn new() -> Vfs {
        Vfs {
            files: Default::default(),
        }
    }

    pub(crate) fn get_lines(&self, path: &str) -> anyhow::Result<Arc<LineIndex>> {
        match self.files.read().unwrap().get(path) {
            None => Err(std::io::Error::new(
                std::io::ErrorKind::NotFound,
                format!("file not in vfs: {}", path),
            )
            .into()),
            Some(file) => Ok(file.lines.clone()),
        }
    }

    pub(crate) fn read_sync(&self, path: &str) -> anyhow::Result<String> {
        match self.files.read().unwrap().get(path) {
            None => Err(std::io::Error::new(
                std::io::ErrorKind::NotFound,
                format!("file not in vfs: {}", path),
            )
            .into()),
            Some(file) => Ok(file.content.text().to_string()),
        }
    }

    pub(crate) fn read(&self, path: &str) -> anyhow::Result<String> {
        match self.files.read().unwrap().get(path) {
            None => {}
            Some(file) => return Ok(file.content.text().to_string()),
        }

        let path_uri = Uri::from_str(path)?;
        let fs_path = path_uri.path().to_string();
        match std::fs::read_to_string(&fs_path) {
            Ok(text) => {
                self.files.write().unwrap().insert(
                    path.to_string(),
                    File::new(FileContent::Fs(FsFile {
                        path: path.to_string(),
                        text: text.clone(),
                    })),
                );
                Ok(text)
            }
            Err(e) => Err(e.into()),
        }
    }

    pub(crate) fn update_fs(&self, path: &str) -> anyhow::Result<bool> {
        match self.files.read().unwrap().get(path) {
            None => {}
            Some(file) => {
                if let FileContent::Lsp(_) = file.content {
                    return Ok(false);
                }
            }
        }

        let path_uri = Uri::from_str(path)?;
        let fs_path = path_uri.path().to_string();
        match std::fs::read_to_string(&fs_path) {
            Ok(text) => {
                self.files.write().unwrap().insert(
                    path.to_string(),
                    File::new(FileContent::Fs(FsFile {
                        path: path.to_string(),
                        text,
                    })),
                );
                Ok(true)
            }
            Err(e) => Err(e.into()),
        }
    }

    pub fn clear(&self) {
        let _ = self
            .files
            .write()
            .unwrap()
            .extract_if(|_, f| match &f.content {
                FileContent::Fs(_) => true,
                FileContent::Lsp(_) => false,
            });
    }

    pub fn did_open(&mut self, open: DidOpenTextDocumentParams) {
        let key = open.text_document.uri.as_str().to_string();
        let mut files = self.files.write().unwrap();
        let new_file = match files.remove(&key) {
            None => File::open_new(open),
            Some(old) => old.open_over(open),
        };

        files.insert(key, new_file);
    }

    pub fn did_change(&mut self, change: DidChangeTextDocumentParams, encoding: PositionEncoding) {
        let key = change.text_document.uri.as_str().to_string();
        let mut files = self.files.write().unwrap();

        let new_file = match files.remove(&key) {
            None => {
                tracing::warn!(
                    uri = key,
                    version = change.text_document.version,
                    "received didChange event for a file that hasn't been opened yet"
                );
                return;
            }
            Some(old) => old.update(change, encoding),
        };

        files.insert(key, new_file);
    }

    pub fn did_close(&mut self, close: DidCloseTextDocumentParams) {
        let uri = close.text_document.uri.clone();
        let key = close.text_document.uri.as_str().to_string();

        let file = {
            let mut files = self.files.write().unwrap();
            files.remove(&key)
        };

        match file {
            None => {
                tracing::warn!(
                    uri = key,
                    "received didClose event for a file that hasn't been opened yet"
                );
            }
            Some(file) => match file.content {
                FileContent::Fs(fs_file) => {
                    tracing::warn!(
                        uri = close.text_document.uri.to_string(),
                        "received a close event to a file not being traced by the LSP, dropping event"
                    );

                    self.files.write().unwrap().insert(
                        key,
                        File {
                            content: FileContent::Fs(fs_file),
                            lines: file.lines,
                        },
                    );
                }
                FileContent::Lsp(_) => {
                    tracing::info!(
                        uri = key,
                        "received didClose on LSP file, falling back to filesystem tracking"
                    );

                    // Read the file asynchronously
                    match self.read(uri.as_str()) {
                        Ok(_) => {}
                        Err(err) => {
                            tracing::error!(
                                uri = key,
                                err = %err,
                                "failed to read file {} into vfs",
                                uri.path().to_string(),
                            );
                        }
                    }
                }
            },
        };
    }

    pub fn resolve_uri_relative_path(
        &self,
        base_file: &str,
        relative: &str,
    ) -> Result<String, Error> {
        let uri = match Uri::from_str(base_file) {
            Ok(it) => it,
            Err(err) => return Err(err.to_string().into()),
        };
        let fs_path = uri.path().to_string();

        let parent_file_path = std::path::Path::new(&fs_path).canonicalize()?;
        match parent_file_path.parent() {
            None => Err(format!("Cannot resolve parent directory of {}", fs_path).into()),
            Some(parent_dir) => {
                let final_path = parent_dir.join(relative).canonicalize()?;
                match final_path.as_path().to_str() {
                    None => Err(format!(
                        "Failed to resolve path {} relative to {:?}",
                        relative, parent_dir
                    )
                    .into()),
                    Some(file_path) => {
                        let uri = Url::from_file_path(file_path).map_err(|_| {
                            Error::from(format!("Failed to convert path to URI: {}", file_path))
                        })?;

                        Ok(uri.as_str().to_string())
                    }
                }
            }
        }
    }
}

impl fpp_core::FileReader for &Vfs {
    fn resolve(&self, current: SourceFile, include: &str) -> Result<String, Error> {
        self.resolve_uri_relative_path(&current.uri(), include)
    }

    fn read(&self, path: &str) -> Result<String, Error> {
        let this = (*self).clone();
        match Vfs::read(&this, path) {
            Ok(text) => Ok(text),
            Err(e) => Err(e.to_string().into()),
        }
    }
}
