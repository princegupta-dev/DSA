// debugger;

// // with recursion
// function printSubsets(arr, ans, i) {
//   if (i === arr.length) {
//     console.log(ans.join(" "));
//     return;
//   }

//   ans.push(arr[i]);
//   printSubsets(arr, ans, i + 1);

//   ans.pop();
//   printSubsets(arr, ans, i + 1);
// }

// // without using recursion
// function ps(arr) {
//   const n = arr.length;
//   const size = 1 << n;
//   for (let mask = 0; mask < size; mask++) {
//     let subset = [];

//     for (let i = 0; i < n; i++) {
//       // console.log(mask & (1 << i));
//       if (mask & (1 << i)) {
//         subset.push(arr[i]);
//       }
//     }
//     console.log(subset);
//   }
// }

// const arr = [1, 2, 3];
// let ans = [];
// // const subsets = printSubsets(arr);
// console.log(printSubsets(arr, ans, 0));

// // console.log(subsets);

// /*
// [
//   [ 1, 2, 3 ], [ 1, 2 ],
//   [ 1, 3 ],    [ 1 ],
//   [ 2, 3 ],    [ 2 ],
//   [ 3 ],       []
// ]
//   */

function permute(arr, idx = 0) {
  if (idx === arr.length) {
    console.log(arr.join(""));
    // return;
  }

  for (let i = idx; i < arr.length; i++) {
    // swap
    [arr[idx], arr[i]] = [arr[i], arr[idx]];
    // recurse
    permute(arr, idx + 1);

    // backtrack (undo swap)
    [arr[idx], arr[i]] = [arr[i], arr[idx]];
  }
}

console.log(permute(["A", "B", "C"]));
