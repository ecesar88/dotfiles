" Vim color file
" Maintainer:	Siphalor
" Last Change:	$Date: 2018/08/27 $
" Version:	0.4

" cool help screens
" :he group-name
" :he highlight-groups
" :he cterm-colors

set background=dark
if version > 580
    " no guarantees for version 5.8 and below, but this makes it stop
    " complaining
    hi clear
    if exists("syntax_on")
	syntax reset
    endif
endif
let g:colors_name="atomified"

hi Normal       guifg=White guibg=grey18
hi Normal       ctermfg=White ctermbg=Black

" highlight groups
hi Cursor       guifg=NONE guibg=NONE gui=reverse
hi Cursor       ctermfg=Black ctermbg=White
hi CursorColumn guibg=grey28
hi CursorLine   guibg=grey28
hi CursorLineNr guibg=grey36 guifg=grey68 gui=none
hi def link Directory Special
hi DiffAdd      guibg=#33442e
hi DiffChange   guibg=grey18
hi DiffDelete   gui=bold guibg=#442e2e guifg=#722828
hi DiffText     gui=none guibg=#2e4444
hi EndOfBuffer  gui=bold guifg=grey68
hi Folded       guibg=grey28 guifg=gold
hi FoldColumn   guibg=grey28 guifg=tan
hi IncSearch    guibg=grey36 gui=none guifg=White
hi LineNr       guifg=grey68 guibg=grey28
hi LineNr       ctermfg=LightGray ctermbg=DarkGray gui=none
hi MatchParen   guibg=#58adaa guifg=grey18
hi ModeMsg      guifg=goldenrod gui=none
hi MoreMsg      guifg=SeaGreen gui=none
hi NonText      guifg=White guibg=grey28
hi NonText      ctermfg=White ctermbg=DarkGray
hi PMenu        guifg=White guibg=grey28
hi PMenuSel     guifg=White guibg=grey36
hi PMenuSBar    guibg=grey36
hi PMenuThumb   guibg=grey48
hi Question     guifg=springgreen
hi Search       guibg=grey28 gui=none guifg=grey80
hi Search       ctermfg=White ctermbg=DarkGray
hi SignColumn   guibg=grey28 guifg=White gui=bold
hi SpecialKey   guifg=#f88262
hi StatusLine   guibg=grey36 guifg=White gui=none
hi StatusLine   ctermfg=Black ctermbg=White cterm=none
hi StatusLineNC guibg=grey28 guifg=White gui=none
hi StatusLineNC ctermfg=White ctermbg=DarkGray cterm=none
hi Title        guifg=#e5ca00 gui=none
hi Title        ctermfg=Yellow
hi Visual       gui=none guibg=grey28
hi VertSplit    guifg=grey18 guibg=grey28 gui=bold
hi VertSplit    ctermfg=Black ctermbg=Gray cterm=none
hi WarningMsg   guifg=salmon

" syntax highlighting groups
hi Comment    	guifg=grey68
hi Comment      ctermfg=DarkGray
hi Constant	    guifg=#fc494c
hi Constant     ctermfg=Lightred
hi String       guifg=#6ba6e5
hi String       ctermfg=LightBlue
hi Character    guifg=#6ba6e5
hi Character    ctermfg=LightBlue
hi Number       guifg=#fcab4e
hi Number       ctermfg=Brown
hi Boolean      guifg=#fc494c
hi Boolean      ctermfg=LightRed
hi Identifier	guifg=#71dd58
hi Identifier   ctermfg=LightGreen
hi Statement	guifg=#efce2b gui=none
hi Statement	ctermfg=Yellow
hi Operator     guifg=White
hi Operator     ctermfg=White
hi PreProc      guifg=#b874db
hi PreProc      ctermfg=Magenta
hi PreCondit	guifg=#8a74db
hi PreCondit	ctermfg=DarkMagenta
hi Include      guifg=#db749d
hi Include      ctermfg=Magenta
hi Type         guifg=#e24f51 gui=none
hi Type         ctermfg=Red cterm=none
hi Special      guifg=#7eeff7
hi Special      ctermfg=Cyan
hi Ignore       guifg=grey40
hi Ignore       ctermfg=LightGray
hi Error        guifg=#c90808 guibg=grey18 gui=bold
hi Error        ctermfg=Red ctermbg=DarkGray
hi Todo         guifg=#77e02c guibg=grey18 gui=bold
hi Todo         ctermfg=LightGreen

" plugin highlights
" -> MatchTagAlways
"  NOTE: (for this you may want to `let g:mta_use_matchparen_group=0` and `g:mta_set_default_matchtag_color=0` in your vimrc)
hi MatchTag guibg=grey28 gui=none

" -> Tagbar
hi TagbarSignature           guifg=grey75
hi TagbarVisibilityProtected guifg=#42d6d6 gui=bold
hi TagbarVisibilityPrivate   guifg=#D83638 gui=bold
hi TagbarVisibilityPublic    guifg=#50D432 gui=bold
hi TagbarPseudoID            gui=none
