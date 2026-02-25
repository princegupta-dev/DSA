class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAtBeginning(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  insertAtEnd(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  insertAtPosition(value, position) {
    if (position < 0 || position > this.size) return;
    if (position === 0) {
      this.insertAtBeginning(value);
      return;
    }
    const newNode = new Node(value);
    let current = this.head;
    for (let i = 0; i < position - 1; i++) {
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
    this.size++;
  }
  traverse() {
    let curr = this.head;
    let result = "";

    while (curr) {
      result += curr.value;

      if (curr.next) {
        result += " → ";
      }

      curr = curr.next;
    }

    console.log(result);
  }
  reverse() {
    // 10 -> 20 -> 30 -> 40 -> null
    let prev = null;
    let current = this.head; // 10
    while (current) {
      let next = current.next; // 20
      current.next = prev; // 10 -> null
      prev = current; // prev -> 10
      current = next; // 20
    }
    this.head = prev;
  }
}

const linkedList = new LinkedList();
linkedList.insertAtEnd(10);
linkedList.insertAtEnd(20);
linkedList.insertAtEnd(30);
linkedList.traverse();
linkedList.reverse();
linkedList.traverse();

// console.log(linkedList);
