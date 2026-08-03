package com.github.kronos3.fpp_rust.settings

import com.github.kronos3.fpp_rust.FppCliService

import com.intellij.openapi.options.Configurable
import com.intellij.openapi.project.Project
import com.intellij.openapi.util.NlsContexts
import com.intellij.util.messages.Topic
import com.jetbrains.rd.framework.base.deepClonePolymorphic
import javax.swing.JComponent
import kotlin.reflect.KProperty1


/**
 * Provides controller functionality for application settings.
 */
class FppSettingsConfigurable(private val project: Project) : Configurable {
    private var component: ProjectSettingsComponent? = null
    private val settings = FppSettings.getInstance(project)

    override fun getDisplayName(): @NlsContexts.ConfigurableName String {
        return "FPP: Settings"
    }

    override fun getPreferredFocusedComponent(): JComponent {
        return component!!.preferredFocusedComponent
    }

    override fun createComponent(): JComponent? {
        component = ProjectSettingsComponent(
            FppCliService.getInstance(project),
            settings,
            project,
            ::applyAndSaveAsDefault
        )
        return component!!.panel
    }

    private fun applyAndSaveAsDefault() {
        apply()
        FppDefaultSettingsState.getInstance().save(settings.state)
    }

    override fun isModified(): Boolean {
        return component?.panel?.isModified() ?: false
    }

    override fun apply() {
        val oldState = settings.state.deepClonePolymorphic()
        component?.panel?.apply()
        val event = SettingsChangedEvent(
            oldState,
            settings.state
        )
        notifySettingsChanged(event)
    }

    override fun reset() {
        component?.panel?.reset()
    }

    override fun disposeUIResources() {
        component = null
    }

    interface SettingsChangeListener {
        fun settingsChanged(event: SettingsChangedEvent)
    }

    private fun notifySettingsChanged(event: SettingsChangedEvent) {
        project.messageBus.syncPublisher(TOPIC).settingsChanged(event)
    }

    class SettingsChangedEvent(val oldState: FppSettings.State, val newState: FppSettings.State) {
        /** Use it like `event.isChanged(State::foo)` to check whether `foo` property is changed or not */
        fun isChanged(prop: KProperty1<FppSettings.State, *>): Boolean = prop.get(oldState) != prop.get(newState)
    }

    companion object {
        const val CONFIGURABLE_ID = "settings.fpp"
        @Topic.ProjectLevel
        val TOPIC = Topic.create(
            "FPP settings changes",
            SettingsChangeListener::class.java,
            Topic.BroadcastDirection.TO_PARENT
        )
    }
}

