## 堆栈 Stack

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