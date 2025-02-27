"Name:         vim-gnome 
"Description:  A Vim color scheme based on vim-colorscheme-primary 
"              with gnome's Dark-Adwaita Background
"Author:       Rudra Banerjee 
"Created:      2015 April 25

if has("gui_running")
  set background=dark
endif
hi clear
if exists('syntax_on')
  syntax reset
endif
let g:colors_name='vimgnome'

"COLORS DEFINED
"RED    = #DB4437
"GREEN  = #34A16C
"YELLOW = #FFF8B2
"BLUE   = #2196F3  changed to #64B5F6
"BLACK  = #333333
"DGREY  = #656565
"LGREY  = #EEEEEE
"WHITE  = #FFFFFF
"BROWN  = #FFB499
"TEAL   = #00D7C0

" Colors for Syntax Highlighting.
hi Normal           guibg=#37474f   guifg=#FFFFFF                   ctermfg=white
hi Comment                          guifg=#FFF8B2                   ctermfg=lightgrey

hi String                           guifg=#00D7C0   gui=italic      ctermfg=lightblue   cterm=italic
hi Character                        guifg=#00D7C0   gui=italic      ctermfg=lightblue   cterm=italic

hi Conditional                      guifg=#DB4437   gui=bold        ctermfg=red  cterm=bold
hi Label                            guifg=#DB4437   gui=bold        ctermfg=red  cterm=bold
hi Repeat                           guifg=#DB4437   gui=bold        ctermfg=red  cterm=bold 
hi Statement                        guifg=#DB4437   gui=bold        ctermfg=red  cterm=bold
hi Keyword                          guifg=#DB4437   gui=bold        ctermfg=red  cterm=bold
hi Exception                        guifg=#DB4437   gui=bold        ctermfg=red  cterm=bold


hi Identifier                       guifg=#64B5F6   gui=bold        ctermfg=blue  cterm=bold    
hi Function                         guifg=#64B5F6   gui=bold        ctermfg=blue  cterm=bold  
hi Special                          guifg=#64B5F6   gui=none        ctermfg=blue
hi Delimiter                        guifg=#64B5F6   gui=none        ctermfg=blue
hi Debug                            guifg=#64B5F6   gui=none        ctermfg=blue
hi SpecialChar                      guifg=#64B5F6   gui=none        ctermfg=blue
hi Title                            guifg=#64B5F6   gui=none        ctermfg=blue


hi Typedef                          guifg=#34A16C   gui=italic      ctermfg=darkgreen  cterm=italic
hi Include                          guifg=#34A16C   gui=bold        ctermfg=darkgreen  cterm=bold
hi Define                           guifg=#34A16C   gui=bold        ctermfg=darkgreen  cterm=bold
hi Macro                            guifg=#34A16C   gui=bold        ctermfg=darkgreen  cterm=bold
hi Precondit                        guifg=#34A16C   gui=bold        ctermfg=darkgreen  cterm=bold
hi Preproc                          guifg=#34A16C   gui=bold        ctermfg=darkgreen  cterm=bold
hi SpecialComment                   guifg=#34A16C   gui=bold        ctermfg=darkgreen  cterm=bold
hi Type                             guifg=#34A16C   gui=bold        ctermfg=darkgreen  cterm=bold
hi StorageClass                     guifg=#34A16C   gui=bold        ctermfg=darkgreen  cterm=bold
hi Structure                        guifg=#34A16C   gui=bold        ctermfg=darkgreen  cterm=bold
hi Operator                         guifg=#34A16C   gui=bold        ctermfg=darkgreen  cterm=bold

hi Constant                         guifg=#EEEEEE                   ctermfg=lightgrey 
hi Tag                              guifg=#EEEEEE   gui=bold        ctermfg=lightgrey  cterm=bold  
hi Ignore                           guifg=#EEEEEE   gui=none        ctermfg=lightgrey
hi Underlined                       guifg=#EEEEEE   gui=underline   ctermfg=lightgrey  cterm=underline

