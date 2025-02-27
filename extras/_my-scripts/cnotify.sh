#!/bin/zsh

A=25; while [ $A > 0 ]; do
    echo -ne Locking screen in $A seconds. $'\r';
    A=$(( A-1 ));
    sleep 1;
done
