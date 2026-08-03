package com.github.kronos3.fpp_rust

import com.github.kronos3.fpp_rust.FppLspManager.CheckLspResult.*
import com.github.kronos3.fpp_rust.LspConfiguration.*
import com.github.kronos3.fpp_rust.settings.FppSettings
import com.github.kronos3.fpp_rust.settings.LspConfigurationType
import com.github.kronos3.fpp_rust.util.Version
import com.google.gson.JsonSyntaxException
import com.intellij.ide.util.PropertiesComponent
import com.intellij.notification.NotificationType
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.application.PathManager
import com.intellij.openapi.components.Service
import com.intellij.openapi.components.service
import com.intellij.openapi.diagnostic.logger
import com.intellij.openapi.project.Project
import com.intellij.openapi.util.SystemInfo
import com.intellij.openapi.util.io.toNioPathOrNull
import com.intellij.util.concurrency.annotations.RequiresBackgroundThread
import com.intellij.util.download.DownloadableFileService
import com.intellij.util.io.HttpRequests
import com.intellij.util.io.ZipUtil
import com.intellij.util.messages.Topic
import com.intellij.util.system.CpuArch
import com.intellij.util.system.OS
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.coroutines.withContext
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import java.io.IOException
import java.nio.file.Path
import java.nio.file.Paths
import java.util.concurrent.ConcurrentHashMap
import kotlin.io.path.Path
import kotlin.time.Duration.Companion.days
import kotlin.time.Duration.Companion.minutes

private val LOG = logger<FppLspManager>()
private const val LSP_REPO = "Kronos3/fpp-rust"
private const val LSP_GITHUB_API_URL = "https://api.github.com/repos/$LSP_REPO/releases"
private const val LSP_DOWNLOAD_BASE_URL = "https://github.com/$LSP_REPO/releases/download"
private const val LSP_RELEASE_NOTES_BASE_URL = "https://github.com/$LSP_REPO/releases/tag"
private const val USER_AGENT = "IntelliJ FPP Plugin (https://github.com/Kronos3/fpp-rust)"
private const val LATEST_INSTALLED_LSP_VERSION_KEY = "com.github.kronos3.fpp_rust.latestInstalledLspVersion"

@Suppress("PropertyName")
@Serializable
data class GitHubRelease(
    val tag_name: String, val name: String, val prerelease: Boolean, val draft: Boolean, val published_at: String
)

@Service(Service.Level.APP)
class FppLspManager(private val coroutineScope: CoroutineScope) {
    private val json = Json {
        ignoreUnknownKeys = true
        coerceInputValues = true
    }

    private var cachedVersionsList: List<Version.Semantic>? = null
    private var cacheExpirationTimeMs: Long = 0L

    // TODO (AleksandrSl 05/06/2025): Check, do I block request if they start concurrently?
    private val cacheMutex = Mutex() // To ensure thread-safe access to cache variables
    private val cacheDurationMs = 25.minutes.inWholeMilliseconds

    private val downloadLocks = ConcurrentHashMap<Version.Semantic, Mutex>()

    private suspend fun getVersionsAvailableForDownloadFromApi(project: Project?): List<Version.Semantic> {
        return try {
            val response = withContext(Dispatchers.IO) {
                HttpRequests.request(LSP_GITHUB_API_URL).accept("application/vnd.github.v3+json").userAgent(USER_AGENT)
                    // There are default timeouts in the library that make sense, so I don't have to declare my own.
                    // TODO (AleksandrSl 23/05/2025):
                    // There is a way to get the indicator from the parent coroutine,
                    // but I'm fine with the indeterminate progress bar for now.
                    .readString()
            }
            val releases: List<GitHubRelease> = json.decodeFromString(response)
            releases.filterNot { it.draft || it.prerelease }.mapNotNull {
                // Who knows what format the tags may have, let's be safe and parse what we know
                try {
                    Version.Semantic.parse(it.name)
                } catch (err: Exception) {
                    LOG.warn("Failed to parse LSP GitHub release version: ${it.name}", err)
                    null
                }
            }
            // Return errors and handle them later? So I don't need a project here.
        } catch (e: IOException) {
            LOG.warn("Failed to parse LSP GitHub release version: ${e.message}", e)
            FppNotifications.pluginNotifications().createNotification(
                FppBundle.message("fpp.notification.content.could.not.reach.lsp.github.releases"),
                NotificationType.WARNING
            ).notify(project)
            return listOf()
        } catch (e: JsonSyntaxException) {
            LOG.warn("Failed to parse LSP GitHub release version: ${e.message}", e)
            FppNotifications.pluginNotifications().createNotification(
                FppBundle.message("fpp.notification.content.bad.lsp.github.releases"), NotificationType.WARNING
            ).notify(project)
            return listOf()
        }
    }

