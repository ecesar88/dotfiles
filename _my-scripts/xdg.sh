#!/bin/bash
# github.com/mamutal91

# Query filetype:
# Para descobrir o formato do arquivo
# xdg-mime query filetype file.txt
# xdg-mime query default file.txt

# Web
xdg-mime default firefox.desktop 'x-scheme-handler/about'
xdg-mime default firefox.desktop 'x-scheme-handler/htm'
xdg-mime default firefox.desktop 'x-scheme-handler/html'
xdg-mime default firefox.desktop 'x-scheme-handler/http'
xdg-mime default firefox.desktop 'x-scheme-handler/https'

# Images
xdg-mime default gpicview.desktop image/jpg
xdg-mime default gpicview.desktop image/jpeg
xdg-mime default gpicview.desktop image/png
xdg-mime default gpicview.desktop image/gif

# Videos
xdg-mime default smplayer.desktop video/x-matroska

# Text
xdg-mime default atom.desktop text/plain

# Shel Script
xdg-mime default sublime_text_3.desktop text/x-shellscript
