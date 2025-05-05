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
