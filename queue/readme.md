A Queue is a linear data structure that follows the FIFO (First In, First Out) principle—the element added first is removed first.

## Real-life analogy:

Think of a queue at a movie ticket counter—the person who gets in line first, gets served first.

## Queue Operations:

Operation Description
enqueue() -> Add an element to the end
dequeue() -> Remove an element from the front
peek() -> View the front element without removing
isEmpty() -> Check if queue is empty
size() -> Get number of elements

## JavaScript Implementation (using Array):

```js
class Queue {
  constructor() {
    this.items = [];
  }

  // Add item to the back
  enqueue(element) {
    this.items.push(element);
  }

  // Remove item from the front
  dequeue() {
    if (this.isEmpty()) return "Queue is empty";
    return this.items.shift();
  }

  // Get front item
  peek() {
    return this.isEmpty() ? "Queue is empty" : this.items[0];
  }

  // Check if empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Size of queue
  size() {
    return this.items.length;
  }
}
```

## Deque

A Double-Ended Queue (Deque) is a linear data structure that allows insertion and removal from both ends—front and rear.

## Key Features:

- enqueueFront() – Insert at the front
- enqueueRear() – Insert at the rear
- dequeueFront() – Remove from the front
- dequeueRear() – Remove from the rear

## Use Cases:

- Browser history
- Palindrome checking
- Sliding window algorithms
- Undo/Redo functionality

```js
class Deque {
  constructor() {
    this.items = [];
  }

  // Add at rear
  enqueueRear(element) {
    this.items.push(element);
  }

  // Add at front
  enqueueFront(element) {
    this.items.unshift(element); // O(n)
  }

  // Remove from front
  dequeueFront() {
    return this.items.shift(); // O(n)
  }

  // Remove from rear
  dequeueRear() {
    return this.items.pop();
  }

  // View front
  peekFront() {
    return this.items[0];
  }

  // View rear
  peekRear() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

const dq = new Deque();

dq.enqueueRear(10);
dq.enqueueFront(5);
dq.enqueueRear(15);

console.log(dq.dequeueFront()); // 5
console.log(dq.dequeueRear()); // 15
```

unshift() and shift() are O(n) in arrays.

For high-performance deques, use linked lists or specialized libraries like collections/deque in Node.js.

## Circular Queue

A Circular Queue is a linear data structure that follows the First In First Out (FIFO) principle but connects the end of the queue back to the front, forming a circle. This helps to efficiently utilize memory by reusing empty slots left by dequeued elements.

## Key Concepts

- Front: Points to the first element.
- Rear: Points to the last element.
- Circular Nature: When the rear reaches the end and space is available at the front (due to dequeues), new elements are added at the front indexes.

## Advantages

- Better memory utilization than a linear queue.
- Prevents the "false overflow" problem seen in linear queues.

## Operations

- Enqueue: Add element at rear
- Dequeue: Remove element from front
- isFull: Checks if (rear + 1) % size == front
- isEmpty: Checks if front == -1

## Example

```js
class CircularQueue {
  constructor(size) {
    this.queue = new Array(size);
    this.size = size;
    this.front = -1;
    this.rear = -1;
  }

  enqueue(value) {
    if ((this.rear + 1) % this.size === this.front) {
      console.log("Queue is Full");
      return;
    }

    if (this.front === -1) this.front = 0;
    this.rear = (this.rear + 1) % this.size;
    this.queue[this.rear] = value;
  }

  dequeue() {
    if (this.front === -1) {
      console.log("Queue is Empty");
      return;
    }

    const value = this.queue[this.front];
    if (this.front === this.rear) {
      this.front = this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.size;
    }
    return value;
  }

  display() {
    if (this.front === -1) {
      console.log("Queue is Empty");
      return;
    }

    let i = this.front;
    let result = [];
    while (true) {
      result.push(this.queue[i]);
      if (i === this.rear) break;
      i = (i + 1) % this.size;
    }
    console.log(result.join(" -> "));
  }
}
```
