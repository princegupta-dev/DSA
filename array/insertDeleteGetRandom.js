//  Insert Delete GetRandom O(1)

/*
Implement the RandomizedSet class:

RandomizedSet() Initializes the RandomizedSet object.
bool insert(int val) Inserts an item val into the set if not present. Returns true if the item was not present, false otherwise.
bool remove(int val) Removes an item val from the set if present. Returns true if the item was present, false otherwise.
int getRandom() Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.
You must implement the functions of the class such that each function works in average O(1) time complexity.

Example 1:

Input
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
Output
[null, true, false, true, 2, true, false, 2]

Explanation
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
randomizedSet.insert(2); // 2 was already in the set, so return false.
randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.
*/

//solution

class RandomizedSet {
  constructor() {
    this.values = [];
    this.indexMap = new Map();
  }
  insert(val) {
    if (this.indexMap.has(val)) {
      return false;
    }
    this.values.push(val);
    this.indexMap.set(val, this.values.length - 1);
    return true;
  }
  remove(val) {
    if (!this.indexMap.has(val)) {
      return false;
    }
    const idx = this.indexMap.get(val);
    const lastElement = this.values[this.values.length - 1];
    this.values[idx] = lastElement;
    this.indexMap.set(lastElement, idx);
    this.values.pop();
    this.indexMap.delete(val);

    return true;
  }
  getRandom() {
    const randomIndex = Math.floor(Math.random() * this.values.length);
    return this.values[randomIndex];
  }
}

const randomizedSet = new RandomizedSet();
console.log(randomizedSet.insert(1)); // true
console.log(randomizedSet.remove(2)); // false
console.log(randomizedSet.insert(2)); // true
console.log(randomizedSet.getRandom()); // Randomly 1 or 2
console.log(randomizedSet.remove(1)); // true
console.log(randomizedSet.insert(2)); // false
console.log(randomizedSet.getRandom()); // Always 2
