package com.github.fprime_community.fpp_tools.util

import org.junit.Assert.assertEquals
import org.junit.Assert.assertThrows
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Unit tests for [Version] parsing, formatting, and ordering. These are plain
 * JUnit tests — no IntelliJ Platform fixture required.
 */
class VersionTest {
    @Test
    fun parsesSemanticVersion() {
        val v = Version.Semantic.parse("1.2.3")
        assertEquals(Version.Semantic(1, 2, 3), v)
        assertEquals("1.2.3", v.toString())
    }

    @Test
    fun parsesAlphaVersion() {
        val v = Version.Semantic.parse("0.1.0-a5")
        assertEquals(Version.Semantic(0, 1, 0, 5), v)
        assertEquals("0.1.0-a5", v.toString())
    }

    @Test
    fun parsesLatestSentinel() {
        assertEquals(Version.Latest, Version.parse("Latest"))
    }

    @Test
    fun roundTripsThroughToString() {
        for (s in listOf("1.0.0", "10.20.30", "2.5.1-a12")) {
            assertEquals(s, Version.Semantic.parse(s).toString())
        }
    }

    @Test
    fun rejectsMalformedVersions() {
        for (bad in listOf("", "1", "1.2", "1.2.x", "v1.2.3", "1.2.3.4")) {
            assertThrows(MalformedSemanticVersionException::class.java) {
                Version.Semantic.parse(bad)
            }
        }
    }

    @Test
    fun ordersSemanticVersions() {
        assertTrue(Version.Semantic.parse("1.0.0") < Version.Semantic.parse("1.0.1"))
        assertTrue(Version.Semantic.parse("1.2.0") < Version.Semantic.parse("2.0.0"))
        assertTrue(Version.Semantic.parse("1.2.3") < Version.Semantic.parse("1.3.0"))
    }

    @Test
    fun latestComparesAsNewest() {
        // Any concrete semantic version sorts before Latest.
        assertTrue(Version.Semantic.parse("99.99.99") < Version.Latest)
        assertEquals(Version.Latest, maxOf(Version.Semantic.parse("1.0.0"), Version.Latest))
    }
}
