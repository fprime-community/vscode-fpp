package com.github.fprime_community.fpp_tools

import com.github.fprime_community.fpp_tools.settings.FppSettings
import com.github.fprime_community.fpp_tools.settings.FppSettingsConfigurable
import com.intellij.openapi.fileEditor.FileEditor
import com.intellij.openapi.fileTypes.LanguageFileType
import com.intellij.openapi.options.ShowSettingsUtil
import com.intellij.openapi.project.DumbAware
import com.intellij.openapi.project.Project
import com.intellij.openapi.vfs.VirtualFile
import com.intellij.ui.EditorNotificationPanel
import com.intellij.ui.EditorNotificationProvider
import com.jetbrains.python.configuration.PyActiveSdkModuleConfigurable
import javax.swing.JComponent
import java.util.function.Function

/**
 * Shows a banner error when the LSP can't run because no Python interpreter is configured.
 */
class FppEditorNotificationProvider : EditorNotificationProvider, DumbAware {
    override fun collectNotificationData(
        project: Project,
        file: VirtualFile,
    ): Function<in FileEditor, out JComponent?>? {
        if ((file.fileType as? LanguageFileType)?.language != FppLanguage.INSTANCE) return null
        if (FppSettings.getInstance(project).lspPath.isNotEmpty()) return null
        if (project.pythonSdk() != null) return null

        return Function { _ ->
            EditorNotificationPanel(EditorNotificationPanel.Status.Warning).apply {
                text = FppBundle.message("fpp.lsp.python.missing")
                createActionLabel(FppBundle.message("fpp.lsp.python.configure")) {
                    @Suppress("UnstableApiUsage")
                    ShowSettingsUtil.getInstance()
                        .showSettingsDialog(project, PyActiveSdkModuleConfigurable::class.java)
                }
                createActionLabel(FppBundle.message("fpp.settings.lsp.manual")) {
                    ShowSettingsUtil.getInstance()
                        .showSettingsDialog(project, FppSettingsConfigurable::class.java)
                }
            }
        }
    }
}
