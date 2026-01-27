debugger;

function printSubsets(arr, ans, i) {
  if (i === arr.length) {
    console.log(ans.join(" "));
    return;
  }

  ans.push(arr[i]);
  printSubsets(arr, ans, i + 1);

  ans.pop();
  printSubsets(arr, ans, i + 1);
}
function ps(arr) {
  const n = arr.length;
  const size = 1 << n;
  for (let mask = 0; mask < size; mask++) {
    let subset = [];

    for (let i = 0; i < n; i++) {
      console.log(mask & (1 << i));
      if (mask & (1 << i)) {
        subset.push(arr[i]);
      }
    }
    console.log(subset);
  }
}

const arr = [1, 2, 3];
let ans = [];
// const subsets = printSubsets(arr);
console.log(printSubsets(arr, ans, 0));

// console.log(subsets);

/*
[
  [ 1, 2, 3 ], [ 1, 2 ],
  [ 1, 3 ],    [ 1 ],
  [ 2, 3 ],    [ 2 ],
  [ 3 ],       []
]
  */
