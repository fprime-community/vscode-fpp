use lsp_types::notification::Notification;
use lsp_types::request::Request;
use serde::{Deserialize, Serialize};

pub enum ReloadWorkspace {}

#[derive(Debug, PartialEq, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct UriRequest {
    pub uri: lsp_types::Uri,
}

impl Request for ReloadWorkspace {
    type Params = ();
    type Result = ();
    const METHOD: &'static str = "fpp/reloadWorkspace";
}

pub enum DumpSyntaxTree {}

impl Notification for DumpSyntaxTree {
    type Params = UriRequest;
    const METHOD: &'static str = "fpp/dumpSyntaxTree";
}
