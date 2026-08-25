/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, color) {
  const originalColor = image[sr][sc];
  if (originalColor === color) {
    return image;
  }
  const rows = image.length;
  const cols = image[0].length;

  function dfs(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return;
    }
    if (image[row][col] !== originalColor) {
      return;
    }
    image[row][col] = color;
    dfs(row - 1, col);
    dfs(row + 1, col);
    dfs(row, col - 1);
    dfs(row, col + 1);
  }
  dfs(sr, sc);
  return image;
};
