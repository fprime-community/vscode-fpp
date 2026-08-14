package com.github.fprime_community.fpp_tools.navigation

import com.github.fprime_community.fpp_tools.FppLspServerSupportProvider
import com.intellij.find.usages.api.PsiUsage
import com.intellij.find.usages.api.SearchTarget
import com.intellij.find.usages.api.Usage
import com.intellij.find.usages.api.UsageHandler
import com.intellij.find.usages.api.UsageSearchParameters
import com.intellij.find.usages.api.UsageSearcher
import com.intellij.model.Pointer
import com.intellij.model.Symbol
import com.intellij.model.psi.PsiSymbolDeclaration
import com.intellij.model.psi.PsiSymbolDeclarationProvider
import com.intellij.openapi.application.runReadAction
import com.intellij.openapi.editor.Document
import com.intellij.openapi.fileEditor.FileDocumentManager
import com.intellij.openapi.project.Project
import com.intellij.openapi.util.Iconable
import com.intellij.openapi.util.TextRange
import com.intellij.openapi.vfs.VirtualFile
import com.intellij.platform.backend.presentation.TargetPresentation
import com.intellij.platform.lsp.api.LspServer
import com.intellij.platform.lsp.api.LspServerManager
import com.intellij.platform.lsp.api.LspServerState
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
 * Makes "Go to Declaration or Usages" (Ctrl+Click / Cmd+B) show usages when the caret is on an
 * FPP definition's own name.
 *
 * FPP files carry no PSI symbols, so the platform's "Go to Declaration or Usages" flow (`gtdu.kt`)
 * has nothing to fall through to on a definition: the generic LSP integration contributes a
 * *reference* (`textDocument/definition`) but no *declaration*, so its `declaredData` half is
 * always empty and the action does nothing.
 *
 * This provider fills that gap by reporting a declaration exactly where `textDocument/definition`
 * resolves to nothing (i.e. on the definition name itself). Reference and declaration are driven by
 * the same request, so they are mutually exclusive: on a *usage* the request resolves and the
 * platform navigates; on a *definition* it is empty and the platform shows usages, which routes
 * back through [FppReferenceSymbol] (a [SearchTarget]) to `textDocument/references`.
 */
class FppSymbolDeclarationProvider : PsiSymbolDeclarationProvider {
    override fun getDeclarations(element: PsiElement, offsetInElement: Int): Collection<PsiSymbolDeclaration> {
        if (element !is PsiFile || offsetInElement < 0) return emptyList()
        val file = element.virtualFile ?: return emptyList()
        if (file.extension != "fpp" && file.extension != "fppi") return emptyList()
        val document = FileDocumentManager.getInstance().getCachedDocument(file) ?: return emptyList()
        val wordRange = wordRangeAt(document, offsetInElement) ?: return emptyList()
        val server = fppServerFor(element.project, file) ?: return emptyList()

        val position = getLsp4jPosition(document, wordRange.startOffset)
        val definitions = server.sendRequestSync { it.textDocumentService.definition(DefinitionParams(server.getDocumentIdentifier(file), position)) }
        val isDefinitionName = definitions == null ||
                (definitions.isLeft && definitions.left.isEmpty()) ||
                (definitions.isRight && definitions.right.isEmpty())
        if (!isDefinitionName) return emptyList()

        return listOf(FppSymbolDeclaration(element, wordRange, FppReferenceSymbol(file, position)))
    }

    private fun wordRangeAt(document: Document, offset: Int): TextRange? {
        val text = document.charsSequence
        if (offset > text.length) return null
        fun isPart(c: Char) = c.isLetterOrDigit() || c == '_'
        var start = offset
        var end = offset
        while (start > 0 && isPart(text[start - 1])) start--
        while (end < text.length && isPart(text[end])) end++
        return if (start < end) TextRange(start, end) else null
    }
}

private fun fppServerFor(project: Project, file: VirtualFile): LspServer? =
    @Suppress("DEPRECATION")
    LspServerManager.getInstance(project)
        .getServersForProvider(FppLspServerSupportProvider::class.java)
        .firstOrNull { it.state == LspServerState.Running && it.descriptor.isSupportedFile(file) }

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
 * Both the declared [Symbol] and the Find/Show Usages [SearchTarget] for an FPP definition.
 * The platform's `symbolSearchTarget` returns a [Symbol] directly when it is also a [SearchTarget],
 * so no separate factory is needed.
 */
class FppReferenceSymbol(val file: VirtualFile, val position: Position) : Symbol, SearchTarget {
    override fun createPointer(): Pointer<FppReferenceSymbol> = Pointer.hardPointer(this)

    private val label = "${file.name}:${position.line + 1}:${position.character + 1}"

    override val usageHandler: UsageHandler = UsageHandler { label }

    override fun presentation(): TargetPresentation =
        TargetPresentation.builder(label)
            .icon(IconUtil.getIcon(file, Iconable.ICON_FLAG_VISIBILITY, null))
            .presentation()

    override fun equals(other: Any?): Boolean =
        this === other || (other is FppReferenceSymbol && file == other.file && position == other.position)

    override fun hashCode(): Int = 31 * file.hashCode() + position.hashCode()
}

/** Serves usages for [FppReferenceSymbol] via `textDocument/references`, mirroring the platform's own LSP usage searcher. */
class FppUsageSearcher : UsageSearcher {
    override fun collectSearchRequest(parameters: UsageSearchParameters): Query<out Usage>? {
        val target = parameters.target as? FppReferenceSymbol ?: return null
        return FppReferencesQuery(parameters.project, target)
    }
}

private class FppReferencesQuery(private val project: Project, private val target: FppReferenceSymbol) : AbstractQuery<Usage>() {
    override fun processResults(consumer: Processor<in Usage>): Boolean {
        val server = fppServerFor(project, target.file) ?: return true
        val params = ReferenceParams(server.getDocumentIdentifier(target.file), target.position, ReferenceContext(true))
        val locations = server.sendRequestSync(60_000) { it.textDocumentService.references(params) } ?: return true

        runReadAction {
            val psiManager = PsiManager.getInstance(project)
            for (location in locations) {
                val resultFile = server.descriptor.findFileByUri(location.uri) ?: continue
                val psiFile = psiManager.findFile(resultFile) ?: continue
                val range = getRangeInDocument(psiFile.fileDocument, location.range) ?: continue
                consumer.process(PsiUsage.textUsage(psiFile, range))
            }
        }
        return true
    }
}
