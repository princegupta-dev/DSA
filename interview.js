function getSubarraysOfLength(arr, k) {
  const result = [];

  for (let i = 0; i <= arr.length - k; i++) {
    result.push(arr.slice(i, i + k));
  }

  return result;
}

// Example usage
const arr = [1, 2, 3, 4, 5, 6];
const userInput = 2;

const subarrays = getSubarraysOfLength(arr, userInput);
console.log(subarrays);

//JS Code (no slice(), no inbuilt functions):

function getSubarraysOfLength(arr, k) {
  const result = [];

  for (let i = 0; i <= arr.length - k; i++) {
    const subarray = [];
    for (let j = 0; j < k; j++) {
      subarray.push(arr[i + j]);
    }
    result.push(subarray);
  }

  return result;
}

// Example
const arr2 = [1, 2, 3, 4, 5, 6];
const k = 3;

const subarrays2 = getSubarraysOfLength(arr, k);
console.log(subarrays);
