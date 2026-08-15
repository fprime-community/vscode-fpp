package com.github.fprime_community.fpp_tools.diagram

import com.google.gson.annotations.SerializedName
import org.eclipse.lsp4j.Range

/**
 * Wire types for the FPP diagram LSP extension requests (`fpp/diagram` and
 * `fpp/diagramElements`). These mirror `fpp_lsp_server::lsp_ext` on the wire and
 * are (de)serialized by LSP4J's Gson, so field names must match the server's
 * camelCase JSON exactly.
 */

/** Mirrors `fpp_diagram::DiagramKind`. Serialized as the server's camelCase. */
enum class DiagramKind {
    @SerializedName("component") COMPONENT,
    @SerializedName("topology") TOPOLOGY,
    @SerializedName("connectionGroup") CONNECTION_GROUP,
    @SerializedName("stateMachine") STATE_MACHINE,
}

/** How a state machine transition's actions are shown on its edge label. */
enum class TransitionActionMode {
    @SerializedName("uml") UML,
    @SerializedName("flattened") FLATTENED,
}

/** Parameters for the `fpp/diagram` request: which element to diagram. */
data class DiagramParams(
    val kind: DiagramKind,
    /** Fully qualified name; for a connection group this is `<topology>.<group>`. */
    val name: String,
    /** When true, prune ports not referenced by any connection (no-op for components). */
    val hideUnusedPorts: Boolean = false,
    /** How transition edge labels are rendered (state machines only). */
    val transitionActionMode: TransitionActionMode = TransitionActionMode.UML,
)

/** Parameter for `fpp/diagramElements`: the document to inspect. */
data class DiagramElementsParams(
    val uri: String,
)

/**
 * A diagrammable element discovered in a document, used to drive the
 * "Open in Diagram" affordances.
 */
data class DiagramElement(
    val kind: DiagramKind,
    /** Fully qualified name to pass back in a [DiagramParams]. */
    val name: String,
    /** Unqualified display name for the UI. */
    val displayName: String,
    /** Range of the element's definition name in the document. */
    val range: Range,
)
