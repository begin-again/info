# Arrays

* [Insert Unique Items](#insert-unique-items)
* [Delete Item](#delete-item)
* [De-Dupe arrays](#de-dupe-arrays)
  * [primitives](#primitives)
  * [objects](#objects)
* [reverse](#reverse)
  * [destructuring](#destructuring)
  * [fill temp in reverse](#fill-temp-in-reverse)
  * [reduceRight](#reduceRight)

## Insert Unique Items

```javascript
function insertItem(item){
   if (myArray.indexOf(item) < 0) {
      myArray.push(item);
   }
}
```

## Delete Item

```javascript
function deleteItem(item){
  var i = myArray.indexOf(item);
  if (i !== -1) {
     myArray.splice(i, 1);
  }
}
```

## De-Dupe arrays

### primitives

```javascript
function(myArray){
return myArray.filter(function(name,pos,arr){
    return arr.indexOf(name) === pos;
});
```

### objects

Takes firt occurrence of property (array must be sorted)

```js
(arr, prop) => {
    const seen = new Set();
    return arr.filter(item => {
        if(item.hasOwnProperty(prop)) {
            const k = item[prop];
            return seen.has(k) ? false : seen.add(k);
        }
        return false;
    });
};
```

Takes last occurrence of property (array must be sorted)

```js
(arr, prop) => {
    if(arr[0].hasOwnProperty(prop)) {
        return [
            ...new Map(
                arr.map(x => [ x[prop], x ])
            ).values()
        ];
    }
    return [];
};
```

## reverse

`[1,2,3].reverse()`

### destructuring

Must use semi-colon

```js
// [1,2,3]
function reverseArray(arr){
    for(let i=0; i < arr.length/2; i++){
        [arr[i], arr[arr.length - i - 1]] = [arr[arr.length - i - 1], arr[i]];
    }
    return arr
}

```

### fill temp in reverse

```js
function reverseArray(arr){
    const temp = [];

    for(let i = 0; i < arr.length; i++){
        temp.push(arr[arr.length - i - 1]);
    }

    return temp;
}
```

### reduceRight

```js
function reverseArrayRR(arr) { 
  return arr.reduceRight((acc,cur) => acc.concat(cur),[]) 
}
```
