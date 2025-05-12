class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();

      if (!current.left) {
        current.left = newNode;
        return;
      } else {
        queue.push(current.left);
      }

      if (!current.right) {
        current.right = newNode;
        return;
      } else {
        queue.push(current.right);
      }
    }
  }

  // Print the tree in level order (BFS)
  levelOrderTraversal() {
    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      console.log(current.value);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }
}

const tree = new BinaryTree();

tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);

tree.levelOrderTraversal();
// Output: 10, 5, 15, 3, 7
