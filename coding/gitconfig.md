# Global git configuration

This file resides in your home folder:
*   Windows: `C:\Users\<your id>\.gitconfig`
*   Mac: `/Users/<user id>/.gitconfig`
*   Linux: `/home/<user id>/.gitconfig`

The file is edited by git through the `git alias` and `git config --global` commands, but may be edited manually as well.

```
[core]
    autocrlf = true
    editor = vim
    safecrlf = false
[filter "lfs"]
    process = git-lfs filter-process
    required = true
    clean = git-lfs clean -- %f
    smudge = git-lfs smudge -- %f
[user]
    name = Todd Hogarth
    email = hogartht16@ecu.edu
[merge]
    tool = meld
[mergetool "meld"]
    path = C:\\Program Files (x86)\\Meld\\Meld.exe
[alias]
    last = log -1 --stat
    ls = log --pretty=format:\"%C(yellow)%h%Cred%d %Cgreen%cd %Creset%s%Cgreen [%an]\" --graph --date=relative
    dlc = diff --cached HEAD^
    logtree = log --graph --oneline --decorate --all
    gb = branch -v --sort=committerdate
    gco = checkout
    grep-branch-local = "!f(){ git branch | sed -e 's/[ \\*]*//' | grep -v -e '\\->' | xargs git grep $@; };f"
    vd = difftool
    gv = difftool -g
    fetch-pr = fetch origin -q '+refs/pull/*/head:refs/remotes/origin/pull/*'
[fetch]
    prune = true
[status]
    showUntrackedFiles = all
    displayCommentPrefix = true
    showStash = true
[push]
    default = current
[grep]
    linenumber = true
[credential]
    helper = manager
[diff]
    tool = vimdiff
[digg]
    guitool = meld
[difftool]
    prompt = 0
```
