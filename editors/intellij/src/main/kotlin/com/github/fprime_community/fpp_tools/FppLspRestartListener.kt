package com.github.fprime_community.fpp_tools

import com.github.fprime_community.fpp_tools.settings.FppSettings
import com.github.fprime_community.fpp_tools.settings.FppSettingsConfigurable
import com.intellij.notification.NotificationType
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.module.Module
import com.intellij.openapi.module.ModuleManager
import com.intellij.openapi.project.Project
import com.intellij.openapi.projectRoots.Sdk
import com.intellij.platform.lsp.api.LspServerManager
import com.intellij.platform.lsp.api.LspServerState
import com.intellij.ui.EditorNotifications
import com.jetbrains.cidr.cpp.cmake.python.CMakePythonSdkService
import com.jetbrains.python.packaging.common.PythonPackageManagementListener
import com.jetbrains.python.sdk.PySdkListener

class FppSettingsLspRestartListener(private val project: Project) : FppSettingsConfigurable.SettingsChangeListener {
    override fun settingsChanged(event: FppSettingsConfigurable.SettingsChangedEvent) {
        if (event.isChanged(FppSettings.State::lspPath)) {
            project.restartLspServerAsyncIfNeeded("Project settings changed")
            EditorNotifications.getInstance(project).updateAllNotifications()
        }
    }
}

@Suppress("UnstableApiUsage")
class FppLspSdkChangeListener(private val project: Project) : PySdkListener {
    override fun moduleSdkUpdated(module: Module, prevSdk: Sdk?, newSdk: Sdk?) {
        if (prevSdk != newSdk && module in ModuleManager.getInstance(project).modules) {
            project.restartLspServerAsyncIfNeeded("Python interpreter changed")
            EditorNotifications.getInstance(project).updateAllNotifications()
        }
    }
}

// Sometimes, when switching python interpreter in CLion, this doesn't get called and cmake doesn't reload as well.
class FppLspCMakeSdkChangeListener(private val project: Project) : CMakePythonSdkService.Companion.Listener {
    override fun onChange() {
        project.restartLspServerAsyncIfNeeded("CMake Python interpreter changed")
        EditorNotifications.getInstance(project).updateAllNotifications()
    }
}

@Suppress("UnstableApiUsage")
class FppLspPackageChangeListener(private val project: Project) : PythonPackageManagementListener {
    override fun packagesChanged(sdk: Sdk) {
        if (sdk == project.pythonSdk()) {
            project.restartLspServerAsyncIfNeeded("Python packages changed")
        }
    }

    override fun outdatedPackagesChanged(sdk: Sdk) {
        if (sdk == project.pythonSdk()) {
            project.updateLspWithConfirmationAsync()
        }
    }
}

// onlyIfRunning should be rarely needed, as stopAndRestartIfNeeded only starts the server if needed.
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
