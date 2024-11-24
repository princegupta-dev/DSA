//  Merge Sorted Array

/* You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. */

/* Merge nums1 and nums2 into a single array sorted in non-decreasing order. */

/* 
The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
*/

// Example

/* Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
*/

// Solution
// function merge(nums1, m, nums2, n) {
//   let i = 0;
//   let j = 0;
//   let arr = [];
//   while (i < m && j < n) {
//     if (nums1[i] < nums2[j]) {
//       arr.push(nums1[i]);
//       i++;
//     }
//     if (nums2[j] < nums1[i]) {
//       arr.push(nums2[j]);
//       j++;
//     }
//     if (nums1[i] === nums2[j]) {
//       arr.push(nums1[i]);
//       i++;
//       j++;
//     }
//   }
//   while (i < m) {
//     console.log("m");
//     arr.push(nums1[i]);
//     i++;
//   }
//   while (j < n) {
//     // console.log("n")
//     arr.push(nums2[j]);
//     j++;
//   }
//   return arr;
// }

function merge(nums1, m, nums2, n) {
  let p1 = m - 1; // p1 for nums1
  let p2 = n - 1; // p2 pointer for nums2
  let k = m + n - 1; // for put the element from last in nums1
  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[k] = nums1[p1];
      p1--;
      k--;
    } else {
      nums1[k] = nums2[p2];
      p2--;
      k--;
    }
  }
  //if any remaining element, then push it into nums1[k]
  while (p2 >= 0) {
    nums1[k] = nums2[p2];
    p2--;
    k--;
  }
  return nums1;
}

let nums1 = [1, 2, 3, 0, 0, 0];
let m = 3;
let nums2 = [2, 5, 6];
let n = 3;

console.log(merge(nums1, m, nums2, n));
