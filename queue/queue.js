// class Queue {
//   constructor() {
//     this.items = [];
//   }
//   // Add item to the back
//   enqueue(element) {
//     this.items.push(element);
//   }
//   dequeue() {
//     if (this.items.length > 0) {
//       this.items.shift();
//     }
//     return "Array is Empty";
//   }
// }

// const q = new Queue();

// q.enqueue(1);
// q.enqueue(1);
// q.dequeue();
// q.dequeue();
// console.log(q.items);

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {}
}