    suspend fun getVersionsAvailableForDownload(project: Project?): List<Version.Semantic> {
        var currentVersions = cachedVersionsList // Read volatile reads once
        val currentTime = System.currentTimeMillis()

        if (currentVersions != null && currentTime < cacheExpirationTimeMs) {
            LOG.debug("Returning custom cached LSP versions.")
            return currentVersions
        }

        // Cache is invalid or expired, need to fetch.
        // Use mutex to ensure only one fetch operation happens if multiple coroutines call this concurrently.
        return cacheMutex.withLock {
            // Double-check after acquiring the lock, another coroutine might have updated the cache.
            currentVersions = cachedVersionsList
            if (currentVersions != null && System.currentTimeMillis() < cacheExpirationTimeMs) {
                LOG.debug("Returning custom cached LSP versions (after lock).")
                return@withLock currentVersions
            }

            LOG.debug("Custom cache expired or empty. Fetching new LSP versions from API.")
            val newVersions = getVersionsAvailableForDownloadFromApi(project)
            cachedVersionsList = newVersions
            cacheExpirationTimeMs = System.currentTimeMillis() + cacheDurationMs
            LOG.debug("LSP versions cache updated. Expiration: $cacheExpirationTimeMs")
            newVersions
        }
    }

    internal fun getExecutableForVersion(version: Version.Semantic): Path? {
        val executablePath = path(version).resolve(getExecutableName())
        LOG.debug("Getting executable for version: $version, $executablePath")
        if (executablePath.toFile().exists() && executablePath.toFile().canExecute()) {
            return executablePath
        }
        return null
    }

    suspend fun downloadLsp(version: Version.Semantic): DownloadResult {
        if (getInstalledVersions().contains(version)) {
            return DownloadResult.AlreadyExists(path(version))
        }

        val lock = downloadLocks.computeIfAbsent(version) { Mutex() }

        return lock.withLock {
            if (getInstalledVersions().contains(version)) {
                return@withLock DownloadResult.AlreadyExists(path(version))
            }

            try {
                val lspPlatformName = when (OS.CURRENT) {
                    OS.Windows -> "windows"
                    OS.macOS if CpuArch.isArm64() -> "macos-arm64"
                    OS.Linux if CpuArch.isArm64() -> "linux-arm64"
                    OS.macOS -> "macos-x64"
                    OS.Linux -> "linux-x64"
                    else -> throw UnsupportedOperationException("Unsupported operating system")
                }

                val lspDownloadUrl = "$LSP_DOWNLOAD_BASE_URL/$version/fpp-lsp-$lspPlatformName.zip"

                LOG.info("Downloading LSP from $lspDownloadUrl")
                val service = DownloadableFileService.getInstance()
                val descriptions = listOf(service.createFileDescription(lspDownloadUrl, "fpp-lsp-$version.zip"))
                val downloader = service.createDownloader(descriptions, FppBundle.message("fpp.lsp.downloading"))
                val downloadDirectory = downloadPath().toFile()
                val destination = path(version)

                withContext(Dispatchers.IO) {
                    val downloadResults = downloader.download(downloadDirectory)

                    for (result in downloadResults) {
                        if (result.second.downloadUrl == lspDownloadUrl) {
                            val archiveFile = result.first
                            ZipUtil.extract(Path(archiveFile.path), destination, null)
                            archiveFile.delete()

                            // Make the file executable on Unix systems
                            if (!SystemInfo.isWindows) {
                                destination.resolve(getExecutableName()).toFile().setExecutable(true)
                            }
                        } else {
                            LOG.warn("Unknown download url: ${result.second.downloadUrl}")
                        }
                    }
                }

                LOG.info("Successfully downloaded LSP to $destination")
                ApplicationManager.getApplication().messageBus.syncPublisher(TOPIC)
                    .settingsChanged(LspManagerChangedEvent.NewLspVersionDownloaded(version))
                return@withLock DownloadResult.Ok(destination)
            } catch (e: Exception) {
                return@withLock DownloadResult.Failed(e.message)
            }
        }
    }

