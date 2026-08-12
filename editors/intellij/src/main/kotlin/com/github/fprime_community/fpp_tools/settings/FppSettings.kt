package com.github.fprime_community.fpp_tools.settings

import com.intellij.openapi.components.PersistentStateComponent
import com.intellij.openapi.components.State
import com.intellij.openapi.components.Service
import com.intellij.openapi.components.Storage
import com.intellij.openapi.components.StoragePathMacros
import com.intellij.openapi.project.Project

@Service(Service.Level.PROJECT)
@State(name = "FppSettings", storages = [Storage(StoragePathMacros.WORKSPACE_FILE)])
class FppSettings(val project: Project) : PersistentStateComponent<FppSettings.State> {
    class State(
        var lspPath: String = "",
    )

    private var internalState: State = State()

    var lspPath: String
        get() = internalState.lspPath
        set(value) {
            internalState.lspPath = value
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
