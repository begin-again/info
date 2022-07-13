# Post Checkout

```bash
#!/bin/sh

TTY=`tty`
yarn=$(git diff --shortstat "$1".."$2" -- yarn.lock)
gulp=$(git diff --shortstat "$1".."$2" -- gulpfile.js)
if ! [[ -z $gulp ]]; then
    tput bel
    echo "*** Gulp Changed! Restart if running ***"
fi
if ! [[ -z $yarn ]]; then
    yarn install
fi

```
