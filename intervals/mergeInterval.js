//  Merge Intervals

/*
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

 

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.

Constraints:

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104
*/

// Solutions
function mergeIntervals(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];
  let currentInterval = intervals[0];
  for (let i = 1; i < intervals.length; i++) {
    let nextInterval = intervals[i];

    // If intervals overlap, merge them
    if (currentInterval[1] >= nextInterval[0]) {
      currentInterval[1] = Math.max(currentInterval[1], nextInterval[1]);
    } else {
      merged.push(currentInterval);
      currentInterval = nextInterval;
    }
  }

  merged.push(currentInterval);
  return merged;
}

console.log(
  mergeIntervals([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ])
);

console.log(
  mergeIntervals([
    [1, 4],
    [4, 5],
  ])
);
