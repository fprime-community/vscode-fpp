package com.github.kronos3.fpp_rust

import com.intellij.openapi.application.PluginPathManager
import org.jetbrains.plugins.textmate.api.TextMateBundleProvider
import org.jetbrains.plugins.textmate.api.TextMateBundleProvider.PluginBundle


class FppTextMateBundleProvider : TextMateBundleProvider {
    override fun getBundles(): List<PluginBundle> {
        return PluginPathManager.getPluginResource(javaClass, "textmate/")
            ?.let { listOf(PluginBundle("FPP", it.toPath())) }
            ?: emptyList()
    }
}
