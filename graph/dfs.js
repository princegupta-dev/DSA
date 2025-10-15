const { Graph } = require("./graph");

const g = new Graph();
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
g.addEdge(3, 5);
g.addEdge(4, 5);
g.addEdge(5, 6);

function dfs(graph, start, visited = new Set()) {
  console.log("start", start);
  console.log("visited", visited);
  visited.add(start);

  for (let neighbor of graph.get(start)) {
    console.log(neighbor, "neighour");
    if (!visited.has(neighbor)) dfs(graph, neighbor, visited);
  }
}

dfs(g.adj, 0);
