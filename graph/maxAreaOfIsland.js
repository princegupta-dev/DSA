/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let maxArea = 0;
  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 0) {
      return 0;
    }
    grid[r][c] = 0;
    return (
      1 +
      dfs(r + 1, c) + // down
      dfs(r - 1, c) + // up
      dfs(r, c + 1) + // right
      dfs(r, c - 1)
    ); // left
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        const area = dfs(r, c);
        maxArea = Math.max(maxArea, area);
      }
    }
  }

  return maxArea;
};
