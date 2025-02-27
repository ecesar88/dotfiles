#!/bin/bash

# Exec once

#xsetroot -cursor_name left_ptr
#pulseeffects --gapplication-service &
xset r rate 300 80 &
#setxkbmap -layout br -variant abnt2 &
/usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1 &
/home/fparad0x/_my-scripts/lightsOn.sh &
xautolock -locker "betterlockscreen -l" -time 5 -notify 25 -corners ---- -cornerdelay 10 -cornersize 20 -notifier "dunstify -i ~/_my-scripts/_icons/locking.png -a System -u critical System 'Locking in 25 seconds.'" &
