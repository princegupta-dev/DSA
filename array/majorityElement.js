/* Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

Example 1:

Input: nums = [3,2,3]
Output: 3
Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2
*/

//solution`

function majorityElement(nums) {
  const obj = {};
  for (let i = 0; i < nums.length; i++) {
    obj[nums[i]] = (obj[nums[i]] || 0) + 1;
  }
  return nums.find((num) => obj[num] >= Math.floor(nums.length / 2));
}

let nums = [2, 2, 1, 1, 1, 1, 2, 2, 1, 2];
// console.log(majorityElement(nums));

// Find the element that appears more than ⌊n/2⌋ times in an array.
// Pair different elements and cancel them out
// The element left at the end (if any) is the majority candidate

function majorityElementWithMoore(nums) {
  let count = 0;
  let candidate = null;
  for (let num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += num === candidate ? 1 : -1;
  }
  return candidate;
}

console.log(majorityElementWithMoore(nums));
