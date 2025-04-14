/*
Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

 

Example 1:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
Example 2:

Input: nums = [0,1]
Output: [[0,1],[1,0]]
Example 3:

Input: nums = [1]
Output: [[1]]
*/

function permute(nums) {
  const result = [];
  function backtrack(path, remaining) {
    if (remaining.length === 0) {
      result.push([...path]);
      return;
    }
    // Loop through all remaining numbers
    for (let i = 0; i < remaining.length; i++) {
      const newPath = [...path, remaining[i]];
      // Exclude the used number and pass the rest
      const newRemaining = remaining.filter((_, idx) => idx !== i);
      backtrack(newPath, newRemaining);
    }
  }
  backtrack([], nums);
  return result;
}
console.log(permute([1, 2, 3]));
