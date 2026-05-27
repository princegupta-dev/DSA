class HashMap {
  constructor(initialCapacity = 16) {
    this.capacity = initialCapacity;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
    this.loadFactor = 0.75;
  }
  // Hash function
  hash(key) {
    let hash = 0;
    const strKey = String(key);
    for (let i = 0; i < strKey.length; i++) {
      hash = (hash * 31 + strKey.charCodeAt(i)) % this.capacity;
    }
    return hash;
  }

  // Insert or update
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    // Check if key already exists
    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    // Insert new pair
    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }

    return undefined;
  }

  delete(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  resize() {
    const oldBuckets = this.buckets;

    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;

    for (let bucket of oldBuckets) {
      for (let [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
}

const map = new HashMap();

map.set("name", "Prince");
map.set("age", 25);
map.set("city", "Gurgaon");

console.log(map.get("name"));
console.log(map.get("age"));

map.delete("age");

console.log(map.has("age"));

map.print();
