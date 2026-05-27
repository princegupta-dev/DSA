/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let min = Infinity;
  for (let i = 0; i <= nums.length; i++) {
    let sum = 0;
    for (let j = i; j <= nums.length; j++) {
      sum = sum + nums[j];
      if (sum >= target) {
        console.log(`Subarray found from index ${i} to ${j}`);
        min = Math.min(min, j + 1 - i);
        break;
      }
    }
  }
  return min === Infinity ? -1 : min;
};

let target = 7,
  nums = [2, 3, 1, 2, 4, 3];
console.log(minSubArrayLen(target, nums));
