function maxRowSum(arr) {
  let maxSum = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let j = 0; j < arr[i].length; j++) {
      sum += arr[i][j];
    }
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum;
}

const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 1, 1],
];
console.log(maxRowSum(arr));
