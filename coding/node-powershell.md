
While tempting to use the option `shell:'pwsh'` one won't be able to pass startup options to the shell. Thus invoke `powershell` or `pwsh` in the command string itself. Here `-nop` prevents loading of the user's profile.

```js
node -p "require('child_process').execSync('powershell -nop -Command (get-content ~/projects/myapp/package.json -Tail 5)',{encoding: 'utf8'})"
```
