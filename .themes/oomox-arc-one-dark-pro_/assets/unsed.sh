#!/bin/sh
sed -i \
         -e 's/rgb(0%,0%,0%)/#282c34/g' \
         -e 's/rgb(100%,100%,100%)/#abb2bf/g' \
    -e 's/rgb(50%,0%,0%)/#282c34/g' \
     -e 's/rgb(0%,50%,0%)/#98c379/g' \
 -e 's/rgb(0%,50.196078%,0%)/#98c379/g' \
     -e 's/rgb(50%,0%,50%)/#282c34/g' \
 -e 's/rgb(50.196078%,0%,50.196078%)/#282c34/g' \
     -e 's/rgb(0%,0%,50%)/#abb2bf/g' \
	"$@"
