<!-- Plugin description -->
**FPP** is a modeling language for the F Prime Flight Software Framework.

This plugin provides language integration with Intellij plugins for FPP

## Getting Started

This extension needs the `fpp_lsp_server` executable (see below) and a valid F´ build cache.

### Language Server

When you open a `.fpp` file, the extension locates `fpp_lsp_server` automatically:

1. the FPP LSP override in the plugin settings, if you set it explicitly;
2. the workspace Python venv, discovered via the [Python core plugin](https://plugins.jetbrains.com/plugin/7322-python-community-edition)

If a venv is found but `fprime-fpp-lsp` is not installed, the extension offers to run
`pip install fprime-fpp-lsp` for you and then starts the server.

<!-- Plugin description end -->
