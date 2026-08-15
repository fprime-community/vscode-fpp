package com.github.fprime_community.fpp_tools.diagram

import org.eclipse.lsp4j.Range

/**
 * Wire types for the FPP diagram LSP extension requests (`fpp/diagram` and
 * `fpp/diagramElements`). These mirror `fpp_lsp_server::lsp_ext` on the wire and
 * are (de)serialized by LSP4J's Gson.
 *
 * Note: LSP4J's `EnumTypeAdapter` maps enums by `Enum.name()` (and an optional
 * integer `value` field) and does NOT honor Gson `@SerializedName`. The server's
 * wire values are camelCase strings (`"stateMachine"`, `"uml"`, …), so the `kind`
 * and `transitionActionMode` fields are typed as plain `String` rather than
 * enums; the constants below name the valid values.
 */

/** Diagram kind wire values (mirror `fpp_diagram::DiagramKind`). */
object DiagramKind {
    const val COMPONENT = "component"
    const val TOPOLOGY = "topology"
    const val CONNECTION_GROUP = "connectionGroup"
    const val STATE_MACHINE = "stateMachine"
}

/** Transition action mode wire values (state machines only). */
object TransitionActionMode {
    const val UML = "uml"
    const val FLATTENED = "flattened"
}

/** Parameters for the `fpp/diagram` request: which element to diagram. */
data class DiagramParams(
    val kind: String,
    /** Fully qualified name; for a connection group this is `<topology>.<group>`. */
    val name: String,
    /** When true, prune ports not referenced by any connection (no-op for components). */
    val hideUnusedPorts: Boolean = false,
    /** How transition edge labels are rendered (state machines only). */
    val transitionActionMode: String = TransitionActionMode.UML,
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
    val kind: String,
    /** Fully qualified name to pass back in a [DiagramParams]. */
    val name: String,
    /** Unqualified display name for the UI. */
    val displayName: String,
    /** Range of the element's definition name in the document. */
    val range: Range,
)
