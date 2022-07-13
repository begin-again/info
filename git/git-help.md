# Git Help

![git comic](./images/xkcd-git.png)

[Comic Explanation](https://www.explainxkcd.com/wiki/index.php/1597:_Git)

## TOC

*   [Change Clone Origin](#clone-convert)
*   [Custom shortcuts](#alias)
*   [Definitions](#definitions)
*   [Examples of how to fix errors](#scenarios)
*   [Git Hooks](#git-hooks)
*   [Helpful Sources](#helpful-sources)
*   [Learning Tools](#learning-tools)
*   [Operation](#operation)

## Helpful Sources
[Kernel.org - Git Config](https://www.kernel.org/pub/software/scm/git/docs/git-config.html),
[Atlassian - Git Config](https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-config),
[Scott Chacon - gitattributes](http://schacon.github.io/git/gitattributes.html),
[Github Glossary](https://help.github.com/articles/github-glossary/),
[Johan Leino - TFS vs Git](https://johanleino.wordpress.com/2013/09/18/tfs-vs-git-or-is-it-tfs-with-git/),
[Tom Preston - Git Parable](http://tom.preston-werner.com/2009/05/19/the-git-parable.html), and `git help`.

## Definitions

| Term         | Meaning (upstream) x                                                                                                                                                                                                                                                                                      | TFS Equiv                  |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| Blame        | Describes the last modification to each line of a file, which generally displays the revision, author and time. `git blame <options> file`<br/>                                                                                                                                                           |                            |
| Branch       | A different line of development. In git, a branch is just a "label" which points to a commit.                                                                                                                                                                                                             | Branch                     |
| Clone        | A copy of a repository that lives on your computer instead of on a website's server somewhere, or the act of making that copy.                                                                                                                                                                            |                            |
| Collaborator | Person with read and write access to a repository who has been invited to contribute by the repository owner                                                                                                                                                                                              |                            |
| Commit       | An individual change to a file (or set of files). Every time you commit, git creates a unique ID (a.k.a. the "SHA" or "hash") that allows you to keep record of what changes were made when and by who.                                                                                                   | Changeset                  |
| Diff         | The difference in changes between two commits, or saved changes.                                                                                                                                                                                                                                          | Diff                       |
| Fetch        | Getting the latest changes from an online repository without merging them in. Why? So that you can compare them to your local branches.                                                                                                                                                                   | Compare local to Server    |
| Fork         | A fork is a personal copy of another user's repository that lives on your account. Forks allow you to freely make changes to a project without affecting the original. Forks remain attached to the original, allowing you to submit a pull request to the original's author to update with your changes. |                            |
| Git          | An open source program for tracking changes in text files. It was written by the author of the Linux operating system                                                                                                                                                                                     |                            |
| Head         | A symbolic name to describe the currently checked out commit.                                                                                                                                                                                                                                             |                            |
| Home         | Your user root folder. Windows: `c:/Users/<your login name>`. Mac: `/home/<your login name>`                                                                                                                                                                                                              |                            |
| Issue        | Are suggested improvements, tasks or questions related to the repository. Issues can be created by anyone, and are moderated by repository collaborators.                                                                                                                                                 |                            |
| Local        | Refers to your development environment                                                                                                                                                                                                                                                                    | workspace                  |  |
| Merge        | Takes the changes from one branch and applies them into another.                                                                                                                                                                                                                                          | Merge                      |
| Origin       | Your fork on Github                                                                                                                                                                                                                                                                                       |                            |
| Parent       | The branch from which another branch is derived                                                                                                                                                                                                                                                           |
| Pull         | Fetching in changes and merging them                                                                                                                                                                                                                                                                      | get latest version         |
| Pull Request | Proposed changes to a repository submitted by a user and accepted or rejected by a repository's collaborators                                                                                                                                                                                             |                            |
| Push         | Sending your committed changes to a remote repository                                                                                                                                                                                                                                                     | checkin                    |
| Remote       | The version of something that is hosted on GitHub. It can be connected to local clones so that changes can be synced                                                                                                                                                                                      |                            |
| Stash        | Git allows you to "stash away" changes. This gives you a clean working tree without any changes. Later they can be "popped" to be brought back. This can be a life saver if you need to temporarily work on an unrelated change.                                                                          | Shelve, except it is local |
| Tag          | A descriptive name given to one of your commits.                                                                                                                                                                                                                                                          | Label                      |
| Upstream     | A remote of your fork's source repository on Github                                                                                                                                                                                                                                                       | &nbsp;                     |

## Operation

### Commands

Start a working area (see also: `git help tutorial`)
*   clone:      Clone a repository into a new directory
*   init:       Create an empty Git repository or reinitialize an existing one

Work on the current change (see also: `git help everyday`)
*   add:        Add file contents to the index
*   mv:         Move or rename a file, a directory, or a symlink
*   reset:      Reset current HEAD to the specified state
*   rm:         Remove files from the working tree and from the index

Examine the history and state (see also:` git help revisions`)
*   bisect:     Use binary search to find the commit that introduced a bug
*   grep:       Print lines matching a pattern
*   log:        Show commit logs
*   show:       Show various types of objects
*   status:     Show the working tree status

Grow, mark and tweak your common history
*   branch:     List, create, or delete branches
*   checkout:   Switch branches or restore working tree files
*   commit:     Record changes to the repository
*   diff:       Show changes between commits, commit and working tree, etc
*   merge:      Join two or more development histories together
*   rebase:     Reapply commits on top of another base tip
*   tag:        Create, list, delete or verify a tag object signed with GPG

Collaborate (see also: `git help workflows`)
*   fetch:      Download objects and refs from another repository
*   pull:       Fetch from and integrate with another repository or a local branch
*   push:       Update remote refs along with associated objects

### Config
Writes key value pairs to the _.gitconfig_ file in either your home folder (when using the `--global` flag) or the _config_ file in your project's _.git_ folder. The file is broken up into sections, thus one needs to specify the section of the key.

`git config section.key value`

Commonly Edited Keys

| Key             | Description                                                                                                                                                                                                                                                                                                              | Team Default Value                      |
| :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- |
| `core.autocrlf` | By default, git will store all line endings within the repository with unix-style `LF` line endings. Setting this to true on MS-Windows environments, tells the git client to convert the line endings to `CRLF` on checkout and back to `LF` on commit, unless the file in the repo is already has `CRLF` line endings. | `true`, for windows; `input` for Mac OS |
| `core.editor`   | Commands such as commit and tag that let you edit messages by launching an editor                                                                                                                                                                                                                                        | See below                               |
| `fetch.prune`   | Removes all stale remote-tracking branches which have already been removed from the remote repository referenced, but are still locally available in "remotes/".                                                                                                                                                         | `true`                                  |
| `pager.log`     | By default, the `git log` command will appear in the `less` program which when exited does not appear in the terminal history. If you find this annoying set this key to `false`. Can be configured for other commands as well                                                                                           |                                         |
| `push.default`  | Defines the action `git push` should take if no refspec is explicitly given.                                                                                                                                                                                                                                             | `current`                               |
| `user.email`    | Your email address to be recorded in any newly created commits.                                                                                                                                                                                                                                                          |                                         |
| `user.name`     | Your full name to be recorded in any newly created commits.                                                                                                                                                                                                                                                              | &nbsp;                                  |

`git config --global <key> <value>`

#### Editors

| Editor          | Git Command                                                                                    |
| :-------------- | :--------------------------------------------------------------------------------------------- |
| Atom            | `git config --global core.editor "atom --wait"``                                               |
| Sublime (Mac)   | `git config --global core.editor "subl -n -w"``                                                |
| Sublime (Win32) | `git config --global core.editor "'c:/program files (x86)/sublime text 3/sublimetext.exe' -w"` |
| Sublime (Win64) | `git config --global core.editor "'c:/program files/sublime text 3/sublimetext.exe' -w"`       |
| Textmate        | `git config --global core.editor "mate -w"`                                                    |

### Alias
When you find yourself doing a similar task over and over (including looking up options), create an [alias](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases).

Two methods:
1.  Use _git config_: `git config --global alias.logtree 'log --graph --oneline --decorate --all'`
2.  Edit the config file yourself: `logtree =  log --graph --oneline --decorate --all`

There is a configuration file in the `.git/config` folder. And there is a global configuration file in your root user folder `.gitconfig`.

#### Examples
*   One line log entries with author name, relative commit date, merge indicators, and colors.
    `git config --global alias.ls "log --pretty=format:'%Cblue%h%Cred%d %Cgreen%cd %Creset%s%Cgreen [%an]' --graph --date=relative"`

## Scenarios

- [TOC](#toc)
- [Helpful Sources](#helpful-sources)
- [Definitions](#definitions)
- [Operation](#operation)
  - [Commands](#commands)
  - [Config](#config)
    - [Editors](#editors)
  - [Alias](#alias)
    - [Examples](#examples)
- [Scenarios](#scenarios)
  - [Local master ahead of origin/master](#local-master-ahead-of-originmaster)
  - [Merge multiple commits into one commit](#merge-multiple-commits-into-one-commit)
- [Origin master ahead or upstream/master](#origin-master-ahead-or-upstreammaster)
- [Clone convert](#clone-convert)
  - [Ditch The Fork](#ditch-the-fork)
- [Git Hooks](#git-hooks)
  - [Installing Packages](#installing-packages)
- [Learning Tools](#learning-tools)

### Local master ahead of origin/master
I was preparing to sync my fork with upstream and found that my local master was ahead of my fork's master. This could only mean that I had committed something locally to master. Happens often when I start working without checking which branch I am on.
```bash
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)
nothing to commit, working tree clean
```
1.  Check the differences in commits between local and origin.
    ```bash
    $ git cherry -v origin/master master
    + a3011664d9b52600b48e1c019a6639c53eb0fb76 a bad commit
    + e9ab3aa37be9d85014b572b153e24c2dcdd36419 some other commit
    ```
2.  I remember making this commit and then creating a new branch to do further work. Thus I already have those changes and can perform a hard reset. If not sure, I'd perform a soft reset and then create a new branch and commit the changes.
    ```bash
    $ git reset --hard HEAD~1
    HEAD is now at e9ab3aa some other commit

    $ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    nothing to commit, working tree clean
    ```

### Merge multiple commits into one commit
I'm ready to push my feature branch but I notice that there are multiple commits here that will make an ugly commit when it becomes merged upstream.

```bash
$ git ls
* ba3f8ff (HEAD -> git-panic) 49 minutes ago some work [Todd Hogarth]
* e9e65b9 4 hours ago ensuring that all file endings are CRLF after setting config.autocrlf to false [Todd Hogarth]
```

1.  An easy method is to perform a soft reset and then re-commit.
    ```bash
    git reset --soft HEAD~2
    git add -A
    git commit -m 'changes I made'
    ```

## Origin master ahead or upstream/master
During a synchronization we have to merge upstream/master into our local master. During one such operation I encountered merge conflict which I corrected and committed. I then pushed this to my fork (origin). A few days later I was looking at my fork on Github and saw that my master was 2 commits ahead of upstream/master. This should never happen unless I had been working on master and had some commits. I should have realized when I fixed the merge conflicts that something was wrong.

Well how to fix?
1.  First identify the commits that should not be on master. Luckily, there were no further merges from upstream into my master. Below I see a pull request followed by a local commit and a merge commit. Due to our workflow, the pull request should always be the most recent commit. Thus I needed to get rid of the last 2 commits.
    ```
    $ git log
    commit d5dd60273f53c487f3c7a9160d2838111a3d01bc (HEAD -> master, origin/master, origin/HEAD)
    Merge: 7544695 4dc4826
    Author: Todd Hogarth <some@place.com>
    Date:   Tue Sep 19 08:48:59 2017 -0400

        Merge remote-tracking branch 'upstream/master'

    commit 75446951f996cee1b8f310f04155c2909239222b
    Author: Todd Hogarth <some@place.com>
    Date:   Tue Sep 19 08:48:49 2017 -0400

        added junit test result

    commit 4dc4826163a568d48e43849b43cf8c1bc5ebae84 (upstream/master)
    Author: Todd Hogarth <some@place.com>
    Date:   Tue Sep 19 08:46:29 2017 -0400

        delete files in build destination after deleted in src (#12)

        * delete files in build destination after deleted in src
        * fixed typo in version number
        * added cfhome as optional flag. removed single run check from clean as not needed after runSequence inplemented
    ```

2.  Roll back the master branch by two commits. `git reset --hard HEAD~2`.
    *   I use the `--hard`:warning: option because the commits are preserved on another branch.
3.  Now my master branch is in its proper state, but origin master is still 2 commits ahead. To fix that, I need to perform a forced push. `git push -f origin master` :warning:
    *   This is OK because my fork's master is not shared by others.
4.  Lastly, any branch I created from the botched master will need to have the merge commit removed prior to creating any pull request. Depending on how many additional commits are on the work branch, I may want to start over or attemp a reset.

## Clone convert

### Ditch The Fork

In this example we are going to convert a local repository so that our origin becomes that of the upstream repo and not our fork.

1.  Take a look at your branch and the remote branches. Also get a list of your remotes. We will need the url of the upstream branch so copy it into your clipboard.
    ```script
    $ git branch -a
      build
    * master
      remotes/origin/HEAD -> origin/master
      remotes/origin/build
      remotes/origin/master
      remotes/upstream/master
    $ git remote -v
    origin  https://github.com/me/my-repo.git (fetch)
    origin  https://github.com/me/my-repo.git (push)
    upstream        https://github.com/upstream/my-repo.git (fetch)
    upstream        https://github.com/upstream/my-repo.git (push)
    ```

2.  Delete upstream remote and then take a look at your remote branches. The upstream branches should be gone.
    ```script
    $ git remote remove upstream
    $ git branch -a
      build
    * master
      remotes/origin/HEAD -> origin/master
      remotes/origin/build
      remotes/origin/master
    ```

3.  Delete the origin remote. The only branches remaining are master and those you created.
    ```script
    $ git remote remove origin
    $ git branch -a
      build
    * master
    ```

4.  Add a new origin remote. Notice now that we still only see our local branches. This is because we haven't told git yet to fetch from our new origin remote.
    ```script
    $ git remote add origin https://github.com/upstream/my-repo.git
    $ git branch -a
      build
    * master
    ```

5.  Fetch from origin. Now we can see that remote branches.
    ```script
    $ git fetch
    From https://github.com/upstream/my-repo
     * [new branch]      master     -> origin/master
    $ git branch -a
      build
    * master
      remotes/origin/master
    ```

6. Now instruct git to track our local master with origin/master.
    ```script
    $ git branch --set-upstream-to=origin/master master
    Branch master set up to track remote branch master from origin.
    ```

7.  If any of the other local branches were previously tracking a branch on the old (fork) origin, you will have to re-enable this when you next push. We can push the branch and create it, but that branch name is probably not appropriate. We should rename and then push.
    ```script
    $ git branch -m build th/build
    $ git push -u origin th/build
    Total 0 (delta 0), reused 0 (delta 0)
    To https://github.com/upstream/my-repo.git
     * [new branch]      th/build -> th/build
    Branch th/build set up to track remote branch th/build from origin.
    ```

7.  Do not delete the fork until all pull requests originating from it are closed.

## Git Hooks

These are scripts that git will run in response to certain actions.

### Installing Packages

Sometime a problem may occur when switching to a branch with a different set of build packages. One could run a `git diff <previous branch>.. -- yarn.lock` each time a branch is checked out but that would be easy to forget.


One way to deal with these problems, is to create post-checkout hook for the git repo.

1.  In you editor, open the `.git/hooks` folder.
2.  Create a new file called `post-checkout`
3.  Copy and paste the script below.
    *   Mac users: replace with the result of `which bash`. Also make the script executable with `chmod +x`. Also not sure if the `tput bel` command will work.

    ```bash
    #!/bin/sh
    yarn=$(git diff --shortstat "$1".."$2" -- yarn.lock)
    if ! [[ -z $yarn ]]; then
        yarn install
    fi
    ```


## Learning Tools

*   [Github On Demand](https://services.github.com/on-demand/)
*   [Github For Developers](https://githubtraining.github.io/training-manual/fullcicdcircle/index)
*   [Alternative to cherry-picking](https://stackoverflow.com/a/62402568/384724)
*   Git Simulators
    *   [Visualize Git](http://git-school.github.io/visualizing-git/)
    *   [Git Branching](http://learngitbranching.js.org/)
