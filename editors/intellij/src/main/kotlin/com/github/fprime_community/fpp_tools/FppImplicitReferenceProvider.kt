package com.github.fprime_community.fpp_tools

import com.intellij.model.Symbol
import com.intellij.model.psi.ImplicitReferenceProvider
import com.intellij.model.psi.PsiSymbolReference
import com.intellij.model.psi.PsiSymbolService
import com.intellij.openapi.fileEditor.FileDocumentManager
import com.intellij.openapi.util.TextRange
import com.intellij.platform.lsp.api.LspServerManager
import com.intellij.platform.lsp.impl.LspClientImpl
import com.intellij.platform.lsp.util.getOffsetInDocument
import com.intellij.platform.lsp.util.getRangeInDocument
import com.intellij.psi.PsiElement
import com.intellij.psi.PsiFile
import com.intellij.psi.PsiManager
import org.eclipse.lsp4j.LocationLink

/**
 * Works around [CPP-51642](https://youtrack.jetbrains.com/issue/CPP-51642): in the CLion Nova backend the
 * platform's LspImplicitReferenceProvider gates on the current action being GotoDeclarationAction, but the
 * backend runs Ctrl+Click through a RiderBackendCompositeAction (or no action at all), so the platform
 * provider always returns null and textDocument/definition is never sent.
 *
 * This provider reimplements the definition request without the action gate. It is registered on CLion only;
 * in IntelliJ the platform provider works and this one bails out to avoid duplicate navigation targets.
 */
internal class FppImplicitReferenceProvider : ImplicitReferenceProvider {
    override fun getImplicitReference(element: PsiElement, offsetInElement: Int): PsiSymbolReference? {
        if (System.getProperty("idea.platform.prefix") != "CLion") return null

        val psiFile = element as? PsiFile ?: return null
        if (psiFile.project.isDefault) return null
        val file = psiFile.virtualFile ?: return null
        val document = FileDocumentManager.getInstance().getCachedDocument(file) ?: return null

        val project = psiFile.project
        val lspServers = LspServerManager.getInstance(project)
            .getServersForProvider(FppLspServerSupportProvider::class.java)

        val clientAndLinks = lspServers.mapNotNull { server ->
            val client = server as? LspClientImpl ?: return@mapNotNull null

            val definitions = client.requestExecutor.getElementDefinitions(file, offsetInElement)
            if (definitions.isEmpty()) return@mapNotNull null

            // Ignore a definition that just points back at the reference itself.
            if (definitions.size == 1
                && definitions[0].targetSelectionRange == definitions[0].originSelectionRange
                && definitions[0].targetUri == client.descriptor.getFileUri(file)
            ) {
                return@mapNotNull null
            }

            client to definitions
        }.ifEmpty { return null }

        // Respect only the reference to the right of the caret (matches IntelliJ's `foo<caret>++` behavior).
        val hasRangeToTheRight = clientAndLinks.flatMap { it.second }.any { link ->
            val origin = link.originSelectionRange ?: return@any false
            (getOffsetInDocument(document, origin.end) ?: return@any false) > offsetInElement
        }

        var rangeInFile: TextRange? = null
        val targets = clientAndLinks.flatMap { (client, links) ->
            links.mapNotNull { link ->
                val originRange = link.originSelectionRange
                val textRange = if (originRange != null) {
                    getRangeInDocument(document, originRange) ?: return@mapNotNull null
                } else {
                    TextRange(offsetInElement, offsetInElement)
                }
                if (hasRangeToTheRight && textRange.endOffset <= offsetInElement) return@mapNotNull null

                val targetSymbol = resolveTargetSymbol(client, link) ?: return@mapNotNull null
                rangeInFile = rangeInFile?.union(textRange) ?: textRange
                targetSymbol
            }
        }

        val range = rangeInFile ?: return null
        if (targets.isEmpty()) return null

        return FppLspReference(psiFile, range, targets)
    }

    private fun resolveTargetSymbol(client: LspClientImpl, link: LocationLink): Symbol? {
        val targetFile = client.descriptor.findFileByUri(link.targetUri) ?: return null
        val project = client.project
        val psiFile = PsiManager.getInstance(project).findFile(targetFile) ?: return null
        val targetDocument = FileDocumentManager.getInstance().getDocument(targetFile) ?: return null
        val offset = getOffsetInDocument(targetDocument, link.targetSelectionRange.start) ?: 0
        val targetElement = psiFile.findElementAt(offset) ?: psiFile
        return PsiSymbolService.getInstance().asSymbol(targetElement)
    }

    /** A resolved reference occupying [rangeInFile] within [psiFile], pointing at LSP-provided [targets]. */
    private class FppLspReference(
        private val psiFile: PsiFile,
        private val rangeInFile: TextRange,
        private val targets: List<Symbol>,
    ) : PsiSymbolReference {
        override fun getElement(): PsiElement = psiFile
        override fun getRangeInElement(): TextRange = rangeInFile
        override fun resolveReference(): Collection<Symbol> = targets
        override fun resolvesTo(target: Symbol): Boolean = target in targets
    }
}
