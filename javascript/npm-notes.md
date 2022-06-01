# Node Package Manager Notes

## binaries

Binaries are copied into the `node_modules/.bin` folder. See [executables](https://docs.npmjs.com/configuring-npm/folders#executables) 

__gulp__
```shell
#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node"  "$basedir/../gulp/bin/gulp.js" "$@" 
  ret=$?
else
  node  "$basedir/../gulp/bin/gulp.js" "$@"
  ret=$?
fi
exit $ret
```

__gulp.cmd__
```bat
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\gulp\bin\gulp.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\gulp\bin\gulp.js" %*
)
```
