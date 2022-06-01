# Bash Help

The [Bourne Again SHell (aka BASH)](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) is installed by [Git for Windows](https://git-for-windows.github.io/) and is available on the Mac as [Terminal](https://en.wikipedia.org/wiki/Terminal_(macOS)). Bash is a programming language with an interactive component. This means that it can execute scripts on its own or be run within a [terminal emulator](./terminals/terminals.md). Git Bash's terminal emulator is called [minTTY](http://mintty.github.io/) but it doesn't work well with console applications thus is is recommended to use [ConEmu](https://conemu.github.io/) instead.

* [Working with bash](#working-with-bash)
  * [Basic Keyboard Short-cuts](#basic-keyboard-short-cuts)
  * [Getting Around](#getting-around)
  * [Saving Time](#saving-time)
      * [Pipes](#pipes)
    * [History](#history)
    * [Alias](#alias)
  * [Resources](#resources)
* [Sources](#sources)

## Working with bash

Since this team uses either Windows or Mac OS/X, only examples pertaining to Git For Windows (Git Bash) or Mac Terminal will be identified below. There a lot of other programs that are installed with _Git for Windows_ other than Bash and Git (see [GNU Core Utils](https://en.wikipedia.org/wiki/GNU_Core_Utilities)). This document will refer to them all as part of Bash.

### Basic Keyboard Short-cuts

[More Here](https://ss64.com/bash/syntax-keyboard.html)

| Operation | Windows | Mac<sup>Terminal</sup> |  
| :------------- | :------------- |:------------- |
| Back one character | `ctrl + b` or `left arrow` | |
| Back one word | `alt + b` | |
| Clear screen (except current line) | `ctrl + l` | |
| Command Completion | `tab` | `tab` |
| Copy text to clipboard | `ctrl + c` or `ctrl + insert` | `ctrl + insert` |
| Delete word in front of cursor | `alt + d` | |
| Forward one character | `ctrl + f` or `right arrow` | |
| Forward one word | `alt + f` | |
| Move to end of line | `ctrl + e` | |
| Move to start of line | `ctrl + a` | |
| Next Command | `ctrl + n` or `down arrow` | |
| Open new terminal | `alt + F2` | |
| Paste text from clipboard | `ctrl + v` | `shift + insert` |
| Previous command (show) | `ctrl + p` or `up arrow` |  |
| Previous command (execute) | `!!` |  |
| Switch between windows | `ctrl + shift + tab` | &nbsp; |

By default, git-Bash will copy text to the clipboard whenever it has been selected with a mouse. And will paste that text when the middle mouse button is clicked. 

### Getting Around

Describing all of the capabilities of each bash or GNU program is outside the scope of this document. You are encouraged to Google `man <command name>` for additional detail.

| Action | Command |
| :------------- | :------------- |
| Change directory | `cd <name of directory`; Use quotes if name contain spaces |
| Copy a file | `cp <name of file> <destination>` |
| Create a file | `echo "stuff" > <name of file` (see [Bash I/O redirection](http://www.tldp.org/LDP/abs/html/io-redirection.html)) |
| Create an empty file | `touch <name of file>` |
| Find a file | `find ` There is a Windows command by the same name so you will likely need to create an alias for `find . -name "*help.md" -type f -print` |
| Move a file | `mv <name of file> <destination` |
| Rename a file | `mv <name of file> <new name>` |
| Search inside a file | `grep <regular expression> <file name>` |
| Show content of file | `cat <name of file>`; pipe to `less` to page |
| Show current directory | `pwd` |
| Show directory contents | `ls`; common options are `-l` = long, `h` = human, `tr` = sort by time reverse |
| Show first n lines of file | `head -n 5 <name of file>` |
| Show last n lines of file | `tail -n 5 <name of file>`; add `-f ` to continuously watch |

### Saving Time

*   [Pipes](#pipes)
*   [History](#history)
*   [Alias](#alias)
*   [Learn](#resources)

##### Pipes

The output from most commands can be directed to another command by way of a `|` pipe. This enables one to chain a series of commands separated by pipes. `history | grep find  | grep -v 'grep find' | awk '{ print $1 }' | sort -r | head -n 1`

#### History

Bash maintains a history of command lines executed. To see this list, enter `history`.

```bash
$ history
 ...
 35  2017-08-01 15:47:17 |yarn add log4js yargs
 36  2017-08-01 15:47:41 |yarn remove yargs
 37  2017-08-01 15:47:50 |yarn add yargs
 38  2017-08-01 15:53:40 |yarn add eslint --dev
 39  2017-08-01 15:55:02 |clear
 40  2017-08-01 16:00:37 |yarn add cflint --dev
 41 2017-08-01 16:00:37  |ls -lh
```

One can pipe the output to `grep` in order to find specific commands.  

```bash
$ history | grep 'yarn add' | grep -v history
   34  2017-08-01 15:46:19 |yarn add  --save log4js yargs
   35  2017-08-01 15:47:17 |yarn add log4js yargs
   37  2017-08-01 15:47:50 |yarn add yargs
   38  2017-08-01 15:53:40 |yarn add eslint --dev
   40  2017-08-01 16:00:37 |yarn add cflint --dev
   46  2017-08-01 16:06:21 |yarn add eslint@3.19.0
   47  2017-08-01 16:06:40 |yarn add eslint@3.19.0 --dev
   51  2017-08-01 16:07:24 |yarn add eslint@3.19.0 --dev
  694  2017-08-04 23:23:35 |yarn add gulp-watch --dev
```
Typing `!` followed by a line number will copy that command to the command line. `!41` will place `ls -lh` onto command line

#### Alias

When ever a new shell is started, bash looks in your home folder (`cd ~`) for a configuration file named `.bashrc` and loads it into the new shell. This does not effect already open shells. To pick up any changes in an existing shell, enter `source ~/.bashrc`

An alias can be created with the command `alias <name>="<command>"` where _name_ is a single case-sensitive word and _command_ is a valid command line or script name contained in quotes. There must **not** be spaces adjacent to the equals sign.

```bash
$ alias ll="ls -lhtr"
$ ll
total 53K
-rw-r--r-- 1 JONESB 1049089  344 Aug  1 17:50 README.md
drwxr-xr-x 1 JONESB 1049089    0 Aug  1 17:50 images/
-rw-r--r-- 1 JONESB 1049089 1.7K Aug  7 15:13 development-environment.md
drwxr-xr-x 1 JONESB 1049089    0 Aug  7 16:07 editors/
-rw-r--r-- 1 JONESB 1049089 8.8K Aug  7 16:07 js-style.md
-rw-r--r-- 1 JONESB 1049089 4.7K Aug  7 16:07 synchronize.md
-rw-r--r-- 1 JONESB 1049089 9.0K Aug  7 16:21 git-help.md
-rw-r--r-- 1 JONESB 1049089 7.3K Aug  7 16:21 github-workflow.md
-rw-r--r-- 1 JONESB 1049089 1.5K Aug  7 17:45 bash-help.md
```

Best to confirm an alias works as desired by using the `alias` command. Once confirmed, add it to your `.bashrc` file if it exists, create it otherwise.

To see a list of all aliases available in current shell, type `alias` by itself.

```bash
$ alias
alias gcm='git commit'
alias gco='git checkout'
alias gst='git status'
alias ll='ls -lhtr'
alias ls='ls -F --color=auto --show-control-chars'
alias node='winpty node.exe'
```
Aliases also accept arguments from command line like any other command. Thus given the `gco` alias above, one can create a new git branch with `gco -b <branch name>`

### Resources

Bash and GNU together are incredibly powerful but like most things, one has to invest time into learning. These are some tutorials and sites which have been found to be helpful.

*   [Lynda.com - Bash Shell and Scripts](https://www.lynda.com/Linux-tutorials/Linux-Bash-Shell-Scripts/504429-2.html)
*   [Bash For Beginners](http://tldp.org/LDP/Bash-Beginners-Guide/html/)
*   [Bash Programming](http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO.html)
*   [Bash One Liners](http://www.bashoneliners.com/)

## Sources

*   [Terminals](https://en.wikipedia.org/wiki/Computer_terminal)
*   [Console Applications](https://en.wikipedia.org/wiki/Console_application)
