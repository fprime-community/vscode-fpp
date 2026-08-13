<!-- Plugin description -->
**FPP** is a modeling language for the F Prime Flight Software Framework.

This plugin provides language integration with Intellij plugins for FPP

## Getting Started

This extension needs the `fpp_lsp_server` executable (see below) and a valid F´ build cache.

### Opening a Project

CLion may not automatically detect the venv in your F´ project.
You can manually set the Python interpreter in **CLion > Settings > Build, Execution, Deployment > Python Interpreter**
to point to the venv in your F´ project.

### Language Server

When you open a `.fpp` file, the extension locates `fpp_lsp_server` automatically:

1. the FPP LSP override in the plugin settings, if you set it explicitly;
2. the workspace Python venv, discovered via the [Python core plugin](https://plugins.jetbrains.com/plugin/7322-python-community-edition)

If a venv is found but `fprime-fpp-lsp` is not installed, the extension offers to run
`pip install fprime-fpp-lsp` for you and then starts the server.

The **FPP Language Service** widget item (in the status bar on the bottom right)
shows the current LSP binary and several actions. Click **Open Settings** to provide a custom executable.

For venv installs, the extension will prompt to update the `fprime-fpp-lsp` package when a new version is available on PyPI.

<!-- Plugin description end -->
