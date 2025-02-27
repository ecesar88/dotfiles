"   __          __
" _/  |_  ____ |  | ____ ___. ____
" \   __\/    \|  |/ |  V   |/    \ 
"  |  | (  ()  )    < \___  (  ()  )
"  |__|  \____/|__|__\|_____|\____/
"   _____   _____/  |________  ____
"  /     \_/ __ \   __\_  __ \/    \ 
" |  Y Y  \  ___/|  |  |  | \(  ()  )
" |__|_|__/\____||__|  |__|   \____/
"
"
" File:       tokyo-metro.vim
" Maintainer: koirand <koirand.jp@gmail.com>
" Modified:   2018-08-31 13:19+0900
" License:    MIT


if !has('gui_running') && &t_Co < 256
  finish
endif

set background=dark
hi clear

if exists('syntax_on')
  syntax reset
endif

let g:colors_name = expand('<sfile>:t:r')


hi! ColorColumn cterm=NONE ctermbg=235 guibg=#1e2132
hi! CursorColumn cterm=NONE ctermbg=235 guibg=#1e2132
hi! CursorLine cterm=NONE ctermbg=235 guibg=#1e2132
hi! Comment ctermfg=243 guifg=#6b7089
hi! Constant ctermfg=141 guifg=#8b76d0
hi! Cursor ctermbg=252 ctermfg=234 guibg=#abadb3 guifg=#161821
hi! CursorLineNr ctermbg=237 ctermfg=253 guibg=#2a3158 guifg=#cdd1e6
hi! Delimiter ctermfg=252 guifg=#abadb3
hi! DiffAdd ctermbg=130 ctermfg=224 guibg=#47413a guifg=#b0aaa0
hi! DiffChange ctermbg=32 ctermfg=14 guibg=#233e4f guifg=#8ba7b5
hi! DiffDelete ctermbg=124 ctermfg=224 guibg=#53242a guifg=#bb8c90
hi! DiffText cterm=NONE ctermbg=30 ctermfg=195 gui=NONE guibg=#31657d guifg=#abadb3
hi! Directory ctermfg=38 guifg=#4399bb
hi! Error ctermbg=234 ctermfg=196 guibg=#161821 guifg=#e24240
hi! ErrorMsg ctermbg=234 ctermfg=196 guibg=#161821 guifg=#e24240
hi! WarningMsg ctermbg=234 ctermfg=196 guibg=#161821 guifg=#e24240
hi! EndOfBuffer ctermbg=234 ctermfg=236 guibg=#161821 guifg=#242940
hi! NonText ctermbg=234 ctermfg=236 guibg=#161821 guifg=#242940
hi! SpecialKey ctermbg=234 ctermfg=236 guibg=#161821 guifg=#242940
hi! Folded ctermbg=235 ctermfg=245 guibg=#1e2132 guifg=#686f9a
hi! FoldColumn ctermbg=235 ctermfg=239 guibg=#1e2132 guifg=#444b71
hi! Function ctermfg=41 guifg=#56b88a
hi! Identifier cterm=NONE ctermfg=38 guifg=#4399bb
hi! Include ctermfg=41 guifg=#56b88a
hi! LineNr ctermbg=235 ctermfg=239 guibg=#1e2132 guifg=#444b71
hi! MatchParen ctermbg=237 ctermfg=255 guibg=#3e445e guifg=#ffffff
hi! MoreMsg ctermfg=180 guifg=#bca375
hi! Normal ctermbg=234 ctermfg=252 guibg=#161821 guifg=#abadb3
hi! Operator ctermfg=94 guifg=#91603a
hi! Pmenu ctermbg=236 ctermfg=251 guibg=#3d425b guifg=#abadb3
hi! PmenuSbar ctermbg=236 guibg=#3d425b
hi! PmenuSel ctermbg=240 ctermfg=255 guibg=#5b6389 guifg=#eff0f4
hi! PmenuThumb ctermbg=251 guibg=#abadb3
hi! PreProc ctermfg=180 guifg=#bca375
hi! Question ctermfg=180 guifg=#bca375
hi! QuickFixLine ctermbg=236 ctermfg=252 guibg=#272c42 guifg=#abadb3
hi! Search ctermbg=215 ctermfg=234 guibg=#e4b580 guifg=#392713
hi! SignColumn ctermbg=235 ctermfg=239 guibg=#1e2132 guifg=#444b71
hi! Special ctermfg=180 guifg=#bca375
hi! SpellBad ctermbg=124 ctermfg=252 gui=undercurl guisp=#e24240
hi! SpellCap ctermbg=137 ctermfg=252 gui=undercurl guisp=#f19a36
hi! SpellLocal ctermbg=32 ctermfg=252 gui=undercurl guisp=#4399bb
hi! SpellRare ctermbg=61 ctermfg=252 gui=undercurl guisp=#8b76d0
hi! Statement ctermfg=41 gui=NONE guifg=#56b88a
hi! StatusLine cterm=reverse ctermbg=234 ctermfg=245 gui=reverse guibg=#17171b guifg=#818596 term=reverse
hi! StatusLineTerm cterm=reverse ctermbg=234 ctermfg=245 gui=reverse guibg=#17171b guifg=#818596 term=reverse
hi! StatusLineNC cterm=reverse ctermbg=238 ctermfg=233 gui=reverse guibg=#3e445e guifg=#0f1117
hi! StatusLineTermNC cterm=reverse ctermbg=238 ctermfg=233 gui=reverse guibg=#3e445e guifg=#0f1117
hi! StorageClass ctermfg=41 guifg=#56b88a
hi! String ctermfg=38 guifg=#4399bb
hi! Structure ctermfg=41 guifg=#56b88a
hi! TabLine cterm=NONE ctermbg=245 ctermfg=234 gui=NONE guibg=#818596 guifg=#17171b
hi! TabLineFill cterm=reverse ctermbg=234 ctermfg=245 gui=reverse guibg=#17171b guifg=#818596
hi! TabLineSel cterm=NONE ctermbg=234 ctermfg=252 gui=NONE guibg=#161821 guifg=#85878e
hi! Title ctermfg=215 gui=NONE guifg=#f19a36
hi! Todo ctermbg=234 ctermfg=180 guibg=#47413a guifg=#bca375
hi! Type ctermfg=43 gui=NONE guifg=#4da79a
hi! Underlined cterm=underline ctermfg=41 gui=underline guifg=#56b88a term=underline
hi! VertSplit cterm=NONE ctermbg=233 ctermfg=233 gui=NONE guibg=#0f1117 guifg=#0f1117
hi! Visual ctermbg=236 guibg=#272c42
hi! WildMenu ctermbg=255 ctermfg=234 guibg=#d4d5db guifg=#17171b
hi! diffAdded ctermfg=180 guifg=#bca375
hi! diffRemoved ctermfg=196 guifg=#e24240
hi! ALEErrorSign ctermbg=235 ctermfg=196 guibg=#1e2132 guifg=#e24240
hi! ALEWarningSign ctermbg=235 ctermfg=215 guibg=#1e2132 guifg=#f19a36
hi! CtrlPMode1 ctermbg=241 ctermfg=234 guibg=#5a5f72 guifg=#17171b
hi! EasyMotionShade ctermfg=239 guifg=#3d425b
hi! EasyMotionTarget ctermfg=180 guifg=#bca375
hi! EasyMotionTarget2First ctermfg=215 guifg=#f19a36
hi! EasyMotionTarget2Second ctermfg=215 guifg=#f19a36
hi! GitGutterAdd ctermbg=235 ctermfg=180 guibg=#1e2132 guifg=#bca375
hi! GitGutterChange ctermbg=235 ctermfg=38 guibg=#1e2132 guifg=#4399bb
hi! GitGutterChangeDelete ctermbg=235 ctermfg=38 guibg=#1e2132 guifg=#4399bb
hi! GitGutterDelete ctermbg=235 ctermfg=196 guibg=#1e2132 guifg=#e24240
hi! Sneak ctermbg=141 ctermfg=234 guibg=#8b76d0 guifg=#161821
hi! SneakScope ctermbg=236 ctermfg=243 guibg=#272c42 guifg=#6b7089
hi! SyntasticErrorSign ctermbg=235 ctermfg=196 guibg=#1e2132 guifg=#e24240
hi! SyntasticStyleErrorSign ctermbg=235 ctermfg=196 guibg=#1e2132 guifg=#e24240
hi! SyntasticStyleWarningSign ctermbg=235 ctermfg=215 guibg=#1e2132 guifg=#f19a36
hi! SyntasticWarningSign ctermbg=235 ctermfg=215 guibg=#1e2132 guifg=#f19a36
hi! ZenSpace ctermbg=196 guibg=#e24240
hi! icebergALAccentRed ctermfg=196 guifg=#e24240

