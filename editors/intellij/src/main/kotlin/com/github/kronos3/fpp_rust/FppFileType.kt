package com.github.kronos3.fpp_rust

import com.intellij.openapi.fileTypes.LanguageFileType
import org.jetbrains.annotations.Nls
import javax.swing.Icon

class FppFileType private constructor() : LanguageFileType(FppLanguage.INSTANCE) {
    override fun getName(): String {
        return "FPP"
    }

    override fun getDescription(): String {
        return "FPP (F Prime modeling language)"
    }

    override fun getDefaultExtension(): String {
        return "fpp"
    }

    override fun getIcon(): Icon {
        return FppIcons.FILE
    }

    companion object {
        val INSTANCE: FppFileType = FppFileType()
    }
}

class FppiFileType private constructor() : LanguageFileType(FppLanguage.INSTANCE, true) {
    override fun getName(): String {
        return "FPPI"
    }

    override fun getDisplayName(): @Nls String {
        return "FPP Include"
    }

    override fun getDescription(): String {
        return "FPP (F Prime modeling language included file)"
    }

    override fun getDefaultExtension(): String {
        return "fppi"
    }

    override fun getIcon(): Icon {
        return FppIcons.FILE
    }

    companion object {
        val INSTANCE: FppiFileType = FppiFileType()
    }
}
