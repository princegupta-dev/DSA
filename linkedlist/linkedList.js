class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  // push value front of linked list
  push_front(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  push_back(value) {
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
  }
  pop_front() {
    if (!this.head) return;
    const temp = this.head;
    this.head = this.head.next;
    temp.next = null;
  }

  insert(value, pos) {
    if (pos < 0) {
      console.log("invalid position");
      return;
    }
    if (pos == 0) {
      this.push_front(value);
      return;
    }
    let temp = this.head;
    for (let i = 0; i < pos - 1; i++) {
      // if (!temp) {
      //   console.log("Invalid positon");
      //   return;
      // }
      temp = temp.next;
    }
    let newNode = new Node(value);
    newNode.next = temp.next;
    temp.next = newNode;
  }

  search(key) {
    if (!this.head) {
      return;
    }
    let current = this.head;
    let idx = 0;
    while (current.next) {
      if (current.value == key) {
        return idx;
      }
      ++idx;
      current = current.next;
    }
  }
  pop_back() {
    if (!this.head) return;
    let current = this.head;
    while (current.next) {
      current = current.next;
      if (current.next.next == null) {
        current.next = null;
      }
    }
  }
  printList() {
    let current = this.head;
    const values = [];
    while (current) {
      // console.log(current);
      values.push(current.value);
      current = current.next;
    }
    console.log(values.join(" -> "));
  }
}

const ll = new LinkedList();
ll.push_back(4);
ll.push_back(2);
ll.push_back(3);
ll.push_back(4);
ll.push_back(5);
// ll.insert(4, 0);
// ll.insert(4, 2);
console.log(ll.search(4));
// ll.printList();
