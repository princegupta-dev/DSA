// 383. Ransom Note
/*
Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

 Example 1:

Input: ransomNote = "a", magazine = "b"
Output: false
Example 2:

Input: ransomNote = "aa", magazine = "ab"
Output: false
Example 3:

Input: ransomNote = "aa", magazine = "aab"
Output: true
 

Constraints:

1 <= ransomNote.length, magazine.length <= 105
ransomNote and magazine consist of lowercase English letters.
*/
//Solution
function canConstruct(ransomNote, magazine) {
  let letterCount = {};
  for (let char of magazine) {
    letterCount[char] = (letterCount[char] || 0) + 1;
  }
  for (const char of ransomNote) {
    if (!letterCount[char]) {
      return false;
    }
    letterCount[char]--;
  }
  return true;
}

console.log(canConstruct("a", "b")); // false
console.log(canConstruct("aa", "ab")); // false
console.log(canConstruct("aa", "aab")); // true
