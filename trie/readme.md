What is a Trie?
A Trie (pronounced as "try") is a tree-based data structure that is used primarily for storing strings or prefixes. It is a type of search tree where each node represents a single character in a string.

Key Points:
Used for efficient searching of words or prefixes (like autocomplete).

Character by character structure — each node stores one character.

Root node represents an empty string or a starting point.

Edges represent characters leading to subsequent nodes.

Trie Structure
Example: Storing Words "cat", "bat", and "rat"

```less
        root
       / | \
      c  b  r
     /   |   \
    a    a    a
   /      \     \
  t        t      t
```

The root node is empty.

The first letter of each word is a child of the root node (e.g., 'c', 'b', 'r').

Each subsequent character is added as a child node, creating a path for each word.

Leaf nodes (the end of words) are marked to indicate the end of a word.

```js
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }
}

// Example Usage
const trie = new Trie();
trie.insert("cat");
trie.insert("bat");

console.log(trie.search("cat")); // true
console.log(trie.search("car")); // false
console.log(trie.startsWith("ca")); // true
```
