class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  // Insert at end
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
  // Insert at beginning
  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }
  // Delete by value
  delete(data) {
    if (!this.head) return;

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next && current.next.data !== data) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
    }
  }

  printList() {
    let current = this.head;
    let list = "";
    while (current) {
      list += current.data + " -> ";
      current = current.next;
    }
    console.log(list + "null");
  }
}

const myList = new LinkedList();
myList.append(10);
myList.append(20);
myList.append(30);

myList.printList(); // 10 -> 20 -> 30 -> null

myList.prepend(5);
myList.printList(); // 5 -> 10 -> 20 -> 30 -> null

myList.delete(20);
myList.printList(); //
