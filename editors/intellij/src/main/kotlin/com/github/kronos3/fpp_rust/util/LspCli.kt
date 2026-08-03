package com.github.kronos3.fpp_rust.util

import com.github.kronos3.fpp_rust.LspConfiguration
import com.intellij.execution.configurations.GeneralCommandLine
import com.intellij.execution.process.CapturingProcessHandler
import com.intellij.openapi.diagnostic.logger
import com.intellij.openapi.project.Project

private val LOG = logger<LspCli>()

/**
 * Interact with external `Lsp` process.
 */
class LspCli(private val project: Project, private val lspConfiguration: LspConfiguration.Enabled) {

    fun createLspCli(): GeneralCommandLine {
        return GeneralCommandLine().apply {
            withParentEnvironmentType(GeneralCommandLine.ParentEnvironmentType.CONSOLE)
            withWorkDirectory(project.basePath)
            withCharset(Charsets.UTF_8)
            withExePath(lspConfiguration.executablePath.toString())
            withParameters("--stdio")
            withEnvironment("RUST_BACKTRACE", "1")
        }
    }

    fun queryVersion(): Version {
        val versionString = CapturingProcessHandler(GeneralCommandLine().apply {
            withParentEnvironmentType(GeneralCommandLine.ParentEnvironmentType.CONSOLE)
            withCharset(Charsets.UTF_8)
            withWorkDirectory(project.basePath)
            withExePath(lspConfiguration.executablePath.toString())
            addParameter("--version")
        }).runProcess().stdoutLines.first().split(" ")[1]
        return Version.parse(versionString)
    }
}