" -------------------------------------------------------
" (c) 2018 Henry Newcomer
" "Papaya"
"    - A Vim color scheme
" -------------------------------------------------------
" Source: https://github.com/HenryNewcomer/vim-theme-papaya
" -------------------------------------------------------


" Basic init
scriptencoding utf-8
set background=dark
if version > 580
  hi clear
  if exists("syntax_on")
    syntax reset
  endif
endif
syntax enable
set t_Co=256
let g:colors_name = "papaya"


" ----
" Papaya config
" ----

if ! exists('g:papaya_gui_color')
  let g:papaya_gui_color = 'default'
endif

" ----
" Functions; outputs the highlight strings
" ----

function! SetHiGui(group, ...)
  let theme_string = 'hi! ' . a:group . ' '
  if strlen(a:1)
    let theme_string .= 'guifg=' . a:1 . ' '
  endif
  if strlen(a:2)
    let theme_string .= 'guibg=' . a:2 . ' '
  endif
  if strlen(a:3)
    let theme_string .= 'gui=' . a:3 . ' '
  endif
  if a:0 >= 4 && strlen(a:4)
    let theme_string .= 'guisp=' . a:4
  endif
  execute theme_string
endfunction

function! SetHi256(group, ...)
  let theme_string = 'hi! ' . a:group . ' '
  if strlen(a:1)
    let theme_string .= 'ctermfg=' . a:1 . ' '
  endif
  if strlen(a:2)
    let theme_string .= 'ctermbg=' . a:2 . ' '
  endif
  if a:0 >= 3 && strlen(a:3)
    let theme_string .= 'cterm=' . a:3
  endif
  execute theme_string
endfunction

function! SetHiLink(group, linkTo)
  let theme_string = 'hi! link ' . a:group . ' ' . a:linkTo
  execute theme_string
endfunction


" ----
" Define main color scheme properties
" ----

call SetHiGui("Boolean", "#a1a6a8", "NONE", "NONE", "NONE")
call SetHi256("Boolean", "145", "NONE", "NONE")

call SetHiGui("Character", "#a1a6a8", "NONE", "NONE", "NONE")
call SetHi256("Character", "248", "NONE", "NONE")

call SetHiGui("Comment", "#63616e", "NONE", "italic", "NONE")
call SetHi256("Comment", "240", "NONE", "italic")

call SetHiGui("Conditional", "#f8be5a", "NONE", "NONE", "NONE")
call SetHi256("Conditional", "214", "NONE", "NONE")

call SetHiGui("Constant", "#9760d1", "NONE", "bold", "NONE")
call SetHi256("Constant", "98", "NONE", "bold")

call SetHiGui("Cursor", "#000000", "#abbed1", "NONE", "#abbed1")
call SetHi256("Cursor", "NONE", "146", "NONE")

call SetHiGui("CursorColumn", "NONE", "#2a2732", "NONE", "#2a2732")
call SetHi256("CursorColumn", "NONE", "236", "NONE")

call SetHiGui("cursorim", "#192224", "#536991", "NONE", "#536991")
call SetHi256("cursorim", "235", "60", "NONE")

call SetHiGui("CursorLine", "NONE", "#2a2732", "NONE", "#2a2732")
call SetHi256("CursorLine", "NONE", "236", "NONE")

call SetHiGui("Debug", "#ba9f7e", "NONE", "NONE", "NONE")
call SetHi256("Debug", "137", "NONE", "NONE")

call SetHiGui("Define", "#ba9f7e", "NONE", "NONE", "NONE")
call SetHi256("Define", "137", "NONE", "NONE")

call SetHiLink("Delimiter", "Function")

call SetHiGui("DiffAdd", "#9ade91", "#00b34e", "NONE", "#00b34e")
call SetHi256("DiffAdd", "114", "35", "NONE")

call SetHiGui("DiffChange", "#5c1313", "#8a2c36", "NONE", "#8a2c36")
call SetHi256("DiffChange", "52", "88", "underline")

call SetHiGui("DiffDelete", "NONE", "#192224", "NONE", "#192224")
call SetHi256("DiffDelete", "NONE", "235", "underline")

call SetHiGui("DiffText", "#5c1d1d", "#ad3e48", "NONE", "#ad3e48")
call SetHi256("DiffText", "52", "131", "NONE")

call SetHiGui("Directory", "#536991", "NONE", "NONE", "NONE")
call SetHi256("Directory", "60", "NONE", "NONE")

call SetHiGui("Error", "#e84545", "#ad0025", "NONE", "#ad0025")
call SetHi256("Error", "167", "1", "NONE")

