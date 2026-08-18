package com.github.fprime_community.fpp_tools

import com.intellij.codeInsight.navigation.actions.GotoDeclarationAction
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.diagnostic.logger
import com.intellij.model.psi.ImplicitReferenceProvider
import com.intellij.model.psi.PsiSymbolReference
import com.intellij.psi.PsiElement

private val log = logger<FppImplicitReferenceProvider>()

/**
 * Works around [CPP-51642](https://youtrack.jetbrains.com/issue/CPP-51642).
 *
 * Rather than reimplement the (non-trivial) platform logic, this provider reflectively invokes the real
 * platform `LspImplicitReferenceProvider` with `currentActionClass` temporarily forced to `GotoDeclarationAction`
 * so the gate passes.
 */
internal class FppImplicitReferenceProvider : ImplicitReferenceProvider {
    private val lspImplicitReferenceProvider: ImplicitReferenceProvider? by lazy {
        try {
            Class.forName(
                "com.intellij.platform.lsp.impl.features.navigation.LspImplicitReferenceProvider"
            ).getDeclaredConstructor().apply { isAccessible = true }.newInstance() as ImplicitReferenceProvider
        } catch (e: Throwable) {
            log.error("CPP-51642 workaround disabled: cannot load platform LspImplicitReferenceProvider", e)
            null
        }
    }

    private val currentActionHolderWrapper: CurrentActionHolderWrapper? by lazy {
        try {
            CurrentActionHolderWrapper()
        } catch (e: Throwable) {
            log.warn("CPP-51642 workaround disabled: cannot access CurrentActionHolder", e)
            null
        }
    }

    override fun getImplicitReference(element: PsiElement, offsetInElement: Int): PsiSymbolReference? {
        if (System.getProperty("idea.platform.prefix") != "CLion") return null

        val delegate = lspImplicitReferenceProvider ?: return null
        val currentActionHolderWrapper = this@FppImplicitReferenceProvider.currentActionHolderWrapper ?: return null

        return currentActionHolderWrapper.withCurrentAction(GotoDeclarationAction::class.java) {
            delegate.getImplicitReference(element, offsetInElement)
        }
    }

    private class CurrentActionHolderWrapper {
        private val clazz = Class.forName("com.intellij.platform.lsp.impl.features.navigation.CurrentActionHolder")
        private val service = ApplicationManager.getApplication().getService(clazz)
            ?: error("CurrentActionHolder service not registered")
        // Kotlin `var currentActionClass: Class<AnAction>?` -> getCurrentActionClass / setCurrentActionClass
        private val getter = clazz.getMethod("getCurrentActionClass").apply { isAccessible = true }
        private val setter = clazz.getMethod("setCurrentActionClass", Class::class.java).apply { isAccessible = true }

        fun <T> withCurrentAction(actionClass: Class<*>, block: () -> T): T {
            val previous = getter.invoke(service)
            setter.invoke(service, actionClass)
            try {
                return block()
            } finally {
                if (getter.invoke(service) == actionClass) {
                    setter.invoke(service, previous)
                }
            }
        }
    }
}
