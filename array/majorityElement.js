/* Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

Example 1:

Input: nums = [3,2,3]
Output: 3
Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2
*/

//solution

//normal approach
// function majorityElement(nums) {
//   let obj = {};
//   let count = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (!obj[nums[i]]) {
//       obj[nums[i]] = count;
//     }
//     obj[nums[i]]++;
//   }
//   // console.log(obj);
// }

//Boyer-Moore Voting Algorithm
function majorityElement(nums) {
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
console.log(majorityElement([3, 2, 3]));
