package com.github.fprime_community.fpp_tools.util

private val versionRegex = Regex("""v?(\d+)\.(\d+)\.(\d+)(?:-a(\d+))?""")

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
                            // The alpha group is optional; `groups[4]` is null when absent,
                            // whereas `groupValues[4]` would be an empty string.
                            match.groups[4]?.value?.toInt(),
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