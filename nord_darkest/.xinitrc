xrdb -merge ~/.Xresources
#xset dpms 330 360 360

# Set the keyboard layout
setxkbmap -layout br -variant abnt2

exec bspwm
#exec startdde

# startx bspwm|startx i3
#case $2 in
#    'i3') exec i3 ;;
#    'bspwm') exec bspwm ;;
#    *) exec bspwm;;
#esac


