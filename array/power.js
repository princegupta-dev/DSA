var myPow = function (x, n) {
  if (n === 0) return 1;

  let power = Math.abs(n);
  let result = 1;

  while (power > 0) {
    if (power % 2 === 1) {
      result *= x;
    }
    x *= x;
    power = Math.floor(power / 2);
  }

  return n < 0 ? 1 / result : result;
};

console.log(myPow(2, 11));
