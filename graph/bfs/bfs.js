function BFS(graph, start) {
  let queue = [];
  queue.push(start);
  let visited = new Set();
  visited.add(start);
  while (queue.length > 0) {
    let node = queue.shift();
    console.log(node);
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

let graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

BFS(graph, "A");
