class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

let index = -1;

function buildTree(nodes) {
  index++;

  // base condition
  if (nodes[index] === -1) {
    return null;
  }

  const node = new Node(nodes[index]);
  node.left = buildTree(nodes);
  node.right = buildTree(nodes);

  return node;
}

const nodes = [1, 2, 4, -1, -1, 5, -1, -1, 3, -1, 6, -1, -1];

const root = buildTree(nodes);
console.log(root);