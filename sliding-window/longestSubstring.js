// 3. Longest Substring Without Repeating Characters
/*
Given a string s, find the length of the longest substring without duplicate characters.
Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.

*/
function lengthOfLongestSubstring(s, k) {
  let left = 0;
  let freq = new Map();
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    freq.set(s[right], (freq.get(s[right]) || 0) + 1);
    while (freq.size > k) {
      freq.set(s[left], freq.get(s[left]) - 1);
      if (freq.get(s[left]) === 0) {
        freq.delete(s[left]);
      }
      left++;
    }
    if (freq.size === k) {
      maxLen = Math.max(maxLen, right - left + 1);
    }
  }
  return maxLen;
}

console.log(lengthOfLongestSubstring("aabacbebebe", 3));
// console.log(lengthOfLongestSubstring("bbbbb"));
// console.log(lengthOfLongestSubstring("pwwkew"));
