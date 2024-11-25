// Remove Element

/* Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.
        
    Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:
    
    Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
    Return k.
     */

//Solution
function removeElement(nums, val) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }
  console.log(nums)
  return k;
}
//case 1
let nums = [1];
let val = 1;

// case 2
let case2 = [3,3];
let val1 = 3;
console.log(removeElement(nums, val));
