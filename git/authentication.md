# GitHub authentication

## ssh

Rather than having to change your credentials every time your GitHub Enterprise passphrase changes, utilize a secure key instead.

1. Check for existing keys `ls -l ~/.ssh/*.pub`. If you identify a key you wish to use, skip to step 3.
1. Create a new key pair
   1. `ssh-keygen -t rsa -b 4096 -C your_email@example.com`
   1. When you're prompted to "Enter a file in which to save the key," press Enter.
   1. At the prompt to enter a secure passphrase, press enter.
      - Adding a passphrase just complicates the configuration. If interested, see [working with ssh key passphrases](https://help.github.com/en/enterprise/2.18/user/authenticating-to-github/working-with-ssh-key-passphrases)
1. In order for git to know about your key, the `ssh-agent` daemon must be configured.
   1. Verify that the `ssh-agent` daemon is running, `eval $(ssh-agent -s)` which should show something like `> Agent pid <some number>`
   1. Add your private key to the agent, `ssh-add ~/.ssh/<key name>`, default is `id_rsa`
1. Add public key to GitHub
   1. Copy public key to clipboard, use either:
      - If `clip` installed, `clip < ~/.ssh/<key name>.pub`
      - Otherwise, `cat ~/.ssh/<key name>.pub` to send to console. Copy entire content to clipboard.
   1. Log in to GitHub, and click on _settings_ from the menu under your profile picture.
   1. Click _SSH and GPG keys_ then click the _New SSH Key_ button at top right.
   1. Add a useful title to identify the key.
   1. Paste the clipboard contents in the key box.
   1. Click the _Add SSH Key_ button. If prompted enter your GitHub Enterprise password.
   1. Observe that the key is represented as an md5 signature with your supplied title. If you ever need to confirm signature with local key, `ssh-keygen -E md5 -lf ~/.ssh/<key name>`

:hand: When cloning from git, use the _ssh_ option instead of the default _https_. <br/>

- To convert an existing repository to utilize ssh, edit file in `.git/config` replacing any urls with ssh address.

:hand: On first use of ssh key you will be prompted to allow the connection to GitHub. Type in "yes" and hit return. This will add GitHub to the known_hosts file (`~/.ssh/known_hosts`) which will prevent this prompt from occurring again unless the server IP address changes.

## personal access token
