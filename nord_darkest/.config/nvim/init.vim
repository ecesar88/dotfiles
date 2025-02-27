" VimPlug START
call plug#begin('~/.vim/plugged') 

" Only apply this if on vscode
if exists('g:vscode')

    " Vim easy motion fork for vscode
    "Plug 'asvetliakov/vim-easymotion'

    " Nice clipboard
    Plug 'svermeulen/vim-easyclip'

else
    Plug 'dstein64/vim-startuptime'
    
    "Conquer of Completion 
    Plug 'neoclide/coc.nvim', {'branch': 'release'}

    " Easy motion
    "Plug 'https://github.com/easymotion/vim-easymotion'

    " Lightning fast left-right movement 
    Plug 'https://github.com/unblevable/quick-scope'

    " Show a list of buffers
    Plug 'https://github.com/bling/vim-bufferline'

    " Linting with ALE
    Plug 'w0rp/ale'

    " LSP Completion Engine for C++
    Plug 'prabirshrestha/async.vim'
    Plug 'prabirshrestha/vim-lsp'

    " Window manager
    Plug 'paroxayte/vwm.vim'

    " Emmet for vim
    Plug 'mattn/emmet-vim'

    " Enable multiple selection with <C-n>
    Plug 'terryma/vim-multiple-cursors'

    " Auto close tags and etc
    Plug 'jiangmiao/auto-pairs'

    " Match tags
    Plug 'gregsexton/MatchTag'

    " Auto close (x)HTML tags
    Plug 'alvan/vim-closetag'

    " Fold code identation
    Plug 'pseewald/vim-anyfold'

    " Fast folding
    Plug 'https://github.com/Konfekt/FastFold'

    " Pretty start screen
    Plug 'https://github.com/mhinz/vim-startify'

    " Prettier
    Plug 'prettier/vim-prettier', {
    \ 'do': 'yarn install',
    \ 'for': [
        \ 'javascript',
        \ 'typescript',
        \ 'css',
        \ 'less',
        \ 'scss',
        \ 'json',
        \ 'graphql',
        \ 'markdown',
        \ 'vue',
        \ 'lua',
        \ 'php',
        \ 'python',
        \ 'ruby',
        \ 'html', ] }

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


    "#######################################################
    " Polyglot vim configuration
    "#######################################################

        let g:polyglot_disabled=['markdown']

    "#######################################################
    " Apparently this needs to come before the plugin itself
    "#######################################################
"
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
    Plug 'phanviet/vim-monokai-pro'
    Plug 'ayu-theme/ayu-vim'
    Plug 'https://github.com/tyrannicaltoucan/vim-deep-space'
    Plug 'challenger-deep-theme/vim', { 'as': 'challenger-deep' }

    " Wal colorscheme
    Plug 'dylanaraps/wal.vim'

    " Vim-misc
    Plug 'xolox/vim-misc'

    " Vim-notes
    Plug 'xolox/vim-notes'

endif  " End if exists('g:vscode')


" VimPlug END
call plug#end()



"#######################################################
" Some vim configuration
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

" Treat all numerals as decimals
set nrformats=bin

" Set Python2 path for neovim
let g:python_host_prog = "/usr/bin/python2"
let g:python3_host_prog = "/usr/bin/python3"


"##### Remaping some keys #####
"
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
nnoremap <C-b>N :enew <CR> " Create a new buffer
nnoremap <C-b>p :bprev <CR> " Go to previous buffer
nnoremap <C-b>n :bnext <CR> " Go to next buffer

nnoremap <C-b>w :bd <CR> " Unload buffer and delete it from the buffer list
" The same binds again? C'mon...
inoremap <C-b>N <Esc>:enew <CR>
inoremap <C-b>p <Esc>:bprev <CR>
inoremap <C-b>n <Esc>:bnext <CR>
inoremap <C-b>w <Esc>:bd <CR>

" Window mappings
" You can use <C-w> + hjkl to navigate between windows
" You can use <C-w>w to alternate between windows
nnoremap <C-h>h :split<CR> " Split horizontally
nnoremap <C-h>v :vsplit<CR> " Split vertically
inoremap <C-h>h <Esc>:spli<CR>
inoremap <C-h>v <Esc>:vsplit<CR>



" Enable dark ayu theme
"let ayucolor="light"  " for light version of theme
"let ayucolor="mirage" " for mirage version of theme
"let ayucolor="dark"   " for dark version of theme
"#######################################################
" COC - Conquer of Completion configuration
"#######################################################

" set coc.nvim path
set runtimepath^=/home/zsucrilhos/.vim/plugged/coc.nvim

" Shortcut to open the config file with 'C'
function! SetupCommandAbbrs(from, to)
  exec 'cnoreabbrev <expr> '.a:from
        \ .' ((getcmdtype() ==# ":" && getcmdline() ==# "'.a:from.'")'
        \ .'? ("'.a:to.'") : ("'.a:from.'"))'
endfunction

" Use <c-space> to trigger completion.
inoremap <silent><expr> <c-space> coc#refresh()

" Use C to open coc config
call SetupCommandAbbrs('C', 'CocConfig')

" Open yank list with <space-y>
nnoremap <silent> <space>y  :<C-u>CocList -A --normal yank<cr>

" Use <tab> for trigger completion and navigate to the next complete item
function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~ '\s'
endfunction

inoremap <silent><expr> <Tab>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<Tab>" :
      \ coc#refresh()

