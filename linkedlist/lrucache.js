/*
An LRU (Least Recently Used) cache is a data structure that stores a limited number of items and removes the least recently used item when the cache exceeds its capacity.

🔁 Why use LRU Cache?
It’s often used in scenarios like:
Caching web pages
Memory management
Storing temporary data for fast access

📌 LRU Cache Rules
If a value is accessed, it becomes the most recently used.
If a new item is added beyond capacity, the least recently used item is evicted.

⚙️ How to implement LRU Cache?
The ideal implementation involves:
. Doubly Linked List: To keep track of usage order (most recent at head, least recent at tail).
. Hash Map: For O(1) access to cache items.
*/
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // Key -> Node
    this.head = new Node(null, null); // Dummy head
    this.tail = new Node(null, null); // Dummy tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // Remove node from list
  remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  // Insert node right after head
  insertAtHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  get(key) {
    if (!this.map.has(key)) return -1;

    const node = this.map.get(key);
    this.remove(node); // Remove from current position
    this.insertAtHead(node); // Move to head (most recently used)
    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this.remove(node);
      this.insertAtHead(node);
    } else {
      if (this.map.size === this.capacity) {
        const lru = this.tail.prev;
        this.remove(lru);
        this.map.delete(lru.key);
      }
      const newNode = new Node(key, value);
      this.insertAtHead(newNode);
      this.map.set(key, newNode);
    }
  }
}
