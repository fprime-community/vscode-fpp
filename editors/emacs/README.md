# FPP for Emacs

Emacs integration for the [F Prime Prime (FPP)](https://github.com/fprime-community/fpp-tools)
language server. Provides a `fpp-mode` major mode and connects it to
`fpp_lsp_server` over stdio using the built-in [`eglot`](https://www.gnu.org/software/emacs/manual/html_mono/eglot.html)
client — no external packages required.

## Requirements

- Emacs >= 29.1 (ships with `eglot`)
- The FPP language server executable, `fpp_lsp_server`, from the
  [`fprime-fpp-lsp`](https://pypi.org/project/fprime-fpp-lsp/) pip package:

  ```sh
  pip install fprime-fpp-lsp
  ```

  This installs the `fpp_lsp_server` console script into your virtual
  environment's `bin/` directory.

## Installation

### use-package (Emacs 30+, or with a recent `use-package`)

```elisp
(use-package fpp-mode
  :load-path "/path/to/fpp-tools/editors/emacs"
  :custom
  (fpp-lsp-server-path "/path/to/venv/bin/fpp_lsp_server")
  :hook
  (fpp-mode . eglot-ensure))
```

### From a release tarball

Each GitHub release attaches an `fpp-emacs-<tag>.tar.gz`. Extract it somewhere on
your `load-path`, e.g.:

```sh
mkdir -p ~/.emacs.d/site-lisp
tar -xzf fpp-emacs-<tag>.tar.gz -C ~/.emacs.d/site-lisp
```

```elisp
(add-to-list 'load-path "~/.emacs.d/site-lisp/emacs")
(require 'fpp-mode)
(setq fpp-lsp-server-path "/path/to/venv/bin/fpp_lsp_server")
(add-hook 'fpp-mode-hook #'eglot-ensure)
```

### Manual

```elisp
(add-to-list 'load-path "/path/to/fpp-tools/editors/emacs")
(require 'fpp-mode)
(setq fpp-lsp-server-path "/path/to/venv/bin/fpp_lsp_server")

;; Optionally start the language server automatically.
(add-hook 'fpp-mode-hook #'eglot-ensure)
```

Opening a `.fpp` or `.fppi` file activates `fpp-mode`. Run `M-x eglot` (or rely
on the `eglot-ensure` hook) to connect the language server.

## Configuration

| Variable              | Default            | Description                                                |
| --------------------- | ------------------ | ---------------------------------------------------------- |
| `fpp-lsp-server-path` | `"fpp_lsp_server"` | Path to the `fpp_lsp_server` executable.                   |
| `fpp-lsp-log-level`   | `"error"`          | Server log level: `debug`, `info`, `warn`, `error`, `off`. |

### LSP executable path

Every FPP editor plugin follows the same convention: the language server is
launched as `fpp_lsp_server --stdio`, resolved from a single user-configured
absolute path pointing at the `fprime-fpp-lsp` pip package's console script
inside your virtual environment. Automatic discovery (walking up for a venv,
`$VIRTUAL_ENV`, `$PATH`) is a possible future enhancement; for now set
`fpp-lsp-server-path` explicitly.

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
