package com.github.kronos3.fpp_rust

import com.github.kronos3.fpp_rust.settings.FppProject
import com.github.kronos3.fpp_rust.settings.FppSettings
import com.github.kronos3.fpp_rust.settings.FppSettingsConfigurable
import com.github.kronos3.fpp_rust.util.LspCli
import com.intellij.notification.NotificationType
import com.intellij.execution.configurations.GeneralCommandLine
import com.intellij.icons.AllIcons
import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.editor.colors.TextAttributesKey
import com.intellij.openapi.progress.currentThreadCoroutineScope
import com.intellij.openapi.project.DumbAware
import com.intellij.openapi.project.Project
import com.intellij.openapi.vfs.VirtualFile
import com.intellij.platform.lsp.api.LspServer
import com.intellij.platform.lsp.api.LspServerManager
import com.intellij.platform.lsp.api.LspServerState
import com.intellij.platform.lsp.api.LspServerSupportProvider
import com.intellij.platform.lsp.api.ProjectWideLspServerDescriptor
import com.intellij.platform.lsp.api.customization.LspCustomization
import com.intellij.platform.lsp.api.customization.LspSemanticTokensSupport
import com.intellij.platform.lsp.api.lsWidget.LspServerWidgetItem
import com.intellij.util.containers.addIfNotNull
import kotlinx.coroutines.launch
import org.eclipse.lsp4j.jsonrpc.services.JsonRequest
import org.eclipse.lsp4j.services.LanguageServer
import java.util.concurrent.CompletableFuture

private class ReloadWorkspaceAction(
    private val lspServer: LspServer,
) : AnAction(
    "Reload Workspace",
    "Reload FPP workspace by scanning all .fpp files in IDE workspace",
    AllIcons.Actions.Refresh
), DumbAware {
    override fun actionPerformed(e: AnActionEvent): Unit =
        run { e.project?.let { project -> loadAllFiles(project, lspServer) } }
}

open class FppLspProjectWidgetItem(lspServer: LspServer, currentFile: VirtualFile?) : LspServerWidgetItem(
    lspServer, currentFile,
    settingsPageClass = FppSettingsConfigurable::class.java
) {
    override fun createWidgetInlineActions(): List<AnAction> {
        val actions = super.createWidgetInlineActions().toMutableList()
        actions.addIfNotNull(ReloadWorkspaceAction(lspServer))

        return actions
    }
}

internal class FppLspServerSupportProvider : LspServerSupportProvider {
    override fun fileOpened(
        project: Project,
        file: VirtualFile,
        serverStarter: LspServerSupportProvider.LspServerStarter
    ) {
        if (file.extension == "fpp" || file.extension == "fppi") {
            serverStarter.ensureServerStarted(FppLspServerDescriptor(project))
        }
    }

    override fun createLspServerWidgetItem(lspServer: LspServer, currentFile: VirtualFile?): LspServerWidgetItem =
        FppLspProjectWidgetItem(lspServer, currentFile)
}

private class FppLspServerDescriptor(project: Project) : ProjectWideLspServerDescriptor(project, "fpp") {
    override fun isSupportedFile(file: VirtualFile) = file.extension == "fpp" || file.extension == "fppi"
    override fun createCommandLine(): GeneralCommandLine {
        val lspConfiguration = project.getLspConfiguration()
        if (lspConfiguration !is LspConfiguration.Enabled) {
            throw IllegalStateException("Tried to created a Luau LSP with disabled configuration")
        }
        return LspCli(project, lspConfiguration).createLspCli()
    }

    override val lsp4jServerClass = FppLsp4jServer::class.java

