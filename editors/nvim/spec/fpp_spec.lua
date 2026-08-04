-- Tier-1 behavioral tests for the FPP Neovim plugin.
--
-- These run under `nvim --headless` (via nvim-busted-action / nlua) so the full
-- `vim` API is available. They exercise plugin logic only — no language server
-- process is spawned.

describe("fpp.nvim", function()
  local fpp

  before_each(function()
    -- Reload the module fresh so each test sees default config.
    package.loaded["fpp"] = nil
    fpp = require("fpp")
  end)

  describe("filetype detection", function()
    it("maps .fpp and .fppi to the fpp filetype", function()
      -- ftdetect/fpp.lua registers the mapping via vim.filetype.add.
      dofile("ftdetect/fpp.lua")

      assert.are.equal("fpp", vim.filetype.match({ filename = "component.fpp" }))
      assert.are.equal("fpp", vim.filetype.match({ filename = "types.fppi" }))
    end)
  end)

  describe("setup()", function()
    it("uses documented defaults", function()
      fpp.setup()
      assert.are.equal("fpp_lsp_server", fpp.config.server_path)
      assert.are.equal("error", fpp.config.log_level)
      assert.are.same({ "locs.fpp", ".git" }, fpp.config.root_markers)
    end)

    it("merges user overrides over defaults", function()
      fpp.setup({ server_path = "/venv/bin/fpp_lsp_server", log_level = "debug" })
      assert.are.equal("/venv/bin/fpp_lsp_server", fpp.config.server_path)
      assert.are.equal("debug", fpp.config.log_level)
      -- Unspecified keys keep their defaults.
      assert.are.same({ "locs.fpp", ".git" }, fpp.config.root_markers)
    end)

    it("reflects overrides in the launch command", function()
      fpp.setup({ server_path = "/venv/bin/fpp_lsp_server", log_level = "warn" })
      assert.are.same(
        { "/venv/bin/fpp_lsp_server", "--stdio", "--log-level", "warn" },
        fpp.server_cmd()
      )
    end)

    it("registers the FileType autocmd and reload command", function()
      fpp.setup()

      local autocmds = vim.api.nvim_get_autocmds({
        group = "FppLsp",
        event = "FileType",
        pattern = "fpp",
      })
      assert.is_true(#autocmds > 0)

      assert.is_not_nil(vim.api.nvim_get_commands({})["FppReloadWorkspace"])
    end)
  end)
end)
