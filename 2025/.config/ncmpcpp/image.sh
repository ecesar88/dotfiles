#!/usr/bin/env bash
clear
#this is for future versions, I will work on it later
#size=$(tput cols)
#padding=1
#_pid=$!

COVERPATH="/tmp/kunst.jpg"
function check_status(){
    SERVICE="kunst"
    if pgrep -fl "$SERVICE" >/dev/null
    then
        echo "$SERVICE is running no worries" 
    else
        echo "$SERVICE stopped"
        echo "restarting ..."
        kunst >> /tmp/kunst.log & 
fi
}
check_status
function ImageLayer {
    ueberzug layer -sp json
}

COVER="/tmp/kunst.jpg"
X_PADDING=0
Y_PADDING=0

function add_cover {
    if [ -e $COVER ]; then
        echo "{\"action\": \"add\", \"identifier\": \"cover\", \"x\": $X_PADDING, \"y\": $Y_PADDING, \"path\": \"$COVER\"}";
    fi
}

clear
ImageLayer -< <(
    add_cover
    while inotifywait -q -q -e close_write "$COVER"; do
        add_cover
    done
)

