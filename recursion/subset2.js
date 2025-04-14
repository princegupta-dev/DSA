// Subset ||
/*
Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

 

Example 1:

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
*/

function subsetsWithDup(nums) {
  const result = [];
  nums.sort((a, b) => a - b); // Sort to handle duplicates
  function backtrack(start, path) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      //skip duplicates
      if (i > start && nums[i] === nums[i - 1]) continue;
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop(); // backtrack
    }
  }
  backtrack(0, []);
  return result;
}

console.log(subsetsWithDup([1, 2, 2]));
