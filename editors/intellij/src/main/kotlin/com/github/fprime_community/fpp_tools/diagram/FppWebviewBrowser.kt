package com.github.fprime_community.fpp_tools.diagram

import com.intellij.ide.ui.LafManagerListener
import com.intellij.openapi.Disposable
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.diagnostic.thisLogger
import com.intellij.openapi.util.Disposer
import com.intellij.ui.JBColor
import com.intellij.ui.jcef.JBCefApp
import com.intellij.ui.jcef.JBCefBrowser
import com.intellij.ui.jcef.JBCefBrowserBase
import com.intellij.ui.jcef.JBCefJSQuery
import com.intellij.util.concurrency.AppExecutorUtil
import com.intellij.util.concurrency.annotations.RequiresBackgroundThread
import com.intellij.util.concurrency.annotations.RequiresEdt
import org.cef.browser.CefBrowser
import org.cef.browser.CefFrame
import org.cef.handler.CefLoadHandler
import org.cef.handler.CefLoadHandlerAdapter
import java.nio.file.FileSystems
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption
import java.util.concurrent.TimeUnit
import kotlin.io.path.*

/**
 * Hosts one of the shared VSCode webview bundles (e.g. `sm-webview.js`) inside a
 * JCEF browser, providing the small `acquireVsCodeApi()` shim the bundles expect.
 *
 * The bundles were written for VSCode: they call `acquireVsCodeApi()`, post
 * messages to the host with `postMessage`, and receive host messages as `message`
 * window events. This class recreates that contract with no changes to the
 * bundle:
 *
 *  - webview -> host: the injected `acquireVsCodeApi().postMessage` forwards the
 *    JSON string to a [JBCefJSQuery] handler, surfaced via [onMessage].
 *  - host -> webview: [postMessage] dispatches a `MessageEvent` on `window`.
 *
 * The whole `/webview/` resource directory is extracted to a temp directory
 * alongside a generated `index.html` shell and loaded over `file://`, so both the
 * entry bundle and Mermaid's dynamically-imported chunk siblings (`*.sm-webview.js`)
 * resolve against the page's base URL. Outgoing messages sent before the page
 * signals readiness are queued and flushed once the bundle has posted its initial
 * `{type:'ready'}` message.
 */
