function nextGreaterElements(nums) {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack = [];
  for (let i = 0; i < 2 * n; i++) {
    const curr = nums[i % n];
    while (stack.length > 0 && nums[stack[stack.length - 1]] < curr) {
      const idx = stack.pop();
      result[idx] = curr;
    }
    if (i < n) {
      stack.push(i);
    }
  }

  return result;
}
