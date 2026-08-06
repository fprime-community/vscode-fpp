package com.github.kronos3.fpp_rust.settings

import com.intellij.ide.util.PropertiesComponent
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.components.*
import com.intellij.openapi.diagnostic.logger
import com.intellij.util.xmlb.XmlSerializerUtil

private val LOG = logger<FppDefaultSettingsState>()

private const val DEFAULT_SETTINGS_SET_KEY = "defaultSettingsSet"

@Service(Service.Level.APP)
@State(
    name = "fppDefaultSettings",
    // TODO (AleksandrSl 19/06/2025): Why did I make it non roamable?
    storages = [Storage(StoragePathMacros.NON_ROAMABLE_FILE)]
)
class FppDefaultSettingsState : PersistentStateComponent<FppSettings.State> {
    private var internalState = FppSettings.State()

    override fun getState(): FppSettings.State {
        return internalState
    }

    override fun loadState(state: FppSettings.State) {
        XmlSerializerUtil.copyBean(state, internalState)
    }

    fun save(state: FppSettings.State) {
        internalState = state
        val propertiesComponent = PropertiesComponent.getInstance()
        propertiesComponent.setValue(DEFAULT_SETTINGS_SET_KEY, true)
    }

    val hasDefaultSettings
        get() = PropertiesComponent.getInstance().getBoolean(DEFAULT_SETTINGS_SET_KEY, false)

    companion object {
        fun getInstance(): FppDefaultSettingsState =
            ApplicationManager.getApplication().getService(FppDefaultSettingsState::class.java)
    }
}