class FppWebviewBrowser(
    parent: Disposable,
    bundleResource: String,
) : Disposable {
    /** Invoked (on the JCEF IO thread) with each JSON message string from the webview. */
    var onMessage: ((String) -> Unit)? = null

    /**
     * Invoked (on the EDT) if the bundle fails to load or never signals readiness.
     * Lets the host surface a fallback state instead of silently queueing forever.
     */
    var onLoadError: ((String) -> Unit)? = null

    val browser: JBCefBrowser = JBCefBrowser.createBuilder()
        .setEnableOpenDevToolsMenuItem(true)
        .build()

    private val jsQuery = JBCefJSQuery.create(browser as JBCefBrowserBase)

    /** Lock for [pending], [ready], and [failed]. */
    private val lock = Any()
    private val pending = ArrayDeque<String>()
    private var ready = false
    private var failed = false

    init {
        Disposer.register(parent, this)
        Disposer.register(this, browser)
        Disposer.register(this, jsQuery)

        jsQuery.addHandler { msg ->
            handleIncoming(msg)
            null
        }

        browser.jbCefClient.addLoadHandler(object : CefLoadHandlerAdapter() {
            override fun onLoadEnd(cefBrowser: CefBrowser?, frame: CefFrame?, httpStatusCode: Int) {
                applyTheme()
            }

            override fun onLoadError(
                cefBrowser: CefBrowser?,
                frame: CefFrame?,
                errorCode: CefLoadHandler.ErrorCode?,
                errorText: String?,
                failedUrl: String?,
            ) {
                // Ignore sub-resource aborts; only the main frame failing is fatal.
                if (frame?.isMain != true) return
                fail("Failed to load diagram view: ${errorText ?: errorCode}")
            }
        }, browser.cefBrowser)

        // Follow live IDE theme switches: re-apply the body class on LAF change.
        ApplicationManager.getApplication().messageBus.connect(this)
            .subscribe(LafManagerListener.TOPIC, LafManagerListener { applyTheme() })

        // If the bundle never posts `ready` (e.g. a script error before its
        // listener installs), queued messages would hang forever. Time out and
        // report so the host can fall back.
        AppExecutorUtil.getAppScheduledExecutorService().schedule({
            val stuck = synchronized(lock) { !ready && !failed }
            if (stuck) fail("Diagram view did not initialize in time")
        }, READY_TIMEOUT_SECONDS, TimeUnit.SECONDS)

        browser.loadURL(buildShell(bundleResource))
    }

    /** Mark the view as failed, drop any queued messages, and notify the host once. */
    private fun fail(message: String) {
        val firstFailure = synchronized(lock) {
            if (ready || failed) return
            failed = true
            pending.clear()
            true
        }
        if (firstFailure) {
            ApplicationManager.getApplication().invokeLater { onLoadError?.invoke(message) }
        }
    }

    /**
     * Intercept the webview's initial `ready` before forwarding to the consumer.
     * Invoked on the JCEF IO thread by the [JBCefJSQuery] handler.
     */
    @RequiresBackgroundThread
    private fun handleIncoming(msg: String) {
        if (msg.contains("\"ready\"")) {
            val toFlush: List<String> = synchronized(lock) {
                if (!ready) {
                    ready = true
                    ArrayList(pending).also { pending.clear() }
                } else emptyList()
            }
            toFlush.forEach(::dispatch)
        }
        onMessage?.invoke(msg)
    }

    /**
     * Post a message to the webview (delivered as a `window` `message` event).
     * Called on the EDT from the panel; [JBCefBrowser.getCefBrowser]'s
     * `executeJavaScript` is itself thread-safe.
     */
    @RequiresEdt
    fun postMessage(json: String) {
        synchronized(lock) {
            if (!ready) {
                pending.addLast(json)
                return
            }
        }
        dispatch(json)
    }

    private fun dispatch(json: String) {
        val code = "window.dispatchEvent(new MessageEvent('message',{data:$json}));"
        browser.cefBrowser.executeJavaScript(code, browser.cefBrowser.url, 0)
    }

    /** Mirror the IDE's light/dark theme onto the body class the bundles inspect. */
    private fun applyTheme() {
        val bright = JBColor.isBright()
        browser.cefBrowser.executeJavaScript(
            "document.body.classList.toggle('vscode-light', $bright);" +
                    "document.body.classList.toggle('vscode-dark', ${!bright});",
            browser.cefBrowser.url, 0,
        )
    }

    /**
     * Extract the whole `/webview/` resource directory and write the `index.html`
     * shell (with the VSCode API shim) to a temp directory. Returns the `file://`
     * URL of the shell.
     */
    private fun buildShell(bundleResource: String): String {
        val dir = Files.createTempDirectory("fpp-webview")
        dir.toFile().deleteOnExit()

        extractWebviewResources(dir)
        if (!(dir / bundleResource).exists()) {
            error("Webview bundle /webview/$bundleResource not found on classpath")
        }

        // `jsQuery.inject("payload")` expands to the JS that ships the value of the
        // `payload` argument back to the Kotlin handler.
        val postToHost = jsQuery.inject("payload")
        val html = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, height=device-height">
              <style>
                html, body { margin: 0; height: 100%; width: 100%; overflow: hidden; }
                #container { height: 100vh; width: 100vw; }
              </style>
            </head>
            <body>
              <!-- The shared sm-webview bundle renders into #container; it must
                   exist before the bundle script runs (it resolves it eagerly). -->
              <div id="container"></div>
              <script>
                (function () {
                  const api = {
                    postMessage: function (msg) {
                      const payload = JSON.stringify(msg);
                      $postToHost
                    },
                    getState: function () { return undefined; },
                    setState: function () {}
                  };
                  window.acquireVsCodeApi = function () { return api; };
                })();
              </script>
              <script src="$bundleResource"></script>
            </body>
            </html>
        """.trimIndent()

        return (dir / "index.html").apply { writeText(html) }.toUri().toString()
    }

    /**
     * Copy every file under the `/webview/` classpath resource into [dir],
     * flattened (the directory holds no nested folders). Handles both the
     * jar-packaged plugin and the exploded on-disk layout used by `runIde`.
     */
    private fun extractWebviewResources(dir: Path) {
        val root = javaClass.getResource("/webview")
            ?: error("Webview resource directory /webview not found on classpath")

        when (root.protocol) {
            "jar" -> {
                val uri = root.toURI()
                val jarFileSystem = try {
                    FileSystems.getFileSystem(uri)
                } catch (_: Exception) {
                    FileSystems.newFileSystem(uri, emptyMap<String, Any>())
                }
                jarFileSystem.getPath("webview").listDirectoryEntries().forEach { file ->
                    if (Files.isRegularFile(file)) {
                        Files.copy(file, dir / file.name, StandardCopyOption.REPLACE_EXISTING)
                    }
                }
            }

            "file" -> {
                Path.of(root.toURI()).listDirectoryEntries().forEach { file ->
                    if (Files.isRegularFile(file)) {
                        Files.copy(file, dir / file.name, StandardCopyOption.REPLACE_EXISTING)
                    }
                }
            }

            else -> error("Unsupported webview resource protocol: ${root.protocol}")
        }
    }

    override fun dispose() {}

    companion object {
        /** How long to wait for the bundle's `ready` before declaring load failure. */
        private const val READY_TIMEOUT_SECONDS = 15L

        /** JCEF is unavailable on some JBR configurations; callers must check. */
        fun isSupported(): Boolean = JBCefApp.isSupported()

        @Suppress("unused")
        private val log = thisLogger()
    }
}
