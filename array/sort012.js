function sortColor(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i + 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function sortColoroptimize(arr) {
  const count = {};
  for (const num of arr) {
    count[num] = (count[num] || 0) + 1;
  }
  const result = [];
  for (const key in count) {
    for (let i = 0; i < count[key]; i++) {
      result.push(key);
    }
  }
  return result;
}

let arr = [2, 0, 2, 1, 1, 0, 1, 2, 0, 0];
// console.log(sortColor(arr));
// console.log(sortColoroptimize(arr));

function sortColorByDNF(arr) {
  let n = arr.length;
  let low = 0,
    mid = 0;
  high = n - 1;
  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      mid++;
      low++;
    } else if (arr[mid] === 1) {
      mid++;
    } else {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
    }
  }
  return arr;
}

console.log(sortColorByDNF(arr));
