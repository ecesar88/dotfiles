#!/bin/sh

if [ "$(pgrep -x redshift)" ]; then
    temp=$(redshift -p 2> /dev/null | grep temp | cut -d ":" -f 2 | tr -dc "[:digit:]")

    if [ -z "$temp" ]; then
        echo "%{F#65737E}  $temp"K
    elif [ "$temp" -ge 5500 ]; then
        echo "%{F#FFEDDE}  $temp"K
    elif [ "$temp" -ge 5000 ]; then
        echo "%{F#FFE4CE}  $temp"K
    elif [ "$temp" -ge 4000 ]; then
        echo "%{F#FFCEA6}  $temp"K
    else
        echo "%{F#D08770}  $temp"K
    fi
fi
