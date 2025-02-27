#!/bin/bash
file="/home/zsucrilhos/Screenshots/screenshot_$(date "+%Y-%m-%d_%H-%M-%S").png"
maim -u -f png $file
dunstify -i ~/_my-scripts/_icons/screenshot-full.png -u critical "System" "Screenshot saved!"
xclip -selection c -t "image/png" -i $file
