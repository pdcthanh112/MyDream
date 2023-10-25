-- /plugin/telescope.lua

local status, telescope = pcall(require, 'telescope')
if not status then return end

-- load cái thư viện builtin của telescope ra
-- trong này có 1 tá các function cho chúng ta lựa chọn
local builtin = require('telescope.builtin')

-- gõ `;f` ở chế độ Normal để hiển thị danh sách file
vim.keymap.set('n', ';f', builtin.find_files, {})

-- tương tự, gõ `;r` để tìm kiếm nội dung trong file
vim.keymap.set('n', ';r', builtin.live_grep, {})

-- cứ như thế nhé, các bạn có thể thay đổi kí tự tùy thích
vim.keymap.set('n', ';fb', builtin.buffers, {})
vim.keymap.set('n', ';gbr', builtin.git_branches)
vim.keymap.set('n', ';gst', builtin.git_status)
vim.keymap.set('n', ';gcm', builtin.git_commits)
vim.keymap.set('n', ';xx', builtin.diagnostics)