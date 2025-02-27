#!/bin/bash

# Check bspwm rounded corners

echo "### Installing..."
echo "### Installing oh-my-zsh"
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

echo "### First step done"
echo "### Installing zplug"
curl -sL --proto-redir -all,https https://raw.githubusercontent.com/zplug/installer/master/installer.zsh | zsh
zsh && zplug install

echo "### Installing oh-my-tmux"
cd $HOME
git clone https://github.com/gpakosz/.tmux.git
ln -s -f .tmux/.tmux.conf
cp .tmux/.tmux.conf.local .

# Copying files from dotfiles
echo "### Cloning dotfiles"
cd $HOME/Downloads/_cloned-repos
git clone github.com/zsucrilhos/dotfiles && cd dotfiles

echo "### Copying files..."
cd extras && cp -rv ./_my-scripts ./icons ./themes .config $HOME && cd ..
cd one_dark && cp -rv .config .tmux .Xresources .tmux.conf .tmux.conf.local .xinitrc $HOME && cd ..

echo "### Installing paru"
cd $HOME/Downloads/_cloned-repos
git clone https://aur.archlinux.org/paru.git
cd paru
makepkg -si
cd ..

echo "### Installing packages..."
cd ./dependencies/2021/
sudo pacman -S --noconfirm - < ./pacman-packages.txt
yay -S - < ./aur-packages.txt 

