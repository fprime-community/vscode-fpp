package com.github.fprime_community.fpp_tools

import com.intellij.openapi.components.Service
import com.intellij.openapi.components.service
import com.intellij.openapi.project.Project
import kotlinx.coroutines.CoroutineScope

@Service(Service.Level.PROJECT)
class FppCliService(
    private val project: Project,
    val coroutineScope: CoroutineScope
) {
    companion object {
        @JvmStatic
        fun getInstance(project: Project): FppCliService = project.service()
    }
}