    override val lspCustomization: LspCustomization
        get() = object : LspCustomization() {
            override val semanticTokensCustomizer = object : LspSemanticTokensSupport() {
                override fun getTextAttributesKey(tokenType: String, modifiers: List<String>): TextAttributesKey? {
                    return when (tokenType) {
                        SemanticTokenTypes.Module -> FppColors.MODULE
                        SemanticTokenTypes.Topology -> FppColors.TOPOLOGY
                        SemanticTokenTypes.Component -> FppColors.COMPONENT
                        SemanticTokenTypes.Interface -> FppColors.INTERFACE
                        SemanticTokenTypes.ComponentInstance -> FppColors.COMPONENT_INSTANCE
                        SemanticTokenTypes.Constant -> FppColors.CONSTANT
                        SemanticTokenTypes.EnumConstant -> FppColors.ENUM_CONSTANT
                        SemanticTokenTypes.StructMember -> FppColors.STRUCT_MEMBER
                        SemanticTokenTypes.GraphGroup -> FppColors.GRAPH_GROUP
                        SemanticTokenTypes.PortInstance -> FppColors.PORT_INSTANCE
                        SemanticTokenTypes.Port -> FppColors.PORT
                        SemanticTokenTypes.AbstractType -> FppColors.ABSTRACT_TYPE
                        SemanticTokenTypes.AliasType -> FppColors.ALIAS_TYPE
                        SemanticTokenTypes.ArrayType -> FppColors.ARRAY_TYPE
                        SemanticTokenTypes.EnumType -> FppColors.ENUM_TYPE
                        SemanticTokenTypes.StructType -> FppColors.STRUCT_TYPE
                        SemanticTokenTypes.PrimitiveType -> FppColors.PRIMITIVE_TYPE
                        SemanticTokenTypes.FormalParameter -> FppColors.FORMAL_PARAMETER
                        SemanticTokenTypes.Command -> FppColors.COMMAND
                        SemanticTokenTypes.Event -> FppColors.EVENT
                        SemanticTokenTypes.Telemetry -> FppColors.TELEMETRY
                        SemanticTokenTypes.Parameter -> FppColors.PARAMETER
                        SemanticTokenTypes.DataProduct -> FppColors.DATA_PRODUCT

                        SemanticTokenTypes.StateMachine -> FppColors.STATE_MACHINE
                        SemanticTokenTypes.StateMachineInstance -> FppColors.STATE_MACHINE_INSTANCE
                        SemanticTokenTypes.TelemetryPacketSet -> FppColors.TELEMETRY_PACKET_SET
                        SemanticTokenTypes.TelemetryPacket -> FppColors.TELEMETRY_PACKET

                        SemanticTokenTypes.Action -> FppColors.ACTION
                        SemanticTokenTypes.Guard -> FppColors.GUARD
                        SemanticTokenTypes.Signal -> FppColors.SIGNAL
                        SemanticTokenTypes.State -> FppColors.STATE

                        // Other
                        SemanticTokenTypes.Annotation -> FppColors.ANNOTATION
                        SemanticTokenTypes.Comment -> FppColors.COMMENT
                        SemanticTokenTypes.Number -> FppColors.NUMBER
                        SemanticTokenTypes.String -> FppColors.STRING
                        SemanticTokenTypes.Keyword -> FppColors.KEYWORD
                        else -> null
                    }?.textAttributesKey
                }
            }
        }
}

data class UriRequest(val uri: String)

interface FppLsp4jServer : LanguageServer {
    @JsonRequest("fpp/reloadWorkspace")
    fun reloadWorkspace(params: Void): CompletableFuture<Void>

    @JsonRequest("fpp/setLocsWorkspace")
    fun setLocsWorkspace(params: UriRequest): CompletableFuture<Void>

    @JsonRequest("fpp/setFullWorkspace")
    fun setFullWorkspace(): CompletableFuture<Void>
}

fun loadAllFiles(project: Project, lspServer: LspServer) {
    currentThreadCoroutineScope().launch {
        lspServer.sendRequest { (it as FppLsp4jServer).setFullWorkspace() }
    }
}

fun reloadProject(project: Project) {
    ApplicationManager.getApplication().invokeLater({
        LspServerManager.getInstance(project).getServersForProvider(FppLspServerSupportProvider::class.java).forEach {
            val fppProject = FppSettings.getInstance(project).state.project
            if (fppProject != null) {
                when (fppProject) {
                    is FppProject.EntireWorkspace -> {
                        (it as FppLsp4jServer).setFullWorkspace()
                    }

                    is FppProject.LocsFile -> {
                        (it as FppLsp4jServer).setLocsWorkspace(UriRequest(fppProject.uri))
                    }
                }

            }
        }
    }, project.disposed)
}
