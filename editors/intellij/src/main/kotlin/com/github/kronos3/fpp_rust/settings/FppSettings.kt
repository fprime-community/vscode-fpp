package com.github.kronos3.fpp_rust.settings

import com.github.kronos3.fpp_rust.util.Version
import com.intellij.openapi.components.PersistentStateComponent
import com.intellij.openapi.components.State
import com.intellij.openapi.components.Service
import com.intellij.openapi.components.Storage
import com.intellij.openapi.components.StoragePathMacros
import com.intellij.openapi.project.Project

enum class LspConfigurationType {
    Disabled, Auto, Manual,
}

sealed class FppProject {
    data class LocsFile(val uri: String) : FppProject()
    data class EntireWorkspace(val uri: String) : FppProject()
}

@Service(Service.Level.PROJECT)
@State(name = "FppSettings", storages = [Storage(StoragePathMacros.WORKSPACE_FILE)])
class FppSettings(val project: Project) : PersistentStateComponent<FppSettings.State> {
    class State(
        var lspVersion: String? = null,
        var lspConfigurationType: LspConfigurationType = LspConfigurationType.Auto,
        var lspPath: String = "",
        var project: FppProject? = null
    )

    private var internalState: State = State()

    var lspPath: String
        get() = internalState.lspPath
        set(value) {
            internalState.lspPath = value
        }

    var lspVersion: Version?
        get() = internalState.lspVersion?.let { Version.parse(it) }
        set(value) {
            internalState.lspVersion = value?.toString()
        }

    var lspConfigurationType: LspConfigurationType
        get() = internalState.lspConfigurationType
        set(value) {
            internalState.lspConfigurationType = value
        }

    override fun getState() = internalState
    override fun loadState(state: State) {
        internalState = state
    }

    companion object {
        fun getInstance(project: Project): FppSettings =
            project.getService(FppSettings::class.java)
    }
}