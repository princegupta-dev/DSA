A Graph is a data structure made up of:

- Vertices (nodes): The entities.
- Edges (connections): The relationships between entities.

Real-life example:
Think of a city map:
Cities = Nodes
Roads between them = Edges

## Types of Graphs

Type Description Example
Directed (Digraph) Edges have direction (A → B) Twitter follower graph
Undirected Edges have no direction (A — B) Facebook friends graph
Weighted Edges have weights (cost/distance) GPS maps (distance between cities)
Unweighted No weight assigned to edges Social network
Cyclic Has at least one cycle Network of web pages
Acyclic No cycles (e.g., DAGs) Task scheduling
Connected All nodes can be reached Network of connected devices
Disconnected Some nodes can't be reached Isolated systems

## How Graphs Are Represented

Adjacency List (Most common):

```js
{
  A: [B, C],
  B: [A, D],
  C: [A],
  D: [B]
}
```

Adjacency Matrix (Good for dense graphs):

```css
    A B C D
 A 0 1 1 0
 B 1 0 0 1
 C 1 0 0 0
 D 0 1 0 0
```

## Common Graph Algorithms

Algorithm Use Case
BFS Shortest path in unweighted graph
DFS Cycle detection, connected components
Dijkstra's Shortest path in weighted graph
A\* Pathfinding in maps
Topological Sort Task scheduling in DAGs
Kruskal/Prim Minimum spanning tree (network design)

## Real-World Applications

Maps & GPS: Routes between locations

Social Networks: Friend/follower graphs

Web Crawling: Pages and links

Recommendation Systems: User-item interaction graph

Compilers: Task dependency ordering

Blockchain: Transaction graphs

**Summary**
A graph is a set of nodes connected by edges.

It can be directed, undirected, weighted, or unweighted.

Used everywhere: networks, maps, scheduling, social media.
