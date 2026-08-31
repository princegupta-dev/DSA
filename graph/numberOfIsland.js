var numberOfIsland = function (grid) {
  const cols = grid[0].length;
  const rows = grid.length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 0) {
      return;
    }

    grid[r][c] = 0;

    dfs(r + 1, c); // down
    dfs(r - 1, c); // up
    dfs(r, c + 1); // right
    dfs(r, c - 1); // left
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
};
