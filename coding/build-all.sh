#!/usr/bin/env bash

# Git help on -C and GIT_DIR: https://git-scm.com/docs/git
USER=$(WHOAMI)
PROJECT_FOLDER="Projects"
MY_PROJECTS="/c/Users/$USER/$PROJECT_FOLDER"
OLD_DIR="$GIT_DIR"

currentBranch () {
    git -C "$MY_PROJECTS/$1" rev-parse --abbrev-ref HEAD
}

declare -a projects=("shared" "connect" "portalApps" "connect-client" )

for p in "${projects[@]}"
do
    echo "Starting Project: $p @ $MY_PROJECTS/$p"
    branch=$(currentBranch "$p")
    if [ $? -gt 0 ]; then
        echo "ERROR: Unable to obtain current branch! Moving on to next project."
        continue
    fi;
    if [ "$branch" = "master" ];
    then
        # The -C param does not work with pull
        GIT_DIR="$MY_PROJECTS/$1"
        git pull origin master
        if [ $? -gt 0 ]; then
            echo "ERROR: Unable to pull from origin! Moving on to next project."
            continue
        fi
    else
        echo "ERROR: Can only pull master not $branch! Moving on to next project."
        continue
    fi
    echo "Building $MY_PROJECTS/$p ..."
    gulp -f "$MY_PROJECTS/$p/gulpfile.js" --single
done

GIT_DIR="$OLD_DIR"
echo "Done"
