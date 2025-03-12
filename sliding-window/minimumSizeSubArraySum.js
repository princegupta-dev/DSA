// 209. Minimum Size Subarray Sum

/*
Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

 

Example 1:

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
Example 2:

Input: target = 4, nums = [1,4,4]
Output: 1
Example 3:

Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0

Constraints:

1 <= target <= 109
1 <= nums.length <= 105
1 <= nums[i] <= 104
 

Follow up: If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log(n)).
*/

//Solution
function minSubArrayLen(target, nums) {
  let left = 0,
    minlength = Infinity,
    sum = 0;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      minlength = Math.min(minlength, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }
  return minlength === Infinity ? 0 : minlength;
}
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
