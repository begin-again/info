/* eslint no-console: off */
const target = process.argv[2] || [1, 2, 3];

console.log('reverse array', target);

// Time: O(n); space: O(1)
function reverseArrayDS (arr) {
  for (let i = 0; i < arr.length / 2; i++) {
    [arr[i], arr[arr.length - i - 1]] = [arr[arr.length - i - 1], arr[i]];
  }
  return arr;
}

function reverseArrayEA (arr) {
  const temp = [];

  for (let i = 0; i < arr.length; i++) {
    // Copy all the values in reverse order
    temp.push(arr[arr.length - i - 1]);
  }

  return temp;
}


function reverseArrayRR(arr) { 
  return arr.reduceRight((acc,cur) => acc.concat(cur),[]) 
}

console.log('new array:', reverseArrayEA(target));
console.log('destructure:', reverseArrayDS(target));
console.log('reduceRight:', reverseArrayRR(target));
