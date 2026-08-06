package com.github.kronos3.fpp_rust.settings

import com.github.kronos3.fpp_rust.FppBundle
import com.github.kronos3.fpp_rust.FppCliService
import com.intellij.openapi.diagnostic.logger
import com.intellij.openapi.project.Project
import com.intellij.openapi.ui.DialogPanel
import com.intellij.ui.dsl.builder.*
import javax.swing.JComponent

private val LOG = logger<ProjectSettingsComponent>()

class ProjectSettingsComponent(
    service: FppCliService,
    private val settings: FppSettings,
    project: Project,
    private val applyAndSaveAsDefault: () -> Unit,
) {
    val panel: DialogPanel
    private val lspSettings = FppLspSettingsComponent(
        project,
        settings,
        service.coroutineScope
    )

    init {
        panel = panel {
            lspSettings.render(this)
            row {
                button(FppBundle.message("fpp.settings.apply.and.save.as.default")) { applyAndSaveAsDefault() }
            }
        }
    }

    // TODO (AleksandrSl 18/05/2025):
    val preferredFocusedComponent: JComponent = this.panel
}
