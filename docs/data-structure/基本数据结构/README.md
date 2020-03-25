# Javascript 实现常用数据结构

最近刷 Leetcode ，一直选用 JavaScript 来答题，遇到很多题都需要用到 DFS BFS 堆栈图等等数据结构中的知识。因此来做一个总结。

## 一、概述

## 数据结构 

在计算机科学中，数据结构（data structure）指的是存储和组织数据的方式。正确的数据结构选择可以提高算法的效率。



常见的数据结构如下：

- **堆栈 (stack)** ：遵循先进后出的原则的有序集合。Last In First Out (LIFO)
- **队列 (Queue)**： 遵循后进先出的原则的有序集合。Fisrt In First Out(FIFO)
- **链表 (Linked List)**：线性表，但是不会按照线性的顺序来存储数据，每个节点里存在下一个节点的指针。 快慢指针
- **树 (Tree)**：多层数据结构，在插入和搜索时高效
- **图 (Graph)**
- **堆(Heap)**
- **散列表/希表 (Hash table)** 

### 排序&搜索

#### 排序算法

#### 搜索算法

### 几个实际问题



## 二、数据结构

## 1.堆栈 Stack

![Stack-栈](https://lyneee-blog-1251928147.cos.ap-chengdu.myqcloud.com/blog/20200322161DthOc.png)

栈的特点是**后进先出 LIFO 。

栈一般有以下常用方法：

1. push ：将一个元素压入栈中
2. pop ：弹出⏏️顶部元素，发挥顶部元素
3. clear ：清空栈
4. peek ：返回顶部元素
5. size ：返回栈中元素的个数
6. isEmpty ：判断栈是否为空

虽然 Javascript 中的 Array 已经具有了栈的特点，但是这里我们重新实现一个栈。使用 ES6 中的 Class 语法糖 🍬。

```Javascript
class Stack {
	constructor() {
		this.value = {};
		this.count = 0;
	}
	// push
	push(element) {
		this.value[this.count] = element;
		this.count++;
	}
	// pop
	pop() {
		if (this.count == 0) {
			return null;
		}
		this.count--;
		let res = this.value[this.count];
		delete this.value[this.count];
		return res;
	}
	// Stack is empty
	get isEmpty() {
		return !this.count;
	}
	// Stack size
	get size() {
		return this.count;
	}
	get peek() {
		return this.value[this.count - 1];
	}
	// Clear stack
	clear() {
		this.count = 0;
		this.value = {};
	}
}
```

使用该栈类：

```Javascript
const stack = new Stack();
console.log(stack.isEmpty); // true

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
console.log(stack.peek); // 4
stack.pop();
console.log(stack.size); // 3
console.log(stack.isEmpty); // false
```

## 2.队列 Queue

与栈相反，队列遵循的是 **先进先出 FIFO**，在尾部添加元素，在头部移除元素。

![队列-Queue](https://lyneee-blog-1251928147.cos.ap-chengdu.myqcloud.com/blog/2020032217wmM88g.png)

队列一般有以下几种常见的方法：

1. enqueue ：入列，向队列的尾部增加一个元素
2. dequeue ：出列，移除队列头部的第一个元素并返回该元素
3. clear ：清空队列
4. front ： 获取队列的第一个元素
5. isEmpty ：判断队列是否为空
6. size ：获取队列中元素的个数

和栈一样，Array 对象已经具备了队列的特点，但是这里还是从头重新实现一个 Queue 对象，并不借助 Array 对象。

```Javascript
class Queue {
	constructor() {
		this.value = {};
		this.count = 0;
		this.frontIndex = 0;
		this.rearIndex = 0;
	}
	enqueue(element) {
		this.value[this.rearIndex] = element;
		this.rearIndex++;
		this.count++;
	}
	dequeue() {
		if (this.count == 0) return null;
		delete this.value[this.frontIndex];
		this.frontIndex++;
		this.count--;
	}
	clear() {
		this.value = {};
		this.count = 0;
		this.front = 0;
		this.rearIndex = 0;
	}
	front() {
		return this.value[this.frontIndex];
	}
	get isEmpty() {
		return !this.count;
	}
	get size() {
		return this.count;
	}
}
```

使用 Queue 类：

```Javascript
let queue = new Queue();

console.log(queue.isEmpty); // true
queue.enqueue(8);
queue.enqueue(6);
console.log(queue.size, queue.front()); // 2 8
queue.dequeue();
console.log(queue.size, queue.front()); // 1 6
queue.clear();
console.log(queue.size); // 0
```

### 优先队列

我并不想在这里介绍如何实现优先队列，但是利用队列能够实现最基本的优先队列。



引用

https://juejin.im/post/594dfe795188250d725a220a#heading-16

https://blog.fundebug.com/2019/08/12/8-common-data-structure-and-javascript-implementation/

[https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84](https://zh.wikipedia.org/wiki/数据结构)

