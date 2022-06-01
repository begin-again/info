# Bash one liners

## Locate some Git repositories

```bash
$ find . -maxdepth 2 -type d -name '.git' -print \
| xargs -I{} grep -Hm 1 projects {}/config 2>/dev/null \
| cut -d':' -f1 | cut -d'/' -f1-3
```

## Count commits in my repositories

```bash
find .. -maxdepth 2 -type d -name '.git' -print | xargs -I{} grep -Hm 1 projects {}/config 2>/dev/null | cut -d':' -f1 | cut -d'/' -f1-3 | xargs -I{} git -C {} log master --author="Begin-Again" - -oneline | wc -l
```
