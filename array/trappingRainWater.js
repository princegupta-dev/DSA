// Trapping Rain Water

/*
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Example 1:
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9

Constraints:

n == height.length
1 <= n <= 2 * 104
0 <= height[i] <= 105
*/

function trap(height) {
  if (height.length < 3) return 0;
  let left = 0,
    right = height.length - 1;
  let maxLeft = 0,
    maxRight = 0;
  let waterTrapped = 0;
  while (left <= right) {
    if (height[left] <= height[right]) {
      if (height[left] >= maxLeft) {
        maxLeft = height[left];
      } else {
        waterTrapped += maxLeft - height[left];
      }
      left++;
    } else {
      if (height[right] >= maxRight) {
        maxRight = height[right];
      } else {
        waterTrapped += maxRight - height[right];
      }
      right--;
    }
  }
  return waterTrapped;
}

const height1 = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
console.log(trap(height1));
const height2 = [4, 2, 0, 3, 2, 5];
console.log(trap(height2));
