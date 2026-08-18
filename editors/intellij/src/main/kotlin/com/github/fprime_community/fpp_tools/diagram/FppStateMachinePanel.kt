package com.github.fprime_community.fpp_tools.diagram

import com.github.fprime_community.fpp_tools.FppNotifications
import com.github.fprime_community.fpp_tools.showProjectNotification
import com.google.gson.JsonObject
import com.google.gson.JsonParser
import com.google.gson.JsonPrimitive
import com.intellij.notification.NotificationType
import com.intellij.openapi.Disposable
import com.intellij.openapi.actionSystem.ActionManager
import com.intellij.openapi.actionSystem.ActionToolbar
import com.intellij.openapi.actionSystem.DefaultActionGroup
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.fileChooser.FileChooserFactory
import com.intellij.openapi.fileChooser.FileSaverDescriptor
import com.intellij.openapi.project.Project
import com.intellij.openapi.ui.SimpleToolWindowPanel
import com.intellij.openapi.vfs.VfsUtil
import com.intellij.util.concurrency.annotations.RequiresBackgroundThread
import com.intellij.util.concurrency.annotations.RequiresEdt
import java.nio.file.Path
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
    var actionMode: String = TransitionActionMode.UML
        private set

    /** Callback when the webview completes the export. */
    private var exportPending: ((svg: String) -> Unit)? = null

    private val webview: FppWebviewBrowser? =
        if (FppWebviewBrowser.isSupported()) FppWebviewBrowser(parent, "sm-webview.js") else null

    init {
        if (webview == null) {
            setContent(JLabel("JCEF is not available in this IDE runtime; state machine diagrams are disabled.", JLabel.CENTER))
        } else {
            webview.onMessage = ::handleMessage
            webview.onLoadError = ::showLoadError
            setContent(webview.browser.component)
            toolbar = buildToolbar().component
        }
    }

    @RequiresEdt
    private fun buildToolbar(): ActionToolbar {
        val group = ActionManager.getInstance().getAction("Fpp.StateMachine.Toolbar") as DefaultActionGroup
        return ActionManager.getInstance().createActionToolbar("FppStateMachine", group, true)
            .also { it.targetComponent = this }
    }

    /** Render Mermaid [mermaid] for state machine [name]. */
    @RequiresEdt
    fun render(name: String, mermaid: String, mode: String) {
        currentName = name
        actionMode = mode
        val msg = JsonObject().apply {
            addProperty("type", "render")
            addProperty("text", mermaid)
        }
        webview?.postMessage(msg.toString())
    }

    /** Ask the webview to reset pan/zoom to fit. */
    @RequiresEdt
    fun fit() = webview?.postMessage("""{"type":"fit"}""")

    /** Toggle UML vs flattened transition-action mode and re-render. */
    @RequiresEdt
    fun toggleActionMode() {
        actionMode = if (actionMode == TransitionActionMode.UML) TransitionActionMode.FLATTENED else TransitionActionMode.UML
        // actionMode is now the toggled value; refreshCurrent re-requests with it.
        FppDiagramService.getInstance(project).refreshCurrent()
    }

    /** Request the current diagram as SVG and prompt to save it. */
    @RequiresEdt
    fun export() {
        exportPending = ::saveExport
        webview?.postMessage("""{"type":"export"}""")
    }

    @RequiresEdt
    private fun saveExport(svg: String) {
        val name = (currentName ?: "state-machine").substringAfterLast('.')
        val descriptor = FileChooserFactory.getInstance()
            .createSaveFileDialog(
                FileSaverDescriptor("Export State Machine", "Save the diagram as SVG", "svg"),
                project,
            )
        val wrapper = descriptor.save(null as Path?, "$name.svg") ?: return
        ApplicationManager.getApplication().runWriteAction {
            VfsUtil.saveText(wrapper.getVirtualFile(true) ?: return@runWriteAction, svg)
        }
    }

    /** Handle a message posted from the webview. Invoked on the JCEF IO thread. */
    @RequiresBackgroundThread
    private fun handleMessage(json: String) {
        val obj = runCatching { JsonParser.parseString(json).asJsonObject }.getOrNull() ?: return
        when ((obj.get("type") as? JsonPrimitive)?.asString) {
            "exportSvg" -> (obj.get("svg") as? JsonPrimitive)?.asString?.also {
                ApplicationManager.getApplication().invokeLater {
                    exportPending?.invoke(it)
                    exportPending = null
                }
            }
            "error" -> {
                val message = (obj.get("message") as? JsonPrimitive)?.asString ?: "Unknown error"
                ApplicationManager.getApplication().invokeLater {
                    FppNotifications.pluginNotifications().showProjectNotification(
                        "Failed to render state machine diagram", message, NotificationType.ERROR, project,
                    )
                }
            }
            // "ready" / "setLayoutOption" are handled by the browser shell or are
            // no-ops for this initial state machine feature.
        }
    }

    /** Surface a webview load/init failure as an error notification. */
    @RequiresEdt
    private fun showLoadError(message: String) {
        FppNotifications.pluginNotifications()
            .showProjectNotification(message, NotificationType.ERROR, project)
    }

    override fun dispose() {}
}
