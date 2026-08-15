package com.github.fprime_community.fpp_tools.diagram

import com.github.fprime_community.fpp_tools.FppLanguage
import com.intellij.icons.AllIcons
import com.intellij.openapi.actionSystem.ActionUpdateThread
import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.actionSystem.CommonDataKeys
import com.intellij.openapi.fileTypes.LanguageFileType
import com.intellij.openapi.project.DumbAware
import com.intellij.openapi.ui.popup.JBPopupFactory
import com.intellij.ui.dsl.listCellRenderer.textListCellRenderer
import com.intellij.util.concurrency.annotations.RequiresEdt

/**
 * "FPP: Open Diagram" — lists the diagrammable elements in the current file and,
 * on selection, opens the appropriate diagram. State machines render in the
 * dedicated Mermaid tool window; other kinds are not yet supported on IntelliJ.
 */
class FppOpenDiagramAction : AnAction("Open FPP Diagram", "Visualize an FPP element", AllIcons.Actions.Preview), DumbAware {
    override fun getActionUpdateThread() = ActionUpdateThread.BGT

    override fun update(e: AnActionEvent) {
        val file = e.getData(CommonDataKeys.VIRTUAL_FILE)
        e.presentation.isEnabledAndVisible = e.project != null && (file?.fileType as? LanguageFileType)?.language == FppLanguage.INSTANCE
    }

    override fun actionPerformed(e: AnActionEvent) {
        val project = e.project ?: return
        val file = e.getData(CommonDataKeys.VIRTUAL_FILE) ?: return
        val service = FppDiagramService.getInstance(project)
        service.requestElements(file.url) { elements ->
            com.intellij.openapi.application.ApplicationManager.getApplication().invokeLater {
                offerChoices(service, elements)
            }
        }
    }

    @RequiresEdt
    private fun offerChoices(service: FppDiagramService, elements: List<DiagramElement>) {
        if (elements.isEmpty()) return
        // Only state machines are supported for now; other kinds are pending the
        // sprotty renderer port.
        val diagrammable = elements.filter { it.kind == DiagramKind.STATE_MACHINE }
        if (diagrammable.isEmpty()) return
        if (diagrammable.size == 1) {
            service.showStateMachine(diagrammable.first().name)
            return
        }
        JBPopupFactory.getInstance()
            .createPopupChooserBuilder(diagrammable)
            .setTitle("Open FPP Diagram")
            .setRenderer(textListCellRenderer("") { it.displayName })
            .setItemChosenCallback { service.showStateMachine(it.name) }
            .createPopup()
            .showInFocusCenter()
    }
}

/** Base for toolbar actions operating on the current state machine panel. */
abstract class FppStateMachineToolbarAction(
    text: String,
    description: String,
    icon: javax.swing.Icon,
) : AnAction(text, description, icon), DumbAware {
    override fun getActionUpdateThread() = ActionUpdateThread.EDT

    @RequiresEdt
    protected fun panel(e: AnActionEvent): FppStateMachinePanel? =
        e.project?.let { FppDiagramService.getInstance(it).panel }

    override fun update(e: AnActionEvent) {
        e.presentation.isEnabled = panel(e)?.currentName != null
    }
}

class FppStateMachineFitAction : FppStateMachineToolbarAction(
    "Fit Diagram", "Reset pan and zoom to fit", AllIcons.General.FitContent,
) {
    override fun actionPerformed(e: AnActionEvent) = panel(e)?.fit() ?: Unit
}

class FppStateMachineExportAction : FppStateMachineToolbarAction(
    "Export Diagram", "Export the diagram as SVG", AllIcons.ToolbarDecorator.Export,
) {
    override fun actionPerformed(e: AnActionEvent) = panel(e)?.export() ?: Unit
}

class FppStateMachineToggleActionModeAction : FppStateMachineToolbarAction(
    "Toggle Transition Action Mode", "Switch between UML and flattened transition action labels", AllIcons.Actions.ToggleVisibility,
) {
    override fun actionPerformed(e: AnActionEvent) = panel(e)?.toggleActionMode() ?: Unit
}
