" VimPlug START
call plug#begin('~/.vim/plugged') 

" Deoplete completion
if has('nvim')
  Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
else
  Plug 'Shougo/deoplete.nvim'
  Plug 'roxma/nvim-yarp'
  Plug 'roxma/vim-hug-neovim-rpc'
endif

" Easy motion
Plug 'https://github.com/easymotion/vim-easymotion'

" Lightning fast left-right movement 
Plug 'https://github.com/unblevable/quick-scope'

" Show a list of buffers
Plug 'https://github.com/bling/vim-bufferline'

" Linting with ALE
Plug 'w0rp/ale'

" LSP Completion Engine for C++
Plug 'prabirshrestha/async.vim'
Plug 'prabirshrestha/vim-lsp'

" window manager
Plug 'paroxayte/vwm.vim'

" Enable multiple selection with <C-n>
Plug 'terryma/vim-multiple-cursors'

" Auto close tags and etc
Plug 'jiangmiao/auto-pairs'

" Tags mangement
Plug 'tpope/vim-surround'

" Identation guides for better visualization
Plug 'Yggdroot/indentLine'
"Plug 'nathanaelkane/vim-indent-guides'

" File manager sidebar and git integration
Plug 'scrooloose/nerdtree'
Plug 'Xuyuanp/nerdtree-git-plugin'

" NERDTree syntax highlighting
Plug 'tiagofumo/vim-nerdtree-syntax-highlight'

" Undo history
Plug 'mbbill/undotree'

" Nice icons
Plug 'ryanoasis/vim-devicons'

" Syntax highlighting
Plug 'vim-syntastic/syntastic'
Plug 'sheerun/vim-polyglot'
Plug 'ap/vim-css-color'

" Status bar
Plug 'itchyny/lightline.vim'

" Easier comments
Plug 'scrooloose/nerdcommenter'

" Don't repeat yourself!
Plug 'tpope/vim-repeat'

" Nice clipboard
Plug 'svermeulen/vim-easyclip'

" Completions from other terminals inside tmux
Plug 'wellle/tmux-complete.vim'

" Git wrapper
Plug 'airblade/vim-gitgutter'

" Unix FS operations inside vim!
Plug 'tpope/vim-eunuch'

" fzf search
Plug 'junegunn/fzf.vim'


" My themes
Plug 'yuttie/hydrangea-vim'
Plug 'arcticicestudio/nord-vim'
Plug 'drewtempelmeyer/palenight.vim'

" Wal colorscheme
Plug 'dylanaraps/wal.vim'

" Vim-misc
Plug 'xolox/vim-misc'

" Vim-notes
Plug 'xolox/vim-notes'

" VimPlug END
call plug#end()

"#######################################################

" Use an older version of RegeX, faster
set re=1

" Always use system clipboard no matter what
set clipboard=unnamedplus

" Make Vim buffer the rendered lines
set ttyfast
set lazyredraw

set synmaxcol=0
syntax sync minlines=25

set tabpagemax=9
set showmode

"#######################################################

" Tabs mappings
nnoremap <C-t><Left>  :tabp<CR>
nnoremap <C-t><Right> :tabn<CR>
nnoremap <C-t>n       :tabnew<CR>
nnoremap <C-t>w       :tabc<CR>
inoremap <C-t><Left>  <Esc>:tabp<CR>
inoremap <C-t><Right> <Esc>:tabn<CR>
inoremap <C-t>n       <Esc>:tabnew<CR>
inoremap <C-t>w       <Esc>:tabc<CR>

" Buffer mappings
nnoremap <C-b>N :enew <CR>
nnoremap <C-b>p :bprev <CR>
nnoremap <C-b>n :bnext <CR>
nnoremap <C-b>w :bd <CR>
inoremap <C-b>N <Esc>:enew <CR>
inoremap <C-b>p <Esc>:bprev <CR>
inoremap <C-b>n <Esc>:bnext <CR>
inoremap <C-b>w <Esc>:bd <CR>

" Window mappings
" You can use <C-w> + hjkl to navigate between windows
" You can use <C-w>w to alternate between windows
nnoremap <C-h>h :split<CR>
nnoremap <C-h>v :vsplit<CR>
inoremap <C-h>h <Esc>:split<CR>
inoremap <C-h>v <Esc>:vsplit<CR>


