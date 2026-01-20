function linearSearch(arr, row, cols, target) {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < cols; j++) {
      if (arr[i][j] === target) {
        return true;
      }
    }
  }
  return false;
}

const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(linearSearch(arr, 3, 3, 10));
