#! /usr/bin/pyton3
# -*- coding = utf-8 -*-

from time import sleep
import os
import click

@click.command()
@click.option('-d', '--directory', default='./', help='The dir where are your wallpapers. Default = local dir')
@click.option('-t', '--sleep_time', default=float(300), help='The time to keep each wallpaper, in seconds. Default = 300 (5 minutes)')

def set_wallpaper(sleep_time, directory):
    """ Set the wallpaper """
    print('Started, you can stop with CTRL+C at any time!') # Alert the user
    print(f'PID = {os.getpid()}') # Show the process PID
    cwd = os.getcwd() # Get current working directory
    sleep_time = float(sleep_time) # Declaring sleep_time as a float
    wpp_list = os.listdir(path=directory) # Get a list of files in the dir
    if directory == cwd:
        wpp_list.remove(os.path.basename(__file__)) # Remove the script from the list if it is running from cwd
    try:
        while True: # Make the program loop at the final image
            for file in wpp_list:
                filename, file_extension = os.path.splitext(file) # Get file's extension
                if file_extension not in ('.jpg', '.png', '.tif', '.tiff'):
                    wpp_list.remove(file) # Remove the file if it is  not in the list above
                else:
                    os.system('feh --bg-fill ' + directory + file + ' &> /dev/null') #  Apply the wallpaper
                    sleep(sleep_time) # Time the wallpaper can last
    except KeyboardInterrupt: # If KeyboardInterrupt, the program should exit
        print("\nBye!") # It was good running on your machine
        sleep(0.8)
        exit(0)

if __name__ == "__main__":
    set_wallpaper()


