function fib(n) {
  if (n == 0 || n == 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

console.log(fib(10));

// 0 + 1 + 1 + 2 + 3+4;
