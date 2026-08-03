use fpp_core::LineIndex;
use lsp_types::{DidChangeTextDocumentParams, DidOpenTextDocumentParams};
use std::sync::Arc;

use crate::lsp::{capabilities::PositionEncoding, utils::apply_document_changes};

#[derive(Debug)]
pub struct FsFile {
    /// Path to the file on the filesystem
    pub path: String,
    /// Buffered file contents
    pub text: String,
}

#[derive(Debug)]
pub struct LspFile {
    /// LSP document version number to handle interleaved updated
    pub version: i32,
    /// LSP managed file contents, may not have been committed to disk yet
    pub text: String,
}

#[derive(Debug)]
pub enum FileContent {
    Fs(FsFile),
    Lsp(LspFile),
}

pub struct File {
    pub content: FileContent,
    pub lines: Arc<LineIndex>,
}

impl FileContent {
    pub(crate) fn text(&self) -> &str {
        match self {
            FileContent::Fs(fs_file) => &fs_file.text,
            FileContent::Lsp(lsp_file) => &lsp_file.text,
        }
    }

    pub(crate) fn open_new(open: DidOpenTextDocumentParams) -> FileContent {
        let key = open.text_document.uri.as_str();
        tracing::debug!(
            uri = key,
            version = open.text_document.version,
            "opening new lsp file"
        );

        FileContent::Lsp(LspFile {
            version: open.text_document.version,
            text: open.text_document.text,
        })
    }

    pub(crate) fn open_over(&self, open: DidOpenTextDocumentParams) -> FileContent {
        match self {
            FileContent::Fs(_) => {
                tracing::debug!(
                    uri = open.text_document.uri.to_string(),
                    version = open.text_document.version,
                    "opening lsp file over fs-watched file, dropping watch"
                );

                FileContent::Lsp(LspFile {
                    version: open.text_document.version,
                    text: open.text_document.text,
                })
            }
            FileContent::Lsp(_) => {
                tracing::warn!(
                    uri = open.text_document.uri.to_string(),
                    version = open.text_document.version,
                    "opening lsp file over an already opened lsp file"
                );

                FileContent::Lsp(LspFile {
                    version: open.text_document.version,
                    text: open.text_document.text,
                })
            }
        }
    }
}

impl File {
    pub(crate) fn new(content: FileContent) -> File {
        let lines = Arc::new(LineIndex::new(content.text()));
        File { content, lines }
    }

    pub(crate) fn open_new(open: DidOpenTextDocumentParams) -> File {
        File::new(FileContent::open_new(open))
    }

    pub(crate) fn open_over(&self, open: DidOpenTextDocumentParams) -> File {
        File::new(FileContent::open_over(&self.content, open))
    }

    pub(crate) fn update(
        self,
        change: DidChangeTextDocumentParams,
        encoding: PositionEncoding,
    ) -> File {
        match self.content {
            FileContent::Fs(fs) => {
                tracing::warn!(
                    uri = change.text_document.uri.to_string(),
                    "received a change event to a file not being traced by the LSP, dropping event"
                );

                File {
                    content: FileContent::Fs(fs),
                    lines: self.lines,
                }
            }
            FileContent::Lsp(f) => {
                let new_contents = apply_document_changes(encoding, f.text, change.content_changes);

                File::new(FileContent::Lsp(LspFile {
                    version: change.text_document.version,
                    text: new_contents,
                }))
            }
        }
    }
}
