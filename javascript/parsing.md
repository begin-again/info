# Parsing

## keys value pairs


`key = some value`

```js
function format(data){
  var out = {};
  Object.keys(data).forEach(function(k){
    if(k.indexOf('"')> -1) {
      var parts = k.split('"');
      var parentKey = parts.shift().trim();
      var childKey = parts.shift().trim();
      if(!out[parentKey]) out[parentKey] = {};
      out[parentKey][childKey] = data[k];
    } else {
      out[k] = merge(out[k],data[k])
      // ES6 version
      //out[k] = {...out[k], ...data[k]};
    }
  });
  return out;
}
```
