#!/bin/sh
set -eu
if ! pkill -x -SIGUSR1 redshift; then
    echo 'Could not find redshift process to toggle.' >&2
    exit 1
fi
