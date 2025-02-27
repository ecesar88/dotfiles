import sys, select, subprocess
while True:
    p = subprocess.Popen(['xset', 'dpms', 'force', 'off'], 
        stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if sys.stdin in select.select([sys.stdin], [], [], 0)[0]:
        break
