// 125. Valid Palindrome

/*
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

 

Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
Example 3:

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
 

Constraints:

1 <= s.length <= 2 * 105
s consists only of printable ASCII characters.
*/

// Solution
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    while (left < right && !isAlphaNumeric(s[left])) left++;

    while (left < right && !isAlphaNumeric(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }
  return true;
}

function isAlphaNumeric(char) {
  return /[a-zA-Z0-9]/.test(char);
}

//another approach
// function isPalindrome(s) {
//   // Step 1: Convert to lowercase
//   s = s.toLowerCase();

//   // Step 2: Remove non-alphanumeric characters
//   s = s.replace(/[^a-z0-9]/g, ""); // Keep only a-z and 0-9

//   // Step 3: Check if it's the same forward and backward
//   return s === s.split("").reverse().join("");
// }

// Test Cases
// console.time("Execution Time");
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
// console.timeEnd("Execution Time");
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true
