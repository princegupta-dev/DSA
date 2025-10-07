function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  while (queue.length) {
    const node = queue.shift();
    for (const neighbors of graph.get(node)) {
      if (!visited.has(neighbors)) {
        visited.add(neighbors);
        queue.push(neighbors);
      }
    }
  }
}

class Graph {
  constructor() {
    this.adj = new Map();
  }

  addVertex(v) {
    if (!this.adj.has(v)) this.adj.set(v, []);
  }

  addEdge(v, w) {
    if (!this.adj.has(v)) this.addVertex(v);
    if (!this.adj.has(w)) this.addVertex(w);
    this.adj.get(v).push(w);
  }

  printGraph() {
    for (let [vertex, edges] of this.adj.entries()) {
      console.log(vertex + "-> " + edges.join(", "));
    }
  }
}

const g = new Graph();
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
g.addEdge(3, 5);
g.addEdge(4, 5);
g.addEdge(5, 6);
bfs(g.adj, 0);
