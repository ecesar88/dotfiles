" VimPlug START
" Specify a directory for plugins
" - For Neovim: stdpath('data') . '/plugged'
" - Avoid using standard Vim directory names like 'plugin'

" Autoinstall vim-plug if it isn't installed already
if empty(glob('~/.config/nvim/autoload/plug.vim'))
  silent !curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs
        \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall
endif

" Set the <leader> to ,
let mapleader = ","

" Start vim-plug
call plug#begin('~/.vim/plugged')

" Easymotion for vscode, yay!
Plug 'asvetliakov/vim-easymotion'

" Simplified clipboard functionality for Vim
Plug 'svermeulen/vim-easyclip' " addconfigs

" Initialize plugin system
call plug#end()

"#######################################################
"#######################################################
" Easyclip configs
"#######################################################

" Use gm for 'add mark' instead of m, include the following in your .vimrc
" to not conflict with m for cut text from vim easyclip
nnoremap gm m

" Enable Substitution Operator with s key binding
"let g:EasyClipUseSubstituteDefaults

" Enable cursor jumps to the end of the line at each paste
let g:EasyClipAlwaysMoveCursorToEndOfPaste = 1


"#######################################################
" General neovim configs
"#######################################################

" Always use system clipboard no matter what
set clipboard=unnamedplus

set cursorline! " Highlight the cursor's line

" Disable backup and swap files
set nobackup " Disable backups
set nowritebackup " Not to write backups
set noswapfile " Disable swapfile

set hlsearch " Highlight all matches of preview search pattern
set incsearch " Highlight the current search query
set ignorecase " Ignore case
set smartcase " Override the 'ignorecase' option
set history=500
set undolevels=700
set wrapscan " Searches wraps around the end of the file

" THESE MUST BE AT THE VERY END OF THE FILE
"
" Put these lines at the very end of your vimrc file.
" Load all plugins now.
" Plugins need to be added to runtimepath before helptags can be generated.
packloadall

