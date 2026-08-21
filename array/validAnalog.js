/*
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

 

Example 1:

Input: s = "anagram", t = "nagaram"

Output: true

Example 2:

Input: s = "rat", t = "car"

Output: false

*/

function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1);
  }
  for (let j = 0; j < t.length; j++) {
    map.set(t[j], (map.get(t[j]) || 0) - 1);
  }
  for (let [key, value] of map) {
    if (value !== 0) return false;
  }
  return true;
}

console.log(isAnagram("anagram", "nagaram"));
console.log(isAnagram("rat", "car"));
