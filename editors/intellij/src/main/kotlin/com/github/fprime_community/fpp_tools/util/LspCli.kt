package com.github.fprime_community.fpp_tools.util

import com.github.fprime_community.fpp_tools.LspConfiguration
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

    fun queryVersion(): Result<Version> {
        val processOutput = CapturingProcessHandler(GeneralCommandLine().apply {
            withParentEnvironmentType(GeneralCommandLine.ParentEnvironmentType.CONSOLE)
            withCharset(Charsets.UTF_8)
            withWorkDirectory(project.basePath)
            withExePath(lspConfiguration.executablePath.toString())
            addParameter("--version")
        }).runProcess(1000)

        if (processOutput.isTimeout) {
            return Result.failure(IllegalStateException("Version query timed out"))
        }
        if (processOutput.exitCode != 0) {
            return Result.failure(IllegalStateException("Process exited with code ${processOutput.exitCode}"))
        }
        if (processOutput.stdoutLines.isEmpty()) {
            return Result.failure(IllegalStateException("No output from version query"))
        }

        return Result.runCatching { Version.parse(processOutput.stdoutLines.first().split(" ")[1]) }
    }
}