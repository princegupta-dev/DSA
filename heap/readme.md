## What is a Heap?

A Heap is a special binary tree-based data structure used to quickly access the max or min element.

## Key Properties:

- Complete Binary Tree: All levels filled except possibly the last, filled left to right.
  Two main types:
- Min Heap: Parent node is always less than or equal to its children.
- Max Heap: Parent node is always greater than or equal to its children.

## Heap Operations:

- Insert - O(log n)- Add element and adjust (heapify up)
- Delete - O(log n) - Remove root and reheap (heapify down)
- Get Min/Max- O(1) - Root node holds min (min heap) or max (max heap)

## Uses of Heap:

- Priority Queues (most common use)
- Heap Sort
- Dijkstra’s algorithm
- Task schedulers
- Streaming median (using two heaps)

## Example

Min Heap Example (inserted: 5, 3, 8, 1):

```markdown
     1
    / \

3 8
/
5
```
