# Windows File Locks

## Determine which process is locking a file

1.  Open PowerShell as administrator
1.  Run this command: `openfiles /local on`
    *   This command will dramatically slow down builds so be sure to turn it off when done.
1.  Restart Windows
1.  Open PowerShell as administrator
1.  Run this command: `openfiles /query /fo table | grep "<name of file>"`
1.  Run this command: `openfiles /local off`
1.  Restart Windows
