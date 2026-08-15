package com.github.fprime_community.fpp_tools.diagram

import com.google.gson.JsonObject
import com.google.gson.JsonPrimitive
import com.intellij.openapi.Disposable
import com.intellij.openapi.actionSystem.ActionManager
import com.intellij.openapi.actionSystem.DefaultActionGroup
import com.intellij.openapi.fileChooser.FileChooserFactory
import com.intellij.openapi.project.Project
import com.intellij.openapi.ui.SimpleToolWindowPanel
import com.intellij.openapi.vfs.VfsUtil
import java.awt.BorderLayout
import javax.swing.JLabel

/**
 * The state machine diagram tool window content: a JCEF-hosted Mermaid webview
 * plus a toolbar. Reuses the shared `sm-webview.js` bundle unchanged via
 * [FppWebviewBrowser], which speaks the same `postMessage` protocol as the
 * VSCode host.
 */
class FppStateMachinePanel(
    private val project: Project,
    parent: Disposable,
) : SimpleToolWindowPanel(true, true), Disposable {

    /** The fully-qualified name of the state machine currently displayed. */
    var currentName: String? = null
        private set

    /** The transition action display mode currently applied. */
    var actionMode: TransitionActionMode = TransitionActionMode.UML
        private set

    /** Latest SVG the webview reported for export, or null if none/unavailable. */
    private var lastExportSvg: String? = null
    private var exportPending: (() -> Unit)? = null

    private val webview: FppWebviewBrowser? =
        if (FppWebviewBrowser.isSupported()) FppWebviewBrowser(parent, "sm-webview.js") else null

    init {
        if (webview == null) {
            setContent(JLabel("JCEF is not available in this IDE runtime; state machine diagrams are disabled.", JLabel.CENTER))
        } else {
            webview.onMessage = ::handleMessage
            setContent(webview.browser.component)
            toolbar = buildToolbar().component
        }
    }

    private fun buildToolbar(): com.intellij.openapi.actionSystem.ActionToolbar {
        val group = ActionManager.getInstance().getAction("Fpp.StateMachine.Toolbar") as DefaultActionGroup
        val bar = ActionManager.getInstance().createActionToolbar("FppStateMachine", group, true)
        bar.targetComponent = this
        return bar
    }

    /** Render Mermaid [mermaid] for state machine [name]. */
    fun render(name: String, mermaid: String, mode: TransitionActionMode) {
        currentName = name
        actionMode = mode
        val msg = JsonObject().apply {
            addProperty("type", "render")
            addProperty("text", mermaid)
        }
        webview?.postMessage(msg.toString())
    }

    /** Ask the webview to reset pan/zoom to fit. */
    fun fit() = webview?.postMessage("""{"type":"fit"}""")

    /** Toggle UML vs flattened transition-action mode and re-render. */
    fun toggleActionMode() {
        actionMode = if (actionMode == TransitionActionMode.UML) TransitionActionMode.FLATTENED else TransitionActionMode.UML
        FppDiagramService.getInstance(project).refreshCurrent()
    }

    /** Request the current diagram as SVG and prompt to save it. */
    fun export() {
        exportPending = { saveExport() }
        webview?.postMessage("""{"type":"export"}""")
    }

    private fun saveExport() {
        val svg = lastExportSvg ?: return
        val name = (currentName ?: "state-machine").substringAfterLast('.')
        val descriptor = FileChooserFactory.getInstance()
            .createSaveFileDialog(
                com.intellij.openapi.fileChooser.FileSaverDescriptor("Export State Machine", "Save the diagram as SVG", "svg"),
                project,
            )
        val wrapper = descriptor.save(null as java.nio.file.Path?, "$name.svg") ?: return
        VfsUtil.saveText(wrapper.getVirtualFile(true) ?: return, svg)
    }

    /** Handle a message posted from the webview (JCEF IO thread). */
    private fun handleMessage(json: String) {
        val obj = runCatching { com.google.gson.JsonParser.parseString(json).asJsonObject }.getOrNull() ?: return
        when ((obj.get("type") as? JsonPrimitive)?.asString) {
            "exportSvg" -> {
                lastExportSvg = (obj.get("svg") as? JsonPrimitive)?.asString
                com.intellij.openapi.application.ApplicationManager.getApplication().invokeLater {
                    exportPending?.invoke()
                    exportPending = null
                }
            }
            // "ready" / "error" / "setLayoutOption" are handled by the browser shell
            // or are no-ops for this initial state machine feature.
        }
    }

    override fun dispose() {}
}
