#!/bin/bash

# Exec always

# Kill all running applications before starting
killall -9 numlockx redshift dunst picom unclutter udiskie flameshot greenclip flashfocus mpd mpDris2 polybar

# Reset redshift
redshift -x &
xrandr --output DVI-D-0 --gamma 1.0:1.0:1.0 &

numlockx on &
redshift -c /home/fparad0x/.config/redshift/redshift.conf &
dunst &
picom -b --config /home/fparad0x/.config/picom/picom.conf &
unclutter &
udiskie -a &
flameshot &
greenclip daemon &
flashfocus &
mpd &
/usr/bin/mpDris2 &
/home/fparad0x/_my-scripts/polybarstart-i3 &

feh --bg-fill "/home/fparad0x/_my-disks/1TbWD/Desktop/av2]/4481543.jpg" &

dunstify -a System -i ~/_my-scripts/_icons/ok-sys.png -u critical "SYSTEM" $'System started sucessfully.\nAll apps running and OK... Or are they?' &
