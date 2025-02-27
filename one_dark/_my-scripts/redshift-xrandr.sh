#!/bin/sh

# Get the gamma values from xrandr. When redshift isn't on, all values are 1.0.
GAMMAX=$(xrandr --verbose | grep 'Gamma' | awk -F ':' '{print $2}' | tr -d ' ')
GAMMAY=$(xrandr --verbose | grep 'Gamma' | awk -F ':' '{print $3}' | tr -d ' ')
GAMMAZ=$(xrandr --verbose | grep 'Gamma' | awk -F ':' '{print $4}' | tr -d ' ')


if [ "$(pgrep -x redshift)" ]; then
    temp=$(redshift -p 2> /dev/null | grep temp | cut -d ":" -f 2 | tr -dc "[:digit:]")

    # Check for at least one value not being 1.0. X appears to stay as 1.0, but Y and Z change.
    if [ $GAMMAX == 1.0 ] | [ $GAMMAY == 1.0 ] | [ $GAMMAZ == 1.0 ]; then
        echo "%{F#65737E} $temp"K
    fi

    if [ -z "$temp" ]; then
        echo "%{F#65737E} $temp"K
    elif [ "$temp" -ge 5500 ]; then
        echo "%{F#FFEDDE} $temp"K
    elif [ "$temp" -ge 5000 ]; then
        echo "%{F#FFE4CE} $temp"K
    elif [ "$temp" -ge 4000 ]; then
        echo "%{F#FFCEA6} $temp"K
    else
        echo "%{F#D08770} $temp"K
    fi
fi

