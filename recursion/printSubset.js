debugger;

function printSubsets(arr) {
  const result = [];
  function backtrack(index, current) {
    if (index === arr.length) {
      result.push([...current]);
      return;
    }
    // Include the current element
    current.push(arr[index]);
    backtrack(index + 1, current);
    // Exclude the current element
    current.pop();
    backtrack(index + 1, current);
  }
  backtrack(0, []);
  return result;
}

const arr = [1, 2, 3];
const subsets = printSubsets(arr);
console.log(subsets);

/*
[
  [ 1, 2, 3 ], [ 1, 2 ],
  [ 1, 3 ],    [ 1 ],
  [ 2, 3 ],    [ 2 ],
  [ 3 ],       []
]
  */
