# REPL tools

## reload a module

paste into repl.
```js
function nocache(module) {require("fs").watchFile(require("path").resolve(module), () => {delete require.cache[require.resolve(module)]})}
```

```js
nocache('./my-module')
require('./my-module')
```

source: https://stackoverflow.com/a/53105303/384724
