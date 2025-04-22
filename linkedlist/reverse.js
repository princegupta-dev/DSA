// 206. Reverse Linked List

/*
Given the head of a singly linked list, reverse the list, and return the reversed list.
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Input: head
 = [1,2]
Output: [2,1]

Example 3:

Input: head = []
Output: []

Constraints:

The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000
 

Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?
*/
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function reverseList(head) {
  let prev = null;
  let current = head;
  while (current !== null) {
    const nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }
  return prev;
}
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
const reversedHead = reverseList(head);

//printing
let node = reversedHead;
let result = "";
while (node !== null) {
  result += node.val + (node.next ? " -> " : "");
  node = node.next;
}
console.log(result);