    private fun getExecutableName(): String {
        return when {
            SystemInfo.isWindows -> "fpp_lsp_server.exe"
            else -> "fpp_lsp_server"
        }
    }

    sealed class CheckLspResult {
        data class UpdateAvailable(val version: Version.Semantic) : CheckLspResult()
        data class BinaryMissing(val version: Version.Semantic) : CheckLspResult()
        data object ReadyToUse : CheckLspResult()
        data object LspIsNotConfigured : CheckLspResult()
    }

    // Temporary path to store the downloaded files before they are moved to the target directory.
    private fun downloadPath(): Path = Paths.get(PathManager.getTempPath())

    // Get a directory where a specific version of LSP lies
    private fun path(version: Version.Semantic): Path = lspStorageDirPath.resolve(versionToDirName(version))

    private fun versionToDirName(version: Version.Semantic): String =
        "${version.major}_${version.minor}_${version.patch}"

    sealed class DownloadResult {
        class Ok(val baseDir: Path) : DownloadResult()
        class AlreadyExists(val baseDir: Path) : DownloadResult()
        class Failed(val message: String?) : DownloadResult()
    }

    // I want to check that LSP binary is downloaded according to the settings. If the binary is not there, I want to show the notification.
    // I want to check it only once before the LSP is started the first time or a project is open (in this case, it would be good to know it's a luau project).
    suspend fun checkLsp(lspVersion: Version): CheckLspResult {
        val versionsForDownload = getVersionsAvailableForDownload(null)
        val installedVersions = getInstalledVersions()
        val checkResult = checkLsp(
            lspVersion,
            installedVersions = installedVersions,
            versionsAvailableForDownload = versionsForDownload
        )
        LOG.debug("Check LSP result: $checkResult")
        return checkResult
    }

    interface LspManagerChangeListener {
        fun settingsChanged(event: LspManagerChangedEvent)
    }

    sealed class LspManagerChangedEvent {
        data class NewLspVersionDownloaded(val version: Version.Semantic) : LspManagerChangedEvent()
    }