" Use <tab> and <s-tab> to navigate the completion list
inoremap <expr> <Tab> pumvisible() ? "\<C-n>" : "\<Tab>"
inoremap <expr> <S-Tab> pumvisible() ? "\<C-p>" : "\<S-Tab>"

" Use <cr>  to confirm completion
inoremap <expr> <cr> pumvisible() ? "\<C-y>" : "\<C-g>u\<CR>"

" Make <cr> select the first item on the list and trigger completion when no item has   been selected
inoremap <silent><expr> <cr> pumvisible() ? coc#_select_confirm() : "\<C-g>u\<CR>"

" Correct comment highlight 
autocmd FileType json syntax match Comment +\/\/.\+$+

" Snippets configuration
" Use <C-l> for trigger snippet expand.
imap <C-l> <Plug>(coc-snippets-expand)

" Use <C-j> for select text for visual placeholder of snippet.
vmap <C-j> <Plug>(coc-snippets-select)


" Use K to show documentation in preview window.
nnoremap <silent> K :call <SID>show_documentation()<CR>
"
function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  else
    call CocAction('doHover')
  endif
endfunction

" Highlight the symbol and its references when holding the cursor.
autocmd CursorHold * silent call CocActionAsync('highlight')



"#######################################################
" Vim-Notes configurations
"#######################################################

let g:notes_directories = ['~/Documents/Notes']



"#######################################################
" ALE Configuration (linter)
"#######################################################
"
" Set the linting time in miliseconds
let g:ale_lint_delay = 300

" Enable ESLint only for JavaScript and pylint for Python.
let g:ale_linters = {
\   'javascript': ['eslint'],
\   'python': ['pylint'],
\}

" Wether to lint on save or when text is changed
let g:ale_lint_on_save = 0
let g:ale_lint_on_text_changed = 1

" Keep the gutter open at all times
let g:ale_sign_column_always = 1

" Change the format for echo messages
let g:ale_echo_msg_error_str = 'ERROR'
let g:ale_echo_msg_warning_str = 'WARNING'
let g:ale_echo_msg_format = '[%linter%] %s [%severity%]'

" Open all warning ins a window like Syntastic
let g:ale_open_list = 1

" Map the keys Ctrl+j and Ctrl+k to moving between errors 
nmap <silent> <C-o> <Plug>(ale_previous_wrap)
nmap <silent> <C-p> <Plug>(ale_next_wrap)

" Change the icons for warnings and errors
let g:ale_sign_error = '✘'
let g:ale_sign_warning = '⚠'

" Change the colours of the icons
highlight ALEErrorSign ctermbg=NONE ctermfg=red
highlight ALEWarningSign ctermbg=NONE ctermfg=yellow



"#######################################################
"LSP C++ server
"#######################################################

if executable('clangd')
    au User lsp_setup call lsp#register_server({
        \ 'name': 'clangd',
        \ 'cmd': {server_info->['clangd']},
        \ 'whitelist': ['c', 'cpp', 'objc', 'objcpp'],
        \ })
endif

"#######################################################


" Only apply this if on vscode
if exists('g:vscode')

else
"#######################################################
" NERDTree settings
"#######################################################

    "    Autostart NERDTree
    autocmd vimenter * NERDTree

    "    Autostart in edit area
    autocmd VimEnter * NERDTree
    autocmd VimEnter * wincmd p

    " Determines what char to use as identation guide
    let g:indentLine_char = '|'

    "    Open NERDTree binding
    map <C-k> :NERDTreeToggle<CR>

    "    Open _my-sources folder
    map <F10> :NERDTree /home/zsucrilhos/_my-sources/
endif


"#######################################################
" FZF settings
"#######################################################
"
"Use 'F9' to open fzf file 'browser'
map <F9> :Files<CR>



"#######################################################
" Syntastic configs
"#######################################################

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
" Easyclip configs 
"#######################################################

"    Use gm for 'add mark' instead of m, include the following in your .vimrc
"    to not conflict with m for cut text from vim easyclip
nnoremap gm m

"    Enable Substitution Operator with s key binding
"let g:EasyClipUseSubstituteDefaults

"    Enable cursor jumps to the end of the line at each paste
let g:EasyClipAlwaysMoveCursorToEndOfPaste = 1



"#######################################################
" Lightline settings
"#######################################################

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

"#######################################################
" Vim general settings
"#######################################################

" Set the <leader> to <Space>
"let mapleader = "<Space>"
let mapleader = ","

"Using bufferline only on lightline not on command bar
let g:bufferline_echo = 0
"
" Enable and toggle indent guides
let g:indent_guides_enable_on_vim_startup = 1

" Set the indent guides colors
hi IndentGuidesOdd  ctermbg=black
hi IndentGuidesEven ctermbg=darkgrey



"#######################################################
" Vim Devicons
"#######################################################

" NERDTree
" Enable or disable
let g:webdevicons_enable_nerdtree = 1

" Whether or not to show the nerdtree brackets around flags
let g:webdevicons_conceal_nerdtree_brackets = 1


"#######################################################
" More vim configuration
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

" Miscellaneous
set textwidth=120
set ffs=unix,dos,mac
set backspace=indent,eol,start
set colorcolumn=80
set columns=80
set showcmd

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



" THESE MUST BE AT THE VERY END OF THE FILE
"
" Put these lines at the very end of your vimrc file.  
" Load all plugins now.
" Plugins need to be added to runtimepath before helptags can be generated.
packloadall

" Load all of the helptags now, after plugins have been loaded.
" All messages and errors will be ignored.
silent! helptags ALL
