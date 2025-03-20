# What is a HashMap?

A HashMap is a data structure that stores key-value pairs. It is also known as a hash table in some programming languages. It uses a hashing function to compute an index (or bucket) where the key-value pair is stored, allowing for constant-time (O(1)) average complexity for insert, search, and delete operations.

## How Does a HashMap Work?

1. **Hashing 🔑**

- A hash function converts a key into an index where the value will be stored.
- **Example**:

```bash
hash("apple") → index 3
hash("banana") → index 7
```

2. **Collision Handling ⚡**

- If two keys generate the same index (collision), how do we handle it?
- **Chaining (Linked List in Each Bucket)**: If multiple keys hash to the same index, they are stored as a linked list in that bucket.
- **Open Addressing:** If a collision occurs, the next available bucket is used.

3. **Operations**

- **Insertion**: Compute the hash of the key and store the value at the computed index.
- **Search**: Compute the hash of the key and retrieve the value.
- **Deletion**: Compute the hash of the key and remove the value from the index.

## Implementation Examples:

```js
class HashMap {
  constructor(size = 10) {
    this.buckets = new Array(size).fill(null).map(() => []);
  }

  _hash(key) {
    let hash = 0;
    for (let char of key) {
      hash += char.charCodeAt(0);
    }
    return hash % this.buckets.length;
  }

  set(key, value) {
    let index = this._hash(key);
    let bucket = this.buckets[index];

    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    bucket.push([key, value]);
  }

  get(key) {
    let index = this._hash(key);
    let bucket = this.buckets[index];

    for (let pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }
    return undefined;
  }

  delete(key) {
    let index = this._hash(key);
    let bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}

let map = new HashMap();
map.set("apple", 100);
map.set("banana", 200);
console.log(map.get("apple")); // 100
map.delete("apple");
console.log(map.get("apple")); // undefined
```
