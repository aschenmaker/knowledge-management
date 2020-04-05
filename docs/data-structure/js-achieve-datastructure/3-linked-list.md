## 链表 Linked List

**链表**（Linked list）是一种常见的基础数据结构，是一种线性表，但是并不会按线性的顺序存储数据，而是在每一个节点里存到下一个节点的指针(Pointer)。

|   比较维度   | 数组                             | 链表                                         |
| :----------: | -------------------------------- | -------------------------------------------- |
|   内存分配   | 静态内存分配，编译时分配且连续   | 动态内存分配，运行时分配且不连续             |
|   元素获取   | 通过Index获取，速度较快          | 通过遍历顺序访问，速度较慢                   |
| 添加删除元素 | 因为内存位置连续且固定，速度较慢 | 因为内存分配灵活，只有一个开销步骤，速度更快 |
|   空间结构   | 可以是一维或者多维数组           | 可以是单向、双向或者循环链表                 |

由于不必须按顺序存储，链表在插入的时候可以达到O(1)的复杂度，比另一种线性表顺序表快得多，但是查找一个节点或者访问特定编号的节点则需要O(n)的时间，而顺序表相应的时间复杂度分别是O(logn)和O(1)。

![链表](https://lyneee-blog-1251928147.cos.ap-chengdu.myqcloud.com/blog/2020033020e748673dbb5df2a93c3ee56b52a67849.jpg)

一个链表通常有下面的几种方法：

* size：返回链表中节点的个数
* insert：向链表中的固定位置添加元素
* append：向链表尾部增加一个节点
* removeAt：删除指定位置的某个节点
* findIndex：返回某个index处的节点
* removeAt：删除某个index处的节点

```javascript
class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.length = 0;
	}
	// 追加元素
	append(element) {
		const node = new Node(element);
		let current = null;
		if (this.head == null) {
			this.head = node;
		} else {
			current = this.head;
			while (current.next) {
				current = current.next;
			}
			current.next = node;
		}
		this.length++;
	}

	// 任意位置插入元素
	insert(position, element) {
		if (position >= 0 && position <= this.length) {
			const node = new Node(element);
			let cur = this.head;
			let pre = null;
			let index = 0;
			if (position == 0) {
				this.head = node;
			} else {
				while (index++ < position) {
					pre = cur;
					cur = cur.next;
				}
				node.next = cur;
				pre.next = node;
			}
			this.length++;
			return true;
		}
		return false;
	}
	// 删除指定位置元素
	removeAt(position) {
		if (position > -1 && position < this.length) {
			let cur = this.head;
			let pre = null;
			let index = 0;
			if (position === 0) {
				this.head = cur.next;
			} else {
				while (index++ < position) {
					pre = cur;
					cur = cur.next;
				}
				pre.next = cur.next;
			}
			this.length--;
			return cur.element;
		}
		return null;
	}
	// 寻找元素小标
	findIndex(element) {
		let cur = this.head;
		let index = -1;
		while (cur) {
			if (element === cur.element) {
				return index + 1;
			}
			index++;
			cur = cur.next;
		}
		return -1;
	}
	// 删除指定元素
	remove(element) {
		const index = this.findIndex(element);
		return this.removeAt(index);
	}
	isEmpty() {
		return !this.length;
	}
	size() {
		return this.length;
	}
	// 转化为字符串;
	toString() {
		let cur = this.head;
		let str = '';
		while (cur) {
			str += `${cur.element}`;
			cur = cur.next;
		}
		return str;
	}
}


const linkedList = new LinkedList();

console.log(linkedList);  // LinkedList { head: null, length: 0 }
linkedList.append(2);
linkedList.append(6);
linkedList.append(24);
linkedList.append(152);

linkedList.insert(3, 18);
console.log(linkedList); //LinkedList { head: Node { element: 2, next: Node { element: 6, next: [Node] } },length: 5}
console.log(linkedList.findIndex(24)); // 2
console.log(linkedList.toString()); // '262418152'
```