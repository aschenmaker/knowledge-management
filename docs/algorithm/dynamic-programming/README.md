# 动态规划

**Dynamic programming，DP；**

> 动态规划背后的基本思想非常简单。大致上，若要解一个给定问题，我们需要解其不同部分（即子问题），再根据子问题的解以得出原问题的解。
>
> 通常许多子问题非常相似，为此动态规划法试图仅仅解决每个子问题一次，从而减少计算量：一旦某个给定子问题的解已经算出，则将其记忆化存储，以便下次需要同一个子问题解之时直接查表。这种做法在重复子问题的数目关于输入的规模呈指数增长时特别有用。

## 动态规划方案

动态规划方案，通常会使用一个数组来建立一张表，用于存放被分解的多个子问题的解。

## 动态规划与递归

- **递归** 是从顶部将问题分解，通过解决所有分解出来的小问题的方式，来解决的整个问题。
- **动态规划** 是从底部开始解决问题，将所有的小问题解决掉，合并成一个整体的解决方案，从而解决掉整个问题。
- 递归解决的问题虽然简洁，但是逐一计算浪费了大量的资源。

## 几个常见的动态规划方案

### 计算斐波拉契数列

定义一个斐波拉契数列如下：

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, …

一般常用的方式是递归实现。

```Javascript
function recurtionFib(n) {
	if (n < 2) {
		return n;
	} else {
		return recurtionFib(n - 1) + recurtionFib(n - 2);
	}
}

console.log(recurtionFib(9)); // answer is 34;
```

在这个过程中计算了每一个子问题的值，当n的值非常大的时候，程序就会很慢。

如果我们可以用一个数组先存着每一次产生的结果，那么这个效果就会非常的不一般。

使用动态规划实现：

```javascript
function dynamicFib(n) {
	// 用于存储子问题的值；
	let dp = [ 0, 1, 2 ];
	for (let i = 3; i <= n; i++) {
		dp[i] = dp[i - 1] + dp[i - 2];
	}
	console.log(dp);//[0,  1,  2,  3,  5, 8, 13, 21, 34, 55]
	return dp[n - 1];
}
console.log(dynamicFib(9)); //34'
```

其实我们可以继续优化，当n很大时候我们不需要存入 `dp` 这个数组。

```javascript
function dynamicFib(n) {
	if (n <= 0) return 0;
	if (n == 1) return 1;
	let a = 0,
		b = 1;
	for (let i = 2; i <= n; i++) {
		b = a + b;
		a = b - a;
	}
	return b;
}
```



### 寻找最长公文串

用动态规划去寻找两个字符串的最长公共子串。例如，在单词 `raven`和`havoc`中，最长的公共子串是 `av`。

最直接可以想到的办法，就是遍历两个字符串，记录当前的字符串即可。

```javascript
function lcs(word1, word2) {
	if (!word1 || !word2) return '';
	let len1 = word1.length,
		len2 = word2.length,
		longestSubStr = '';
	for (let i = 0; i <= len1; i++) {
		for (let j = 0; j <= len2; j++) {
			var currentStr = '',
				k = 0;
			// 限制在字符串长度之内；两个字符相同，则压入到当前相同的字符串中
			while (i + k < len1 && j + k < len2 && word1[i + k] == word2[j + k]) {
				currentStr += word1[i + k];
				k++;
			}
			if (currentStr.length > longestSubStr.length) {
				longestSubStr = currentStr;
			}
		}
	}
	return longestSubStr; // 'av'
}
```

我们将两个字符串分别以行和列组成两个二维数组，通过比较对应的字符是否相等，相等的话设置为1，否则设置为0，通过查找出值为1的最长的对角线就可以找到最长的公共子串。

|      | h    | a    | v    | o    | c    |
| ---- | ---- | ---- | ---- | ---- | ---- |
| r    | 0    | 0    | 0    | 0    | 0    |
| a    | 0    | 1    | 0    | 0    | 0    |
| v    | 0    | 0    | 1    | 0    | 0    |
| e    | 0    | 0    | 0    | 0    | 0    |
| n    | 0    | 0    | 0    | 0    | 0    |

优化算法效率为了避免重复比较各个斜对角线的长度，我们可以对其进行长度的标注。则对于二维数组 $dp[i] [j]$ =1 写成 dp[i] [j] += 1。避免了额外的比较，得到了下表。

|      | h    | a    | v    | o    | c    |
| ---- | ---- | ---- | ---- | ---- | ---- |
| r    | 0    | 0    | 0    | 0    | 0    |
| a    | 0    | 1    | 0    | 0    | 0    |
| v    | 0    | 0    | 2    | 0    | 0    |
| e    | 0    | 0    | 0    | 0    | 0    |
| n    | 0    | 0    | 0    | 0    | 0    |

```javascript
function dpLcs(word1, word2) {
	// 申明一个二维数组
	var dp = [],
		max = 0,
		index = 0;
	for (var i = 0; i < word1.length; i++) {
		dp[i] = [];
		for (var j = 0; j < word2.length; j++) {
			dp[i][j] = 0;
		}
	}
	for (var i = 0; i < word1.length; i++) {
		for (var j = 0; j < word2.length; j++) {
			if (word1[i] == word2[j]) {
				dp[i][j] = dp[i - 1][j - 1] + 1;
			} else {
				dp[i][j] = 0;
			}
			if (max < dp[i][j]) {
				max = dp[i][j];
				index = i;
			}
		}
	}
	console.log(dp, max, index);
	var str = '';
	if (max > 0) {
		for (var i = index - max + 1; str.length < max; i++) {
			str += word1[i];
		}
	}
	return str; // 'av'
}
```

### 面试题17.16. 按摩师

一个有名的按摩师会收到源源不断的预约请求，每个预约都可以选择接或不接。在每次预约服务之间要有休息时间，因此她不能接受相邻的预约。给定一个预约请求序列，替按摩师找到最优的预约集合（总预约时间最长），返回总的分钟数。

```
输入： [1,2,3,1]
输出： 4
解释： 选择 1 号预约和 3 号预约，总时长 = 1 + 3 = 4。
```

思路：对于下一个客人只有接或者不接两种情况，如果接的话状态方程就是：`dp[i]=dp[i-2]+nums[i]` 如果不接的话状态方程就是 `dp[i]=dp[i-1]`比较两者的值，则可以取得 是否取这一点。

```javascript
var nums = [ 1, 2, 3, 4 ];

var massage = function(nums) {
	if (nums.length == 1) return nums[0];
	if (nums.length == 2) return Math.max(nums[0], nums[1]);
	let dp = [ 0, 0 ];
	for (let i = 2; i < nums.length + 2; i++) {
		dp[i] = Math.max(dp[i - 2] + nums[i - 2], dp[i - 1]);
	}
	return dp[nums.length + 1];
};

console.log(massage(nums));
```

时间复杂度为`O(n)`，空间复杂度为`O(n)`。可以对空间复杂度进行进一步优化，因为我们仅仅是用了`dp[i-1]`于`dp[i-2]`这两个值。如果用变量进行替代，空间复杂度为`O(1)`

