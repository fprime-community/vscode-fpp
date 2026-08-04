;;; fpp-mode.el --- Major mode and LSP support for F Prime Prime (FPP) -*- lexical-binding: t; -*-

;; Author: Andrei Tumbar <andrei.tumbar@jpl.nasa.gov>
;; Keywords: languages, fpp, fprime
;; Package-Requires: ((emacs "29.1"))
;; URL: https://github.com/fprime-community/vscode-fpp

;;; Commentary:

;; Provides a major mode for F Prime Prime (FPP) modeling files and connects
;; them to the FPP language server (`fpp_lsp_server') via the built-in `eglot'
;; client.
;;
;; The language server ships as the `fpp_lsp_server' executable inside the
;; `fprime-fpp-lsp' pip package.  Point `fpp-lsp-server-path' at the executable
;; in your virtual environment, e.g. "/path/to/venv/bin/fpp_lsp_server".

;;; Code:

(require 'eglot)

(defgroup fpp nil
  "Support for the F Prime Prime (FPP) modeling language."
  :group 'languages
  :prefix "fpp-")

(defcustom fpp-lsp-server-path "fpp_lsp_server"
  "Path to the `fpp_lsp_server' executable.
The default assumes it is resolvable on `exec-path'/$PATH; set this to the
absolute path inside your virtual environment, e.g.
\"/path/to/venv/bin/fpp_lsp_server\"."
  :type 'string
  :group 'fpp)

(defcustom fpp-lsp-log-level "error"
  "Logging level passed to the FPP language server."
  :type '(choice (const "debug")
                 (const "info")
                 (const "warn")
                 (const "error")
                 (const "off"))
  :group 'fpp)

;;;###autoload
(define-derived-mode fpp-mode prog-mode "FPP"
  "Major mode for editing F Prime Prime (FPP) files."
  (setq-local comment-start "# ")
  (setq-local comment-end ""))

;;;###autoload
(add-to-list 'auto-mode-alist '("\\.fppi?\\'" . fpp-mode))

;; Build the eglot invocation from the configured path, so that changes to
;; `fpp-lsp-server-path' are respected without re-registering the mode.
(defun fpp--eglot-contact (_interactive &rest _)
  "Return the command used to launch the FPP language server for eglot."
  (list fpp-lsp-server-path "--stdio" "--log-level" fpp-lsp-log-level))

(with-eval-after-load 'eglot
  (add-to-list 'eglot-server-programs '(fpp-mode . fpp--eglot-contact)))

(provide 'fpp-mode)

;;; fpp-mode.el ends here
