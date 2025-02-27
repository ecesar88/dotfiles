" 'adventurous.vim' -- Vim color scheme
" Maintainer: Drew Hays (drewshays+VIM@gmail.com)
" A recreation of https://github.com/philplckthun/Adventurous-Syntax by Phil Plückthun
" Color scheme format borrowed from https://github.com/romainl/Apprentice by Romain Lafourcade

" MADE-UP NAME       HEX       XTERM    ANSI
" ==========================================
" jake the dog       #F5BB12   214      3
" rawr               #FFC620   220      11
" peppermint butler  #D3422E   166      1
" finns bag          #4BAE16   70       10
" ice king           #7FD6FA   117      14
" finn the human     #277BD3   32       12
" heartbreaker       #F25A55   203      9
" princess           #DE347A   168      13
" adventure time     #3299CC   68       4
"
" cyan               #8ABEB7   109      6
" blue               #277BD3   32       12
" purple             #3299CC   68       4
" green              #4BAE16   70       10
" red                #F25A55   203      9
" dark red           #D3422E   166      1
" orange             #DE935F   173      1
" light orange       #F0C674   222      3
" bright orange      #F5BB12   214      3
" darkness           #191B1F   16       0
"
" very light gray    #C5C8C6   188      7
" light gray         #BDBDBD   145      8
" gray               #373B41   59       8
" dark gray          #24272D   16       0
" very dark gray     #191B1F   16       0
"
" energetic          #F5BB12   214      3
" hyperactive        #FFC620   220      11
" passive            #3299CC   68       4
" discrete           #BFD7DB   152      15
" ghostly            #404449   59       8
" posh               #D3422E   166      1
" warm               #F25A55   203      9
" positive           #4BAE16   70       10
" cold               #7FD6FA   117      14
" intensive          #277BD3   32       12
" important          #DE347A   168      13

hi clear
if exists('syntax_on')
    syntax reset
endif

set background=dark

let colors_name = 'adventurous'

