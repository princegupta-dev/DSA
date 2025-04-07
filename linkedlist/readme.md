Similar to the array, the linked list is also a linear data structure. Here is an example:

A linked list is a linear data structure where elements (called "nodes") are connected via pointers (references in JavaScript).

### Basic Structure:

Each node contains:

- **value**: The data
- **next**: Reference to the next node (or null if it's the last node)

````js
// Node class
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Creating a linked list with 3 nodes
const node1 = new Node(10);
const node2 = new Node(20);
const node3 = new Node(30);

node1.next = node2; // Link node1 to node2
node2.next = node3; // Link node2 to node3

// Now: 10 → 20 → 30 → null
// ```
```
````

A linked list is a linear data structure which can store a collection of "nodes" connected together via links i.e. pointers. Linked lists nodes are not stored at a contiguous location, rather they are linked using pointers to the different memory locations. A node consists of the data value and a pointer to the address of the next node within the linked list.

A linked list is a dynamic linear data structure whose memory size can be allocated or de-allocated at run time based on the operation insertion or deletion, this helps in using system memory efficiently. Linked lists can be used to implment various data structures like a stack, queue, graph, hash maps, etc.

![alt text](https://www.tutorialspoint.com/data_structures_algorithms/images/singly_linked_lists.jpg)

A linked list starts with a head node which points to the first node. Every node consists of data which holds the actual data (value) associated with the node and a next pointer which holds the memory address of the next node in the linked list. The last node is called the tail node in the list which points to null indicating the end of the list.

Linked Lists vs Arrays
In case of arrays, the size is given at the time of creation and so arrays are of fixed lenghth where as Linked lists are dynamic in size and any number of nodes can be added in the linked lists dynamically. An array can accommodate similar types of data types where as linked lists can store various nodes of different data types.

Types of Linked List
Following are the various types of linked list.

Singly Linked Lists
Singly linked lists contain two "buckets" in one node; one bucket holds the data and the other bucket holds the address of the next node of the list. Traversals can be done in one direction only as there is only a single link between two nodes of the same list.

![alt text](https://www.tutorialspoint.com/data_structures_algorithms/images/singly_linked_lists.jpg)

Doubly Linked Lists
Doubly Linked Lists contain three "buckets" in one node; one bucket holds the data and the other buckets hold the addresses of the previous and next nodes in the list. The list is traversed twice as the nodes in the list are connected to each other from both sides.

![alt text](https://www.tutorialspoint.com/data_structures_algorithms/images/doubly_linked_lists.jpg)

Circular Linked Lists
Circular linked lists can exist in both singly linked list and doubly linked list.

Since the last node and the first node of the circular linked list are connected, the traversal in this linked list will go on forever until it is broken.

![alt text](https://www.tutorialspoint.com/data_structures_algorithms/images/circular_linked_lists.jpg)

Basic Operations in Linked List
The basic operations in the linked lists are insertion, deletion, searching, display, and deleting an element at a given key. These operations are performed on Singly Linked Lists as given below −

- Insertion − Adds an element at the beginning of the list.
- Deletion − Deletes an element at the beginning of the list.
- Display − Displays the complete list.
- Search − Searches an element using the given key.
- Delete − Deletes an element using the given key.

Linked List - Insertion Operation
Adding a new node in linked list is a more than one step activity. We shall learn this with diagrams here. First, create a node using the same structure and find the location where it has to be inserted.

![alt text](https://www.tutorialspoint.com/data_structures_algorithms/images/insertion_operation.jpg)
