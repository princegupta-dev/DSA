// 242. Valid Anagram

/*
Given two strings s and t, return true if t is an anagram of s, and false otherwise.
Example 1:

Input: s = "anagram", t = "nagaram"

Output: true

Example 2:

Input: s = "rat", t = "car"

Output: false

Constraints:

1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.
 

Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
*/

function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  let mapS = {};
  let mapT = {};

  for (let i = 0; i < s.length; i++) {
    let charS = s[i];
    let charT = t[i];
    mapS[charS] = (mapS[charS] || 0) + 1;
    mapT[charT] = (mapT[charT] || 0) + 1;
  }
  for (let key in mapS) {
    if (mapS[key] !== mapT[key]) return false;
  }

  return true;
}

console.log(isAnagram("anagram", "nagaram"));
console.log(isAnagram("rat", "car"));