if &t_Co >= 256 || has('gui_running')
    hi Normal            ctermbg=16   ctermfg=152 guibg=#191B1F guifg=#BFD7DB cterm=NONE gui=NONE

    set background=dark

    hi Comment           ctermbg=NONE ctermfg=59   guibg=NONE    guifg=#404449 cterm=NONE           gui=italic
    hi Constant          ctermbg=NONE ctermfg=32   guibg=NONE    guifg=#277BD3 cterm=NONE           gui=NONE
    hi Conditional       ctermbg=NONE ctermfg=214  guibg=NONE    guifg=#F5BB12 cterm=NONE           gui=NONE
    hi Number            ctermbg=NONE ctermfg=214  guibg=NONE    guifg=#F5BB12 cterm=NONE           gui=NONE
    hi Operator          ctermbg=NONE ctermfg=214  guibg=NONE    guifg=#F5BB12 cterm=NONE           gui=NONE
    hi Error             ctermbg=NONE ctermfg=203  guibg=NONE    guifg=#F25A55 cterm=reverse        gui=reverse
    hi Identifier        ctermbg=NONE ctermfg=32   guibg=NONE    guifg=#277BD3 cterm=NONE           gui=NONE
    hi Ignore            ctermbg=NONE ctermfg=NONE guibg=NONE    guifg=NONE    cterm=NONE           gui=NONE 
    hi PreProc           ctermbg=NONE ctermfg=214  guibg=NONE    guifg=#F5BB12 cterm=NONE           gui=NONE
    hi Special           ctermbg=NONE ctermfg=32   guibg=NONE    guifg=#277BD3 cterm=NONE           gui=NONE
    hi Statement         ctermbg=NONE ctermfg=203  guibg=NONE    guifg=#F25A55 cterm=NONE           gui=NONE
    hi String            ctermbg=NONE ctermfg=117  guibg=NONE    guifg=#7FD6FA cterm=NONE           gui=NONE
    hi Tag               ctermbg=NONE ctermfg=220  guibg=NONE    guifg=#FFC620 cterm=NONE           gui=NONE
    hi Todo              ctermbg=NONE ctermfg=NONE guibg=NONE    guifg=NONE    cterm=reverse        gui=reverse
    hi Type              ctermbg=NONE ctermfg=222  guibg=NONE    guifg=#F0C674 cterm=underline      gui=underline
    hi Underlined        ctermbg=NONE ctermfg=173  guibg=NONE    guifg=#DE935F cterm=underline      gui=underline

    hi LineNr            ctermbg=234  ctermfg=242  guibg=#1C1C1C guifg=#6C6C6C cterm=NONE           gui=NONE
    hi NonText           ctermbg=NONE ctermfg=152  guibg=NONE    guifg=#BFD7DB cterm=NONE           gui=NONE

    hi Pmenu             ctermbg=59   ctermfg=145  guibg=#373B41 guifg=#BDBDBD cterm=NONE           gui=NONE
    hi PmenuSbar         ctermbg=59   ctermfg=NONE guibg=#373B41 guifg=NONE    cterm=NONE           gui=NONE
    hi PmenuSel          ctermbg=109  ctermfg=16   guibg=#8ABEB7 guifg=#24272D cterm=NONE           gui=NONE
    hi PmenuThumb        ctermbg=109  ctermfg=109  guibg=#8ABEB7 guifg=#8ABEB7 cterm=NONE           gui=NONE

    hi ErrorMsg          ctermbg=16   ctermfg=166  guibg=#191B1F guifg=#D3422E cterm=reverse        gui=reverse
    hi ModeMsg           ctermbg=NONE ctermfg=70   guibg=NONE    guifg=#4BAE16 cterm=NONE           gui=NONE
    hi MoreMsg           ctermbg=NONE ctermfg=109  guibg=NONE    guifg=#8ABEB7 cterm=NONE           gui=NONE
    hi Question          ctermbg=NONE ctermfg=70   guibg=NONE    guifg=#4BAE16 cterm=NONE           gui=NONE
    hi WarningMsg        ctermbg=NONE ctermfg=166  guibg=NONE    guifg=#D3422E cterm=NONE           gui=NONE

    hi TabLineFill       ctermbg=NONE ctermfg=NONE guibg=#1B1D1E guifg=#1B1D1E cterm=NONE           gui=NONE
    hi TabLine           ctermbg=NONE ctermfg=NONE guibg=#1B1D1E guifg=#808080 cterm=NONE           gui=NONE

    hi Cursor            ctermbg=15   ctermfg=NONE guibg=#FFFFFF guifg=NONE    cterm=NONE           gui=NONE
    hi CursorColumn      ctermbg=16   ctermfg=NONE guibg=#191B1F guifg=NONE    cterm=NONE           gui=NONE
    hi CursorLine        ctermbg=16   ctermfg=NONE guibg=#191B1F guifg=NONE    cterm=NONE           gui=NONE
    hi CursorLineNr      ctermbg=235  ctermfg=249  guibg=#262626 guifg=#B2B2B2 cterm=NONE           gui=NONE

    hi helpLeadBlank     ctermbg=NONE ctermfg=NONE guibg=NONE    guifg=NONE    cterm=NONE           gui=NONE
    hi helpNormal        ctermbg=NONE ctermfg=NONE guibg=NONE    guifg=NONE    cterm=NONE           gui=NONE

    hi StatusLine        ctermbg=152  ctermfg=32   guibg=#BFD7DB guifg=#277BD3 cterm=NONE           gui=NONE
    hi StatusLineNC      ctermbg=32   ctermfg=152  guibg=#277BD3 guifg=#BFD7DB cterm=NONE           gui=NONE

    hi Visual            ctermbg=235  ctermfg=NONE guibg=#403D3D guifg=NONE    cterm=NONE           gui=NONE
    hi VisualNOS         ctermbg=NONE ctermfg=NONE guibg=NONE    guifg=NONE    cterm=underline      gui=underline

    hi FoldColumn        ctermbg=NONE ctermfg=59   guibg=NONE    guifg=#373B41 cterm=NONE           gui=NONE
    hi Folded            ctermbg=NONE ctermfg=59   guibg=NONE    guifg=#373B41 cterm=NONE           gui=NONE

    hi VertSplit         ctermbg=NONE ctermfg=145  guibg=NONE    guifg=#BDBDBD cterm=bold           gui=bold
    hi WildMenu          ctermbg=16   ctermfg=117  guibg=#191B1F guifg=#7FD6FA cterm=NONE           gui=NONE

    hi Function          ctermbg=NONE ctermfg=220  guibg=NONE    guifg=#FFC620 cterm=NONE           gui=NONE
    hi SpecialKey        ctermbg=NONE ctermfg=59   guibg=NONE    guifg=#404449 cterm=NONE           gui=NONE
    hi Title             ctermbg=NONE ctermfg=32   guibg=NONE    guifg=#277BD3 cterm=bold           gui=bold

    hi DiffAdd           ctermbg=16   ctermfg=NONE guibg=#24272D guifg=NONE    cterm=NONE           gui=NONE
    hi DiffChange        ctermbg=59   ctermfg=145  guibg=#373B41 guifg=#BDBDBD cterm=NONE           gui=NONE
    hi DiffDelete        ctermbg=16   ctermfg=166  guibg=#191B1F guifg=#D3422E cterm=NONE           gui=NONE
    hi DiffText          ctermbg=59   ctermfg=NONE guibg=#373B41 guifg=NONE    cterm=bold           gui=bold,italic

    hi IncSearch         ctermbg=214  ctermfg=16   guibg=#F5BB12 guifg=#191B1F cterm=NONE           gui=NONE
    hi Search            ctermbg=222  ctermfg=16   guibg=#F0C674 guifg=#191B1F cterm=NONE           gui=NONE

    hi Directory         ctermbg=NONE ctermfg=173  guibg=NONE    guifg=#DE935F cterm=NONE           gui=NONE
    hi MatchParen        ctermbg=NONE ctermfg=NONE guibg=NONE    guifg=NONE    cterm=underline      gui=underline

    hi SpellBad          ctermbg=NONE ctermfg=166  guibg=NONE    guifg=#D3422E cterm=undercurl      gui=undercurl         guisp=#D3422E
    hi SpellCap          ctermbg=NONE ctermfg=68   guibg=NONE    guifg=#3299CC cterm=undercurl      gui=undercurl         guisp=#3299CC
    hi SpellLocal        ctermbg=NONE ctermfg=68   guibg=NONE    guifg=#3299CC cterm=undercurl      gui=undercurl         guisp=#3299CC
    hi SpellRare         ctermbg=NONE ctermfg=109  guibg=NONE    guifg=#8ABEB7 cterm=undercurl      gui=undercurl         guisp=#8ABEB7

    hi ColorColumn       ctermbg=16   ctermfg=NONE guibg=#24272D guifg=NONE    cterm=NONE           gui=NONE
    hi SignColumn        ctermbg=234  ctermfg=242  guibg=#1C1C1C guifg=#6C6C6C cterm=NONE           gui=NONE

    " Some specific things that I want
    hi coffeeObjAssign   ctermbg=NONE ctermfg=220  guibg=NONE    guifg=#FFC620 cterm=NONE           gui=NONE
    hi coffeeInterpDelim ctermbg=NONE ctermfg=203  guibg=#F25A55 guifg=NONE    cterm=NONE           gui=NONE
