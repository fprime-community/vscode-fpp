package com.github.kronos3.fpp_rust.util

import com.intellij.util.ui.AnimatedIcon

suspend fun withLoader(loader: AnimatedIcon, f: suspend () -> Unit) {
    try {
        loader.isVisible = true
        loader.resume()
        f()
    } finally {
        loader.suspend()
        loader.isVisible = false
    }
}
