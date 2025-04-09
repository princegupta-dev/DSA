A function which call itself.

- the work we can do with loops,can be done by recursion also.
- **base case**- the last set of a problem.

A function calls itself to solve a smaller version of the problem until it reaches a base case.

```js
function countDown(n) {
  if (n === 0) return;
  console.log(n);
  countDown(n - 1); // recursive call
}
countDown(5);
// Output: 5 4 3 2 1
```

### Use loop when:

You have simple, repetitive tasks (e.g., counting, summing)
Performance/memory is a concern

### ✅ Use recursion when:

Problem is naturally recursive (e.g., trees, backtracking)
You want cleaner and shorter code for complex tasks

time and space complexity - O(n)

## Call Stack in Recursion?

The call stack is a special data structure used by JavaScript (and other languages) to keep track of function calls.

✅ Execution Flow:

Step Call Stack (Top = Last called) Action
1 sayHi(3) n = 3 → not 0 → logs "Hi 3"
2 sayHi(3)
sayHi(2) calls sayHi(2)
3 sayHi(3)
sayHi(2)
sayHi(1) calls sayHi(1)
4 sayHi(3)
sayHi(2)
sayHi(1)
sayHi(0) base case → return
5 sayHi(3)
sayHi(2)
sayHi(1) return (pop)
6 sayHi(3)
sayHi(2) return (pop)
7 sayHi(3) return (pop)
8 (empty) done

## What is a Recurrence Relation?

A recurrence relation expresses a problem in terms of smaller subproblems.

It's used to define recursive functions mathematically.
