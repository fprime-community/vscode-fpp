/*
 * Use of this source code is governed by the MIT license that can be
 * found in the LICENSE file.
 */

package com.github.kronos3.fpp_rust

import com.intellij.lexer.Lexer
import com.intellij.lexer.LexerPosition
import com.intellij.openapi.editor.colors.TextAttributesKey
import com.intellij.openapi.fileTypes.SyntaxHighlighter
import com.intellij.openapi.options.colors.AttributesDescriptor
import com.intellij.openapi.options.colors.ColorDescriptor
import com.intellij.openapi.options.colors.ColorSettingsPage
import com.intellij.openapi.util.io.StreamUtil

//class FppColorSettingsPage : ColorSettingsPage {
//    override fun getDisplayName() = FppBundle.message("settings.fpp.color.scheme.title")
//    override fun getIcon() = FppIcons.FILE
//    override fun getAttributeDescriptors() = ATTRS
//    override fun getColorDescriptors(): Array<ColorDescriptor> = ColorDescriptor.EMPTY_ARRAY
//    override fun getHighlighter() = FppHighlighter()
//    override fun getAdditionalHighlightingTagToDescriptorMap() = ANNOTATOR_TAGS
//    override fun getDemoText() = DEMO_TEXT
//
//    companion object {
//        private val ATTRS: Array<AttributesDescriptor> =
//            FppColors.entries.map { it.attributesDescriptor }.toTypedArray()
//
//        // This tags should be kept in sync with RsHighlightingAnnotator highlighting logic
//        private val ANNOTATOR_TAGS: Map<String, TextAttributesKey> =
//            FppColors.entries.associateBy({ it.name }, { it.textAttributesKey })
//
//        private val DEMO_TEXT: String by lazy {
//            // TODO: The annotations in this file should be generable, and would be more accurate for it.
//            val stream = FppColorSettingsPage::class.java.classLoader
//                .getResourceAsStream("org/rust/ide/colors/highlighterDemoText.rs")
//                ?: error("Cannot load resource `org/rust/ide/colors/highlighterDemoText.rs`")
//            stream.use {
//                StreamUtil.convertSeparators(it.reader().readText())
//            }
//        }
//    }
//}
