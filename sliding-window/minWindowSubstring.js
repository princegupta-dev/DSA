// 76. Minimum Window Substring

/*
Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

 

Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.

Constraints:

m == s.length
n == t.length
1 <= m, n <= 105
s and t consist of uppercase and lowercase English letters.
 

Follow up: Could you find an algorithm that runs in O(m + n) time?*/

function minWindow(s, t) {
  if (s.length < t.length) return "";
  let tMap = new Map();
  for (let char of t) {
    tMap.set(char, (tMap.get(char) || 0) + 1);
  }
  let left = 0,
    minLen = Infinity,
    minStart = 0;
  let required = tMap.size;
  let windowMap = new Map();
  let formed = 0;

  for (let right = 0; right < s.length; right++) {
    let char = s[right];
    windowMap.set(char, (windowMap.get(char) || 0) + 1);
    if (tMap.has(char) && windowMap.get(char) === tMap.get(char)) {
      formed++;
    }
    while (formed === required) {
      // Valid window found
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }

      let leftChar = s[left];
      windowMap.set(leftChar, windowMap.get(leftChar) - 1);

      if (tMap.has(leftChar) && windowMap.get(leftChar) < tMap.get(leftChar)) {
        formed--;
      }
      left++; // Shrink window
    }
  }
  return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}

console.log(minWindow("ADOBECODEBANC", "ABC"));
console.log(minWindow("a", "a"));
console.log(minWindow("a", "aa"));
