package com.github.fprime_community.fpp_tools.navigation

import com.github.fprime_community.fpp_tools.FppLanguage
import com.github.fprime_community.fpp_tools.fppLspClients
import com.intellij.codeInsight.editorActions.SelectWordUtil
import com.intellij.find.usages.api.*
import com.intellij.model.Pointer
import com.intellij.model.Symbol
import com.intellij.model.psi.PsiSymbolDeclaration
import com.intellij.model.psi.PsiSymbolDeclarationProvider
import com.intellij.openapi.application.runReadActionBlocking
import com.intellij.openapi.fileEditor.FileDocumentManager
import com.intellij.openapi.fileTypes.LanguageFileType
import com.intellij.openapi.util.Iconable
import com.intellij.openapi.util.TextRange
import com.intellij.openapi.vfs.VirtualFile
import com.intellij.platform.backend.presentation.TargetPresentation
import com.intellij.platform.lsp.api.LspClient
import com.intellij.platform.lsp.api.customization.LspFindReferencesSupport
import com.intellij.platform.lsp.util.getLsp4jPosition
import com.intellij.platform.lsp.util.getRangeInDocument
import com.intellij.psi.PsiElement
import com.intellij.psi.PsiFile
import com.intellij.psi.PsiManager
import com.intellij.util.AbstractQuery
import com.intellij.util.IconUtil
import com.intellij.util.Processor
import com.intellij.util.Query
import org.eclipse.lsp4j.DefinitionParams
import org.eclipse.lsp4j.Position
import org.eclipse.lsp4j.ReferenceContext
import org.eclipse.lsp4j.ReferenceParams

/**
 * Makes "Go to Declaration or Usages" (Ctrl+Click / Cmd+B) show usages on an FPP definition name.
 * Works around [IJPL-156979](https://youtrack.jetbrains.com/issue/IJPL-156979).
 *
 * GTDU (`gtdu.kt`) navigates when the offset has a *reference* and shows usages when it has a
 * *declaration*. For PSI-less LSP files the generic integration only contributes a reference (via
 * `textDocument/definition`), never a declaration, so GTDU does nothing on a definition. These
 * classes each fill one stage of the show-usages chain (declaration -> SearchTarget -> UsageSearcher):
 *
 *  - [FppSymbolDeclarationProvider] contributes the declaration, if
 *    `textDocument/definition` is empty (we are at the definition name itself).
 *  - [FppReferenceSymbol] is the [Symbol] returned by our [FppSymbolDeclarationProvider].
 *    It also is a [SearchTarget], which is need by Find/Show Usages.
 *  - [FppUsageSearcher] produces the usages for that target via `textDocument/references`. The
 *    declaration only makes GTDU pick "show usages"; without a searcher the popup is empty.
 */
class FppSymbolDeclarationProvider : PsiSymbolDeclarationProvider {
    /**
     * @see com.intellij.platform.lsp.impl.features.usages.LspSearchTargetsRule.searchTargets
     */
    override fun getDeclarations(element: PsiElement, offsetInElement: Int): Collection<PsiSymbolDeclaration> {
        if (element !is PsiFile || offsetInElement < 0) return emptyList()
        val file = element.virtualFile ?: return emptyList()
        if ((file.fileType as? LanguageFileType)?.language != FppLanguage.INSTANCE) return emptyList()
        val document = FileDocumentManager.getInstance().getCachedDocument(file) ?: return emptyList()
        val wordRange = SelectWordUtil.getWordSelectionRange(
            document.charsSequence, offsetInElement, SelectWordUtil.JAVA_IDENTIFIER_PART_CONDITION,
        ) ?: return emptyList()

        val lspClients = element.project.fppLspClients()
            .filter { it.descriptor.lspCustomization.findReferencesCustomizer is LspFindReferencesSupport }
            .takeIf { it.isNotEmpty() }
            ?: return emptyList()

        // Send and check if `textDocument/definition` is empty for all lsp servers
        val position = getLsp4jPosition(document, wordRange.startOffset)
        val definitions = lspClients.mapNotNull { lspServer ->
            lspServer.sendRequestSync {
                it.textDocumentService.definition(DefinitionParams(lspServer.getDocumentIdentifier(file), position))
            }
        }
        val isDefinitionName = definitions.isEmpty() || definitions.all {
            (it.isLeft && it.left.isEmpty()) || (it.isRight && it.right.isEmpty())
        }
        if (!isDefinitionName) return emptyList()

        return listOf(FppSymbolDeclaration(element, wordRange, FppReferenceSymbol(lspClients, file, position)))
    }
}

private class FppSymbolDeclaration(
    private val element: PsiElement,
    private val range: TextRange,
    private val symbol: FppReferenceSymbol,
) : PsiSymbolDeclaration {
    override fun getDeclaringElement(): PsiElement = element
    override fun getRangeInDeclaringElement(): TextRange = range
    override fun getSymbol(): Symbol = symbol
}

/**
 * The declared [Symbol] for an FPP definition, also usable as a Find/Show Usages [SearchTarget].
 * @see com.intellij.platform.lsp.impl.features.usages.LspSearchTarget
 */
class FppReferenceSymbol(val lspClients: Collection<LspClient>, val file: VirtualFile, val position: Position) : Symbol, SearchTarget {
    override fun createPointer(): Pointer<FppReferenceSymbol> = Pointer.hardPointer(this)

    private val label = "${file.name}:${position.line + 1}:${position.character + 1}"

    override val usageHandler: UsageHandler = UsageHandler { label }

    override fun presentation(): TargetPresentation =
        TargetPresentation.builder(label)
            .icon(IconUtil.getIcon(file, Iconable.ICON_FLAG_VISIBILITY, null))
            .presentation()

    override fun equals(other: Any?): Boolean =
        this === other || other is FppReferenceSymbol && file == other.file && position == other.position

    override fun hashCode(): Int = 31 * file.hashCode() + position.hashCode()
}

/**
 * Answers a usage search for [FppReferenceSymbol] with `textDocument/references`.
 * @see com.intellij.platform.lsp.impl.features.usages.LspUsageSearcher
 */
class FppUsageSearcher : UsageSearcher {
    override fun collectSearchRequest(parameters: UsageSearchParameters): Query<out Usage>? {
        val target = parameters.target as? FppReferenceSymbol ?: return null
        return FppReferencesQuery(target)
    }
}

/**
 * @see com.intellij.platform.lsp.impl.features.usages.LspReferencesQuery
 */
private class FppReferencesQuery(private val target: FppReferenceSymbol) : AbstractQuery<Usage>() {
    override fun processResults(consumer: Processor<in Usage>): Boolean {
        for (lspClient in target.lspClients) {
            val params = ReferenceParams(
                lspClient.getDocumentIdentifier(target.file),
                target.position,
                ReferenceContext(true)
            )
            val locations = lspClient.sendRequestSync(60_000) {
                it.textDocumentService.references(params)
            } ?: return true

            runReadActionBlocking {
                val psiManager = PsiManager.getInstance(lspClient.project)
                for (location in locations) {
                    val resultFile = lspClient.descriptor.findFileByUri(location.uri) ?: continue
                    val psiFile = psiManager.findFile(resultFile) ?: continue
                    val range = getRangeInDocument(psiFile.fileDocument, location.range) ?: continue
                    consumer.process(PsiUsage.textUsage(psiFile, range))
                }
            }
        }
        return true
    }
}
