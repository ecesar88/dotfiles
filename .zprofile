################################################################################
############################ User configuration ################################
################################################################################

# Start gnome-keyring-daemon
#gnome-keyring-daemon --daemonize --start --components=gpg,pkcs11,secrets,ssh
#export GNOME_KEYRING_CONTROL GNOME_KEYRING_PID GPG_AGENT_INFO SSH_AUTH_SOCK
#export GNOME_KEYRING_CONTROL GNOME_KEYRING_PID

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
export LANG="en_US.UTF-8"
export LC_ALL="en_US.UTF-8"

# Compilation flags
export ARCHFLAGS="-arch x86_64"

# ssh
# export SSH_KEY_PATH="~/.ssh/rsa_id"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
## Sourcing external files:
# Aliases:
#source ~/.zsh-aliases # For aliases

# Export ~/_my-scripts folder to the $PATH variable
PATH="$HOME/_my-scripts:$PATH"

# Export rust binaries to path
PATH="$HOME/.cargo/bin/:$PATH"

# Expoft gem binaries to path
PATH="$HOME/.gem/ruby/2.7.0/bin/:$PATH"

# Preferred editor
export EDITOR="nvim"

# Export resolution
RESOLUTION=$(xdpyinfo | grep dimensions | sed -r 's/^[^0-9]*([0-9]+x[0-9]+).*$/\1/')

# Export mpsyt location to the $PATH variable

export PATH="$HOME/.local/bin/:$PATH"
export PATH="$HOME/.emacs.d/bin:$PATH"

# Commented because of KDE, using this on .xinitrc instead
#export QT_QPA_PLATFORMTHEME="qt5ct"
export TERM="xterm-256color"

export GOPATH=$HOME/go
export GOBIN=/usr/bin/go

export PATH="$PATH:$(yarn global bin)"

ANDROID_SDK="$HOME/Android/Sdk/"
ANDROID_SDK_ROOT="$HOME/Android/Sdk/"
export PATH="$HOME/Android/Sdk/:$PATH"

# Java HOME // not needed when using jabba
#JAVA_HOME=/usr/...
#export JAVA_HOME
#export PATH=$PATH:$JAVA_HOME


# Set the location for the config file of starship prompt
#export STARSHIP_CONFIG="/home/$USER/.config/starship.toml"

##############################################

# Set $TERM for tmux
[[ $TERM = "xterm" ]] && { tmux -2 && exit 0; }

# FZF finder
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# mkdircd
function mkcd {
  command mkdir $1 && cd $1
}

# 0x0.st
0x0() {
    for i in "@$"; do
        curl -F file=@$i http://0x0.st
    done
}

########################################
############## Java envs  ##############
########################################

# Java fix for tiling wm
export _JAVA_AWT_WM_NONREPARENTING=1

# Fix for Java to use GTK theme
export _JAVA_OPTIONS="-Dawt.useSystemAAFontSettings=on -Dswing.aatext=true -Dswing.defaultlaf=com.sun.java.swing.plaf.gtk.GTKLookAndFeel -Dswing.crossplatformlaf=com.sun.java.swing.plaf.gtk.GTKLookAndFeel ${_JAVA_OPTIONS}"

# JAVA_HOME sdk
# Set JDK installation directory according to selected Java compiler
export JAVA_HOME=$(readlink -f /usr/bin/javac | sed "s:/bin/javac::")
#export PATH="$JAVA_HOME/:$PATH"


########################################
######## Node Version Manager ##########
########################################

#export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
#[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm


########################################
######### Fast Node Manager ############
########################################
export PATH=/home/fparad0x/.fnm:$PATH
eval "`fnm env`"


########################################
########## ZSH Vi-Mode configs #########
########################################
# enable vim mode on commmand line
# bindkey -v
# no delay entering normal mode
# https://coderwall.com/p/h63etq
# https://github.com/pda/dotzsh/blob/master/keyboard.zsh#L10
# 10ms for key sequences
###KEYTIMEOUT=1
# show vim status
# http://zshwiki.org/home/examples/zlewidgets

# Add the --INSERT-- and --NORMAL-- indicators
#function zle-line-init zle-keymap-select {
#RPS1="${${KEYMAP/vicmd/-- NORMAL --}/(main|viins)/-- INSERT --}"
#RPS2=$RPS1
#zle reset-prompt
#}
#zle -N zle-line-init
#zle -N zle-keymap-select

# add missing vim hotkeys
# http://zshwiki.org/home/zle/vi-mode
###bindkey -a u undo
###bindkey -a '^T' redo
###bindkey '^?' backward-delete-char #backspace

# history search in vim mode
# http://zshwiki.org./home/zle/bindkeys#why_isn_t_control-r_working_anymore
# ctrl+r to search history
###bindkey -M viins '^r' history-incremental-search-backward
###bindkey -M vicmd '^r' history-incremental-search-backward
# export KEYTIMEOUT=1

##### for ~/tmux.conf
# Lowers the delay time between the prefix key and other keys - fixes pausing in vim
###set -sg escape-time 1

# reload .tmux.conf
# bind-key r source-file ~/.tmux.conf \; display-message "Configuration reloaded"

########################################
####### END ZSH Vi-Mode configs ########
########################################

autoload -U compinit && compinit

# Perl
PATH="/home/$USER/perl5/bin${PATH:+:${PATH}}"; export PATH;
PERL5LIB="/home/$USER/perl5/lib/perl5${PERL5LIB:+:${PERL5LIB}}"; export PERL5LIB;
PERL_LOCAL_LIB_ROOT="/home/$USER/perl5${PERL_LOCAL_LIB_ROOT:+:${PERL_LOCAL_LIB_ROOT}}"; export PERL_LOCAL_LIB_ROOT;
PERL_MB_OPT="--install_base \"/home/$USER/perl5\""; export PERL_MB_OPT;
PERL_MM_OPT="INSTALL_BASE=/home/$USER/perl5"; export PERL_MM_OPT;


########################################
##### Jabba - Java version manager #####
########################################
[ -s "/home/fparad0x/.jabba/jabba.sh" ] && source "/home/fparad0x/.jabba/jabba.sh"

