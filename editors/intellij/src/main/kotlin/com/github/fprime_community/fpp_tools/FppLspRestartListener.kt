package com.github.fprime_community.fpp_tools

import com.github.fprime_community.fpp_tools.settings.FppSettings
import com.github.fprime_community.fpp_tools.settings.FppSettingsConfigurable
import com.intellij.notification.NotificationType
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.project.Project
import com.intellij.platform.lsp.api.LspServerManager
import com.intellij.platform.lsp.api.LspServerState

class FppSettingsLspRestartListener(val project: Project) : FppSettingsConfigurable.SettingsChangeListener {
    override fun settingsChanged(event: FppSettingsConfigurable.SettingsChangedEvent) {
        if (event.isChanged(FppSettings.State::lspPath)) {
            project.restartLspServerAsyncIfNeeded("Project settings changed")
        }
    }
}

private fun Project.restartLspServerAsyncIfNeeded(reason: String?, onlyIfRunning: Boolean = false) {
    ApplicationManager.getApplication().invokeLater({
        val server =
            LspServerManager.getInstance(this).getServersForProvider(FppLspServerSupportProvider::class.java)
                .firstOrNull()
        val serverIsRunning =
            server !== null && (server.state == LspServerState.Running || server.state == LspServerState.Initializing)
        if (!onlyIfRunning || serverIsRunning) {
            if (reason != null) {
                // This doesn't mean that the server will actually start, but the intention was to start it.
                val message: String? = if (server !== null) "FPP LSP is restarted" else "FPP LSP is started"

                if (message != null) {
                    FppNotifications.pluginNotifications()
                        .showProjectNotification(message, "Reason: $reason", NotificationType.INFORMATION, this)
                }
            }
            LspServerManager.getInstance(this).stopAndRestartIfNeeded(FppLspServerSupportProvider::class.java)
        }
    }, this.disposed)
}
