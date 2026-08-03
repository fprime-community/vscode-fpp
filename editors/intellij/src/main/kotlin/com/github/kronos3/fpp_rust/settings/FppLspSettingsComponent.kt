package com.github.kronos3.fpp_rust.settings

import com.github.kronos3.fpp_rust.FppBundle
import com.github.kronos3.fpp_rust.FppLspManager
import com.github.kronos3.fpp_rust.LspConfiguration
import com.github.kronos3.fpp_rust.util.LspCli
import com.github.kronos3.fpp_rust.util.PlatformCompatibility
import com.github.kronos3.fpp_rust.util.Version
import com.github.kronos3.fpp_rust.util.withLoader

import com.intellij.icons.AllIcons
import com.intellij.ide.actions.RevealFileAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.application.EDT
import com.intellij.openapi.fileChooser.FileChooserDescriptorFactory
import com.intellij.openapi.observable.properties.AtomicProperty
import com.intellij.openapi.observable.util.transform
import com.intellij.openapi.project.DumbAwareAction
import com.intellij.openapi.ui.TextBrowseFolderListener
import com.intellij.openapi.ui.TextFieldWithBrowseButton
import com.intellij.openapi.util.io.toNioPathOrNull
import com.intellij.platform.ide.progress.runWithModalProgressBlocking
import com.intellij.ui.DocumentAdapter
import com.intellij.ui.components.JBLabel
import com.intellij.ui.dsl.builder.*
import com.intellij.ui.layout.selected
import com.intellij.ui.layout.selectedValueIs
import com.intellij.util.ui.AnimatedIcon
import com.intellij.util.ui.AsyncProcessIcon
import com.intellij.util.ui.UIUtil
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.awt.event.ActionEvent
import java.awt.event.ItemEvent
import java.nio.file.Path
import javax.swing.AbstractAction
import javax.swing.JButton
import javax.swing.JRadioButton
import kotlin.io.path.exists


@JvmInline
value class InstalledLspVersions(val versions: List<Version.Semantic>)

@JvmInline
value class DownloadableLspVersions(val versions: List<Version.Semantic>)

sealed class Loadable<out T> {
    data object Idle : Loadable<Nothing>()
    data object Loading : Loadable<Nothing>()
    data class Loaded<T>(val value: T) : Loadable<T>()
    data class Failed(val message: String) : Loadable<Nothing>()

    val loadedOrNull: T?
        get() = (this as? Loaded<T>)?.value
}

@JvmName("getInstalledOrEmpty")
fun Loadable<InstalledLspVersions>.getOrEmpty(): InstalledLspVersions {
    return loadedOrNull ?: InstalledLspVersions(emptyList())
}

@JvmName("getDownloadableOrEmpty")
fun Loadable<DownloadableLspVersions>.getOrEmpty(): DownloadableLspVersions {
    return loadedOrNull ?: DownloadableLspVersions(emptyList())
}

typealias VersionsForDownload = Loadable<DownloadableLspVersions>
typealias InstalledVersions = Loadable<InstalledLspVersions>

/**
 * Supports creating and managing a [JPanel] for the Settings Dialog.
 */
