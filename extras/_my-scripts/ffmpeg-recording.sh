#!/bin/bash


ffmpeg -f x11grab -s 1368x768 -framerate 60 -i :0.0+0,0 -f pulse -ac 2 -i 1 -c:v libx264 -crf 23 -profile:v baseline -level 3.0 -pix_fmt yuv420p -c:a aac -ac 2 -strict experimental -b:a 128k -movflags faststart /home/zsucrilhos/Videos/recording$(date "+%Y-%m-%d_%H-%M-%S").mp4 & dunstify -i ~/_my-scripts/_icons/video-camera.png -u critical "ffmpeg" "Recording started"

