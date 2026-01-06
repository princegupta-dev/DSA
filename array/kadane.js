function maxsubArray(arr) {
  for (let start = 0; start < arr.length; start++) {
    for (let end = start; end < arr.length; end++) {
      let row = "";
      for (let i = start; i <= end; i++) {
        row += arr[i];
      }
      //   console.log(row);
    }
  }
}
// The core idea is to iterate through the array once, keeping track of the maximum sum

let arr = [1, 2, 3, 4, 5];
// console.log(maxsubArray(arr));

function maxSubArray(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}

// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

function maxSubArrayWithPrint(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  let start = 0;
  let end = 0;
  let tempStart = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > currentSum + nums[i]) {
      currentSum = nums[i];
      tempStart = i;
    } else {
      currentSum += nums[i];
    }
    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }
  return {
    maxSum,
    subarray: nums.slice(start, end + 1),
  };
}
const result = maxSubArrayWithPrint([-2, 1, -3, 4, -1, 2, 1, -5, 4]);

console.log(result.maxSum); // 6
console.log(result.subarray); // [4, -1, 2, 1]
