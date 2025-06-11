function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  console.log(arr, "arr");
  console.log(left, "left");
  console.log(right, "right");
  //   return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}

console.log(mergeSort([29, 10, 14, 37, 13]));

// let arr = [29, 10, 14, 37, 13];
// console.log("sliced array", arr.slice(1));
