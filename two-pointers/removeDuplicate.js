var removeDuplicates = function (nums) {
  let left = 0;
  for (let right = 1; right < nums.length; right++) {
    if (nums[left] !== nums[right]) {
      nums[left + 1] = nums[right];
      left++;
    }
  }
  return nums.slice(0, left + 1);
};

console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));
