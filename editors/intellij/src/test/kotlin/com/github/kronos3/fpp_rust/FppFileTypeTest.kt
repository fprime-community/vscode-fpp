package com.github.kronos3.fpp_rust

import com.intellij.codeInsight.CodeInsightSettings
import com.intellij.openapi.fileTypes.FileTypeManager
import com.intellij.testFramework.fixtures.BasePlatformTestCase

/**
 * Verifies that the `.fpp` / `.fppi` file types declared in plugin.xml are
 * registered and backed by the FPP language.
 */
class FppFileTypeTest : BasePlatformTestCase() {
    private val fileTypeManager get() = FileTypeManager.getInstance()

    override fun tearDown() {
        // Platform 2026.2 flips AUTO_POPUP_JAVADOC_INFO on during fixture startup,
        // which trips BasePlatformTestCase's "settings not damaged" teardown check.
        // Restore the default before the framework validates it.
        try {
            CodeInsightSettings.getInstance().AUTO_POPUP_JAVADOC_INFO = false
        } finally {
            super.tearDown()
        }
    }

    fun testFppExtensionMapsToFppFileType() {
        val fileType = fileTypeManager.getFileTypeByExtension("fpp")
        assertInstanceOf(fileType, FppFileType::class.java)
    }

    fun testFppiExtensionMapsToFppiFileType() {
        val fileType = fileTypeManager.getFileTypeByExtension("fppi")
        assertInstanceOf(fileType, FppiFileType::class.java)
    }

    fun testFileTypesUseFppLanguage() {
        assertEquals(FppLanguage.INSTANCE, FppFileType.INSTANCE.language)
        assertEquals(FppLanguage.INSTANCE, FppiFileType.INSTANCE.language)
    }

    fun testFppLanguageId() {
        assertEquals("fpp", FppLanguage.INSTANCE.id)
    }
}
