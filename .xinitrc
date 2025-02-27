
xrdb -merge ~/.Xresources

# Set the keyboard layout
#setxkbmap -layout br -variant abnt2
#setxkbmap -layout us -option compose:menu

export GDK_DPI_SCALE=1
export QT_SCALE_FACTOR=1
export GDK_SCALE=1

#export DESKTOP_SESSION=bspwm
#export QT_QPA_PLATFORMTHEME="qt5ct"
#exec bspwm

export DESKTOP_SESSION=i3
export QT_QPA_PLATFORMTHEME="qt5ct"
exec i3

