// 205. Isomorphic Strings
/*
Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

 

Example 1:

Input: s = "egg", t = "add"

Output: true

Explanation:

The strings s and t can be made identical by:

Mapping 'e' to 'a'.
Mapping 'g' to 'd'.
Example 2:

Input: s = "foo", t = "bar"

Output: false

Explanation:

The strings s and t can not be made identical as 'o' needs to be mapped to both 'a' and 'r'.

Example 3:

Input: s = "paper", t = "title"

Output: true
*/

//Solution
function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  let mapS = {};
  let mapT = {};
  for (let i = 0; i < s.length; i++) {
    let charS = s[i];
    let charT = t[i];
    // Check if s -> t mapping is consistent
    if (mapS[charS] !== undefined && mapS[charS] !== charT) {
      return false;
    }
    // Check if t -> s mapping is consistent
    if (mapT[charT] !== undefined && mapT[charT] !== charS) {
      return false;
    }
    // Store mappings
    mapS[charS] = charT;
    mapT[charT] = charS;
  }
  return true;
}

console.log(isIsomorphic("egg", "add"));
console.log(isIsomorphic("foo", "bar"));
console.log(isIsomorphic("paper", "title"));
