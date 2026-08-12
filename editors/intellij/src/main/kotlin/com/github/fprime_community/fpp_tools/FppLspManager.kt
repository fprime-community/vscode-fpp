package com.github.fprime_community.fpp_tools

import com.github.fprime_community.fpp_tools.LspConfiguration.*
import com.github.fprime_community.fpp_tools.settings.FppSettings
import com.intellij.notification.NotificationType
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.diagnostic.logger
import com.intellij.openapi.module.ModuleManager
import com.intellij.openapi.project.Project
import com.intellij.openapi.projectRoots.Sdk
import com.intellij.openapi.roots.ProjectRootManager
import com.intellij.openapi.ui.Messages
import com.intellij.openapi.util.io.toNioPathOrNull
import com.intellij.util.concurrency.annotations.RequiresBackgroundThread
import com.jetbrains.python.packaging.management.ui.PythonPackageManagerUI
import com.jetbrains.python.sdk.PythonSdkUtil
import com.jetbrains.python.sdk.getExecutablePath
import java.nio.file.Path
import kotlin.io.path.exists

private val LOG = logger<LspConfiguration>()
private const val LSP_EXECUTABLE = "fpp_lsp_server"
private const val LSP_PIP_PACKAGE = "fprime-fpp-lsp"

@RequiresBackgroundThread
fun Project.getLspConfiguration(): LspConfiguration {
    val settings = FppSettings.getInstance(this)

    // Use manual lsp override if set
    if (settings.lspPath.isNotEmpty()) {
        return Manual(this)
    }

    val sdk = pythonSdk() ?: run {
        FppNotifications.pluginNotifications().createNotification(
            FppBundle.message("fpp.lsp.python.missing"), NotificationType.ERROR
        ).notify(this)
        return Disabled(FppBundle.message("fpp.lsp.python.missing"))
    }

    resolveFppLsp(sdk)?.let { return FromPython(this, it) }

    // The interpreter exists but the package isn't installed
    if (promptAndInstallLsp(sdk)) {
        resolveFppLsp(sdk)?.let { return FromPython(this, it) }
    }

    return Disabled()
}

private fun Project.pythonSdk(): Sdk? {
    ProjectRootManager.getInstance(this).projectSdk?.takeIf { PythonSdkUtil.isPythonSdk(it) }?.let { return it }
    return ModuleManager.getInstance(this).modules.firstNotNullOfOrNull { PythonSdkUtil.findPythonSdk(it) }
}

private fun resolveFppLsp(sdk: Sdk): Path? = sdk.getExecutablePath(LSP_EXECUTABLE)?.takeIf { it.exists() }

/**
 * Prompt and install `fprime-fpp-lsp` into [sdk].
 *
 * @return true if the package was installed.
 */
private fun Project.promptAndInstallLsp(sdk: Sdk): Boolean {
    var installed = false

    // Confirmation and install model progress both require EDT
    ApplicationManager.getApplication().invokeAndWait {
        val choice = Messages.showYesNoDialog(
            this,
            FppBundle.message("fpp.lsp.python.download.question", sdk.name),
            FppBundle.message("fpp.lsp.binary.missing.title"),
            Messages.getQuestionIcon()
        )
        if (choice != Messages.YES) return@invokeAndWait

        installed = try {
            @Suppress("UnstableApiUsage")
            PythonPackageManagerUI.forSdk(this, sdk)
                .installPackagesWithModalProgressBlocking(LSP_PIP_PACKAGE)
                ?.isNotEmpty()
                ?: false
        } catch (e: Exception) {
            LOG.warn("Failed to install $LSP_PIP_PACKAGE into ${sdk.name}", e)
            FppNotifications.pluginNotifications().createNotification(
                FppBundle.message("fpp.notification.lsp.download.error"), NotificationType.ERROR
            ).notify(this)
            false
        }
    }
    return installed
}

sealed class LspConfiguration {
    // Escape hatch to run LspCli for a non-saved setting.
    class ForSettings(
        project: Project, override val executablePath: Path?, override val isReady: Boolean
    ) : Enabled(project)

    class Manual(project: Project) : Enabled(project) {
        override val executablePath: Path?
            get() = settings.lspPath.toNioPathOrNull()
        override val isReady: Boolean = true
    }

    /** LSP resolved from the project's Python interpreter (installed via pip). */
    class FromPython(project: Project, override val executablePath: Path) : Enabled(project) {
        override val isReady: Boolean = true
    }

    sealed class Enabled(val project: Project) : LspConfiguration() {
        abstract val executablePath: Path?
        abstract val isReady: Boolean
        protected val settings
            get() = FppSettings.getInstance(project)
    }

    data class Disabled(val message: String = "Tried to created a FPP LSP with disabled configuration") : LspConfiguration()
}
