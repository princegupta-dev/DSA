A stack is a linear data structure that follows the LIFO principle:

**LIFO = Last In, First Out**
That means: the last item added is the first one removed.

## 🎯 Real-Life Example of a Stack

1. Stack of Plates 🍽️
   Imagine you're stacking plates in the kitchen:

- You add plates one on top of the other.
- When you want a plate, you remove the top plate first.

So, the last plate added is the first one taken out.

## 2. Back Button in Browser 🔙

Every time you visit a webpage, it’s pushed onto a stack.

- You go to A → B → C → D
- Press "Back" → goes to C → then B → then A (LIFO)

## Stack Operations

- push(item) - Adds item to the top of the stack
- pop() - Removes and returns the top item
- peek() / top() - Returns top item without removing it
- isEmpty() - Checks if the stack is empty
- size() - Returns number of items in the stack

## Programming/CS Use Cases:

- Undo functionality (e.g., in Word, Photoshop)
- Backtracking (e.g., maze solving, puzzles)
- Function call stack in recursion
- Expression parsing (e.g., postfix/prefix)
- Balancing symbols (e.g., (), {}, [])

## Internal Implementation

You can implement a stack using:

- Arrays
- Linked Lists
- Collections (like Stack, Deque, or LinkedList in Java)

## What is a Stack Overflow?

A stack overflow is an error that happens when a program uses more stack memory than is available.

💡 Remember:
Every time a function/method is called, it's added (pushed) onto the call stack. If too many function calls are made (especially recursively), the stack becomes full… and that’s when a StackOverflowError occurs.

Imagine a stack of boxes (like in a warehouse). You keep adding more boxes to the stack.

If you keep stacking too high, the tower of boxes collapses — that’s your stack overflow.

```js
class Stack {
  constructor() {
    this.items = [];
  }

  // Add element to stack
  push(element) {
    this.items.push(element);
  }

  // Remove element from stack
  pop() {
    if (this.isEmpty()) return "Stack is empty";
    return this.items.pop();
  }

  // View top element
  peek() {
    return this.items[this.items.length - 1];
  }

  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Print all elements
  printStack() {
    console.log(this.items.join(" "));
  }
}

// 🔧 Usage
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);

console.log("Top:", stack.peek()); // 30
stack.pop(); // Removes 30
stack.printStack(); // 10 20
```
