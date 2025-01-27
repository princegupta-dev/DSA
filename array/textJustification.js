// Text Justification

/*
Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left-justified, and no extra space is inserted between words.

Note:

A word is defined as a character sequence consisting of non-space characters only.
Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
The input array words contains at least one word.
 

Example 1:

Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
   Example 2:

Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
Output:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
Explanation: Note that the last line is "shall be    " instead of "shall     be", because the last line must be left-justified instead of fully-justified.
Note that the second line is also left-justified because it contains only one word.
Example 3:

Input: words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], maxWidth = 20
Output:
[
  "Science  is  what we",
  "understand      well",
  "enough to explain to",
  "a  computer.  Art is",
  "everything  else  we",
  "do                  "
]

*/
function fullJustify(words, maxWidth) {
  const result = [];
  let line = []; // Current line of words
  let lineLength = 0; // Total length of words in the current line

  for (let word of words) {
    // Check if adding the current word exceeds maxWidth
    if (lineLength + line.length + word.length > maxWidth) {
      // Distribute spaces for the current line
      result.push(justify(line, lineLength, maxWidth));
      line = []; // Reset the line
      lineLength = 0;
    }
    line.push(word);
    lineLength += word.length;
  }

  // Handle the last line (left-justified)
  result.push(leftJustify(line, maxWidth));

  return result;
}

// Fully justify a line of words
function justify(line, lineLength, maxWidth) {
  const spaces = maxWidth - lineLength; // Total spaces to distribute
  const gaps = line.length - 1; // Number of gaps between words

  // If there is only one word, left-justify it
  if (gaps === 0) {
    return line[0] + " ".repeat(spaces);
  }

  const spacePerGap = Math.floor(spaces / gaps); // Evenly distributed spaces
  const extraSpaces = spaces % gaps; // Extra spaces to distribute

  let justifiedLine = "";
  for (let i = 0; i < line.length - 1; i++) {
    justifiedLine += line[i];
    justifiedLine += " ".repeat(spacePerGap + (i < extraSpaces ? 1 : 0));
  }
  justifiedLine += line[line.length - 1]; // Add the last word

  return justifiedLine;
}

// Left-justify the last line
function leftJustify(line, maxWidth) {
  return line.join(" ") + " ".repeat(maxWidth - line.join(" ").length);
}
