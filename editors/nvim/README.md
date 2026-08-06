# FPP for Neovim

Neovim integration for the [F Prime Prime (FPP)](https://github.com/fprime-community/fpp-tools)
language server. Provides diagnostics, hover, go-to-definition, semantic
highlighting, and completion by connecting to `fpp_lsp_server` over stdio.

Built on Neovim's built-in LSP client — no external plugins required.

## Requirements

- Neovim >= 0.11
- The FPP language server executable, `fpp_lsp_server`, from the
  [`fprime-fpp-lsp`](https://pypi.org/project/fprime-fpp-lsp/) pip package:

  ```sh
  pip install fprime-fpp-lsp
  ```

  This installs the `fpp_lsp_server` console script into your virtual
  environment's `bin/` directory.

## Installation

### lazy.nvim

```lua
{
  dir = "/path/to/fpp-tools/editors/nvim",
  config = function()
    require("fpp").setup({
      -- Absolute path to the executable inside your venv.
      server_path = "/path/to/venv/bin/fpp_lsp_server",
    })
  end,
}
```

### From a release tarball

Each GitHub release attaches an `fpp-nvim-<tag>.tar.gz`. Extract it onto your
`runtimepath`:

```sh
mkdir -p ~/.local/share/nvim/site/pack/fpp/start
tar -xzf fpp-nvim-<tag>.tar.gz -C ~/.local/share/nvim/site/pack/fpp/start
```

Then call `require("fpp").setup({ ... })` from your `init.lua` (see below).

### Manual

Copy or symlink `editors/nvim` onto your `runtimepath`, then in your `init.lua`:

```lua
require("fpp").setup({
  server_path = "/path/to/venv/bin/fpp_lsp_server",
})
```

## Configuration

`require("fpp").setup(opts)` accepts:

| Option         | Default            | Description                                                   |
| -------------- | ------------------ | ------------------------------------------------------------- |
| `server_path`  | `"fpp_lsp_server"` | Path to the `fpp_lsp_server` executable.                      |
| `log_level`    | `"error"`          | Server log level: `debug`, `info`, `warn`, `error`, `off`.    |
| `root_markers` | `{ "locs.fpp", ".git" }` | Files marking the workspace root, in priority order.    |

### LSP executable path

Every FPP editor plugin follows the same convention: the language server is
launched as `fpp_lsp_server --stdio`, resolved from a single user-configured
absolute path pointing at the `fprime-fpp-lsp` pip package's console script
inside your virtual environment. Automatic discovery (walking up for a venv,
`$VIRTUAL_ENV`, `$PATH`) is a possible future enhancement; for now set
`server_path` explicitly.

## Project configuration (`.fpp-lsp`)

Project setup — which `locs.fpp` to index, or whether to scan the whole workspace
— lives in a `.clangd`-style `.fpp-lsp` YAML file at your workspace root. The
language server discovers and loads it automatically (and reloads when it changes),
so there is nothing editor-specific to configure. Example:

```yaml
# .fpp-lsp
buildCache: build-fprime-automatic-native   # server resolves <buildCache>/locs.fpp
```

See [`docs/fpp-lsp-config.md`](../../docs/fpp-lsp-config.md) for the full schema.

## Commands

| Command               | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `:FppReloadWorkspace` | Re-run project discovery (re-reads `.fpp-lsp`).      |

## Semantic highlighting

The server emits FPP-specific semantic token types (`component`, `topology`,
`port`, `command`, `event`, `telemetry`, etc.). Neovim maps these to
`@lsp.type.<name>` highlight groups automatically. Link them to your colorscheme
if you want custom colors, e.g.:

```lua
vim.api.nvim_set_hl(0, "@lsp.type.component", { link = "Structure" })
vim.api.nvim_set_hl(0, "@lsp.type.topology", { link = "Type" })
```
