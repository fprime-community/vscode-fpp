package com.github.fprime_community.fpp_tools.settings

import com.github.fprime_community.fpp_tools.LspConfiguration
import com.github.fprime_community.fpp_tools.util.LspCli

import com.intellij.openapi.fileChooser.FileChooserDescriptorFactory
import com.intellij.openapi.project.Project
import com.intellij.openapi.ui.TextBrowseFolderListener
import com.intellij.openapi.ui.TextFieldWithBrowseButton
import com.intellij.openapi.util.io.toNioPathOrNull
import com.intellij.ui.DocumentAdapter
import com.intellij.ui.components.JBLabel
import com.intellij.ui.dsl.builder.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.nio.file.Path
import kotlin.io.path.exists


/**
 * Supports creating and managing a [javax.swing.JPanel] for the Settings Dialog.
 */
class FppLspSettingsComponent(
    private val project: Project,
    private val settings: FppSettings,
    private val coroutineScope: CoroutineScope,
) {
    private val lspVersionLabelComponent = JBLabel(if (settings.lspPath.isEmpty()) "No binary specified" else "")

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
            if (it == null) {
                setManualLspVersion("Invalid binary specified")
                return@onExistingFileChanged
            }
            // I guess this will launch in the project scope, so the coroutine will finish even if I close the settings.
            // Not sure if I should about it or not.
            coroutineScope.launch(Dispatchers.IO) {
                setManualLspVersion(
                    LspCli(
                        project, LspConfiguration.ForSettings(project, it, true)
                    ).queryVersion()
                        .map { v -> v.toString() }
                        .getOrElse { e -> "Unable to query version: ${e.message}" }
                )
            }
        }
    }

    fun render(panel: Panel): Row {
        with(panel) {
            return group("LSP") {
                row {
                    text(
                        "The FPP language server is installed via the project's Python interpreter. " +
                                "You'll be offered to install it if it's missing. " +
                                "Set a path below only to override that."
                    )
                }
                row("FPP LSP Override:") {
                    cell(lspPathComponent).align(AlignX.FILL).resizableColumn().bindText(settings::lspPath)
                }
                row("Detected version:") {
                    cell(lspVersionLabelComponent).align(AlignX.FILL).resizableColumn()
                }
            }
        }
    }
}

private fun TextFieldWithBrowseButton.onExistingFileChanged(action: (Path?) -> Unit) {
    addDocumentListener(object : DocumentAdapter() {
        override fun textChanged(event: javax.swing.event.DocumentEvent) {
            if (text.isEmpty()) {
                action(null)
                return
            }
            val maybePath = text.toNioPathOrNull()
            if (maybePath == null || !maybePath.exists()) {
                action(null)
                return
            }
            action(maybePath)
        }
    })
}
