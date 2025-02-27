# The following lines were added by compinstall

zstyle ':completion:*' completer _expand _complete _ignored _correct _approximate
zstyle ':completion:*' max-errors 5 numeric
zstyle :compinstall filename '/home/fparad0x/.zshrc'

autoload -Uz compinit
compinit
# End of lines added by compinstall
# Lines configured by zsh-newuser-install
HISTFILE=~/.zsh-history
HISTSIZE=2000
SAVEHIST=5000
setopt extendedglob
bindkey -e
# End of lines configured by zsh-newuser-install

################################################################################
################################### zPlug ######################################
################################################################################

source ~/.zplug/init.zsh

# ZSH Alias-tips
zplug "djui/alias-tips", from:github, defer:3

# ZSH Completions
zplug "zsh-users/zsh-completions"

# ZSH Autosuggestions
zplug "zsh-users/zsh-autosuggestions"

# ZSH Syntax Highlighting
#zplug "zsh-users/zsh-syntax-highlighting", defer:2

# Make sure to use double quotes
zplug "zsh-users/zsh-history-substring-search"

# Supports oh-my-zsh plugins and the like
#zplug "plugins/git", from:oh-my-zsh

#zplug "plugins/vi-mode", from:oh-my-zsh

zplug "nyquase/vi-mode"

zplug "zdharma-continuum/fast-syntax-highlighting", defer:2

#zplug "b4b4r07/zsh-vimode-visual", defer:3


# Install plugins if there are plugins that have not been installed
if ! zplug check --verbose; then
    printf "Install? [y/N]: "
    if read -q; then
        echo; zplug install
    fi
fi

# Then, source plugins and add commands to $PATH
zplug load

################################################################################
################################################################################

# z - jump around
. ~/_my-scripts/z.sh

# Aliases:
source ~/.zsh-aliases # For aliases

# Starship prompt - this needs to be the last line of the file
eval "$(starship init zsh)"

# asdf
#$HOME/.asdf/asdf.sh


# yarn bin
export PATH="$PATH:$(yarn global bin)"

# fnm
export PATH=/home/fparad0x/.fnm:$PATH
eval "`fnm env`"

# pnpm
export PNPM_HOME="/home/fparad0x/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"
# pnpm end
