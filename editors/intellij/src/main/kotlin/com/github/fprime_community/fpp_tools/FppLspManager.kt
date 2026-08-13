package com.github.fprime_community.fpp_tools

import com.github.fprime_community.fpp_tools.LspConfiguration.*
import com.github.fprime_community.fpp_tools.settings.FppSettings
import com.github.fprime_community.fpp_tools.settings.FppSettingsConfigurable
import com.intellij.notification.Notification
import com.intellij.notification.NotificationAction
import com.intellij.ide.util.PropertiesComponent
import com.intellij.notification.NotificationType
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.diagnostic.logger
import com.intellij.openapi.module.ModuleManager
import com.intellij.openapi.options.ShowSettingsUtil
import com.intellij.openapi.project.Project
import com.intellij.openapi.projectRoots.Sdk
import com.intellij.openapi.roots.ProjectRootManager
import com.intellij.openapi.startup.ProjectActivity
import com.intellij.openapi.util.io.toNioPathOrNull
import com.intellij.util.concurrency.annotations.RequiresBackgroundThread
import com.jetbrains.python.configuration.PyActiveSdkModuleConfigurable
import com.jetbrains.python.packaging.common.PythonRepositoryPackageSpecification
import com.jetbrains.python.packaging.management.PythonPackageManager
import com.jetbrains.python.packaging.management.ui.PythonPackageManagerUI
import com.jetbrains.python.packaging.repository.PyPiPackageRepository
import com.jetbrains.python.sdk.PythonSdkUtil
import com.jetbrains.python.sdk.getExecutablePath
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import java.nio.file.Path
import kotlin.io.path.exists
import kotlin.time.Duration.Companion.hours

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
        // TODO (08/2026) consider converting into a banner
        FppNotifications.pluginNotifications().createNotification(
            FppBundle.message("fpp.lsp.python.missing"), NotificationType.ERROR
        ).addAction(object : NotificationAction(FppBundle.message("fpp.lsp.python.configure")) {
            override fun actionPerformed(e: AnActionEvent, notification: Notification) {
                @Suppress("UnstableApiUsage")
                ShowSettingsUtil.getInstance().showSettingsDialog(this@run, PyActiveSdkModuleConfigurable::class.java)
            }
        }).addAction(object : NotificationAction(FppBundle.message("fpp.settings.lsp.manual")) {
            override fun actionPerformed(e: AnActionEvent, notification: Notification) {
                ShowSettingsUtil.getInstance().showSettingsDialog(this@run, FppSettingsConfigurable::class.java)
            }
        }).notify(this)
        return Disabled(FppBundle.message("fpp.lsp.python.missing"))
    }

    resolveLsp(sdk)?.let { return FromPython(this, it) }

    // The interpreter exists but the package isn't installed
    if (installLspWithConfirmation(sdk)) {
        resolveLsp(sdk)?.let { return FromPython(this, it) }
    }

    return Disabled()
}

internal fun Project.pythonSdk(): Sdk? {
    ProjectRootManager.getInstance(this).projectSdk?.takeIf { PythonSdkUtil.isPythonSdk(it) }?.let { return it }
    return ModuleManager.getInstance(this).modules.firstNotNullOfOrNull { PythonSdkUtil.findPythonSdk(it) }
}

private fun resolveLsp(sdk: Sdk): Path? = sdk.getExecutablePath(LSP_EXECUTABLE)?.takeIf { it.exists() }

/**
 * Prompt and install `fprime-fpp-lsp` into [sdk].
 *
 * @return true if the package was installed.
 */
private fun Project.installLspWithConfirmation(sdk: Sdk): Boolean = try {
    runBlocking {
        @Suppress("UnstableApiUsage")
        PythonPackageManagerUI.forSdk(this@installLspWithConfirmation, sdk)
            .installWithConfirmation(listOf(LSP_PIP_PACKAGE))
            ?.isNotEmpty()
            ?: false
    }
} catch (e: Exception) {
    LOG.warn("Failed to install $LSP_PIP_PACKAGE into ${sdk.name}", e)
    FppNotifications.pluginNotifications().createNotification(
        FppBundle.message("fpp.notification.lsp.download.error"), NotificationType.ERROR
    ).notify(this)
    false
}

// How often to poll PyPI for a newer LSP, at most, regardless of restarts.
private val LSP_UPDATE_CHECK_INTERVAL_MS = 24.hours.inWholeMilliseconds
private const val LSP_LAST_UPDATE_CHECK_KEY = "com.github.fprime_community.fpp_tools.lastLspUpdateCheck"

internal fun Project.updateLspWithConfirmationAsync(force: Boolean = false) =
    FppCliService.getInstance(this).coroutineScope.launch(Dispatchers.IO) { updateLspWithConfirmation(force) }

/**
 * Checks whether a newer `fprime-fpp-lsp` is available for the project's interpreter
 * and, if so, prompts to install it.
 *
 * The running LSP server should be restarted by [FppLspPackageChangeListener] when updated.
 *
 * @param force Ignore `checkForUpdates` and the 24-hour throttle.
 */
private suspend fun Project.updateLspWithConfirmation(force: Boolean = false) {
    val settings = FppSettings.getInstance(this)
    if (settings.lspPath.isNotEmpty()) return
    if (!force && !settings.checkForUpdates) return

    val properties = PropertiesComponent.getInstance()
    if (!force) {
        val last = properties.getLong(LSP_LAST_UPDATE_CHECK_KEY, 0L)
        if (last + LSP_UPDATE_CHECK_INTERVAL_MS > System.currentTimeMillis()) return
    }

    val sdk = pythonSdk() ?: return
    if (resolveLsp(sdk) == null) return

    try {
        @Suppress("UnstableApiUsage")
        val outdated = PythonPackageManager.forSdk(this, sdk).listOutdatedPackages()[LSP_PIP_PACKAGE]
        properties.setValue(LSP_LAST_UPDATE_CHECK_KEY, System.currentTimeMillis().toString())
        @Suppress("UnstableApiUsage")
        if (outdated == null) return

        FppNotifications.pluginNotifications().createNotification(
            FppBundle.message("fpp.lsp.update.available.title", outdated.latestVersion),
            NotificationType.INFORMATION,
        ).addAction(object : NotificationAction(FppBundle.message("fpp.lsp.update")) {
            override fun actionPerformed(e: AnActionEvent, notification: Notification) {
                notification.expire()
                FppCliService.getInstance(this@updateLspWithConfirmation).coroutineScope.launch(Dispatchers.IO) {
                    updateLsp(sdk, outdated.latestVersion)
                }
            }
        }).notify(this)
    } catch (e: Exception) {
        LOG.warn("Failed to check for updates of $LSP_PIP_PACKAGE in ${sdk.name}", e)
    }
}

private suspend fun Project.updateLsp(sdk: Sdk, version: String) = try {
    @Suppress("UnstableApiUsage")
    PythonPackageManagerUI.forSdk(this, sdk).updatePackagesBackground(
        listOf(
            PythonRepositoryPackageSpecification(
                PyPiPackageRepository,
                LSP_PIP_PACKAGE,
                "==$version"
            )
        )
    )
} catch (e: Exception) {
    LOG.warn("Failed to update $LSP_PIP_PACKAGE in ${sdk.name}", e)
    FppNotifications.pluginNotifications().createNotification(
        FppBundle.message("fpp.notification.lsp.download.error"), NotificationType.ERROR
    ).notify(this)
}

// FIXME too early, outdated packages null
class FppLspUpdateChecker : ProjectActivity {
    override suspend fun execute(project: Project) = project.updateLspWithConfirmation()
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
