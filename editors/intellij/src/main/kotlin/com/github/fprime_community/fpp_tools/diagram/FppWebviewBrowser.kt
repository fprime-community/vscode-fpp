package com.github.fprime_community.fpp_tools.diagram

import com.intellij.openapi.Disposable
import com.intellij.openapi.diagnostic.thisLogger
import com.intellij.openapi.util.Disposer
import com.intellij.ui.JBColor
import com.intellij.ui.jcef.JBCefApp
import com.intellij.ui.jcef.JBCefBrowser
import com.intellij.ui.jcef.JBCefJSQuery
import com.intellij.util.concurrency.annotations.RequiresBackgroundThread
import com.intellij.util.concurrency.annotations.RequiresEdt
import org.cef.browser.CefBrowser
import org.cef.browser.CefFrame
import org.cef.handler.CefLoadHandlerAdapter
import java.io.File
import java.nio.file.Files

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
 * The bundle is extracted to a temp directory alongside a generated `index.html`
 * shell and loaded over `file://`, so Mermaid's assets resolve with a base URL.
 * Outgoing messages sent before the page signals readiness are queued and flushed
 * once the bundle has posted its initial `{type:'ready'}` message.
 */
class FppWebviewBrowser(
    parent: Disposable,
    bundleResource: String,
) : Disposable {
    /** Invoked (on the JCEF IO thread) with each JSON message string from the webview. */
    var onMessage: ((String) -> Unit)? = null

    val browser: JBCefBrowser = JBCefBrowser.createBuilder()
        .setEnableOpenDevToolsMenuItem(true)
        .build()

    private val jsQuery = JBCefJSQuery.create(browser as com.intellij.ui.jcef.JBCefBrowserBase)
    private val pending = ArrayDeque<String>()
    private var ready = false

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
        }, browser.cefBrowser)

        browser.loadURL(buildShell(bundleResource))
    }

    /**
     * Intercept the webview's initial `ready` before forwarding to the consumer.
     * Invoked on the JCEF IO thread by the [JBCefJSQuery] handler.
     */
    @RequiresBackgroundThread
    private fun handleIncoming(msg: String) {
        if (!ready && msg.contains("\"ready\"")) {
            ready = true
            flushPending()
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
        if (!ready) {
            pending.addLast(json)
            return
        }
        dispatch(json)
    }

    private fun flushPending() {
        while (pending.isNotEmpty()) {
            dispatch(pending.removeFirst())
        }
    }

    private fun dispatch(json: String) {
        val code = "window.dispatchEvent(new MessageEvent('message',{data:$json}));"
        browser.cefBrowser.executeJavaScript(code, browser.cefBrowser.url, 0)
    }

    /** Mirror the IDE's light/dark theme onto the body class the bundles inspect. */
    private fun applyTheme() {
        val cls = if (JBColor.isBright()) "vscode-light" else "vscode-dark"
        browser.cefBrowser.executeJavaScript(
            "document.body.classList.add('$cls');",
            browser.cefBrowser.url, 0,
        )
    }

    /**
     * Extract the bundle and write the `index.html` shell (with the VSCode API
     * shim) to a temp directory. Returns the `file://` URL of the shell.
     */
    private fun buildShell(bundleResource: String): String {
        val dir = Files.createTempDirectory("fpp-webview").toFile()
        dir.deleteOnExit()

        val bundle = File(dir, bundleResource)
        javaClass.getResourceAsStream("/webview/$bundleResource")
            ?.use { input -> bundle.outputStream().use { input.copyTo(it) } }
            ?: error("Webview bundle /webview/$bundleResource not found on classpath")

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

        val index = File(dir, "index.html")
        index.writeText(html)
        return index.toURI().toString()
    }

    override fun dispose() {}

    companion object {
        /** JCEF is unavailable on some JBR configurations; callers must check. */
        fun isSupported(): Boolean = JBCefApp.isSupported()

        @Suppress("unused")
        private val log = thisLogger()
    }
}
