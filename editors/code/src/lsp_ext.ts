import * as lc from "vscode-languageclient";

export const reloadWorkspace = new lc.RequestType0<void, void>("fpp/reloadWorkspace");

export type DumpSyntaxTree = {
    uri: lc.URI
};
export const dumpSyntaxTree = new lc.NotificationType<DumpSyntaxTree>(
    "fpp/dumpSyntaxTree",
);

/** Mirrors `fpp_diagram::DiagramKind` on the wire. */
export type DiagramKind = "component" | "topology" | "connectionGroup" | "stateMachine";

export type DiagramParams = {
    kind: DiagramKind,
    /** Fully qualified name; for a connection group this is `<topology>.<group>`. */
    name: string,
    /** When true, prune ports not referenced by any connection (no-op for components). */
    hideUnusedPorts: boolean,
    /**
     * How transition edge labels are rendered (state machines only). `"uml"`
     * shows only the transition's own `do{}` actions; `"flattened"` shows the
     * full flattened executed action sequence. Defaults to `"uml"` when omitted.
     */
    transitionActionMode?: "uml" | "flattened",
};

/**
 * Request the sprotty `SModel` for a topology/component/connection-group. The
 * result is the sprotty model as an opaque JSON value handed to the sprotty
 * layout + render pipeline.
 */
export const diagram = new lc.RequestType<DiagramParams, unknown, void>("fpp/diagram");

export type DiagramElement = {
    kind: DiagramKind,
    /** Fully qualified name to pass back in a `DiagramParams`. */
    name: string,
    /** Unqualified display name for the CodeLens title. */
    displayName: string,
    /** Range of the element's definition name in the document. */
    range: lc.Range,
};

/** List the diagrammable elements defined in a document (drives CodeLens). */
export const diagramElements = new lc.RequestType<DumpSyntaxTree, DiagramElement[], void>("fpp/diagramElements");
