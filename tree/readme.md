A tree is a hierarchical data structure made up of nodes, where:

- The top node is called the root.
- Each node contains a value and references to child nodes
- A node with no children is called a leaf.
- Every node (except the root) has one parent.
- Trees do not contain cycles (they’re acyclic).

Common types:

- Binary Tree: Each node has at most two children.
- Binary Search Tree (BST): A binary tree with ordered values (left < root < right).
- AVL Tree, Red-Black Tree: Self-balancing binary search trees.
- Trie: Tree used for storing strings (prefix trees).
- Heap: Tree-based structure used for priority queues.

Basic Terminology:
Term Description
Root The topmost node.
Node Each element in the tree.
Edge The link between a parent and child node.
Leaf A node with no children.
Parent A node that has child nodes.
Child A node that has a parent node.
Sibling Nodes that share the same parent.
Subtree A tree consisting of a node and its descendants.
Height Longest path from the root to a leaf.
Depth Number of edges from root to the node.

Imagine your computer's file system:

```mathematica
Root (C:)
│
├── Program Files
│   ├── App1
│   └── App2
│
├── Users
│   ├── User1
│   │   ├── Documents
│   │   └── Pictures
│   └── User2
│
└── Windows

```

- C: is the root node.
- Program Files, Users, and Windows are children of the root.
- User1, User2 are children of Users, and so on.
- This forms a tree structure!

## Simple Binary Tree Example:

```markdown
       10
      /  \
     5    15
    / \     \

2 7 20
```

- Root = 10
- 10’s left = 5, right = 15
- 5 has two children: 2 and 7
- 15 has one child: 20

## Common Types of Trees

1. Binary Tree

- Each node has at most 2 children (left and right).
- Not ordered or balanced by default.

2. Binary Search Tree (BST)

- A type of binary tree.
- Left child < parent < right child.
- Used for fast search, insert, delete (O(log n) on average).

3. AVL Tree

- Self-balancing BST.
- Keeps height difference (balance factor) between child subtrees ≤ 1.
- Ensures consistent performance.

4. Red-Black Tree

- Another self-balancing BST, used in libraries (e.g., Java’s TreeMap, C++ STL map).
- Balancing is less strict than AVL but more efficient for frequent inserts/deletes.

5. Heap (Min/Max Heap)

- Complete binary tree where:
  **Min Heap:** Parent ≤ children
  **Max Heap:** Parent ≥ children
- Used in priority queues, sorting (heap sort).

6. Trie (Prefix Tree)

- N-ary tree used to store strings.
- Every node represents a character.
- Used in autocomplete, spell-check, and dictionary matching.

7. B-Tree / B+ Tree

- Used in databases and file systems.
- Balanced tree that can have many children (not just 2).
- B+ Tree stores all values in leaf nodes, with internal nodes used for indexing.

8. N-ary Tree

- Each node can have N children.
- Useful for hierarchical data like org charts, file systems.
