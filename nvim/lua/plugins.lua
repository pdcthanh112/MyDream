-- /lua/plugins.lua

-- Lưu lại đường dẫn tới file lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"

-- Nếu đường dẫn trên ko tồn tại, thì dùng Git clone nó về
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end

vim.opt.rtp:prepend(lazypath)
local theme = require('theme')

require("lazy").setup({
  theme,
  {
    'nvim-treesitter/nvim-treesitter',
    build = ':TSUpdate',
  },
  {
    'nvim-lualine/lualine.nvim',
    opts = {
        options = {
            icons_enabled = false,
            theme = 'tokyonight',
            component_separators = '|',
            section_separators = '',
        }
    }
},
{
  'nvim-telescope/telescope.nvim',
  branch = '0.1.x',
  dependencies = {
      -- đây là plugin bổ sung thêm để hỗ trợ chức năng của telescope
      'nvim-lua/plenary.nvim'
  }
},
{
  'nvim-tree/nvim-tree.lua',
  dependencies = {
      -- plugin này hỗ trợ nvim-tree hiển thị icon 
      -- tương ứng với từng loại file
      "nvim-tree/nvim-web-devicons"
  }
},
{
  'akinsho/bufferline.nvim',
  version = "*",
  dependencies = 'nvim-tree/nvim-web-devicons'
},
})