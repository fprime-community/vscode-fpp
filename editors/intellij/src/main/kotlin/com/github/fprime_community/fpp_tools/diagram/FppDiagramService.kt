package com.github.fprime_community.fpp_tools.diagram

import com.github.fprime_community.fpp_tools.FppLsp4jServer
import com.github.fprime_community.fpp_tools.fppLspClients
import com.intellij.openapi.application.EDT
import com.intellij.openapi.components.Service
import com.intellij.openapi.components.service
import com.intellij.openapi.project.Project
import com.intellij.openapi.wm.ToolWindowManager
import com.intellij.util.concurrency.annotations.RequiresEdt
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

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

    /** List the diagrammable elements in [uri] (for the "Open Diagram" chooser). */
    @RequiresEdt
    fun requestElements(uri: String, @RequiresEdt onResult: (List<DiagramElement>) -> Unit) {
        val clients = project.fppLspClients()
        scope.launch {
            val elements = clients.flatMap { client ->
                client.sendRequest { (it as FppLsp4jServer).diagramElements(DiagramElementsParams(uri)) } ?: emptyList()
            }
            withContext(Dispatchers.EDT) {
                onResult(elements)
            }
        }
    }

    /**
     * Render a state machine by fully-qualified [name] into the tool window,
     * activating it. The `fpp/diagram` state-machine result is a JSON string of
     * Mermaid source, which the panel posts to the webview.
     */
    @RequiresEdt
    fun showStateMachine(name: String, mode: String = TransitionActionMode.UML) {
        val clients = project.fppLspClients()
        val toolWindow = ToolWindowManager.getInstance(project).getToolWindow(FPP_SM_TOOL_WINDOW_ID) ?: return
        scope.launch {
            val result = clients.firstNotNullOfOrNull { client ->
                client.sendRequest {
                    (it as FppLsp4jServer).diagram(
                        DiagramParams(DiagramKind.STATE_MACHINE, name, transitionActionMode = mode)
                    )
                }
            } ?: return@launch
            // State machine kind returns a JSON string of Mermaid source.
            if (!result.isJsonPrimitive) return@launch
            val mermaid = result.asString
            // Activation and rendering are UI work: hop to the EDT.
            withContext(Dispatchers.EDT) {
                toolWindow.activate { panel?.render(name, mermaid, mode) }
            }
        }
    }

    /** Re-render the currently-shown state machine (e.g. after a toggle). */
    @RequiresEdt
    fun refreshCurrent() {
        val current = panel?.currentName ?: return
        showStateMachine(current, panel?.actionMode ?: TransitionActionMode.UML)
    }

    companion object {
        fun getInstance(project: Project): FppDiagramService = project.service()
    }
}
