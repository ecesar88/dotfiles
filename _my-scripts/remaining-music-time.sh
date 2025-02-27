#!/bin/bash
mpc | grep playing | sed -rn '/playing/ s/^.*\s{2,}([0-9:]+)\/([0-9:]+).*$/tempo corrido: \1\ntempo total: \2/p'


