function productOfArrayExceptSelf(nums) {
  const ans = [];
  const left = buildLeft(nums);
  const right = buildRight(nums);

  for (let i = 0; i < nums.length; i++) {
    ans[i] = left[i] * right[i];
  }
  return ans;
}
function buildLeft(nums) {
  const left = [];
  left[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    left[i] = left[i - 1] * nums[i - 1];
  }
  return left;
}

function buildRight(nums) {
  const right = [];
  right[nums.length - 1] = 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    right[i] = right[i + 1] * nums[i + 1];
  }
  return right;
}

console.log(productOfArrayExceptSelf([1, 2, 3, 4]));
