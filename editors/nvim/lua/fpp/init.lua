-- FPP language server integration for Neovim, built on the native `vim.lsp`
-- client (no external plugins required, Neovim >= 0.11).
--
-- The FPP language server ships as the `fpp_lsp_server` executable inside the
-- `fprime-fpp-lsp` pip package. Point `opts.server_path` at the executable in
-- your virtual environment, e.g. `/path/to/venv/bin/fpp_lsp_server`.

local M = {}

local defaults = {
  -- Absolute path to the `fpp_lsp_server` executable. The default assumes it is
  -- resolvable on $PATH; override with the full venv path.
  server_path = "fpp_lsp_server",
  -- Server logging level: debug | info | warn | error | off.
  log_level = "error",
  -- Markers used to locate the workspace root, in priority order.
  root_markers = { "locs.fpp", ".git" },
}

M.config = vim.deepcopy(defaults)

--- Build the command used to launch the language server.
---@return string[]
function M.server_cmd()
  return {
    M.config.server_path,
    "--stdio",
    "--log-level",
    M.config.log_level,
  }
end

--- Start (or reuse) the FPP language server for the current buffer.
local function start_client()
  local bufnr = vim.api.nvim_get_current_buf()
  local root_dir = vim.fs.root(bufnr, M.config.root_markers) or vim.fn.getcwd()

  vim.lsp.start({
    name = "fpp",
    cmd = M.server_cmd(),
    root_dir = root_dir,
    cmd_env = { RUST_BACKTRACE = "1" },
  }, { bufnr = bufnr })
end

--- Configure and enable the FPP language server.
---@param opts table|nil Overrides for `server_path`, `log_level`, `root_markers`.
function M.setup(opts)
  M.config = vim.tbl_deep_extend("force", vim.deepcopy(defaults), opts or {})

  local group = vim.api.nvim_create_augroup("FppLsp", { clear = true })
  vim.api.nvim_create_autocmd("FileType", {
    group = group,
    pattern = "fpp",
    callback = start_client,
  })

  -- Project configuration lives in a `.fpp-lsp` file at the workspace root, which
  -- the server discovers and reloads on change. This command asks the server to
  -- re-run discovery on demand.
  vim.api.nvim_create_user_command("FppReloadWorkspace", function()
    local client = vim.lsp.get_clients({ name = "fpp", bufnr = 0 })[1]
    if client then
      client:request("fpp/reloadWorkspace", nil)
    end
  end, { desc = "FPP: re-run project discovery (.fpp-lsp)" })
end

return M
