function solveNQueens(n) {
  const result = [];

  // Board will hold current state of the board
  const board = Array.from({ length: n }, () => ".".repeat(n));

  // Track columns and diagonals to avoid placing queens there
  const cols = new Set(); // columns where queens are placed
  const diag1 = new Set(); // row - col => top-left to bottom-right
  const diag2 = new Set(); // row + col => top-right to bottom-left

  function backtrack(row) {
    if (row === n) {
      result.push([...board]);
      console.log(result); // reached end, valid config
      return;
    }

    for (let col = 0; col < n; col++) {
      // Check if current col or diagonals are under attack
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
        continue; // skip this position
      }

      // Place queen
      const rowStr = board[row].split("");
      rowStr[col] = "Q";
      board[row] = rowStr.join("");

      // Mark attacks
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);

      // Recurse to next row
      backtrack(row + 1);

      // Backtrack - remove queen and marks
      rowStr[col] = ".";
      board[row] = rowStr.join("");
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  backtrack(0); // Start from first row
  return result;
}
console.log(solveNQueens(4));
