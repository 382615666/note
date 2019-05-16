# leetcode




[21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/submissions/)

>>>
    将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
>>>

```ecmascript 6
  var mergeTwoLists = function(l1, l2) {
      let root = new ListNode()
      let current = root
      while (l1 && l2) {
        if (l1.val < l2.val) {
          current.next = l1
          l1 = l1.next
        } else {
          current.next = l2
          l2 = l2.next
        }
        current = current.next
      }
      current.next = l1 || l2
      return root.next
    };
    
    var mergeTwoLists = function(l1, l2) {
      if (!l1 || !l2) {
        return null
      }
      if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
      } else {
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
      }
    };
```



[20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/submissions/)

>>>
    给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
>>>

```ecmascript 6
  var isValid = function(s) {
    const dictionaries = {
      '(': -3,
      '{': -2,
      '[': -1,
      ']': 1,
      '}': 2,
      ')': 3,
    }
    let result = []
    for (let i = 0; i < s.length; i++) {
      if (s[i] in dictionaries) {
        if (dictionaries[s[i]] < 0) {
          result.push(dictionaries[s[i]])
        } else {
          if (-result.pop() !== dictionaries[s[i]]) {
            return false
          }
        }
      }
    }
    return !result.length
  };
```


[13. 罗马数字转整数](https://leetcode-cn.com/problems/roman-to-integer/)

>>>
    罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。
>>>

```ecmascript 6
    var romanToInt = function(s) {
      const dictionaries = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
      }
      let result = 0
      for(let i = 0; i < s.length; i++) {
        result += dictionaries[s[i]] * (dictionaries[s[i]] < dictionaries[s[i + 1]] ? -1 : 1)
      }
      return result
    };
```


[9. 回文数](https://leetcode-cn.com/problems/palindrome-number/)

>>>
    判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
>>>

```ecmascript 6
  var isPalindrome = function(x) {
    let result = 0
    if (x < 0 || x % 10 === 0 && x !== 0) {
      return false
    }
    while (x > result) {
      result = result * 10 + x % 10
      x = ~~(x / 10)
    }
    return result === x || x === ~~(result / 10)
    // return x.toString().split('').reverse().join('') === x.toString()
  };
  // 每次循环剥掉数字两端   12321 => 232
  var isPalindrome = function(x) {
      if (x < 0) {
        return false;
      }
      let len = 1;
      while (x / len > 10) {
        len *= 10;
      }
      while (x > 0) {
        let left = Math.trunc(x / len);
        let right = x % 10;

        if (left !== right) {
          return false;
        } else {
          x = Math.trunc((x % len) / 10);
          len /= 100;
        }
      }
      return true;
    };
```

[7. 整数反转](https://leetcode-cn.com/problems/reverse-integer/)

>>>
    给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
>>>

```ecmascript 6
  var reverse = function(x) {
    const min_value = -Math.pow(2, 31)
    // const min_value = 1 << 31
    const max_value = Math.pow(2, 31) - 1
    // const max_value = ~min_value
    let result = 0
    if (x > max_value || x < min_value) {
      return result
    }
    while (x) {
      result = result * 10 + x % 10
      x = parseInt(x / 10)
    }
    if (result > max_value || result < min_value) {
      result = 0
    }
    return result
  };
```
> 可以将所有的负数转换为正数



[1. 两数之和](https://leetcode-cn.com/problems/two-sum/submissions/)

>>>
    给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
    你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
>>>

```ecmascript 6
  var twoSum = function(nums, target) {
      const map = {}
      for (let i = 0; i < nums.length; i++) {
        map[target - nums[i]] = i
        if (nums[i + 1] in map) {
          return [i + 1, map[nums[i + 1]]]
        }
      }
    };
```
