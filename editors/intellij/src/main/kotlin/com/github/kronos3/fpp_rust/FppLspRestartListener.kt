package com.github.kronos3.fpp_rust

import com.github.kronos3.fpp_rust.settings.FppSettings
import com.github.kronos3.fpp_rust.settings.FppSettingsConfigurable
import com.github.kronos3.fpp_rust.settings.LspConfigurationType
import com.github.kronos3.fpp_rust.util.Version
import com.intellij.notification.NotificationType
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.project.Project
import com.intellij.platform.lsp.api.LspServerManager
import com.intellij.platform.lsp.api.LspServerState

class FppLspManagerLspRestartListener(val project: Project) : FppLspManager.LspManagerChangeListener {
    override fun settingsChanged(event: FppLspManager.LspManagerChangedEvent) {
        when (event) {
            is FppLspManager.LspManagerChangedEvent.NewLspVersionDownloaded -> {
                val settings = FppSettings.getInstance(project)
                if (settings.lspConfigurationType != LspConfigurationType.Auto) {
                    return
                }
                if (settings.lspVersion == Version.Latest) {
                    val latest = FppLspManager.getLatestInstalledLspVersion()
                    if (latest == null || event.version >= latest) {
                        project.restartLspServerAsyncIfNeeded("LSP is updated to ${event.version}")
                    }
                    return
                }
                if (settings.lspVersion == event.version) {
                    project.restartLspServerAsyncIfNeeded("LSP binary is downloaded")
                }
            }
        }
    }
}

class FppSettingsLspRestartListener(val project: Project) : FppSettingsConfigurable.SettingsChangeListener {
    override fun settingsChanged(event: FppSettingsConfigurable.SettingsChangedEvent) {
        if (event.isChanged(FppSettings.State::lspPath)
            || event.isChanged(FppSettings.State::lspVersion)
            || event.isChanged(FppSettings.State::lspConfigurationType)
        ) {
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
