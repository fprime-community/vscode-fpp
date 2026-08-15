package com.github.fprime_community.fpp_tools.diagram

import com.github.fprime_community.fpp_tools.FppLsp4jServer
import com.github.fprime_community.fpp_tools.FppLspServerSupportProvider
import com.intellij.openapi.components.Service
import com.intellij.openapi.components.service
import com.intellij.openapi.project.Project
import com.intellij.openapi.wm.ToolWindowManager
import com.intellij.platform.lsp.api.LspServer
import com.intellij.platform.lsp.api.LspServerManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.launch

const val FPP_SM_TOOL_WINDOW_ID = "FPP State Machine"

/**
 * Project-level coordinator for the state machine diagram feature. Owns the
 * lazily-created [FppStateMachinePanel] (created by the tool window factory),
 * issues the `fpp/diagram` and `fpp/diagramElements` LSP requests, and drives the
 * tool window.
 */
@Service(Service.Level.PROJECT)
class FppDiagramService(
    private val project: Project,
    private val scope: CoroutineScope,
) {
    /** Set by [FppStateMachineToolWindowFactory] once the tool window is created. */
    var panel: FppStateMachinePanel? = null

    private fun lspServer(): LspServer? =
        LspServerManager.getInstance(project)
            .getServersForProvider(FppLspServerSupportProvider::class.java)
            .firstOrNull()

    /** List the diagrammable elements in [uri] (for the "Open Diagram" chooser). */
    fun requestElements(uri: String, onResult: (List<DiagramElement>) -> Unit) {
        val server = lspServer() ?: return onResult(emptyList())
        scope.launch {
            val elements = server.sendRequest { (it as FppLsp4jServer).diagramElements(DiagramElementsParams(uri)) }
            onResult(elements ?: emptyList())
        }
    }

    /**
     * Render a state machine by fully-qualified [name] into the tool window,
     * activating it. The `fpp/diagram` state-machine result is a JSON string of
     * Mermaid source, which the panel posts to the webview.
     */
    fun showStateMachine(name: String, mode: TransitionActionMode = TransitionActionMode.UML) {
        val server = lspServer() ?: return
        scope.launch {
            val result = server.sendRequest {
                (it as FppLsp4jServer).diagram(DiagramParams(DiagramKind.STATE_MACHINE, name, transitionActionMode = mode))
            } ?: return@launch
            // State machine kind returns a JSON string of Mermaid source.
            if (!result.isJsonPrimitive) return@launch
            val mermaid = result.asString
            activateAndRender(name, mermaid, mode)
        }
    }

    private fun activateAndRender(name: String, mermaid: String, mode: TransitionActionMode) {
        val toolWindow = ToolWindowManager.getInstance(project).getToolWindow(FPP_SM_TOOL_WINDOW_ID) ?: return
        toolWindow.activate {
            panel?.render(name, mermaid, mode)
        }
    }

    /** Re-render the currently-shown state machine (e.g. after a toggle). */
    fun refreshCurrent() {
        val current = panel?.currentName ?: return
        showStateMachine(current, panel?.actionMode ?: TransitionActionMode.UML)
    }

    companion object {
        fun getInstance(project: Project): FppDiagramService = project.service()
    }
}
