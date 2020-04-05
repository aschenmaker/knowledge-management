## 队列 Queue

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

## 使用队列实现优先队列

优先队列，即元素的添加和移除是有优先级的。比如在机场中，头等舱与商务舱的登机优先级是高于经济舱的。

优先队列有很多的实现方法。这包括了一些简单低效的实现，比如用队列。而典型实现则需要用到**堆**来实现。

在这里，简单的实现一个优先队列。有两种选择，第一是设置优先级，然后再正确的位置添加元素；第二种则是用入列的操作添加元素，并按照优先级移除他们。

```javascript
class PriorityQueue {
	constructor() {
		this.items = [];
	}
	enqueue(element, priority) {
		const queueElement = { element, priority };
		if (this.isEmpty) {
			this.items.push(queueElement);
		} else {
			const preIndex = this.items.findIndex((item) => queueElement.priority < item.priority);
			if (preIndex > -1) {
				this.items.splice(preIndex, 0, queueElement);
			} else {
				this.items.push(queueElement);
			}
		}
	}
	dequeue() {
		return this.items.shift();
	}
	front() {
		return this.items[0];
	}
	clear() {
		this.items = [];
	}
	get size() {
		return this.items.length;
	}
	get isEmpty() {
		return !this.items.length;
	}
	print() {
		console.log(this.items);
	}
}

const priorityQueue = new PriorityQueue();
priorityQueue.enqueue('qiuqiu', 9);
priorityQueue.enqueue('xiaoming', 1);
priorityQueue.enqueue('Jack', 2);
priorityQueue.print();
priorityQueue.dequeue(); //{ element: 'xiaoming', priority: 1 }
priorityQueue.print(); 
```

可以发现这样的插入效率入队的效率是0(n) 出列的效率是O(1)；

而当我们使用堆来显示的时候，会更为高效，这里暂时不实现。

## 实现一个循环队列

循环队列(Circular Queue)首位相连，可以通过链表，和队列的方式实现。

![循环队列](https://lyneee-blog-1251928147.cos.ap-chengdu.myqcloud.com/blog/2020033018IwKRju.png)

```javascript
const Queue = require('./queue');

class LoopQueue extends Queue {
	constructor(value) {
		super(value);
	}
	getIndex(index) {
		console.log(this);

		const length = this.count;
		return index > length ? index % length : index;
	}
	find(index) {
		return !this.isEmpty ? this.value[this.getIndex(index)] : null;
	}
}

const loopQueue = new LoopQueue([ 'Surmon' ]);
loopQueue.enqueue('Even');
loopQueue.enqueue('Alice');
console.log(loopQueue.size, loopQueue.isEmpty);
console.log(loopQueue.find(26));

```

倒入之前写好的queue对象