    companion object {
        @JvmStatic
        fun getInstance(): FppLspManager = service()

        internal fun updateLatestInstalledVersionCache(version: Version.Semantic) {
            latestInstalledLspVersionCache = version
        }

        @Topic.AppLevel
        val TOPIC = Topic.create(
            "LSP manager updates", LspManagerChangeListener::class.java
        )

        fun checkLsp(
            currentVersion: Version,
            installedVersions: List<Version.Semantic>,
            versionsAvailableForDownload: List<Version.Semantic>,
        ): CheckLspResult {
            return when (currentVersion) {
                is Version.Latest -> {
                    val latestVersion = versionsAvailableForDownload.max()
                    if (installedVersions.isEmpty()) {
                        BinaryMissing(latestVersion)
                    } else {
                        val latestInstalledVersion = installedVersions.max()
                        if (latestVersion > latestInstalledVersion) UpdateAvailable(latestVersion) else {
                            if (latestInstalledVersion != latestInstalledLspVersionCache) {
                                // I returned this as an update cache result before, but I don't think it makes sense to pass to the outside world, since it's an implementation detail.
                                updateLatestInstalledVersionCache(latestInstalledVersion)
                                ReadyToUse
                            } else ReadyToUse
                        }
                    }
                }

                is Version.Semantic -> if (installedVersions.contains(currentVersion)) ReadyToUse
                else BinaryMissing(currentVersion)
            }
        }

        internal var latestInstalledLspVersionCache: Version.Semantic?
            get() = PropertiesComponent.getInstance().getValue(LATEST_INSTALLED_LSP_VERSION_KEY)
                ?.let { Version.Semantic.parse(it) }
            private set(value) {
                PropertiesComponent.getInstance().setValue(LATEST_INSTALLED_LSP_VERSION_KEY, value.toString())
            }

        @RequiresBackgroundThread
        fun getInstalledVersions(): List<Version.Semantic> {
            return try {
                lspStorageDirPath.toFile().list()?.mapNotNull {
                    try {
                        dirNameToVersion(it)
                    } catch (_: IllegalArgumentException) {
                        // Well, macOS adds the DS_Store folder in the directory,
                        // who knows what else we may have, let's ignore errors parsing the name
                        null
                    }
                }?.sorted() ?: emptyList()
            } catch (e: Exception) {
                LOG.error("Failed to get LSP versions from disk. Basepath: ${lspStorageDirPath}. Error:", e)
                emptyList()
            }
        }

        @RequiresBackgroundThread
        internal fun getLatestInstalledLspVersion(): Version.Semantic? {
            return getInstalledVersions().maxOrNull()?.also {
                latestInstalledLspVersionCache = it
            }
        }

        fun composeReleaseNotesUrl(version: Version.Semantic): String {
            return "${LSP_RELEASE_NOTES_BASE_URL}/${version}"
        }

        val basePath: Path
            // As per https://platform.jetbrains.com/t/is-there-a-special-place-where-plugin-can-store-binaries-that-are-shared-between-different-ides/2120 the config dir should be copied when the IDE is updated.
            get() = PathManager.getConfigDir().resolve("intellij-luau")

        // Directory with all the LSPs
        val lspStorageDirPath: Path
            get() = basePath.resolve("lsp")
    }
}

private fun dirNameToVersion(dirName: String): Version.Semantic {
    return try {
        val parts = dirName.split('_')
        Version.Semantic(parts[0].toInt(), parts[1].toInt(), parts[2].toInt())
    } catch (e: Exception) {
        throw IllegalArgumentException("Invalid directory name: $dirName", e)
    }
}

@RequiresBackgroundThread
fun Project.getLspConfiguration(): LspConfiguration {
    val settings = FppSettings.getInstance(this)
    return when (settings.lspConfigurationType) {
        LspConfigurationType.Auto -> Auto(this)
        LspConfigurationType.Manual -> Manual(this)
        LspConfigurationType.Disabled -> LspConfiguration.Disabled
    }
}

// Lightweight hack to get the LSP version for the Auto configuration.
// The cache should be populated 99% of the time.
// Can be removed when LSP versions with server info are highly adopted.
fun Project.getAutoLspVersion(): Version.Semantic? {
    val settings = FppSettings.getInstance(this)
    if (settings.lspConfigurationType == LspConfigurationType.Auto) {
        return settings.lspVersion.let { it as? Version.Semantic ?: FppLspManager.latestInstalledLspVersionCache }
    }
    return null
}

sealed class LspConfiguration {
    // Escape hatch to run LspCli for a non-saved setting.
    class ForSettings(
        project: Project, override val executablePath: Path?, override val isReady: Boolean
    ) : Enabled(project)

    class Manual(project: Project) : Enabled(project) {
        override val executablePath: Path?
            get() {
                return settings.lspPath.toNioPathOrNull()
            }
        override val isReady: Boolean = true
    }

    class Auto(project: Project) : Enabled(project) {
        // The cache should be set when LSP is downloaded the first time,
        // after that I assume that if LSP is missing, it's an error, so we should try to run it and throw.
        val version: Version.Semantic? = settings.lspVersion.let {
            it as? Version.Semantic ?: FppLspManager.getLatestInstalledLspVersion()
        }

        override val isReady: Boolean
            get() = version != null
        override val executablePath: Path?
            get() = version?.let { FppLspManager.getInstance().getExecutableForVersion(it) }
    }

    sealed class Enabled(val project: Project) : LspConfiguration() {
        abstract val executablePath: Path?
        abstract val isReady: Boolean
        protected val settings
            get() = FppSettings.getInstance(project)
    }

    data object Disabled : LspConfiguration()
}
