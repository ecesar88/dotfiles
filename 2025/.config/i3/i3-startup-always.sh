#!/bin/bash

# Exec always

# Kill all running applications before starting
killall -9 numlockx redshift dunst picom unclutter udiskie flameshot greenclip flashfocus mpd mpDris2 polybar i3-layouts

# Reset redshift
redshift -x &
xrandr --output DP-1 --gamma 1.0:1.0:1.0 &

numlockx on &
redshift -c /home/$(whoami)/.config/redshift/redshift.conf &
dunst &
picom --config /home/$(whoami)/.config/picom/picom.conf &
unclutter &
udiskie -a &
flameshot &
greenclip daemon &
flashfocus &
mpd &
/usr/bin/mpDris2 &
/home/fparad0x/_my-scripts/polybarstart-i3 &

# Start i3-layouts and set default layout "spiral"
i3-layouts & 
i3l spiral

#feh --bg-fill "/home/fparad0x/MyDisks/wdBlue-2tb-p1/Desktop/av2]/4481543.jpg" &
#feh --bg-fill "/home/fparad0x/Desktop/su_34photorep_imageid_550042_8bbfdea71c059b71585826527_gigapixel.jpg" &
#feh --bg-fill "/home/fparad0x/Pictures/takafumi-abe-takafumi-abe-su35n-gigapixel.jpg" &
#feh --bg-fill "/home/fparad0x/Downloads/mig-31-image_2022-12-21_01-33-50.png" &
#feh --bg-fill "/home/fparad0x/Pictures/732485.jpg" &
#feh --bg-fill "/home/fparad0x/Desktop/Snowfall in The Lofoten Islands, Norway, Nature Sounds for Sleep, Hamnøy and Reine ｜ 4K [-SMKVJO_wGo].webm_snapshot_00.04.22.748-gigapixel.jpg" &
#feh --bg-fill "/home/fparad0x/Downloads/kalen-emsley-kGdorAVkScE-unsplash.jpg" &
#feh --bg-fill "/home/fparad0x/Downloads/vidar-nordli-mathisen-cefQW9Jw3KU-unsplash.jpg" &
#feh --bg-fill "/home/fparad0x/Desktop/lotr-saurons-eye-barad-ur1229385.png" &
#feh --bg-fill "/home/fparad0x/Pictures/faroe-islands-credit-ufelizuko-wallpaper.jpg" &
#feh --bg-fill "/home/fparad0x/Downloads/eric-welch-eRwWGWkh0vU-unsplash.jpg" &
#feh --bg-fill "/home/fparad0x/Desktop/lotr-saurons-eye-barad-ur1229385.png" &
#feh --bg-fill "/home/fparad0x/Downloads/johny-goerend-1UDAmyRrgn0-unsplash.jpg"
feh --bg-fill "/home/fparad0x/Desktop/beech-c-17b-staggerwing-biplan-de-havilland-dh89-dragon-pole.jpg"




dunstify -a System -i ~/_my-scripts/_icons/ok-sys.png -u critical "SYSTEM" $'System started sucessfully.\nAll apps running and OK... Or are they?' &

