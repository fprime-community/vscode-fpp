package com.github.fprime_community.fpp_tools.util

import com.github.fprime_community.fpp_tools.LspConfiguration
import com.intellij.codeInsight.CodeInsightSettings
import com.intellij.testFramework.fixtures.BasePlatformTestCase
import java.nio.file.Path

/**
 * Verifies that [LspCli] builds the language-server command line the way the
 * `fpp_lsp_server` executable expects: launched over stdio with a backtrace-
 * enabled environment.
 */
class LspCliTest : BasePlatformTestCase() {
    override fun tearDown() {
        // Platform 2026.2 flips AUTO_POPUP_JAVADOC_INFO on during fixture startup,
        // which trips BasePlatformTestCase's "settings not damaged" teardown check.
        try {
            CodeInsightSettings.getInstance().AUTO_POPUP_JAVADOC_INFO = false
        } finally {
            super.tearDown()
        }
    }

    private fun cli(exe: String): com.intellij.execution.configurations.GeneralCommandLine {
        val config = LspConfiguration.ForSettings(project, Path.of(exe), isReady = true)
        return LspCli(project, config).createLspCli()
    }

    fun testUsesConfiguredExecutablePath() {
        val commandLine = cli("/venv/bin/fpp_lsp_server")
        assertEquals("/venv/bin/fpp_lsp_server", commandLine.exePath)
    }

    fun testLaunchesOverStdio() {
        val commandLine = cli("/venv/bin/fpp_lsp_server")
        assertContainsElements(commandLine.parametersList.parameters, "--stdio")
    }

    fun testEnablesRustBacktrace() {
        val commandLine = cli("/venv/bin/fpp_lsp_server")
        assertEquals("1", commandLine.environment["RUST_BACKTRACE"])
    }
}
