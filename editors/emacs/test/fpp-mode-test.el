;;; fpp-mode-test.el --- ERT tests for fpp-mode -*- lexical-binding: t; -*-

;;; Commentary:

;; Tier-1 behavioral tests for the FPP Emacs plugin. Run with:
;;
;;   emacs --batch -L . -l test/fpp-mode-test.el \
;;         -f ert-run-tests-batch-and-exit
;;
;; These exercise plugin logic only — no language server process is spawned.

;;; Code:

(require 'ert)
(require 'fpp-mode)

(ert-deftest fpp-mode-activates-on-fpp-extensions ()
  "`.fpp' and `.fppi' files should select `fpp-mode'."
  (dolist (name '("component.fpp" "types.fppi"))
    (with-temp-buffer
      (setq buffer-file-name (expand-file-name name))
      (set-auto-mode)
      (should (eq major-mode 'fpp-mode)))))

(ert-deftest fpp-mode-derives-from-prog-mode ()
  "`fpp-mode' should derive from `prog-mode'."
  (should (provided-mode-derived-p 'fpp-mode 'prog-mode)))

(ert-deftest fpp-eglot-server-program-registered ()
  "eglot should know how to launch the FPP server for `fpp-mode'."
  (require 'eglot)
  (should (assoc 'fpp-mode eglot-server-programs)))

(ert-deftest fpp-eglot-contact-reflects-server-path ()
  "The eglot contact should reflect `fpp-lsp-server-path' and log level."
  (let ((fpp-lsp-server-path "/venv/bin/fpp_lsp_server")
        (fpp-lsp-log-level "debug"))
    (should (equal (fpp--eglot-contact nil)
                   '("/venv/bin/fpp_lsp_server" "--stdio" "--log-level" "debug")))))

(provide 'fpp-mode-test)

;;; fpp-mode-test.el ends here
