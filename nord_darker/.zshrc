#source ~/antigen.zsh
#
#
# Load the oh-my-zsh's library.
#antigen use oh-my-zsh

# Bundles from the default repo (robbyrussell's oh-my-zsh).
#antigen bundle git
#antigen bundle heroku
#antigen bundle pip
#antigen bundle lein
#antigen bundle command-not-found

# Syntax highlighting bundle.
#antigen bundle zsh-users/zsh-syntax-highlighting

# Load the theme.
#antigen theme eendroroy/alien-minimal alien-minimal
#antigen theme kphoen

# Tell Antigen that you're done.
#antigen apply


# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="/home/zsucrilhos/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
#ZSH_THEME="kphoen"
#ZSH_THEME="refined"
ZSH_THEME="spaceship"


# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in ~/.oh-my-zsh/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
export UPDATE_ZSH_DAYS=14

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in ~/.oh-my-zsh/plugins/*
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
git
zsh-completions
zsh-autosuggestions
alias-tips
vi-mode
k
)

# z - jump around
. ~/_my-scripts/z.sh

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8


# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# ssh
# export SSH_KEY_PATH="~/.ssh/rsa_id"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Sourcing externail files:
source ~/.zsh-aliases # For alieases

# Export ~/_my-scripts folder to the $PATH variable
PATH="$HOME/_my-scripts:$PATH"

# Export rust binaries to path
PATH="$HOME/.cargo/bin:$PATH"

export PATH
export LANG=en_US.UTF-8

# Preferred editor 
export EDITOR="nvim"

# Export resolution
RESOLUTION=$(xdpyinfo | grep dimensions | sed -r 's/^[^0-9]*([0-9]+x[0-9]+).*$/\1/')

# Export mpsyt location to the $PATH variable
PATH="$HOME/.local/bin/:$PATH"
export PATH

##### ZSH Vi-Mode configs #####

##### for ~/.zshrc
# enable vim mode on commmand line
# bindkey -v
# no delay entering normal mode
# https://coderwall.com/p/h63etq
# https://github.com/pda/dotzsh/blob/master/keyboard.zsh#L10
# 10ms for key sequences
KEYTIMEOUT=1
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
bindkey -a u undo
bindkey -a '^T' redo
bindkey '^?' backward-delete-char #backspace
# history search in vim mode
# http://zshwiki.org./home/zle/bindkeys#why_isn_t_control-r_working_anymore
# ctrl+r to search history
bindkey -M viins '^r' history-incremental-search-backward
bindkey -M vicmd '^r' history-incremental-search-backward
# }}}export KEYTIMEOUT=1

# add missing vim hotkeys
# http://zshwiki.org/home/zle/vi-mode
# bindkey -a u undo
# bindkey -a '^T' redo
# bindkey '^?' backward-delete-char  #backspace

# history search in vim mode
# http://zshwiki.org./home/zle/bindkeys#why_isn_t_control-r_working_anymore
# ctrl+r to search history
bindkey -M viins '^r' history-incremental-search-backward
bindkey -M vicmd '^r' history-incremental-search-backward


##### for ~/tmux.conf
# Lowers the delay time between the prefix key and other keys - fixes pausing in vim
set -sg escape-time 1

# reload .tmux.conf 
# bind-key r source-file ~/.tmux.conf \; display-message "Configuration reloaded"

#### END ZSH Vi-Mode configs ####

export QT_QPA_PLATFORMTHEME="qt5ct"

export TERM=xterm-256color
export GOPATH=$HOME/go
export GOBIN=/usr/bin/go

[[ $TERM = "xterm" ]] && { tmux -2 && exit 0; }

# FZF finder
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh


# mkdircd
function mkcd
{
  command mkdir $1 && cd $1
}



# wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal 

# Import colorscheme from 'wal' asynchronously
# &   # Run the process in the background.
# ( ) # Hide shell job control messages.
#
#(cat ~/.cache/wal/sequences &)

# Alternative (blocks terminal for 0-3ms)
#
#cat ~/.cache/wal/sequences

# To add support for TTYs this line can be optionally added.
#source ~/.cache/wal/colors-tty.sh

# wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal wal 


# zsh-competions # zsh-competions # zsh-competions # zsh-competions # zsh-competions # zsh-competions # zsh-competions
autoload -U compinit && compinit




# Autologin with getty
# /etc/systemd/system/getty@tty1.service.d/override.conf
#if [ -z "$DISPLAY" ] && [ -n "$XDG_VTNR" ] && [ "$XDG_VTNR" -eq 1 ]; then
#    exec startx
#fi

source /home/zsucrilhos/Downloads/_cloned-repos/zaw/zaw.zsh


