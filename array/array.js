// find the smallest in the array
function smallest(arr) {
  let smallest = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
    }
  }
  return smallest;
}
// console.log(smallest(arr));

function findLargest(arr) {
  let largest = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }
  return largest;
}
// console.log(findLargest(arr));

function findSmallestWithBuiltIn(arr) {
  return Math.min(...arr);
}
// console.log(findSmallestWithBuiltIn(arr));

// const smallest = arr.reduce((acc, val) => val < acc ? val : acc);

/*
1️⃣ Why Math.min(...arr) can break
The real issue: argument limits & call stack

Math.min does not take an array.
When you write:

Math.min(...arr)


JavaScript expands the array into individual arguments:

Math.min(arr[0], arr[1], arr[2], ..., arr[n])

What can go wrong?
❌ Maximum argument limit

JavaScript engines impose a limit on how many arguments a function can receive.

V8 (Chrome / Node.js): ~100k arguments

Others may be lower

If the array is large:

const arr = new Array(200_000).fill(1);
Math.min(...arr); // 💥 RangeError: Maximum call stack size exceeded


This fails before Math.min even runs.

❌ Memory overhead

Spreading:

Allocates argument slots

Copies references

Pushes them onto the call stack

This is extra work and memory, especially for large arrays.

❌ Not stream-friendly

You must have:

The entire array in memory

Expanded all at once

No early exit, no chunking.

2️⃣ Why reduce is more scalable
Key idea: iterative processing
arr.reduce((min, val) => val < min ? val : min);


This:

Processes one element at a time

Never expands the array

Uses constant memory

3️⃣ How reduce works internally

Conceptually, JavaScript engines do something like this:

function reduce(array, callback, initialValue) {
  let accumulator = initialValue ?? array[0];
  let startIndex = initialValue === undefined ? 1 : 0;

  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }

  return accumulator;
}

Your min logic inside reduce becomes:
let min = arr[0];

for (let i = 1; i < arr.length; i++) {
  if (arr[i] < min) {
    min = arr[i];
  }
}


No argument explosion. No stack issues.

4️⃣ Why reduce scales better (important)
Aspect	Math.min(...arr)	reduce
Argument limit	❌ Limited	✅ No limit
Memory usage	❌ High	✅ Constant
Stack safety	❌ Can overflow	✅ Safe
Large arrays	❌ Risky	✅ Reliable
Streaming data	❌ Impossible	⚠️ Possible (with loops)

Time complexity:
Both → O(n)

Space complexity:

Math.min(...arr) → O(n) (arguments)

reduce → O(1)

5️⃣ Best scalable solution (industry-grade)

For performance-critical or huge data:

function min(arr) {
  if (arr.length === 0) return undefined;

  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
  }
  return min;
}


This is:

Faster than reduce

More readable

Fully safe

What JS engines optimize best

6️⃣ Mental model (easy to remember)

Spread (...) = “dump everything on the stack at once” ❌

Reduce / loop = “process one value at a time” ✅

Final takeaway (best answer)

Math.min(...arr) breaks due to argument limits & stack overflow

reduce scales because it iterates, not expands

Internally, both are linear, but only reduce is memory-safe

For serious systems → plain loop > reduce > spread

*/

function sumOfArray(arr) {
  if (arr.length === 0) return undefined;
  let sum = arr[0];
  for (let i = 1; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
// console.log("sum of array", sumOfArray(arr));

let bigArray = [];
for (let i = 0; i < 100000; i++) {
  bigArray.push(i % 1000); // many duplicates
}

function uniqueValueInNestedArray(arr) {
  let unique = [];
  for (let i = 0; i < arr.length; i++) {
    let isUnique = true;
    for (let j = 0; j < arr.length; j++) {
      if (i === j) continue;
      if (arr[i] === arr[j]) {
        isUnique = false;
        break;
      }
    }
    if (isUnique) unique.push(arr[i]);
  }
  return unique;
}

// console.log(uniqueValueInArray(bigArray))

function uniqueValueInArray(arr) {
  const count = {};
  for (const num of arr) {
    count[num] = (count[num] || 0) + 1;
  }
  return arr.filter((num) => count[num] === 1);
}
// console.log(uniqueValueInArray(arr))

function uniqueMap(arr) {
  const map = new Map();

  for (const val of arr) {
    map.set(val, (map.get(val) || 0) + 1);
  }

  return arr.filter((val) => map.get(val) === 1);
}

// console.time("Nested Loop");
// uniqueValueInNestedArray(bigArray);
// console.timeEnd("Nested Loop");

// console.time("Count Map");
// uniqueValueInArray(bigArray);
// console.timeEnd("Count Map");

// console.time(" Map");
// uniqueMap(bigArray);
// console.timeEnd(" Map");

function intersectionOfArray(arr1, arr2) {
  let intersection = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        if (!intersection.includes(arr1[i])) {
          intersection.push(arr1[i]);
        }
        break;
      }
    }
  }
  return intersection;
}

const arr1 = [1, 2, 3, 4, 5, 5];
const arr2 = [4, 5, 6, 7, 8, 5];

console.log(intersectionOfArray(arr1, arr2));
