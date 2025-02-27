# The following lines were added by compinstall

zstyle ':completion:*' completer _expand _complete _ignored _correct _approximate
zstyle ':completion:*' max-errors 5 numeric
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'
zstyle :compinstall filename '/home/fparad0x/.zshrc'

autoload -Uz compinit && compinit
compinit
# End of lines added by compinstall
# Lines configured by zsh-newuser-install
HISTFILE=~/.zsh-history
HISTSIZE=10000
SAVEHIST=10000

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

zplug "olets/zsh-abbr", from:github

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

# https://github.com/ellie/atuin - Atuin, magical shell history
eval "$(atuin init zsh)"

# asdf
#$HOME/.asdf/asdf.sh


# yarn bin
export PATH="$PATH:$(yarn global bin)"


# pnpm
export PNPM_HOME="/home/fparad0x/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end

# bun completions
[ -s "/home/fparad0x/.bun/_bun" ] && source "/home/fparad0x/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"


#### Load pyenv ####
# Load pyenv automatically by appending
# the following to
#~/.zprofile (for login shells)
#and ~/.zshrc (for interactive shells) :

export PYENV_ROOT="$HOME/.pyenv"
command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
# lutris - export PATH="$PYENV_ROOT/shims:$PATH"



########################################
######### Fast Node Manager ############
########################################
export PATH=/home/$(whoami)/.fnm:$PATH
eval "$(fnm env --use-on-cd)"

########################################


# Starship prompt - this needs to be the last line of the file
eval "$(starship init zsh)"

