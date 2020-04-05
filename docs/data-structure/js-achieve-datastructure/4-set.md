## 集合 Set

集合是在数学中很常见，这里的集合是指数学中的有限集合，一组无序且唯一的项组成的。

在ES6种已经内置了 Set 的类型。但是这里我们自己使用Javascript 来创建一个 Set 类。

```javascript
class Set {
	constructor() {
		this.items = {};
	}
	has(value) {
		return this.items.hasOwnProperty(value);
	}
	add(value) {
		if (!this.has(value)) {
			this.items[value] = value;
			return true;
		}
		return false;
	}
	remove(value) {
		if (this.has(value)) {
			delete this.items[value];
			return true;
		}
		return false;
	}
  
  // 实现并集 - 两个集合中的所有元素
  union(otherSet) {
		const unionSet = new Set();
		this.values.forEach((v) => unionSet.add(v));
		otherSet.values.forEach((v) => unionSet.add(v));
		return unionSet;
	}
  
  // 实现交集 - 两个集合中都有的元素的集合
  intersection(otherSet) {
		const intersectionSet = new Set();
		this.values.forEach((v) => {
			if (otherSet.has(v)) {
				intersectionSet.add(v);
			}
		});
		return intersectionSet;
	}
  
  // 实现差集 - 只存在于一个集合中的元素的集合
	difference(otherSet) {
		const differenceSet = new Set();
		this.values.forEach((v) => {
			if (!otherSet.has(v)) {
				differenceSet.add(v);
			}
		});
		return differenceSet;
	}
  
  // 子集 - a.subset(b) a 是 b 的子集
  subset(otherSet) {
		if (this.size > otherSet.size) {
			return false;
		} else {
			return !this.values.some((v) => !otherSet.has(v));
		}
	}
  
	get size() {
		return Object.keys(this.items).length;
	}
	get values() {
		return Object.keys(this.items);
	}
}

let set = new Set();
set.add(1);
set.add(2);
set.add(1);
console.log(set.values); // ["1", "2"]
console.log(set.has(2)); // true
console.log(set.size); // 2
set.remove(1);
console.log(set.values); // ["2"]

let set2 = new Set();
set2.add(9);
set = set.union(set2);
console.log(set.values); // [ '2', '9' ]

set = set.intersection(set2);
console.log(set.values); // [ '9' ]
```