elseif &t_Co == 8 || $TERM !~# '^linux' || &t_Co == 16

endif

hi link Boolean             Constant
hi link Character           Constant
hi link Conceal             Constant
hi link Debug               Special
hi link Define              PreProc
hi link Delimiter           Special
hi link Exception           Statement
hi link Float               Number
hi link HelpCommand         Statement
hi link HelpExample         Statement
hi link Include             PreProc
hi link Keyword             Statement
hi link Label               Statement
hi link Macro               PreProc
hi link PreCondit           PreProc
hi link Repeat              Statement
hi link SpecialChar         Special
hi link SpecialComment      Special
hi link StorageClass        Type
hi link Structure           Type
hi link Typedef             Type

hi link htmlEndTag          htmlTagName
hi link htmlLink            Function
hi link htmlSpecialTagName  htmlTagName
hi link htmlTag             htmlTagName
hi link xmlTag              Statement
hi link xmlTagName          Statement
hi link xmlEndTag           Statement

hi link diffBDiffer        WarningMsg
hi link diffCommon         WarningMsg
hi link diffDiffer         WarningMsg
hi link diffIdentical      WarningMsg
hi link diffIsA            WarningMsg
hi link diffNoEOL          WarningMsg
hi link diffOnly           WarningMsg
hi link diffRemoved        WarningMsg
hi link diffAdded          String