call SetHiLink("ErrorMsg", "Error")

call SetHiGui("Exception", "#8a8a8a", "NONE", "NONE", "NONE")
call SetHi256("Exception", "245", "NONE", "NONE")

call SetHiGui("Float", "#a1a6a8", "NONE", "NONE", "NONE")
call SetHi256("Float", "248", "NONE", "NONE")

call SetHiGui("FoldColumn", "#192224", "#a1a6a8", "italic", "#a1a6a8")
call SetHi256("FoldColumn", "235", "248", "NONE")

call SetHiLink("Folded", "FoldColumn")

call SetHiGui("Function", "#4b8bc8", "NONE", "NONE", "NONE")
call SetHi256("Function", "68", "NONE", "NONE")

call SetHiLink("Identifier", "Function")

call SetHiGui("IncSearch", "#162a66", "#035fb0", "NONE", "#035fb0")
call SetHi256("IncSearch", "17", "25", "NONE")

call SetHiGui("Include", "#ba9f7e", "NONE", "NONE", "NONE")
call SetHi256("Include", "137", "NONE", "NONE")

call SetHiGui("Keyword", "#d957b6", "NONE", "NONE", "NONE")
call SetHi256("Keyword", "169", "NONE", "NONE")

call SetHiGui("Label", "#ba9f7e", "NONE", "NONE", "NONE")
call SetHi256("Label", "137", "NONE", "NONE")

call SetHiGui("LineNr", "#48464e", "#16151a", "NONE", "#18171c")
call SetHi256("LineNr", "59", "234", "NONE")

call SetHiGui("Macro", "#ba9f7e", "NONE", "NONE", "NONE")
call SetHi256("Macro", "137", "NONE", "NONE")

call SetHiGui("MatchParen", "#c8a44b", "NONE", "NONE", "NONE")
call SetHi256("MatchParen", "179", "NONE", "NONE")

call SetHiGui("ModeMsg", "#f9f9f9", "#192224", "NONE", "#192224")
call SetHi256("ModeMsg", "15", "235", "NONE")

call SetHiGui("MoreMsg", "#ba9f7e", "NONE", "NONE", "NONE")
call SetHi256("MoreMsg", "137", "NONE", "NONE")

call SetHiGui("NonText", "#5e6c70", "NONE", "italic", "NONE")
call SetHi256("NonText", "66", "NONE", "NONE")

call SetHiGui("Normal", "#b6d3e3", "#1f1e24", "NONE")
call SetHi256("Normal", "152", "235", "NONE")

call SetHiGui("Number", "#bd7b6f", "NONE", "NONE", "NONE")
call SetHi256("Number", "131", "NONE", "NONE")

call SetHiGui("Operator", "#604f75", "NONE", "NONE", "NONE")
call SetHi256("Operator", "60", "NONE", "NONE")

call SetHiGui("PMenu", "#1b2633", "#34475e", "NONE", "#34475e")
call SetHi256("PMenu", "236", "60", "NONE")

call SetHiGui("PMenuSbar", "#ff0000", "#26384d", "NONE", "#26384d")
call SetHi256("PMenuSbar", "196", "239", "NONE")

call SetHiGui("PMenuSel", "#8ab7eb", "#5a7491", "NONE", "#5a7491")
call SetHi256("PMenuSel", "110", "60", "NONE")

call SetHiGui("PMenuThumb", "NONE", "#3a6aa1", "NONE", "#3a6aa1")
call SetHi256("PMenuThumb", "NONE", "67", "NONE")

call SetHiGui("PreCondit", "#05ff48", "NONE", "NONE", "NONE")
call SetHi256("PreCondit", "47", "NONE", "NONE")

call SetHiGui("PreProc", "#72badb", "NONE", "NONE", "NONE")
call SetHi256("PreProc", "74", "NONE", "NONE")

call SetHiGui("Repeat", "#ba9f7e", "NONE", "NONE", "NONE")
call SetHi256("Repeat", "137", "NONE", "NONE")

call SetHiGui("Search", "#00eaff", "#0088ff", "NONE", "#0088ff")
call SetHi256("Search", "45", "33", "NONE")

call SetHiGui("SignColumn", "#192224", "#536991", "NONE", "#536991")
call SetHi256("SignColumn", "235", "60", "NONE")

call SetHiGui("Special", "#ba9f7e", "NONE", "NONE", "NONE")
call SetHi256("Special", "137", "NONE", "NONE")

call SetHiGui("SpecialChar", "#ba9f7e", "NONE", "NONE", "NONE")
call SetHi256("SpecialChar", "137", "NONE", "NONE")

