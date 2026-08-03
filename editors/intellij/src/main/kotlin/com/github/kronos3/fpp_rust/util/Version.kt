package com.github.kronos3.fpp_rust.util

private val versionRegex = Regex("""(\d+)\.(\d+)\.(\d+)(?:-a(\d+))?""")

sealed class Version : Comparable<Version> {
    data class Semantic(
        val major: Int, val minor: Int, val patch: Int, val alpha: Int? = null,
    ) : Version() {
        override fun toString(): String {
            return if (alpha != null) {
                "$major.$minor.${patch}-a$alpha"
            } else {
                "$major.$minor.$patch"
            }
        }
        override fun compareTo(other: Version): Int {
            return when (other) {
                is Semantic -> compareValuesBy(this, other, { it.major }, { it.minor }, { it.patch })
                Latest -> -1
            }
        }

        companion object {
            fun parse(version: String): Semantic {
                val match = versionRegex.matchEntire(version)
                if (match != null) {
                    return try {
                        Semantic(
                            match.groupValues[1].toInt(), match.groupValues[2].toInt(), match.groupValues[3].toInt(),
                            match.groupValues.getOrNull(4)?.toInt(),
                        )
                    } catch (_: Exception) {
                        throw MalformedSemanticVersionException(version)
                    }
                } else throw MalformedSemanticVersionException(version)
            }
        }
    }

    data object Latest : Version() {
        override fun toString(): String = "Latest"
        override fun compareTo(other: Version): Int {
            return when (other) {
                is Latest -> -1
                else -> 1
            }
        }
    }

    companion object {
        fun parse(version: String): Version = if (version == Latest.toString()) Latest else Semantic.parse(version)
    }
}

class MalformedSemanticVersionException(version: String) : Exception("Malformed semantic version: $version")