hi! link cssBraces Delimiter
hi! link cssClassName Special
hi! link cssClassNameDot Normal
hi! link cssPseudoClassId Special
hi! link cssTagName Statement
hi! link helpHyperTextJump Constant
hi! link htmlArg Constant
hi! link htmlEndTag Statement
hi! link htmlTag Statement
hi! link jsonQuote Normal
hi! link phpVarSelector Identifier
hi! link pythonFunction Title
hi! link rubyDefine Statement
hi! link rubyFunction Title
hi! link rubyInterpolationDelimiter String
hi! link rubySharpBang Comment
hi! link rubyStringDelimiter String
hi! link sassClass Special
hi! link shFunction Normal
hi! link vimContinue Comment
hi! link vimFuncSID vimFunction
hi! link vimFuncVar Normal
hi! link vimFunction Title
hi! link vimGroup Statement
hi! link vimHiGroup Statement
hi! link vimHiTerm Identifier
hi! link vimMapModKey Special
hi! link vimOption Identifier
hi! link vimVar Normal
hi! link xmlAttrib Constant
hi! link xmlAttribPunct Statement
hi! link xmlEndTag Statement
hi! link xmlNamespace Statement
hi! link xmlTag Statement
hi! link xmlTagName Statement
hi! link yamlKeyValueDelimiter Delimiter
hi! link CtrlPPrtCursor Cursor
hi! link CtrlPMatch Title
hi! link CtrlPMode2 StatusLine
hi! link deniteMatched Normal
hi! link deniteMatchedChar Title
hi! link jsFlowMaybe Normal
hi! link jsFlowObject Normal
hi! link jsFlowType PreProc
hi! link graphqlName Normal
hi! link graphqlOperator Normal
hi! link jsArrowFunction Operator
hi! link jsClassDefinition Normal
hi! link jsClassFuncName Title
hi! link jsExport Statement
hi! link jsFuncName Title
hi! link jsFuncCall Normal
hi! link jsGlobalObjects Statement
hi! link jsModuleKeywords Statement
hi! link jsModuleOperators Statement
hi! link jsNull Constant
hi! link jsObjectFuncName Title
hi! link jsObjectKey Identifier
hi! link jsSuper Statement
hi! link jsTemplateBraces Special
hi! link jsUndefined Constant
hi! link markdownBold Special
hi! link markdownCode String
hi! link markdownCodeDelimiter String
hi! link markdownHeadingDelimiter Comment
hi! link markdownRule Comment
hi! link ngxDirective Statement
hi! link plug1 Normal
hi! link plug2 Identifier
hi! link plugDash Comment
hi! link plugMessage Special
hi! link SignifySignAdd GitGutterAdd
hi! link SignifySignChange GitGutterChange
hi! link SignifySignChangeDelete GitGutterChangeDelete
hi! link SignifySignDelete GitGutterDelete
hi! link SignifySignDeleteFirstLine SignifySignDelete
hi! link StartifyBracket Comment
hi! link StartifyFile Identifier
hi! link StartifyFooter Constant
hi! link StartifyHeader Constant
hi! link StartifyNumber Special
hi! link StartifyPath Comment
hi! link StartifySection Statement
hi! link StartifySlash Comment
hi! link StartifySpecial Normal
hi! link svssBraces Delimiter
hi! link swiftIdentifier Normal
hi! link typescriptAjaxMethods Normal
hi! link typescriptBraces Normal
hi! link typescriptEndColons Normal
hi! link typescriptFuncKeyword Statement
hi! link typescriptGlobalObjects Statement
hi! link typescriptHtmlElemProperties Normal
hi! link typescriptIdentifier Statement
hi! link typescriptMessage Normal
hi! link typescriptNull Constant
hi! link typescriptParens Normal

if has('nvim')
  let g:terminal_color_0 = '#1e2132'
  let g:terminal_color_1 = '#e24240'
  let g:terminal_color_2 = '#bca375'
  let g:terminal_color_3 = '#f19a36'
  let g:terminal_color_4 = '#56b88a'
  let g:terminal_color_5 = '#8b76d0'
  let g:terminal_color_6 = '#4399bb'
  let g:terminal_color_7 = '#abadb3'
  let g:terminal_color_8 = '#6b7089'
  let g:terminal_color_9 = '#ea5351'
  let g:terminal_color_10 = '#c8af81'
  let g:terminal_color_11 = '#f7a649'
  let g:terminal_color_12 = '#62c496'
  let g:terminal_color_13 = '#9885da'
  let g:terminal_color_14 = '#4fa5c7'
  let g:terminal_color_15 = '#b5b8c2'
else
  let g:terminal_ansi_colors = ['#1e2132', '#e24240', '#bca375', '#f19a36', '#56b88a', '#8b76d0', '#4399bb', '#abadb3', '#6b7089', '#ea5351', '#c8af81', '#f7a649', '#62c496', '#9885da', '#4fa5c7', '#b5b8c2']
endif

