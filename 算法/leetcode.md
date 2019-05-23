# leetcode


[67. 二进制求和](https://leetcode-cn.com/problems/add-binary/)

>>>
    给定两个二进制字符串，返回他们的和（用二进制表示）。
    
    输入为非空字符串且只包含数字 1 和 0。
    
    示例 1:
    
    输入: a = "11", b = "1"
    输出: "100"
>>>

```ecmascript 6
        var addBinary = function(a, b) {
          let i = a.length - 1
          let j = b.length - 1
          let flag = 0
          let result = ''
      
          while (i >= 0 || j >= 0) {
            let sum = flag
            if (i >= 0) {
              sum = a[i] - 0 + sum
              i--
            }
            if (j >= 0) {
              sum = b[j] - 0 + sum
              j--
            }
            result = sum % 2 + result
            flag = Math.trunc(sum / 2)
          }
          if (flag) {
            result = flag + result
          }
          return result
        };
```

[58. 最后一个单词的长度](https://leetcode-cn.com/problems/length-of-last-word/)

>>>
    给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
    
    最高位数字存放在数组的首位， 数组中每个元素只存储一个数字。
    
    你可以假设除了整数 0 之外，这个整数不会以零开头。
    
    输入: [1,2,3]
    输出: [1,2,4]
    解释: 输入数组表示数字 123。
>>>

```ecmascript 6
      var plusOne = function(digits) {
        let flag = 1
        for (let i = digits.length - 1; i >= 0; i--) {
          if (digits[i] === 9 && flag) {
            digits[i] = 0
            flag = 1
          } else {
            digits[i] = digits[i] + flag
            flag = 0
            break
          }
        }
        if (flag) {
          digits.unshift(1)
        }
        return digits
      };
```

[58. 最后一个单词的长度](https://leetcode-cn.com/problems/length-of-last-word/)

>>>
    给定一个仅包含大小写字母和空格 ' ' 的字符串，返回其最后一个单词的长度。
    
    如果不存在最后一个单词，请返回 0 。
    
    说明：一个单词是指由字母组成，但不包含任何空格的字符串
>>>

```ecmascript 6
    var lengthOfLastWord = function(s) {
      s = s.trim()
      for (let i = s.length - 1; i >= 0; i--) {
        if (i == 0) {
          return s.length
        }
        if (s[i] === ' ') {
          return s.length - 1 - i
        }
      }
      return 0
    };
```

[38. 报数](https://leetcode-cn.com/problems/count-and-say/)

>>>
    报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：
    
    1.     1
    2.     11
    3.     21
    4.     1211
    5.     111221
>>>

```ecmascript 6
  var countAndSay = function(n) {
    let str = '1'
    let len = 1
    let temp = ''
    for (let j = 1; j < n; j++) {
      temp = ''
      for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i+1]) {
          len++
        } else {
          temp += `${len}${str[i]}`
          len = 1
        }
      }
      str = temp
    }
    return str
  };
```

[35. 搜索插入位置](https://leetcode-cn.com/problems/search-insert-position/submissions/)

>>>
    给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
    
    你可以假设数组中无重复元素。
>>>

```ecmascript 6
  var searchInsert = function(nums, target) {
      if (nums[nums.length - 1] < target) {
        return nums.length
      }
      for(let i = 0; i < nums.length; i++) {
        if (nums[i] >= target){
          return i
        }
      }
      // return nums.length
    };
```

[28. 实现strStr()](https://leetcode-cn.com/problems/implement-strstr/submissions/)

>>>
    给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。
>>>

```ecmascript 6
  // kmp 算法
  var strStr = function(haystack, needle) {
    if (!needle) {
      return 0
    }
    let j = 0
    for (let i = 0; i <= haystack.length; i++) {
      if (j === needle.length) {
        return i - j
      }
      if (haystack[i] === needle[j]) {
        j++
      } else {
        i = i - j
        j = 0
      }
    }
    return -1
  };
```

[26. 删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/submissions/)

>>>
    给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
    
    不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。 
>>>

```ecmascript 6
    var removeDuplicates = function(nums) {
      let i = 0
      for (let j = 0; j <nums.length; j++) {
        if (nums[i] !== nums[j]) {
          i++
          nums[i] = nums[j]
        }
      }
      return i + 1
    };
```

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
