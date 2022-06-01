
/* eslint no-console: off */
const target = process.argv[2] || [1, 2, 3];


function reverseString(arr) { 
  return arr.reduceRight((acc,cur) => acc.concat(cur),"") 
}

console.log('reduceRight:', reverseString([...target]));
