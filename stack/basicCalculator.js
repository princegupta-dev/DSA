// 224. Basic Calculator

/*
Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.

Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().

 

Example 1:

Input: s = "1 + 1"
Output: 2
Example 2:

Input: s = " 2-1 + 2 "
Output: 3
Example 3:

Input: s = "(1+(4+5+2)-3)+(6+8)"
Output: 23

constraints:

1 <= s.length <= 3 * 105
s consists of digits, '+', '-', '(', ')', and ' '.
s represents a valid expression.
'+' is not used as a unary operation (i.e., "+1" and "+(2 + 3)" is invalid).
'-' could be used as a unary operation (i.e., "-1" and "-(2 + 3)" is valid).
There will be no two consecutive operators in the input.
Every number and running calculation will fit in a signed 32-bit integer.
*/
function calculate(s) {
  let stack = [];
  let num = 0;
  let sign = 1; // 1 for '+', -1 for '-'
  let res = 0;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char >= "0" && char <= "9") {
      num = num * 10 + parseInt(char);
    } else if (char === "+") {
      res += sign * num;
      num = 0;
      sign = 1;
    } else if (char === "-") {
      res += sign * num;
      num = 0;
      sign = -1;
    } else if (char === "(") {
      // push current result and sign
      stack.push(res);
      stack.push(sign);
      // reset for new expression
      res = 0;
      sign = 1;
    } else if (char === ")") {
      res += sign * num;
      num = 0;
      // first pop sign then previous result
      res *= stack.pop(); // sign
      res += stack.pop(); // previous result
    }
    // ignore whitespace
  }

  return res + sign * num;
}
