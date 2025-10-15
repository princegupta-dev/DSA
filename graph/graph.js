class Graph {
  constructor() {
    this.adj = new Map();
  }

  // Add a vertex if not already in the graph
  addVertex(v) {
    if (!this.adj.has(v)) {
      this.adj.set(v, []);
    }
  }
  // Add an undirected edge (v <-> w)
  addEdge(v, w) {
    this.addVertex(v);
    this.addVertex(w);
    this.adj.get(v).push(w);
    this.adj.get(w).push(v);
  }

  // Print the adjacency list
  print() {
    for (const [v, neighbors] of this.adj) {
      console.log(v + " -> " + neighbors.join(", "));
    }
  }
}

// const g = new Graph();
// g.addEdge("A", "B");
// g.addEdge("A", "C");
// g.addEdge("B", "D");

// g.print();

module.exports = { Graph };