" Enable deoplete at startup
let g:deoplete#enable_at_startup = 1

" <TAB>: completion.
inoremap <expr><TAB>  pumvisible() ? "\<C-n>" : "\<TAB>"

" Deoplete for C++
" Change clang binary path
call deoplete#custom#var('clangx', 'clang_binary', '/usr/local/bin/clang')

" Change clang options
call deoplete#custom#var('clangx', 'default_c_options', '')
call deoplete#custom#var('clangx', 'default_cpp_options', '')

"##############################

" ALE Configs
" Do not lint continuosly as the file is changed, only when saved
let g:ale_lint_on_text_changed = 'never'

" Set the linting time in miliseconds
let g:ale_lint_delay = 300

"##############################
"
"##############################
"LSP C++ server
if executable('clangd')
    au User lsp_setup call lsp#register_server({
        \ 'name': 'clangd',
        \ 'cmd': {server_info->['clangd']},
        \ 'whitelist': ['c', 'cpp', 'objc', 'objcpp'],
        \ })
endif


" NERDTree
"    Autostart NERDTree
autocmd vimenter * NERDTree

"    Autostart in edit area
autocmd VimEnter * NERDTree
autocmd VimEnter * wincmd p

" Determines what char to use as identation guide
let g:indentLine_char = '|'

"#######################################################
"    Open NERDTree binding
map <C-k> :NERDTreeToggle<CR>
"    Open _my-sources folder
map <F10> :NERDTree /home/zsucrilhos/_my-sources/

"#######################################################

" Syntastic configs
"   Recommended settings
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0

"   Use pylint as the liter for python
let g:syntastic_python_checkers = ['pylint']

"#######################################################

"#######################################################

" Easyclip configs 
"    Use gm for 'add mark' instead of m, include the following in your .vimrc
"    to not conflict with m for cut text from vim easyclip
nnoremap gm m

"    Enable Substitution Operator with s key binding
"let g:EasyClipUseSubstituteDefaults

"    Enable cursor jumps to the end of the line at each paste
"let g:EasyClipAlwaysMoveCursorToEndOfPaste


"#######################################################

" Lightline configs
set laststatus=2

let g:lightline = {
      \ 'colorscheme': 'nord',
      \ 'active': {
      \   'left': [ [ 'mode', 'paste' ], [ 'filename' ], [ 'bufferline' ] ],
      \ },
      \ 'component': {
      \   'readonly': '%{&readonly?"":""}',
      \'bufferline': '%{bufferline#refresh_status()}%{g:bufferline_status_info.before . g:bufferline_status_info.current . g:bufferline_status_info.after}',
      \ },
      \ 'separator':    { 'left': '', 'right': '' },
      \ 'subseparator': { 'left': '', 'right': '' },
\ }

" Set the <leader> to <SPACE>
let mapleader = "<SPACE>"


" Using bufferline only on lightline not on command bar
let g:bufferline_echo = 0
"
" Enable and toggle indent guides
let g:indent_guides_enable_on_vim_startup = 1

" Set the indent guides colors
hi IndentGuidesOdd  ctermbg=black
hi IndentGuidesEven ctermbg=darkgrey

"#######################################################

" Set shell
set shell=zsh

" Set encoding
set encoding=utf-8
set fileencoding=utf-8

" Syntax and colors
syntax on
set termguicolors

" Enable line numbers
set relativenumber

" My colorscheme
colorscheme nord

filetype on
filetype indent on
filetype plugin on
set number
set title
set wrap
set showmode
set ruler
set background=dark
set t_Co=256
set hidden
set cursorline!

" Tabs and spaces
set tabstop=4
set softtabstop=4
set shiftwidth=4
set shiftround
set expandtab

set listchars=tab:▸\ ,eol:¬
set list

" Disable backup and swap files
set nobackup
set nowritebackup
set noswapfile

" Stuff
set textwidth=120
set ffs=unix,dos,mac
set backspace=indent,eol,start
set colorcolumn=80
set columns=80

" Search
set hlsearch
set incsearch
set ignorecase
set smartcase
set history=500
set undolevels=700
set wrapscan

" Bind <F3> to clear search history "
map <F3> *:let @/=""