hi Boolean                          guifg=#FFB499                   ctermfg=brown 
hi Number                           guifg=#FFB499                   ctermfg=brown
hi Float                            guifg=#FFB499                   ctermfg=brown   

hi MatchParen       guibg=#DB4437   guifg=#262626   gui=bold        ctermfg=red  cterm=bold
hi Error            guibg=#DB4437   guifg=#262626   gui=bold        ctermfg=red  ctermbg=black cterm=bold

hi Todo             guibg=#34A16C   guifg=#262626   gui=bold        ctermfg=darkgreen  cterm=bold
hi Wildmenu         guibg=#34A16C   guifg=#262626   gui=bold        ctermfg=darkgreen  cterm=bold

hi DiffAdd          guibg=#C6493E   guifg=#FFFFFF   cterm=bold ctermbg=4  ctermfg=4
hi DiffChange       guibg=#C6493E   guifg=#FFFFFF   ctermbg=5  ctermfg=4
hi DiffDelete       guibg=#178D53   guifg=#FFFFFF   cterm=bold ctermfg=4 ctermbg=6
hi DiffText         guibg=#C6493E   guifg=#FFFFFF   cterm=bold ctermbg=1 


""User Interface
hi Cursor           guibg=#ffffff   guifg=#000000  ctermbg=white  ctermfg=black
hi Search           guibg=#FF8A80   guifg=#B71C1C 
" hi IncSearch        guibg=#FFFFFF   guifg=#B71C1C
hi IncSearch        guibg=#B71C1C   guifg=#ffffff gui=bold,italic 
hi SignColumn       guibg=#34A16C   guifg=#FF8A80 
hi ColorColumn      guibg=darkred   guifg=#34A16C

hi WarningMsg       guifg=red       gui=bold,undercurl
hi ErrorMsg         guifg=red       gui=bold,undercurl
hi SpellErrors      guifg=red       gui=bold,undercurl
hi ModeMsg          guifg=blue      gui=bold
hi MoreMsg          guifg=blue      gui=bold
hi Question         guifg=blue      gui=bold
hi Directory        guifg=blue      gui=none
hi SpecialKey       guifg=#EEEEEE   gui=none
hi NonText          guifg=#EEEEEE   gui=none
hi CursorLineNr     guibg=#30474f   guifg=#EEEEEE   gui=bold
"hi LineNr          guibg=#262626   guifg=#DB4437 ctermfg=green  gui=bold
hi LineNr	          guibg=#202f36   guifg=#90f020	gui=bold	ctermfg=green cterm=none
hi Titled           guifg=#EEEEEE   gui=none

hi Pmenu            guibg=#64B5F6   guifg=#EEEEEE
hi PmenuSel         guibg=#f9cd63   guifg=#64B5F6
hi PmenuSBar        guibg=#ffffff   guifg=#EEEEEE
hi PmenuThumb       guibg=#64B5F6   guifg=#EEEEEE


hi Visual           guibg=#4E6068   guifg=white     gui=bold 
hi VertSplit        guibg=#c2bfa5   guifg=grey40    gui=none        cterm=reverse
hi VertSplit        guibg=#c2bfa5   guifg=grey40    gui=none        cterm=reverse
hi Folded           guibg=#427BDA   guifg=#EEEEEE   ctermfg=grey    ctermbg=darkgrey
hi FoldColumn       guibg=black     guifg=grey20    ctermfg=4       ctermbg=7
hi StatusLine       guibg=#c2bfa5   guifg=black     gui=none        cterm=bold,reverse
hi StatusLineNC     guibg=#c2bfa5   guifg=grey40    gui=none        cterm=reverse
hi WarningMsg       guifg=salmon    ctermfg=1
hi Ignore           guifg=grey40    cterm=bold      ctermfg=7
hi ErrorMsg         cterm=bold      guifg=White     guibg=Red       cterm=bold ctermfg=7 ctermbg=1
hi VisualNOS        cterm=bold,underline