call SetHiGui("SpecialComment", "#ba9f7e", "NONE", "NONE", "NONE")
call SetHi256("SpecialComment", "137", "NONE", "NONE")

call SetHiGui("SpecialKey", "#5e6c70", "NONE", "italic", "NONE")
call SetHi256("SpecialKey", "66", "NONE", "NONE")

call SetHiGui("SpellBad", "#c19392", "NONE", "underline")
call SetHi256("SpellBad", "138", "NONE", "underline")

call SetHiLink("SpellCap", "SpellBad")
call SetHiLink("SpellLocal", "SpellBad")
call SetHiLink("SpellRare", "SpellBad")
call SetHiLink("SpellRare", "SpellBad")

call SetHiGui("Statement", "#5dc271", "NONE", "NONE", "NONE")
call SetHi256("Statement", "78", "NONE", "NONE")

call SetHiGui("StatusLine", "#1f1e24", "#434557", "NONE", "#434557")
call SetHi256("StatusLine", "235", "240", "NONE")

call SetHiGui("StatusLineNC", "#52505c", "#302e3d", "NONE", "#302e3d")
call SetHi256("StatusLineNC", "59", "237", "NONE")

call SetHiGui("StorageClass", "#536991", "NONE", "NONE", "NONE")
call SetHi256("StorageClass", "60", "NONE", "NONE")

call SetHiGui("String", "#6b7e8f", "NONE", "NONE", "NONE")
call SetHi256("String", "66", "NONE", "NONE")

call SetHiGui("Structure", "#536991", "NONE", "NONE", "NONE")
call SetHi256("Structure", "60", "NONE", "NONE")

call SetHiGui("TabLine", "#28272e", "#121117", "NONE", "#121117")
call SetHi256("TabLine", "236", "233", "NONE")

call SetHiGui("TabLineFill", "#191f24", "#0a090f", "NONE", "#0a090f")
call SetHi256("TabLineFill", "235", "233", "NONE")

call SetHiGui("TabLineSel", "#d4d4d4", "#1f1e24", "NONE", "#1f1e24")
call SetHi256("TabLineSel", "188", "235", "NONE")

call SetHiGui("Tag", "#ba9f7e", "NONE", "NONE", "NONE")
call SetHi256("Tag", "137", "NONE", "NONE")

call SetHiGui("Title", "#f9f9ff", "NONE", "NONE", "#263340")
call SetHi256("Title", "189", "NONE", "NONE")

call SetHiGui("Todo", "#e66177", "NONE", "bold", "#16131f")
call SetHi256("Todo", "167", "NONE", "bold")

call SetHiGui("Type", "#0088ff", "NONE", "NONE", "NONE")
call SetHi256("Type", "33", "NONE", "NONE")

call SetHiGui("Typedef", "#536991", "NONE", "NONE", "NONE")
call SetHi256("Typedef", "60", "NONE", "NONE")

call SetHiGui("Underlined", "#f9f9ff", "#192224", "underline", "#192224")
call SetHi256("Underlined", "189", "235", "underline")

call SetHiGui("VertSplit", "#5e6c70", "NONE", "NONE", "#5e6c70")
call SetHi256("VertSplit", "59", "NONE", "NONE")

call SetHiGui("Visual", "#192224", "#f9f9ff", "NONE", "#f9f9ff")
call SetHi256("Visual", "235", "189", "NONE")

call SetHiGui("VisualNOS", "#192224", "#f9f9ff", "underline", "#f9f9ff")
call SetHi256("VisualNOS", "235", "189", "underline")

call SetHiGui("WarningMsg", "#a1a6a8", "#912c00", "NONE", "#912c00")
call SetHi256("WarningMsg", "248", "88", "NONE")

call SetHiGui("WildMenu", "NONE", "#a1a6a8", "NONE", "#a1a6a8")
call SetHi256("WildMenu", "NONE", "248", "NONE")


" ----
" Language Specific
" ----

" JavaScript
call SetHiGui("javaScriptBraces", "#ba7e88", "NONE", "NONE", "NONE")
call SetHi256("javaScriptBraces", "169", "NONE", "NONE")
call SetHiLink("javaScriptFunction", "Function")
call SetHiLink("javaScriptNumber", "Number")

" HTML
call SetHiGui("htmlTag", "#437740", "NONE", "NONE")
call SetHi256("htmlTag", "65", "NONE", "NONE")
call SetHiLink("htmlEndTag", "htmlTag")
call SetHiLink("htmlTagN", "htmlTag")

