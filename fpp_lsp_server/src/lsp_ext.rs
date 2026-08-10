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

/// The kind of diagram to produce. Mirrors [`fpp_diagram::DiagramKind`] on the
/// wire so the client can request a specific diagram.
#[derive(Debug, PartialEq, Eq, Deserialize, Serialize, Clone, Copy)]
#[serde(rename_all = "camelCase")]
pub enum DiagramKind {
    Component,
    Topology,
    ConnectionGroup,
    StateMachine,
}

impl From<DiagramKind> for fpp_diagram::DiagramKind {
    fn from(kind: DiagramKind) -> Self {
        match kind {
            DiagramKind::Component => fpp_diagram::DiagramKind::Component,
            DiagramKind::Topology => fpp_diagram::DiagramKind::Topology,
            DiagramKind::ConnectionGroup => fpp_diagram::DiagramKind::ConnectionGroup,
            DiagramKind::StateMachine => fpp_diagram::DiagramKind::StateMachine,
        }
    }
}

impl From<fpp_diagram::DiagramKind> for DiagramKind {
    fn from(kind: fpp_diagram::DiagramKind) -> Self {
        match kind {
            fpp_diagram::DiagramKind::Component => DiagramKind::Component,
            fpp_diagram::DiagramKind::Topology => DiagramKind::Topology,
            fpp_diagram::DiagramKind::ConnectionGroup => DiagramKind::ConnectionGroup,
            fpp_diagram::DiagramKind::StateMachine => DiagramKind::StateMachine,
        }
    }
}

/// How a state machine transition's actions are shown on its edge label.
/// Mirrors [`fpp_diagram::TransitionActionMode`] on the wire.
#[derive(Debug, PartialEq, Eq, Deserialize, Serialize, Clone, Copy, Default)]
#[serde(rename_all = "camelCase")]
pub enum TransitionActionMode {
    /// Edge shows only the transition's own `do { }` actions; entry/exit actions
    /// are shown inside the state.
    #[default]
    Uml,
    /// Edge shows the full flattened action sequence that executes on the
    /// transition (exit + do + entry, including the target leaf's entry).
    Flattened,
}

impl From<TransitionActionMode> for fpp_diagram::TransitionActionMode {
    fn from(mode: TransitionActionMode) -> Self {
        match mode {
            TransitionActionMode::Uml => fpp_diagram::TransitionActionMode::Uml,
            TransitionActionMode::Flattened => fpp_diagram::TransitionActionMode::Flattened,
        }
    }
}

/// Parameters for the `fpp/diagram` request: which element to diagram.
#[derive(Debug, PartialEq, Eq, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct DiagramParams {
    pub kind: DiagramKind,
    /// The fully qualified name of the element. For a connection group this is
    /// `<topology>.<group>`.
    pub name: String,
    /// When true, ports not referenced by any connection are pruned (no-op for
    /// component diagrams). Defaults to false when the client omits it.
    #[serde(default)]
    pub hide_unused_ports: bool,
    /// How state machine transition actions are presented. Defaults to
    /// [`TransitionActionMode::Uml`] when the client omits it.
    #[serde(default)]
    pub transition_action_mode: TransitionActionMode,
}

/// A request to lower a topology/component/connection-group into a sprotty
/// `SModel`. The result is the sprotty model as an opaque JSON value that the
/// client hands directly to its sprotty layout + render pipeline.
pub enum Diagram {}

impl Request for Diagram {
    type Params = DiagramParams;
    type Result = serde_json::Value;
    const METHOD: &'static str = "fpp/diagram";
}

/// A diagrammable element discovered in a document, used to drive CodeLens
/// "Open in Diagram" actions.
#[derive(Debug, PartialEq, Eq, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct DiagramElement {
    pub kind: DiagramKind,
    /// The fully qualified name to pass back in a [`DiagramParams`].
    pub name: String,
    /// The unqualified display name for the CodeLens title.
    pub display_name: String,
    /// The range of the element's definition name in the document.
    pub range: lsp_types::Range,
}

/// A request listing the diagrammable elements (topologies, components, and
/// connection groups) defined in a document.
pub enum DiagramElements {}

impl Request for DiagramElements {
    type Params = UriRequest;
    type Result = Vec<DiagramElement>;
    const METHOD: &'static str = "fpp/diagramElements";
}