class FppLspSettingsComponent(
    private val project: com.intellij.openapi.project.Project,
    private val settings: FppSettings,
    private val coroutineScope: CoroutineScope,
) {
    private val lspVersionsForDownload = AtomicProperty<VersionsForDownload>(Loadable.Idle)
    private val lspInstalledVersions = AtomicProperty<InstalledVersions>(Loadable.Idle)

    private lateinit var lspVersionCombobox: LspVersionComboBox
    private lateinit var lspDisabled: JRadioButton
    private lateinit var lspManual: JRadioButton
    private lateinit var lspAuto: JRadioButton
    private lateinit var lspVersionsLoader: AnimatedIcon
    private val lspVersionStateLabelComponent = JBLabel().apply { isVisible = false }
    private val downloadLspButton = JButton().apply { isVisible = false }
    private val lspVersionLabelComponent = JBLabel(if (settings.lspPath.isEmpty()) "No binary specified" else "")

    private val lspVersionBinding = object : MutableProperty<Version?> {
        override fun get(): Version? = settings.lspVersion

        override fun set(value: Version?) {
            if (value != null) {
                settings.lspVersion = value
            }
        }
    }

    private fun download(version: Version.Semantic, afterSuccessfulDownload: () -> Unit = {}) {
        val lspManager = FppLspManager.getInstance()
        return try {
            runWithModalProgressBlocking(project, FppBundle.message("fpp.lsp.downloading")) {
                when (val result = lspManager.downloadLsp(version)) {
                    is FppLspManager.DownloadResult.Failed -> {
                        displayDownloadError("Failed to download $version: ${result.message}")
                    }

                    is FppLspManager.DownloadResult.AlreadyExists, is FppLspManager.DownloadResult.Ok -> {
                        withContext(Dispatchers.EDT) {
                            val updatedInstalledLspVersions = lspInstalledVersions.updateAndGet {
                                // Consider getting versions anew?
                                Loadable.Loaded(InstalledLspVersions(it.getOrEmpty().versions + version))
                            }
                            updateLspVersionActions(lspVersionsForDownload.get(), updatedInstalledLspVersions)
                            lspVersionCombobox.setVersions(
                                installedVersions = updatedInstalledLspVersions.getOrEmpty(),
                                versionsForDownload = lspVersionsForDownload.get().getOrEmpty()
                            )
                            afterSuccessfulDownload()
                        }
                    }
                }
            }
        } catch (err: Exception) {
            displayDownloadError("Failed to download $version: ${err.message}")
        }
    }

    /**
     * Updates the label component to display the manually specified LSP version.
     *
     * @param newVersion the new LSP version to display in the label component
     */
    private fun setManualLspVersion(newVersion: String) {
        lspVersionLabelComponent.text = newVersion
    }

    private val lspPathComponent = TextFieldWithBrowseButton().apply {
        addBrowseFolderListener(TextBrowseFolderListener(FileChooserDescriptorFactory.createSingleFileNoJarsDescriptor()))
        onExistingFileChanged {
            // I guess this will launch in the project scope, so the coroutine will finish even if I close the settings.
            // Not sure if I should about it or not.
            coroutineScope.launch(Dispatchers.IO) {
                setManualLspVersion(
                    LspCli(
                        project, LspConfiguration.ForSettings(project, it, true)
                    ).queryVersion().toString()
                )
            }
        }
    }

    private fun showLspDownloadButton(version: Version.Semantic, isUpdate: Boolean) {
        downloadLspButton.action = object : AbstractAction() {
            override fun actionPerformed(e: ActionEvent) {
                download(version)
            }
        }
        downloadLspButton.text = if (isUpdate) "Update to $version" else "Download: $version"
        downloadLspButton.isVisible = true
        lspVersionStateLabelComponent.isVisible = false
    }

    private fun showLspMessage(message: String, isError: Boolean = false) {
        lspVersionStateLabelComponent.foreground = if (isError) {
            UIUtil.getErrorForeground()
        } else {
            UIUtil.getLabelForeground()
        }
        lspVersionStateLabelComponent.text = message
        lspVersionStateLabelComponent.isVisible = true
        downloadLspButton.isVisible = false
    }

    private fun hideLspRelatedActions() {
        downloadLspButton.isVisible = false
        lspVersionStateLabelComponent.isVisible = false
    }

    private fun displayDownloadError(message: String) {
        showLspMessage(message, isError = true)
    }

    private fun updateLspVersionActions(
        versionsForDownload: VersionsForDownload, installedVersions: InstalledVersions
    ) {
        if (!lspAuto.isSelected) {
            return
        }
        if (versionsForDownload is Loadable.Loading || installedVersions is Loadable.Loading) {
            return
        }
        if (versionsForDownload is Loadable.Failed) {
            showLspMessage(versionsForDownload.message, isError = true)
            return
        }
        if (installedVersions is Loadable.Failed) {
            showLspMessage(installedVersions.message, isError = true)
            return
        }
        if (versionsForDownload.getOrEmpty().versions.isEmpty() || installedVersions !is Loadable.Loaded) {
            return
        }
        val selectedVersion = lspVersionCombobox.getSelectedVersion() ?: return
        when (val result = FppLspManager.checkLsp(
            selectedVersion,
            installedVersions = installedVersions.value.versions,
            versionsAvailableForDownload = versionsForDownload.getOrEmpty().versions,
        )) {
            FppLspManager.CheckLspResult.LspIsNotConfigured -> showLspMessage("Please select a version")
            is FppLspManager.CheckLspResult.BinaryMissing -> {
                showLspDownloadButton(result.version, isUpdate = false)
            }

            FppLspManager.CheckLspResult.ReadyToUse -> {
                if (selectedVersion == Version.Latest) {
                    showLspMessage("Up to date")
                } else {
                    // Do nothing if not using the latest; there is no valuable info I can give
                    hideLspRelatedActions()
                }
            }

            is FppLspManager.CheckLspResult.UpdateAvailable -> {
                showLspDownloadButton(result.version, isUpdate = true)
            }
        }
    }

    fun render(panel: Panel): Row {
        with(panel) {
            return group("LSP") {
                buttonsGroup {
                    row {
                        lspDisabled = radioButton(
                            FppBundle.message("fpp.settings.lsp.disabled"), LspConfigurationType.Disabled
                        ).component
                    }
                    row {
                        lspAuto = radioButton(
                            FppBundle.message("fpp.settings.lsp.managed"), LspConfigurationType.Auto
                        ).component.apply {
                            addItemListener { e ->
                                if (e.stateChange == ItemEvent.SELECTED) {
                                    loadVersions()
                                }
                            }
                        }

                        panel {
                            row {

                                // Initial version show the version we have installed,
                                // or none if the user somehow got this state.
                                lspVersionCombobox = cell(
                                    LspVersionComboBox(
                                        installedVersions = InstalledLspVersions(
//                                            Add the currently selected version as though it's actually installed. If it's not, it will be marked as an error later.
                                            lspVersionBinding.get().let {
                                                if (it is Version.Semantic) {
                                                    listOf(it)
                                                } else listOf()
                                            }),
                                        selectedVersion = lspVersionBinding.get(),
                                        download = ::download
                                    )
                                ).bind(
                                    { component -> component.getSelectedVersion() },
                                    { component, value -> component.setSelectedVersion(value) },
                                    lspVersionBinding
                                ).component.apply {
                                    // Disabled until the versions are loaded
                                    isEnabled = false
                                    addItemListener {
                                        if (it.stateChange == ItemEvent.SELECTED) {
                                            updateLspVersionActions(
                                                lspVersionsForDownload.get(), lspInstalledVersions.get()
                                            )
                                        }
                                    }
                                }
                                cell(downloadLspButton)
                                cell(lspVersionStateLabelComponent)
                                // I empirically learned that icon will cancel coroutine passed to it if you unload it.
                                lspVersionsLoader =
                                    cell(AsyncProcessIcon("Loading")).visibleIf(lspVersionsForDownload.transform { it is Loadable.Loading }).component.apply { suspend() }
                                contextHelp("Updates will be suggested if available as notifications when you open a project or you can check for them on this page.").visibleIf(
                                    lspVersionCombobox.selectedValueIs(LspVersionComboBox.Item.LatestVersion)
                                )
                                actionButton(object :
                                    DumbAwareAction("Open LSP Storage Folder", "", AllIcons.Actions.MenuOpen) {
                                    override fun actionPerformed(e: AnActionEvent) {
                                        val lspDir = FppLspManager.lspStorageDirPath.toFile()
                                        if (lspDir.exists()) {
                                            // Could also use ShowFilePathAction
                                            RevealFileAction.openDirectory(lspDir)
                                        }
                                    }
                                    // TODO (AleksandrSl 24/05/2025): Should I show something if it's not available? I'd like to show a copyable path, but i'm yet to fond a good way.
                                    //  Both contextualHelp and rowComment are not copyable.
                                }).align(AlignX.RIGHT).enabled(PlatformCompatibility.isDirectoryOpenSupported())
                            }
                        }.enabledIf(lspAuto.selected)
                    }.rowComment("Binaries are downloaded from <a href='https://github.com/Kronos3/fpp-rust/releases/latest'>GitHub</a> when you select a version in the download section of combobox.")
                    row {
                        lspManual = radioButton(
                            FppBundle.message("fpp.settings.lsp.manual"), LspConfigurationType.Manual
                        ).component
                    }
                }.bind(settings::lspConfigurationType)
                indent {
                    row("Path to FPP lsp:") {
                        cell(lspPathComponent).align(AlignX.FILL).resizableColumn().bindText(settings::lspPath)
                    }
                    row("Version:") {
                        cell(lspVersionLabelComponent).align(AlignX.FILL).resizableColumn()
                    }
                }.visibleIf(lspManual.selected)
            }
        }
    }

    private fun loadVersions() {
        if (lspAuto.isSelected) {
            coroutineScope.launch {
                withLoader(lspVersionsLoader) {
                    lspVersionsForDownload.set(Loadable.Loading)
                    val lspManager = FppLspManager.getInstance()
                    lspVersionsForDownload.set(
                        try {
                            Loadable.Loaded(DownloadableLspVersions(lspManager.getVersionsAvailableForDownload(project)))
                        } catch (err: Exception) {
                            Loadable.Failed(err.message ?: "Failed to load versions")
                        }
                    )
                    lspInstalledVersions.set(Loadable.Loading)
                    lspInstalledVersions.set(
                        try {
                            withContext(Dispatchers.IO) {
                                Loadable.Loaded(InstalledLspVersions(FppLspManager.getInstalledVersions()))
                            }
                        } catch (err: Exception) {
                            Loadable.Failed(err.message ?: "Failed to get installed versions")
                        })
                    lspVersionCombobox.setVersions(
                        installedVersions = lspInstalledVersions.get().getOrEmpty(),
                        versionsForDownload = lspVersionsForDownload.get().getOrEmpty()
                    )
                    updateLspVersionActions(
                        versionsForDownload = lspVersionsForDownload.get(),
                        installedVersions = lspInstalledVersions.get()
                    )
                }
            }
        }
    }
}

private fun TextFieldWithBrowseButton.onExistingFileChanged(action: (Path) -> Unit) {
    addDocumentListener(object : DocumentAdapter() {
        override fun textChanged(event: javax.swing.event.DocumentEvent) {
            if (text.isEmpty()) {
                return
            }
            val maybePath = text.toNioPathOrNull()
            if (maybePath == null || !maybePath.exists()) {
                return
            }
            action(maybePath)
        }
    })
}
