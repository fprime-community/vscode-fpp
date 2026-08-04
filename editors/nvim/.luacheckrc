-- luacheck configuration for the FPP Neovim plugin.
std = "lua51"
-- Neovim injects the `vim` global; busted injects test globals.
read_globals = { "vim" }
globals = {}

-- busted spec files use describe/it/before_each/assert etc.
files["spec/"] = {
  std = "+busted",
}