" Markdown
call SetHiGui("markdownBold", "#ffffff", "NONE", "bold")
call SetHi256("markdownBold", "15", "NONE", "bold")
call SetHiGui("markdownCodeBlock", "#a7a2c3", "#29282d", "NONE")
call SetHi256("markdownCodeBlock", "145", "59", "NONE")
call SetHiLink("markdownCodeDelimiter", "markdownCodeBlock")
call SetHiGui("markdownH1", "#73d677", "NONE", "NONE")
call SetHi256("markdownH1", "78", "NONE", "NONE")
call SetHiLink("markdownH2", "markdownH1")
call SetHiLink("markdownH3", "markdownH1")
call SetHiLink("markdownH4", "markdownH1")
call SetHiLink("markdownH5", "markdownH1")
call SetHiLink("markdownH6", "markdownH1")
call SetHiGui("markdownHeadingDelimiter", "#73d677", "NONE", "bold")
call SetHi256("markdownHeadingDelimiter", "78", "NONE", "bold")
call SetHiLink("markdownInlineCode", "markdownCodeBlock")
call SetHiGui("markdownInlineDelimiter", "#ffffff", "NONE", "NONE")
call SetHi256("markdownInlineDelimiter", "15", "NONE", "NONE")
call SetHiGui("markdownItalic", "#ffffff", "NONE", "italic")
call SetHi256("markdownItalic", "15", "NONE", "italic")
call SetHiGui("markdownItemDelimiter", "#05ff48", "NONE", "bold")
call SetHi256("markdownItemDelimiter", "47", "NONE", "bold")
call SetHiGui("markdownLinkContainer", "#535a77", "NONE", "NONE")
call SetHi256("markdownLinkContainer", "60", "NONE", "NONE")
call SetHiLink("markdownLinkInText", "String")
call SetHiLink("markdownLinkText", "Number")
call SetHiLink("markdownLinkTextContainer", "markdownLinkContainer")
call SetHiLink("markdownLinkUrlContainer", "Function")
call SetHiGui("markdownLinkUrl", "#ffffff", "NONE", "italic")
call SetHi256("markdownLinkUrl", "15", "NONE", "italic")
call SetHiGui("markdownListItemAtLevel1", "#7bb58a", "NONE", "NONE")
call SetHi256("markdownListItemAtLevel1", "108", "NONE", "NONE")
call SetHiGui("markdownListItemAtLevel2", "#3e8150", "NONE", "NONE")
call SetHi256("markdownListItemAtLevel2", "65", "NONE", "NONE")
call SetHiLink("markdownRule", "Constant")
call SetHiLink("markdownTextContainer", "Function")
call SetHiLink("markdownUrlLinkInText", "markdownLinkUrl")
call SetHiLink("markdownXmlElement", "htmlTag")


" ----
" Plugin related colors
" ----

let g:indentLine_color_gui = '#535261'
"let g:indentLine_bgcolor_gui = '#1f1e24'


" ----
" Miscellaneous
" ----

" Sets the OverLength if in .vimrc: match OverLength /\%81v.\+/
call SetHiGui("OverLength", "NONE", "#110f17", "NONE")
call SetHi256("OverLength", "233", "59", "NONE")

" Fixes the yellow relative number
call SetHiGui("CursorLineNr", "#171717", "#443e4f", "NONE", "#344b59")
call SetHi256("CursorLineNr", "233", "59", "NONE")

" ----
" Overwrite colors if alternative Papaya scheme is called
" ----

if g:papaya_gui_color == 'blue'
  call SetHiGui("CursorLine", "NONE", "#12171c", "NONE", "NONE")
  call SetHiGui("CursorLineNr", "#12171c", "#5a6f77", "NONE")
  call SetHiGui("LineNr", "#5a6f77", "#12171c", "NONE")
  call SetHiGui("Normal", "#b6d3e3", "#18222c", "NONE")
  let g:indentLine_color_gui = '#2f3842'
endif


" ----
" Extra settings currently without values
" ----

"hi CTagsMember -- no settings --
"hi CTagsGlobalConstant -- no settings --
"hi Ignore -- no settings --
"hi CTagsImport -- no settings --
"hi CTagsGlobalVariable -- no settings --
"hi EnumerationValue -- no settings --
"hi Union -- no settings --
"hi Question -- no settings --
"hi EnumerationName -- no settings --
"hi DefinedName -- no settings --
"hi LocalVariable -- no settings --
"hi CTagsClass -- no settings --
"hi clear -- no settings --

" ----
" EoF

