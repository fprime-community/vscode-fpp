package com.github.fprime_community.fpp_tools.diagram

import com.intellij.openapi.project.DumbAware
import com.intellij.openapi.project.Project
import com.intellij.openapi.wm.ToolWindow
import com.intellij.openapi.wm.ToolWindowFactory
import com.intellij.ui.content.ContentFactory

/**
 * Creates the "FPP State Machine" tool window. The window is registered but not
 * shown by default (`canCloseContents`/inactive) and is activated on demand by
 * [FppDiagramService.showStateMachine].
 */
class FppStateMachineToolWindowFactory : ToolWindowFactory, DumbAware {
    override fun createToolWindowContent(project: Project, toolWindow: ToolWindow) {
        val service = FppDiagramService.getInstance(project)
        val panel = FppStateMachinePanel(project, toolWindow.disposable)
        service.panel = panel

        val content = ContentFactory.getInstance().createContent(panel, "", false)
        content.isCloseable = false
        toolWindow.contentManager.addContent(content)
    }
}
