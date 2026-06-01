var searchInsert = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (nums[mid] > target) {
      end = mid - 1;
    } else if (nums[mid] < target) {
      start = mid + 1;
    } else if (nums[mid] === target) {
      return mid;
    }
  }
  return start;
};

let nums = [1, 3, 5, 6];
target = 7;

console.log(searchInsert(nums, target));
