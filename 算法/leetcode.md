# leetcode


[908. 最小差值 I](https://leetcode-cn.com/problems/smallest-range-i/)

>>>
    给定一个整数数组 A，对于每个整数 A[i]，我们可以选择任意 x 满足 -K <= x <= K，并将 x 加到 A[i] 中。
    
    在此过程之后，我们得到一些数组 B。
    
    返回 B 的最大值和 B 的最小值之间可能存在的最小差值。
    
     
    
    示例 1：
    
    输入：A = [1], K = 0
    输出：0
    解释：B = [1]
    示例 2：
    
    输入：A = [0,10], K = 2
    输出：6
    解释：B = [2,8]
    示例 3：
>>>

```ecmascript 6
   // 该题目的意思是：  将数组A中的每个值与区间[-K, K]内的每一个值相加，求最小值
   var smallestRangeI = function(A, K) {
     return Math.max(Math.max.apply(null, A) - Math.min.apply(null, A) - 2 * K, 0)
   };
```

[970. 强整数](https://leetcode-cn.com/problems/powerful-integers/)

>>>
    给定两个正整数 x 和 y，如果某一整数等于 x^i + y^j，其中整数 i >= 0 且 j >= 0，那么我们认为该整数是一个强整数。
    
    返回值小于或等于 bound 的所有强整数组成的列表。
    
    你可以按任何顺序返回答案。在你的回答中，每个值最多出现一次。
    
    示例 1：
    
    输入：x = 2, y = 3, bound = 10
    输出：[2,3,4,5,7,9,10]
    解释： 
    2 = 2^0 + 3^0
    3 = 2^1 + 3^0
    4 = 2^0 + 3^1
    5 = 2^1 + 3^1
    7 = 2^2 + 3^1
    9 = 2^3 + 3^0
    10 = 2^0 + 3^2
>>>

```ecmascript 6
   var powerfulIntegers = function(x, y, bound) {
     let temp = {}
     for (let i = 0; i < 20 && Math.pow(x, i) <= bound; i++) {
       for (let j = 0; j < 20 && Math.pow(y, j) <= bound; j++) {
         let value = Math.pow(x, i) + Math.pow(y, j)
         if (value <= bound) {
           temp[value] = value
         }
       }
     }
     return Object.keys(temp)
   };
```

[944. 删列造序](https://leetcode-cn.com/problems/delete-columns-to-make-sorted/)

>>>
    删除 操作的定义是：选出一组要删掉的列，删去 A 中对应列中的所有字符，形式上，第 n 列为 [A[0][n], A[1][n], ..., A[A.length-1][n]]）。
    
    比如，有 A = ["abcdef", "uvwxyz"]，
    
    要删掉的列为 {0, 2, 3}，删除后 A 为["bef", "vyz"]， A 的列分别为["b","v"], ["e","y"], ["f","z"]。
>>>

```ecmascript 6
   var minDeletionSize = function(A) {
     let result = 0
     for (let i = 0; i < A[0].length; i++) {
       for (let j = 0; j < A.length - 1; j++) {
         if (A[j][i] > A[j + 1][i]) {
           result++
           break
         }
       }
     }
     return result
   };
```

[697. 数组的度](https://leetcode-cn.com/problems/degree-of-an-array/)

>>>
    给定一个非空且只包含非负数的整数数组 nums, 数组的度的定义是指数组里任一元素出现频数的最大值。
    
    你的任务是找到与 nums 拥有相同大小的度的最短连续子数组，返回其长度。
    
    示例 1:
    
    输入: [1, 2, 2, 3, 1]
    输出: 2
    解释: 
    输入数组的度是2，因为元素1和2的出现频数最大，均为2.
    连续子数组里面拥有相同度的有如下所示:
    [1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
    最短连续子数组[2, 2]的长度为2，所以返回2.
>>>

```ecmascript 6
   var findShortestSubArray = function(nums) {
     // 记录次数，起始位置和当前位置的差
     // 比较大小
     let temp = {}
     let max = 0
     let min = nums.length
     nums.forEach((item, index) => {
       if (item in temp) {
         temp[item].length = index - temp[item].start
         temp[item].count++
       } else {
         temp[item] = {
           start: index - 1,
           length: 1,
           count: 1
         }
       }
       if (temp[item].count === max) {
         min = Math.min(min, temp[item].length)
       } else if (temp[item].count > max) {
         min = temp[item].length
         max = temp[item].count
       }
     })
     return min
   };
```

[400. 第N个数字](https://leetcode-cn.com/problems/nth-digit/)

>>>
    在无限的整数序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...中找到第 n 个数字。
    
    注意:
    n 是正数且在32为整形范围内 ( n < 231)。
    
    示例 1:
    
    输入:
    3
    
    输出:
    3
    示例 2:
    
    输入:
    11
    
    输出:
    0
    
    说明:
    第11个数字在序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... 里是0，它是10的一部分。
>>>

```ecmascript 6
   var findNthDigit = function(n) {
     if (n < 9) {
       return n
     }
     // 当前区间内  拥有多少数字
     let nums = 9
     // 当前数字位数
     let len = 1
     // 当前区间数字总长度
     let total = 9
     // 最终区间的基数
     let result = 0
     while (n > total) {
       n -= total
       result += nums
       len++
       nums *= 10
       total = nums * len
     }
     let position = n % len
     if (!position) {
       position = len
     }
     position--
     return (result + Math.ceil(n / len)).toString()[position]
   };
```

[1071. 字符串的最大公因子](https://leetcode-cn.com/problems/greatest-common-divisor-of-strings/)

>>>
    对于字符串 S 和 T，只有在 S = T + ... + T（T 与自身连接 1 次或多次）时，我们才认定 “T 能除尽 S”。
    
    返回字符串 X，要求满足 X 能除尽 str1 且 X 能除尽 str2。
    
     
    
    示例 1：
    
    输入：str1 = "ABCABC", str2 = "ABC"
    输出："ABC"
    示例 2：
    
    输入：str1 = "ABABAB", str2 = "ABAB"
    输出："AB"
>>>

```ecmascript 6
   const gcd = (a, b) => !b ? a : gcd(b, a % b)
   var gcdOfStrings = function(str1, str2) {
     if (`${str1}${str2}` !== `${str2}${str1}`) {
       return ''
     }
     return str1.substring(0, gcd(str1.length, str2.length))
   };
```

[724. 寻找数组的中心索引](https://leetcode-cn.com/problems/find-pivot-index/)

>>>
    给定一个整数类型的数组 nums，请编写一个能够返回数组“中心索引”的方法。
    
    我们是这样定义数组中心索引的：数组中心索引的左侧所有元素相加的和等于右侧所有元素相加的和。
    
    如果数组不存在中心索引，那么我们应该返回 -1。如果数组有多个中心索引，那么我们应该返回最靠近左边的那一个。
    
    示例 1:
    
    输入: 
    nums = [1, 7, 3, 6, 5, 6]
    输出: 3
    解释: 
    索引3 (nums[3] = 6) 的左侧数之和(1 + 7 + 3 = 11)，与右侧数之和(5 + 6 = 11)相等。
    同时, 3 也是第一个符合要求的中心索引。
>>>

```ecmascript 6
   var pivotIndex = function(nums) {
     if (!nums.length) {
       return -1
     }
     let sum = nums.reduce((sum, item) => sum + item, 0)
     let temp = 0
     for (let i = 0; i < nums.length; i++) {
       if(i > 0){
         temp += 2 * nums[i - 1]
       }
       if (sum - temp === nums[i]) {
         return i
       }
     }
     return -1
   };
```

[409. 最长回文串](https://leetcode-cn.com/problems/longest-palindrome/)

>>>
    给定一个包含大写字母和小写字母的字符串，找到通过这些字母构造成的最长的回文串。
    
    在构造过程中，请注意区分大小写。比如 "Aa" 不能当做一个回文字符串。
    
    注意:
    假设字符串的长度不会超过 1010。
    
    示例 1:
    
    输入:
    "abccccdd"
    
    输出:
    7
    
    解释:
    我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。
>>>

```ecmascript 6
   var longestPalindrome = function(s) {
     let temp = {}
     let result = 0
     for (let i = 0; i < s.length; i++) {
       if (s[i] in temp) {
         delete temp[s[i]]
         result += 2
       } else [
         temp[s[i]] = 1
       ]
     }
     if (Object.keys(temp).length) {
       result++
     }
     return result
   };
```

[290. 单词规律](https://leetcode-cn.com/problems/word-pattern/)

>>>
    给定一种规律 pattern 和一个字符串 str ，判断 str 是否遵循相同的规律。
    
    这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 str 中的每个非空单词之间存在着双向连接的对应规律。
    
    示例1:
    
    输入: pattern = "abba", str = "dog cat cat dog"
    输出: true
    示例 2:
    
    输入:pattern = "abba", str = "dog cat cat fish"
    输出: false
>>>

```ecmascript 6
   var wordPattern = function(pattern, str) {
     let key = {}
     let value = {}
     let arr = str.split(' ')
     if (pattern.length !== arr.length) {
       return false
     }
     for (let i = 0; i < arr.length; i++) {
       if ((pattern[i] in key && key[pattern[i]] !== arr[i]) || (arr[i] in value && value[arr[i]] !== pattern[i])) {
         return false
       } else {
         key[pattern[i]] = arr[i]
         value[arr[i]] = pattern[i]
       }
     }
     return true
   };
```

[1051. 高度检查器](https://leetcode-cn.com/problems/height-checker/submissions/)

>>>
    学校在拍年度纪念照时，一般要求学生按照 非递减 的高度顺序排列。
    
    请你返回至少有多少个学生没有站在正确位置数量。该人数指的是：能让所有学生以 非递减 高度排列的必要移动人数。
    
     
    
    示例：
    
    输入：[1,1,4,2,1,3]
    输出：3
    解释：
    高度为 4、3 和最后一个 1 的学生，没有站在正确的位置。
>>>

```ecmascript 6
   var heightChecker = function (heights) {
     let result = 0
     const copy = [...heights]
     copy.sort((a, b) => a - b)
     for (let i = 0; i < copy.length; i++) {
       if (copy[i] !== heights[i]) {
         result++
       }
     }
     return result
   }
```

[997. 找到小镇的法官](https://leetcode-cn.com/problems/find-the-town-judge/submissions/)

>>>
    在一个小镇里，按从 1 到 N 标记了 N 个人。传言称，这些人中有一个是小镇上的秘密法官。
    
    如果小镇的法官真的存在，那么：
    
    小镇的法官不相信任何人。
    每个人（除了小镇法官外）都信任小镇的法官。
    只有一个人同时满足属性 1 和属性 2 。
    给定数组 trust，该数组由信任对 trust[i] = [a, b] 组成，表示标记为 a 的人信任标记为 b 的人。
    
    如果小镇存在秘密法官并且可以确定他的身份，请返回该法官的标记。否则，返回 -1。
    
     
    
    示例 1：
    
    输入：N = 2, trust = [[1,2]]
    输出：2
    示例 2：
    
    输入：N = 3, trust = [[1,3],[2,3]]
    输出：3
>>>

```ecmascript 6
   var findJudge = function(N, trust) {
     // 信任分组
     let trustTemp = new Array(N + 1).fill(0)
     // 被信任分组
     let beTrustTemp = new Array(N + 1).fill(0)
     trust.forEach(item => {
       trustTemp[item[0]]++
       beTrustTemp[item[1]]++
     })
     for (let i = 1; i <= N; i++) {
       if (trustTemp[i] === 0 && beTrustTemp[i] + 1 === N) {
         return i
       }
     }
     return -1
   };
```

[796. 旋转字符串](https://leetcode-cn.com/problems/rotate-string/submissions/)

>>>
    给定两个字符串, A 和 B。
    
    A 的旋转操作就是将 A 最左边的字符移动到最右边。 例如, 若 A = 'abcde'，在移动一次之后结果就是'bcdea' 。如果在若干次旋转操作之后，A 能变成B，那么返回True。
    
    示例 1:
    输入: A = 'abcde', B = 'cdeab'
    输出: true
    
    示例 2:
    输入: A = 'abcde', B = 'abced'
    输出: false
>>>

```ecmascript 6
   var rotateString = function(A, B) {
     if (!A && !B) {
       return true
     }
     if (!A || !B || A.length !== B.length) {
       return false
     }
     A += A
     return ~A.indexOf(B)
   };
```

[788. 旋转数字](https://leetcode-cn.com/problems/rotated-digits/)

>>>
    我们称一个数 X 为好数, 如果它的每位数字逐个地被旋转 180 度后，我们仍可以得到一个有效的，且和 X 不同的数。要求每位数字都要被旋转。
    
    如果一个数的每位数字被旋转以后仍然还是一个数字， 则这个数是有效的。0, 1, 和 8 被旋转后仍然是它们自己；2 和 5 可以互相旋转成对方；6 和 9 同理，除了这些以外其他的数字旋转以后都不再是有效的数字。
    
    现在我们有一个正整数 N, 计算从 1 到 N 中有多少个数 X 是好数？
    
    示例:
    输入: 10
    输出: 4
    解释: 
    在[1, 10]中有四个好数： 2, 5, 6, 9。
    注意 1 和 10 不是好数, 因为他们在旋转之后不变。
>>>

```ecmascript 6
   var rotatedDigits = function(N) {
     let result = 0
     let arr = [-1, -1, 1, 0, 0, 1, 1, 0, -1, 1]
     for (let i = 1; i <= N; i++) {
       let j = i
       let flag = false
       while (j) {
         let mod = j % 10
         if (arr[mod] === 1) {
           flag = true
         } else if (arr[mod] === 0) {
           flag = false
           break
         }
         j = j / 10 | 0
       }
       if (flag) {
         result++
       }
     }
     return result
   };
```

[203. 移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/solution/php-by-rain-16/)

>>>
    删除链表中等于给定值 val 的所有节点。
    
    示例:
    
    输入: 1->2->6->3->4->5->6, val = 6
    输出: 1->2->3->4->5
>>>

```ecmascript 6
   var removeElements = function(head, val) {
     let node = new ListNode()
     node.next = head
     let cur = node
     while (cur && cur.next) {
       if (cur.next.val === val) {
         cur.next = cur.next.next
       } else {
         cur = cur.next
       }
     }
     return node.next
   };
```

[1078. Bigram 分词](https://leetcode-cn.com/problems/occurrences-after-bigram/)

>>>
    给出第一个词 first 和第二个词 second，考虑在某些文本 text 中可能以 "first second third" 形式出现的情况，其中 second 紧随 first 出现，third 紧随 second 出现。
    
    对于每种这样的情况，将第三个词 "third" 添加到答案中，并返回答案。
    
     
    
    示例 1：
    
    输入：text = "alice is a good girl she is a good student", first = "a", second = "good"
    输出：["girl","student"]
    示例 2：
    
    输入：text = "we will we will rock you", first = "we", second = "will"
    输出：["we","rock"]
>>>

```ecmascript 6
   var findOcurrences = function(text, first, second) {
     let result = []
     let arr = text.split(' ')
     for (let i = 2; i < arr.length; i++) {
       if (arr[i - 2] === first && arr[i - 1] === second) {
         result.push(arr[i])
       }
     }
     return result
   };
```

[350. 两个数组的交集 II](https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/)

>>>
    给定两个数组，编写一个函数来计算它们的交集。
    
    示例 1:
    
    输入: nums1 = [1,2,2,1], nums2 = [2,2]
    输出: [2,2]
    示例 2:
    
    输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
    输出: [4,9]
>>>

```ecmascript 6
   var intersect = function(nums1, nums2) {
    let temp = {}
    nums1.forEach(item => {
      if (item in temp) {
        temp[item]++
      } else {
        temp[item] = 1
      }
    })
     let result = []
     nums2.forEach(item => {
       if (item in temp) {
         temp[item]--
         if (!temp[item]) {
           delete temp[item]
         }
         result.push(item)
       }
     })
     return result
   };
```

[884. 两句话中的不常见单词](https://leetcode-cn.com/problems/uncommon-words-from-two-sentences/)

>>>
    给定两个句子 A 和 B 。 （句子是一串由空格分隔的单词。每个单词仅由小写字母组成。）
    
    如果一个单词在其中一个句子中只出现一次，在另一个句子中却没有出现，那么这个单词就是不常见的。
    
    返回所有不常用单词的列表。
    
    您可以按任何顺序返回列表。
    
     
    
    示例 1：
    
    输入：A = "this apple is sweet", B = "this apple is sour"
    输出：["sweet","sour"]
>>>

```ecmascript 6
   var uncommonFromSentences = function(A, B) {
     let temp = {}
     A += ' ' + B
     A.split(' ').forEach(item => {
       if (item in temp) {
         temp[item]++
       } else {
         temp[item] = 1
       }
     })
     return Object.keys(temp).filter(key => temp[key] === 1)
   };
```

[819. 最常见的单词](https://leetcode-cn.com/problems/most-common-word/)

>>>
    给定一个段落 (paragraph) 和一个禁用单词列表 (banned)。返回出现次数最多，同时不在禁用列表中的单词。题目保证至少有一个词不在禁用列表中，而且答案唯一。
    
    禁用列表中的单词用小写字母表示，不含标点符号。段落中的单词不区分大小写。答案都是小写字母。
    
     
    
    示例：
    
    输入: 
    paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."
    banned = ["hit"]
    输出: "ball"
    解释: 
    "hit" 出现了3次，但它是一个禁用的单词。
    "ball" 出现了2次 (同时没有其他单词出现2次)，所以它是段落里出现次数最多的，且不在禁用列表中的单词。 
    注意，所有这些单词在段落里不区分大小写，标点符号需要忽略（即使是紧挨着单词也忽略， 比如 "ball,"）， 
    "hit"不是最终的答案，虽然它出现次数更多，但它在禁用单词列表中。
>>>

```ecmascript 6
   var mostCommonWord = function(paragraph, banned) {
     let temp = {}
     let max = 0
     let result = ''
     paragraph.match(/\w+/g).forEach(item => {
       item = item.toLowerCase()
       if (!banned.includes(item)) {
         if (item in temp) {
           temp[item]++
         } else {
           temp[item] = 1
         }
         if (max < temp[item]) {
           max = temp[item]
           result = item
         }
       }
     })
     return result
   };
```

[754. 到达终点数字](https://leetcode-cn.com/problems/reach-a-number/)

>>>
    在一根无限长的数轴上，你站在0的位置。终点在target的位置。
    
    每次你可以选择向左或向右移动。第 n 次移动（从 1 开始），可以走 n 步。
    
    返回到达终点需要的最小移动次数。
    
    示例 1:
    
    输入: target = 3
    输出: 2
    解释:
    第一次移动，从 0 到 1 。
    第二次移动，从 1 到 3 。
>>>

```ecmascript 6
   var reachNumber = function(target) {
     if (target < 0) {
       target = -target
     }
     let n = 0
     while (target > 0 || target % 2) {
       n++
       target -= n
     }
     return n
   };
```

[704. 二分查找](https://leetcode-cn.com/problems/binary-search/)

>>>
    给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
    
    
    示例 1:
    
    输入: nums = [-1,0,3,5,9,12], target = 9
    输出: 4
    解释: 9 出现在 nums 中并且下标为 4
>>>

```ecmascript 6
   var search = function(nums, target) {
     let left = 0
     let right = nums.length - 1
     while (left <= right) {
       let mid = left + (right - left) / 2 | 0
       if (nums[mid] === target) {
         return mid
       } else if (target < nums[mid]) {
         right = mid - 1
       } else if (target > nums[mid]){
         left = mid + 1
       }
     }
     return -1
   };
```

[709. 转换成小写字母](https://leetcode-cn.com/problems/to-lower-case/)

>>>
    实现函数 ToLowerCase()，该函数接收一个字符串参数 str，并将该字符串中的大写字母转换成小写字母，之后返回新的字符串。
    
     
    
    示例 1：
    
    输入: "Hello"
    输出: "hello"
>>>

```ecmascript 6
   var toLowerCase = function(str) {
     let result = ''
     for (let i = 0; i < str.length; i++) {
       if (str.charCodeAt(i) > 96) {
         result += String.fromCharCode(str.charCodeAt(i) - 32)
       } else {
         result += str[i]
       }
     }
     return result
   };
```

[605. 种花问题](https://leetcode-cn.com/problems/can-place-flowers/)

>>>
    假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。
    
    给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回True，不能则返回False。
    
    示例 1:
    
    输入: flowerbed = [1,0,0,0,1], n = 1
    输出: True
>>>

```ecmascript 6
   var canPlaceFlowers = function(flowerbed, n) {
     flowerbed.unshift(0)
     flowerbed.push(0)
     for (let i = 1; i < flowerbed.length - 1; i++) {
       if (!flowerbed[i - 1] && !flowerbed[i] && !flowerbed[i + 1]) {
         i++
         n--
       }
     }
     return n <= 0
   };
```

[594. 最长和谐子序列](https://leetcode-cn.com/problems/longest-harmonious-subsequence/)

>>>
    和谐数组是指一个数组里元素的最大值和最小值之间的差别正好是1。
    
    现在，给定一个整数数组，你需要在所有可能的子序列中找到最长的和谐子序列的长度。
    
    示例 1:
    
    输入: [1,3,2,2,5,2,3,7]
    输出: 5
    原因: 最长的和谐数组是：[3,2,2,2,3].
>>>

```ecmascript 6
   var findLHS = function(nums) {
     let temp = {}
     for (let i = 0; i < nums.length; i++) {
       if (nums[i] in temp) {
         temp[nums[i]]++
       } else {
         temp[nums[i]] = 1
       }
     }
     let result = 0
     for (let key in temp) {
       if ((key - 0 + 1) in temp) {
         result = Math.max(result, temp[key] + temp[key - 0 + 1])
       }
     }
     return result
   };
```

[283. 移动零](https://leetcode-cn.com/problems/move-zeroes/)

>>>
    给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
    
    示例:
    
    输入: [0,1,0,3,12]
    输出: [1,3,12,0,0]
>>>

```ecmascript 6
   var moveZeroes = function(nums) {
     let i = 0
     for (let j = 0; j < nums.length; j++) {
       if (nums[j]) {
         nums[i] = nums[j]
         if (i !== j) {
           nums[j] = 0
         }
         i++
       }
     }
   };
```

[1037. 有效的回旋镖](https://leetcode-cn.com/problems/valid-boomerang/)

>>>
    回旋镖定义为一组三个点，这些点各不相同且不在一条直线上。
    
    给出平面上三个点组成的列表，判断这些点是否可以构成回旋镖。
    
     
    
    示例 1：
    
    输入：[[1,1],[2,3],[3,2]]
    输出：true
>>>

```ecmascript 6
   var isBoomerang = function(points) {
       return (points[1][0] - points[0][0]) * (points[2][1] - points[1][1]) !== (points[1][1] - points[0][1]) * (points[2][0] - points[1][0])
   };
```

[367. 有效的完全平方数](https://leetcode-cn.com/problems/valid-perfect-square/submissions/)

>>>
    给定一个正整数 num，编写一个函数，如果 num 是一个完全平方数，则返回 True，否则返回 False。
    
    说明：不要使用任何内置的库函数，如  sqrt。
    
    示例 1：
    
    输入：16
    输出：True
    示例 2：
    
    输入：14
    输出：False
>>>

```ecmascript 6
   var isPerfectSquare = function(num) {
     let i = num
     while (i * i > num) {
       i = (i + num / i) / 2
     }
     return i === (i | 0)
   };
   var isPerfectSquare = function(num) {
     let i = 1
     while (num > 0) {
         num -= i
         i += 2
     }
     return num === 0
   };
```

[387. 字符串中的第一个唯一字符](https://leetcode-cn.com/problems/first-unique-character-in-a-string/)

>>>
    给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
    
    案例:
    
    s = "leetcode"
    返回 0.
    
    s = "loveleetcode",
    返回 2.
>>>

```ecmascript 6
   var firstUniqChar = function(s) {
     let arr = []
     for (let i = 0; i < s.length; i++) {
       arr[s.charCodeAt(i) - 97] = i
     }
     for (let i = 0; i < s.length; i++) {
       let index = s.charCodeAt(i) - 97
       if (arr[index] === i) {
         return i
       } else {
         arr[index] = -1
       }
     }
     return -1
   };
```

[278. 第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/)

>>>
    你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。
    
    假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。
    
    你可以通过调用 bool isBadVersion(version) 接口来判断版本号 version 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。
    
    示例:
    
    给定 n = 5，并且 version = 4 是第一个错误的版本。
    
    调用 isBadVersion(3) -> false
    调用 isBadVersion(5) -> true
    调用 isBadVersion(4) -> true
    
    所以，4 是第一个错误的版本。 
>>>

```ecmascript 6
   var solution = function(isBadVersion) {
     /**
      * @param {integer} n Total versions
      * @return {integer} The first bad version
      */
     return function(n) {
       let left = 1
       let right = n
       let mid = 0
       while (left < right) {
         mid = left + ((right - left) / 2 | 0)
         if (isBadVersion(mid)) {
           right = mid
         } else {
           left = mid + 1
         }
       }
       return right
     };
   };
```

[191. 位1的个数](https://leetcode-cn.com/problems/number-of-1-bits/)

>>>
    编写一个函数，输入是一个无符号整数，返回其二进制表达式中数字位数为 ‘1’ 的个数（也被称为汉明重量）。
    
     
    
    示例 1：
    
    输入：00000000000000000000000000001011
    输出：3
    解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。
>>>

```ecmascript 6
    var hammingWeight = function(n) {
        let sum = 0
        while (n) {
            sum += n & 1
            n >>>= 1
        }
        return sum
    };
    var hammingWeight = function(n) {
        let result = n.toString(2).match(/(1)/g) || []
        return result.length
    };
    var hammingWeight = function(n) {
        let sum = 0
        while (n) {
            n &= n - 1
            sum++
        }
        return sum
    };
```

[303. 区域和检索 - 数组不可变](https://leetcode-cn.com/problems/range-sum-query-immutable/submissions/)

>>>
    给定一个整数数组  nums，求出数组从索引 i 到 j  (i ≤ j) 范围内元素的总和，包含 i,  j 两点。
    
    示例：
    
    给定 nums = [-2, 0, 3, -5, 2, -1]，求和函数为 sumRange()
    
    sumRange(0, 2) -> 1
    sumRange(2, 5) -> -1
    sumRange(0, 5) -> -3
>>>

```ecmascript 6
    var NumArray = function(nums) {
        this.result = []
        nums.reduce((total, item) => {
            total += item
            this.result.push(total)
            return total
        },0)
    };

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
   NumArray.prototype.sumRange = function(i, j) {
     if (i === 0) {
       return this.result[j]
     }
     return this.result[j] - this.result[--i]
   };
```

[342. 4的幂](https://leetcode-cn.com/problems/power-of-four/)

>>>
    给定一个整数 (32 位有符号整数)，请编写一个函数来判断它是否是 4 的幂次方。
    
    示例 1:
    
    输入: 16
    输出: true
>>>

```ecmascript 6
   var isPowerOfFour = function(num) {
       if (num < 0) {
           return false
       }
       return /^1(00)*$/.test(num.toString(2))
       // return /^10*$/.test(num.toString(4))
   };
   var isPowerOfFour = function(num) {
        if (num < 0 || num & (num-1))//排除不是2的幂次的数
        {
            return false;
        }
        return num & 0x55555555;//可以改为return num%3==1;
   };
```

[258. 各位相加](https://leetcode-cn.com/problems/add-digits/solution/c-shu-zi-de-ge-wei-xiang-jia-by-steve_stone/)

>>>
    给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。
    
    示例:
    
    输入: 38
    输出: 2 
    解释: 各位相加的过程为：3 + 8 = 11, 1 + 1 = 2。 由于 2 是一位数，所以返回 2。
>>>

```ecmascript 6
   var addDigits = function(num) {
     if (num < 10) {
       return num
     }
     let temp = 0
     while (num > 0) {
       temp = temp + num % 10
       num = num / 10 | 0
       if (!num && temp > 9) {
         num = temp
         temp = 0
       }
     }
     return temp
   };
    // 方法2: 总结规律法。 时间复杂度为O(1)
    // 设三位数 n = 100a + 10b + c 则 n - ( a+b+c) = 99a + 9b 也就是说n的每次各位求和结果与原n想比，
    // 都减少了9的倍数，所以n对9取余的结果就是所求结果。
    // n为其他位数时等同，注意 n > 0 且 n % 9 == 0 时，结果应为9
    var addDigits = function(num) {
       if(num>9) {
           num %= 9
           if(num ==0)
               return 9
       }
        return num
    };
```

[349. 两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

>>>
    给定两个数组，编写一个函数来计算它们的交集。
    
    示例 1:
    
    输入: nums1 = [1,2,2,1], nums2 = [2,2]
    输出: [2]
    示例 2:
    
    输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
    输出: [9,4]
>>>

```ecmascript 6
   var intersection = function(nums1, nums2) {
     let temp = {}
     nums1.forEach(item => {
       temp[item] = item
     })
     let temp1 = {}
     nums2.forEach(item => {
       if (item in temp) {
         temp1[item] = item
       }
     })
     let result = []
     for (let item in temp1) {
        result.push(item)
     }
     return result
   };
```

[344. 反转字符串](https://leetcode-cn.com/problems/reverse-string/comments/)

>>>
    编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。
    
    不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
    
    你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。
    
     
    
    示例 1：
    
    输入：["h","e","l","l","o"]
    输出：["o","l","l","e","h"]
>>>

```ecmascript 6
    var reverseString = function(s) {
        // 此处用temp变量更合适，不用转asc，转asc有点画蛇添足
        let i = 0
        let j = s.length - 1
        while (i < j) {
            s[i] = s[i].charCodeAt() ^ s[j].charCodeAt()
            s[j] = String.fromCharCode(s[i] ^ s[j].charCodeAt())
            s[i] = String.fromCharCode(s[i] ^ s[j].charCodeAt())
            i++
            j--
        }
        // s.reverse()
    };
```

[326. 3的幂](https://leetcode-cn.com/problems/power-of-three/)

>>>
    给定一个整数，写一个函数来判断它是否是 3 的幂次方。
    
    示例 1:
    
    输入: 27
    输出: true
>>>

```ecmascript 6
   var isPowerOfThree = function(n) {
       return n > 0 && 1162261467 % n == 0
       return /^10*$/.test(n.toString(3))
   };
```

[326. 3的幂](https://leetcode-cn.com/problems/power-of-three/)

>>>
    给定一个整数，写一个函数来判断它是否是 3 的幂次方。
    
    示例 1:
    
    输入: 27
    输出: true
>>>

```ecmascript 6
   var isPowerOfThree = function(n) {
       return n > 0 && 1162261467 % n == 0
       return /^10*$/.test(n.toString(3))
   };
```

[189. 旋转数组](https://leetcode-cn.com/problems/rotate-array/)

>>>
    给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
    
    示例 1:
    
    输入: [1,2,3,4,5,6,7] 和 k = 3
    输出: [5,6,7,1,2,3,4]
    解释:
    向右旋转 1 步: [7,1,2,3,4,5,6]
    向右旋转 2 步: [6,7,1,2,3,4,5]
    向右旋转 3 步: [5,6,7,1,2,3,4]
>>>

```ecmascript 6
   var rotate = function(nums, k) {
     if (!k) {
       return
     }
     k = k % nums.length
     reverse(nums, 0, nums.length - k - 1)
     reverse(nums, nums.length - k, nums.length - 1)
     reverse(nums, 0, nums.length - 1)
   };
   function reverse (nums, start, end) {
     while (start < end) {
       nums[start] ^= nums[end]
       nums[end] ^= nums[start]
       nums[start] ^= nums[end]
       start++
       end--
     }
   };
```

[190. 颠倒二进制位](https://leetcode-cn.com/problems/reverse-bits/submissions/)

>>>
    颠倒给定的 32 位无符号整数的二进制位。
    
    示例 1：
    
    输入: 00000010100101000001111010011100
    输出: 00111001011110000010100101000000
    解释: 输入的二进制串 00000010100101000001111010011100 表示无符号整数 43261596，
          因此返回 964176192，其二进制表示形式为 00111001011110000010100101000000。
>>>

```ecmascript 6
   var reverseBits = function(n) {
     // return Number.parseInt([...n.toString(2)].reverse().join('').padEnd(32, '0'), 2)
     let ans=0;
     //进制的本质
     let i=32;
     while(i--)
     {
       // 左移 * 2
       ans <<= 1;
       // 得到n的最后一位，并且赋值给ans
       ans+=n&1;
       // 右移 / 2
       // js里面默认是有符号，所以需要使用无符号右移
       n = n >>> 1;
     }
     // 格式化成32位无符号
     return ans >>> 0;
   };
```

[268. 缺失数字](https://leetcode-cn.com/problems/missing-number/)

>>>
    给定一个包含 0, 1, 2, ..., n 中 n 个数的序列，找出 0 .. n 中没有出现在序列中的那个数。
    
    示例 1:
    
    输入: [3,0,1]
    输出: 2
>>>

```ecmascript 6
   var missingNumber = function(nums) {
     let sum = 0
     for (let i = 0; i < nums.length; i++) {
       sum += i + 1 - nums[i]
     }
     return sum
   };
   var missingNumber = function(nums) {
     let sum = nums.length
     for (let i = 0; i < nums.length; i++) {
       sum = sum ^ i ^ nums[i]
     }
     return sum
   };
```

[844. 比较含退格的字符串](https://leetcode-cn.com/problems/backspace-string-compare/)

>>>
    给定 S 和 T 两个字符串，当它们分别被输入到空白的文本编辑器后，判断二者是否相等，并返回结果。 # 代表退格字符。
    
     
    
    示例 1：
    
    输入：S = "ab#c", T = "ad#c"
    输出：true
    解释：S 和 T 都会变成 “ac”。
>>>

```ecmascript 6
   var backspaceCompare = function(S, T) {
     let arr1 = []
     let arr2 = []
     for (let i = 0; i < S.length; i++) {
       if (S[i] === '#') {
         arr1.pop()
       } else {
         arr1.push(S[i])
       }
     }
     for (let i = 0; i < T.length; i++) {
       if (T[i] === '#') {
         arr2.pop()
       } else {
         arr2.push(T[i])
       }
     }
     return arr1.join('') === arr2.join('')
   };
```

[1021. 删除最外层的括号](https://leetcode-cn.com/problems/remove-outermost-parentheses/)

>>>
    有效括号字符串为空 ("")、"(" + A + ")" 或 A + B，其中 A 和 B 都是有效的括号字符串，+ 代表字符串的连接。例如，""，"()"，"(())()" 和 "(()(()))" 都是有效的括号字符串。
    
    如果有效字符串 S 非空，且不存在将其拆分为 S = A+B 的方法，我们称其为原语（primitive），其中 A 和 B 都是非空有效括号字符串。
    
    给出一个非空有效字符串 S，考虑将其进行原语化分解，使得：S = P_1 + P_2 + ... + P_k，其中 P_i 是有效括号字符串原语。
    
    对 S 进行原语化分解，删除分解中每个原语字符串的最外层括号，返回 S 。
    
     
    
    示例 1：
    
    输入："(()())(())"
    输出："()()()"
    解释：
    输入字符串为 "(()())(())"，原语化分解得到 "(()())" + "(())"，
    删除每个部分中的最外层括号后得到 "()()" + "()" = "()()()"。
>>>

```ecmascript 6
   var removeOuterParentheses = function(S) {
     let result = []
     let count = 0
     for (let i = 0; i < S.length; i++) {
        if (S[i] === '(') {
          count++
          if (count > 1) {
            result.push(S[i])
          }
        } else {
          count--
          if (count > 0) {
            result.push(S[i])
          }
        }
     }
     return result.join('')
   };
```

[682. 棒球比赛](https://leetcode-cn.com/problems/baseball-game/)

>>>
    你现在是棒球比赛记录员。
    给定一个字符串列表，每个字符串可以是以下四种类型之一：
    1.整数（一轮的得分）：直接表示您在本轮中获得的积分数。
    2. "+"（一轮的得分）：表示本轮获得的得分是前两轮有效 回合得分的总和。
    3. "D"（一轮的得分）：表示本轮获得的得分是前一轮有效 回合得分的两倍。
    4. "C"（一个操作，这不是一个回合的分数）：表示您获得的最后一个有效 回合的分数是无效的，应该被移除。
    
    每一轮的操作都是永久性的，可能会对前一轮和后一轮产生影响。
    你需要返回你在所有回合中得分的总和。
    
    示例 1:
    
    输入: ["5","2","C","D","+"]
    输出: 30
    解释: 
    第1轮：你可以得到5分。总和是：5。
    第2轮：你可以得到2分。总和是：7。
    操作1：第2轮的数据无效。总和是：5。
    第3轮：你可以得到10分（第2轮的数据已被删除）。总数是：15。
    第4轮：你可以得到5 + 10 = 15分。总数是：30。
>>>

```ecmascript 6
   var calPoints = function(ops) {
     let result = [0]
     for (let i = 0; i < ops.length; i++) {
       switch (ops[i]) {
         case '+':
           result[0] += result[result.length - 2] + result[result.length - 1]
           result.push(result[result.length - 2] + result[result.length - 1])
           break
         case 'D':
           result[0] += result[result.length - 1] * 2
           result.push(result[result.length - 1] * 2)
           break
         case 'C':
           result[0] -= result[result.length - 1]
           result.pop()
           break
         default:
           result[0] += ops[i] - 0
           result.push(ops[i] - 0)
           break
       }
     }
     return result[0]
   };
```

[1047. 删除字符串中的所有相邻重复项](https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/)

>>>
    给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。
    
    在 S 上反复执行重复项删除操作，直到无法继续删除。
    
    在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。
    
    示例：
    
    输入："abbaca"
    输出："ca"
    解释：
    例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。
>>>

```ecmascript 6
   var removeDuplicates = function(S) {
     let result = [S[0]]
     for (let i = 1; i < S.length; i++) {
       if (result[result.length - 1] === S[i]) {
         result.pop()
       } else {
         result.push(S[i])
       }
     }
     return result.join('')
   };
    var removeDuplicates = function(S) {
        while(S.match(/(\w)\1/g)){
            S = S.replace(/(\w)\1/g, '');
        }
        return S
    };
```

[496. 下一个更大元素 I](https://leetcode-cn.com/problems/next-greater-element-i/submissions/)

>>>
    给定两个没有重复元素的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。找到 nums1 中每个元素在 nums2 中的下一个比其大的值。
    
    nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的第一个比 x 大的元素。如果不存在，对应位置输出-1。
    
    示例 1:
    
    输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
    输出: [-1,3,-1]
    解释:
        对于num1中的数字4，你无法在第二个数组中找到下一个更大的数字，因此输出 -1。
        对于num1中的数字1，第二个数组中数字1右边的下一个较大数字是 3。
        对于num1中的数字2，第二个数组中没有下一个更大的数字，因此输出 -1。
>>>

```ecmascript 6
   var nextGreaterElement = function(nums1, nums2) {
    let temp = {}
    let num = [nums2[0]]
    // 将不满足条件的元素全部压入num中，然后跟当前元素对比，满足条件后保存到temp中
     for (let i = 1; i < nums2.length; i++) {
       while (num.length && num[num.length - 1] < nums2[i]) {
        temp[num[num.length - 1]] = nums2[i]
        num.pop()
       }
       num.push(nums2[i])
     }
     // 此时已经将所有满足条件的数据存入到temp中，不满足全部都是-1
     let result = []
     for (let j = 0; j < nums1.length; j++) {
       if (nums1[j] in temp) {
         result.push(temp[nums1[j]])
       } else {
         result.push(-1)
       }
     }
     return result
   };
```

[172. 阶乘后的零](https://leetcode-cn.com/problems/factorial-trailing-zeroes/)

>>>
    给定一个整数 n，返回 n! 结果尾数中零的数量。
    
    示例 1:
    
    输入: 3
    输出: 0
    解释: 3! = 6, 尾数中没有零。
>>>

```ecmascript 6
   var trailingZeroes = function(n) {
     let result = 0
     while(n) {
       n = n / 5 | 0
       result += n
     }
     return result
   };
```

[171. Excel表列序号](https://leetcode-cn.com/problems/excel-sheet-column-number/)

>>>
    给定一个Excel表格中的列名称，返回其相应的列序号。
    
    例如，
    
        A -> 1
        B -> 2
        C -> 3
        ...
        Z -> 26
        AA -> 27
        AB -> 28 
>>>

```ecmascript 6
   var titleToNumber = function(s) {
     let result = 0
     for (let j = 0; j < s.length; j++) {
       result = result * 26 + s.charCodeAt(j) - 64
     }
     return result
   };
```

[169. 求众数](https://leetcode-cn.com/problems/majority-element/submissions/)

>>>
    给定一个大小为 n 的数组，找到其中的众数。众数是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
    
    你可以假设数组是非空的，并且给定的数组总是存在众数。
    
    示例 1:
    
    输入: [3,2,3]
    输出: 3
>>>

```ecmascript 6
   var majorityElement = function(nums) {
     let temp = {
       [nums[0]]: 1
     }
     let index = nums[0]
     for (let i = 1; i < nums.length; i++) {
       temp[nums[i]] = temp[nums[i]] || 0
       temp[nums[i]]++
       if (temp[index] < temp[nums[i]]) {
         index = nums[i]
       }
     }
     return index
   };
   // 摩尔投票算法
   var majorityElement = function(nums) {
     var count = 1;
     var maj = nums[0];
     for (var i = 1; i < nums.length; i++) {
       if (maj == nums[i])
         count++;
       else {
         count--;
         if (count == 0) {
           maj = nums[i + 1];
         }
       }
     }
     return maj;
   };
```

[168. Excel表列名称](https://leetcode-cn.com/problems/excel-sheet-column-title/submissions/)

>>>
    给定一个正整数，返回它在 Excel 表中相对应的列名称。
    
    例如，
    
        1 -> A
        2 -> B
        3 -> C
        ...
        26 -> Z
        27 -> AA
        28 -> AB 
        ...
>>>

```ecmascript 6
   var convertToTitle = function(n) {
     let dictionary = []
     for (let i = 65; i < 91; i++) {
       dictionary.push(String.fromCharCode(i))
     }
     let result = ''
     while (n) {
       n--
       result = dictionary[n%26] + result
       n = n / 26 | 0
     }
     return result
   };
```

[167. 两数之和 II - 输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/submissions/)

>>>
    给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。
    
    函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。
    
    说明:
    
    返回的下标值（index1 和 index2）不是从零开始的。
    你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。
    示例:
    
    输入: numbers = [2, 7, 11, 15], target = 9
    输出: [1,2]
    解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
>>>

```ecmascript 6
   var twoSum = function(numbers, target) {
     let temp = {}
    for (let i = 0; i < numbers.length; i++) {
      temp[target - numbers[i]] = i
      if (numbers[i + 1] in temp) {
        return [temp[numbers[i + 1]] + 1, i + 2]
      }
    }
   };
    var twoSum = function(numbers, target) {
        var left = 0,
            len = numbers.length;
        for (var i = 0, j = len-1; i < j;){
            var left = numbers[i];
            var right = numbers[j];
            if (left + right === target) {
                return [i+1, j+1];
            }else if (left + right > target) {
                j--;
            }else if (left + right < target) {
                i++;
            }
        }
        return []
    };
```

[4. 寻找两个有序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/submissions/)

>>>
    给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
    
    请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
    
    你可以假设 nums1 和 nums2 不会同时为空。
    
    示例 1:
    
    nums1 = [1, 3]
    nums2 = [2]
    
    则中位数是 2.0
>>>

```ecmascript 6
   var findMedianSortedArrays = function(nums1, nums2) {
     let arr = []
     let i = 0
     let j = 0
     while (i < nums1.length && j < nums2.length) {
       if (nums1[i] < nums2[j]) {
         arr.push(nums1[i++])
       } else {
         arr.push(nums2[j++])
       }
     }
     while(i < nums1.length) {
       arr.push(nums1[i++])
     }
     while(j < nums2.length) {
       arr.push(nums2[j++])
     }
     let l = Math.trunc(arr.length / 2)
     if (arr.length % 2) {
       return arr[l]
     } else {
       return (arr[l] + arr[l - 1]) / 2
     }
   };
```

[3. 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

>>>
    给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
    
    示例 1:
    
    输入: "abcabcbb"
    输出: 3 
    解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
>>>

```ecmascript 6
   var lengthOfLongestSubstring = function(s) {
     let i = 0
     let j = 0
     let temp = {}
     let result = 0
     while (i < s.length) {
       if (s[i] in temp) {
         // 一个一个的出栈
         delete temp[s[j]]
         j++
       } else {
         temp[s[i]] = s[i]
         i++
         result = Math.max(result, i - j)
       }
     }
     return result
   };
   var lengthOfLongestSubstring = function(s) {
     let i = 0
     let j = 0
     let temp = {}
     let result = 0
     while (i < s.length) {
       // 一次性将游标跳到目标位置
       if (s[i] in temp) {
         j = Math.max(temp[s[i]], j)
       }
       result = Math.max(result, i - j + 1)
       temp[s[i]] = i + 1
       i++
     }
     return result
   };
    var lengthOfLongestSubstring = function(s) {
        if (!s) {
            return 0
        }
        let left = 0
        let right = 1
        let result = 0
        const len = s.length
        while(right < len) {
            const text = s.substr(left, right - left)
            const index = text.indexOf(s[right])
            if (index >= 0) {
                if (result < right - left) {
                    result = right - left
                }
                left = left + index + 1
            }
            ++right
        }
        if (result < right - left) {
            result = right - left
        }
        return result
        
    };
```

[160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/submissions/)

>>>
    编写一个程序，找到两个单链表相交的起始节点。
>>>

```ecmascript 6
   var getIntersectionNode = function(headA, headB) {
        let temp = {}
        let cur = headA
        while (cur) {
          temp[cur.val] = cur
          cur = cur.next
        }
        cur = headB
        while (cur) {
          if (cur.val in temp && cur === temp[cur.val]) {
            return cur
          }
          cur = cur.next
        }
        return null
   };
    // 0 0 0 0 1 1 1|0 0 0|1 1 1
    // 0 0 0 1 1 1|0 0 0 0|1 1 1
    var getIntersectionNode = function(headA, headB) {
      let h1 = headA;
      let h2 = headB;
    
      while (h1 !== h2) {
        if (h1) {
          h1 = h1.next;
        } else {
          h1 = headB;
        }
        if (h2) {
          h2 = h2.next;
        } else {
          h2 = headA;
        }
      }
      return h2;
    };
    // 0|0 0 0 1 1 1
    //   0 0 0 1 1 1
```

[155. 最小栈](https://leetcode-cn.com/problems/min-stack/)

>>>
    设计一个支持 push，pop，top 操作，并能在常数时间内检索到最小元素的栈。
    
    push(x) -- 将元素 x 推入栈中。
    pop() -- 删除栈顶的元素。
    top() -- 获取栈顶元素。
    getMin() -- 检索栈中的最小元素。
>>>

```ecmascript 6
   /**
    * initialize your data structure here.
    */
   var MinStack = function() {
     this.data = []
     this.mins = []
   };

   /**
    * @param {number} x
    * @return {void}
    */
   MinStack.prototype.push = function(x) {
     this.data.push(x)
     if (this.mins.length) {
       this.mins.push(Math.min(this.mins[this.mins.length - 1], x))
     } else {
       this.mins.push(x)
     }
   };

   /**
    * @return {void}
    */
   MinStack.prototype.pop = function() {
     this.data.pop()
     this.mins.pop()
   };

   /**
    * @return {number}
    */
   MinStack.prototype.top = function() {
     return this.data[this.data.length - 1]
   };

   /**
    * @return {number}
    */
   MinStack.prototype.getMin = function() {
     return this.mins[this.mins.length - 1]
   };
```

[141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

>>>
    给定一个链表，判断链表中是否有环。
    
    为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。
    
     
    
    示例 1：
    
    输入：head = [3,2,0,-4], pos = 1
    输出：true
    解释：链表中有一个环，其尾部连接到第二个节点。
>>>

```ecmascript 6
   var hasCycle = function(head) {
     if (!head) {
       return false
     }
     let slow = head
     let fast = head.next
     while (fast && fast.next) {
       if (fast === slow) {
         return true
       }
       slow = slow.next
       fast = fast.next.next
     }
     return false
   };
    var hasCycle = function(head) {
      let tail = head;
      const set = new Set();
      while (tail) {
        if (set.has(tail)) {
          return true;
        }
        set.add(tail);
        tail = tail.next;
      }
      return false;
    };
```

[125. 验证回文串](https://leetcode-cn.com/problems/single-number/)

>>>
    给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
    
    说明：本题中，我们将空字符串定义为有效的回文串。
    
    示例 1:
    
    输入: "A man, a plan, a canal: Panama"
    输出: true
>>>

* [异或知识点传送门](https://blog.csdn.net/Garrettzxd/article/details/82390653)

```ecmascript 6
   var singleNumber = function(nums) {
     let temp = {}
     for (let i = 0; i < nums.length; i++) {
       if (nums[i] in temp) {
         delete temp[nums[i]]
       } else {
         temp[nums[i]] = i
       }
     }
     return Object.keys(temp)[0]
   };
   // 异或
   var singleNumber = function (nums) {
     var res;
     nums.forEach(function (v) {
       res = res ^ v;
     });
     return res;
   };
```

[125. 验证回文串](https://leetcode-cn.com/problems/valid-palindrome/)

>>>
    给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
    
    说明：本题中，我们将空字符串定义为有效的回文串。
    
    示例 1:
    
    输入: "A man, a plan, a canal: Panama"
    输出: true
>>>

```ecmascript 6
   var isPalindrome = function(s) {
     let i = 0
     let j = s.length - 1
     let reg = /[\w\d]/
     s = s.toLowerCase()
     while (i < j) {
        if (!reg.test(s[i])) {
          i++
          continue
        }
        if (!reg.test(s[j])) {
          j--
          continue
        }
        if (s[i] !== s[j]) {
          return false
        }
        i++
        j--
     }
     return true
   };
```

[122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/submissions/)

>>>
    给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
    
    设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
    
    注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
    
    示例 1:
    
    输入: [7,1,5,3,6,4]
    输出: 7
    解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
         随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
>>>

```ecmascript 6
   var maxProfit = function(prices) {
     let min = prices[0]
     let profit = 0
     for (let i = 1; i < prices.length; i++) {
       if (prices[i] < min) {
         min = prices[i]
       } else {
         profit += prices[i] - min
         min = prices[i]
       }
     }
     return profit
   };
    var maxProfit = function(prices) {
        let max=0;
        for(let i=0;i<prices.length-1;i++){
            if(prices[i] < prices[i+1]){  
                max+=prices[i+1]-prices[i]; //计算各个小峰值的和 
            }
        }
        return max;
    };
```

[121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

>>>
    给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
    
    如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。
    
    注意你不能在买入股票前卖出股票。
    
    示例 1:
    
    输入: [7,1,5,3,6,4]
    输出: 5
    解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
         注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
>>>

```ecmascript 6
      var maxProfit = function(prices) {
        let min = prices[0]
        let profit = 0
        for (let i = 1; i < prices.length; i++) {
          if (prices[i] < min) {
            min = prices[i]
          } else {
            profit = Math.max(profit, prices[i] - min)
          }
        }
        return profit
      };
```

[119. 杨辉三角 II](https://leetcode-cn.com/problems/pascals-triangle-ii/)

>>>
    在杨辉三角中，每个数是它左上方和右上方的数的和。
    
    示例:
    
    输入: 3
    输出: [1,3,3,1]
>>>

```ecmascript 6
   var getRow = function(rowIndex) {
     rowIndex++
     if (rowIndex === 1) {
       return [1]
     }
     let result = [1]
     for (let i = 1; i < rowIndex; i++) {
       let arr = [1]
       for (let j = 1; j < i; j++) {
         arr[j] = result[j - 1] + result[j]
       }
       arr.push(1)
       result = arr
     }
     return result
   };
```

[118. 杨辉三角](https://leetcode-cn.com/problems/pascals-triangle/)

>>>
    给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
>>>

```ecmascript 6
      var generate = function(numRows) {
        if (!numRows) {
          return []
        }
        if (numRows === 1) {
          return [[1]]
        }
        let i = 2
        let result = [
          [1],
          [1, 1]
        ]
        while (i < numRows) {
          let arr = [1]
          for (let j = 1; j < result[i - 1].length; j++) {
            arr.push(result[i - 1][j - 1] + result[i - 1][j])
          }
          arr.push(1)
          result.push(arr)
          i++
        }
        return result
      };
```

[112. 路径总和](https://leetcode-cn.com/problems/path-sum/submissions/)

>>>
    给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
    
    说明: 叶子节点是指没有子节点的节点。
    
    示例: 
    给定如下二叉树，以及目标和 sum = 22，
>>>

```ecmascript 6
   var hasPathSum = function(root, sum) {
     if (!root) {
       return false
     }
     let arr = [root]
     while (arr.length) {
       let node = arr.pop()
       if (!node.left && !node.right && node.val === sum) {
         return true
       }
       if (node.left) {
         node.left.val += node.val
         arr.push(node.left)
       }
       if (node.right) {
         node.right.val += node.val
         arr.push(node.right)
       }
     }
     return false
   };
   var hasPathSum = function(root, sum) {
     if (!root) {
       return false
     }
     if (!root.left && !root.right && root.val === sum) {
       return true
     }
     return arguments.callee(root.left, sum - root.val) || arguments.callee(root.right, sum - root.val)
   };
```

[111. 二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/submissions/)

>>>
    给定一个二叉树，找出其最小深度。
    
    最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
    
    说明: 叶子节点是指没有子节点的节点。
    
    示例:
    
    给定二叉树 [3,9,20,null,null,15,7],
>>>

```ecmascript 6
   var minDepth = function(root) {
     if (!root) {
       return 0
     }
     let min = 0
     root.deep = 1
     let arr = [root]
     while (arr.length) {
       let node = arr.pop()
       if (!node.left && !node.right) {
         min = min || node.deep
         min = Math.min(min, node.deep)
       }
       if (node.left) {
         node.left.deep = node.deep + 1
         arr.push(node.left)
       }
       if (node.right) {
         node.right.deep = node.deep + 1
         arr.push(node.right)
       }
     }
     return min
   };
   var minDepth = function(root) {
     if (!root) {
       return 0
     }
     let left = arguments.callee(root.left)
     let right = arguments.callee(root.right)
     return left && right ? Math.min(left, right) + 1 : 1 + left + right
   };
```

[110. 平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/)

>>>
    给定一个二叉树，判断它是否是高度平衡的二叉树。
    
    本题中，一棵高度平衡二叉树定义为：
    
    一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。
    
    示例 1:
    
    给定二叉树 [3,9,20,null,null,15,7]
>>>

```ecmascript 6
   var isBalanced = function(root) {
     if (!root) {
       return true
     }
     return  Math.abs(deep(root.left) - deep(root.right)) < 2 && arguments.callee(root.left) && arguments.callee(root.right)
   };
   function deep (root) {
     if (!root) {
       return 0
     }
     return Math.max(arguments.callee(root.left) + 1, arguments.callee(root.right) + 1)
   }
```

[108. 将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)

>>>
    将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
    
    本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。
>>>

```ecmascript 6
   var sortedArrayToBST = function(nums) {
        return loop(nums, 0, nums.length - 1)
   };
   function loop (nums, start, end) {
     if (start > end) {
       return null
     }
     let mid = Math.trunc(start + (end - start) / 2)
     let root = new TreeNode(nums[mid])
     root.left = arguments.callee(nums, start, mid - 1)
     root.right = arguments.callee(nums, mid + 1, end)
     return root
   }
```

[107. 二叉树的层次遍历 II](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)

>>>
    给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
    
    例如：
    给定二叉树 [3,9,20,null,null,15,7],
>>>

```ecmascript 6
     var levelOrderBottom = function(root) {
       if (!root) {
         return []
       }
       root.deep = 0
       let result = []
       let arr = [root]
       while (arr.length) {
         let node = arr.pop()
         result[node.deep] = result[node.deep] || []
         result[node.deep].push(node.val)
         if (node.right) {
           node.right.deep = node.deep + 1
           arr.push(node.right)
         }
         if (node.left) {
           node.left.deep = node.deep + 1
           arr.push(node.left)
         }
       }
       return result.reverse()
     };
   
     var levelOrderBottom = function(root) {
       if (!root) {
         return []
       }
       root.deep = 0
       let arr = [[root.val]]
       loop(root, arr)
       return arr.reverse()
     };
     function loop (root, arr) {
       if (root.left || root.right) {
         arr[root.deep + 1] = arr[root.deep + 1] || []
       }
       if (root.left) {
         root.left.deep = root.deep + 1
         arr[root.deep + 1].push(root.left.val)
         arguments.callee(root.left, arr)
       }
       if (root.right) {
         root.right.deep = root.deep + 1
         arr[root.deep + 1].push(root.right.val)
         arguments.callee(root.right, arr)
       }
     }
```

[104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

>>>
    给定一个二叉树，找出其最大深度。
    
    二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
    
    说明: 叶子节点是指没有子节点的节点。
    
    示例：
    给定二叉树 [3,9,20,null,null,15,7]，
>>>

```ecmascript 6
      var maxDepth = function(root) {
        if (!root) {
          return 0
        }
        return Math.max(arguments.callee(root.left), arguments.callee(root.right)) + 1
      };
   
      var maxDepth = function(root) {
        if (!root) {
          return 0
        }
        let arr = []
        let deep = 1
        root.deep = 1
        arr.push(root)
        while (arr.length) {
          let node = arr.pop()
          deep = Math.max(node.deep, deep)
          if (node.left) {
            node.left.deep = node.deep + 1
            arr.push(node.left)
          }
          if (node.right) {
            node.right.deep = node.deep + 1
            arr.push(node.right)
          }
        }
        return deep
      };
```

[101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

>>>
    给定一个二叉树，检查它是否是镜像对称的。
    
    例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
>>>

```ecmascript 6
   var isSymmetric = function(root) {
        return mirror(root, root)
   };
   function mirror (left, right) {
     if (!left && !right) {
       return true
     }
     if (left && !right || !left && right) {
       return false
     }
     return left.val === right.val && arguments.callee(left.left, right.right) && arguments.callee(left.right, right.left)
   }
      var isSymmetric = function(root) {
        let arr = []
        arr.push(root)
        arr.push(root)
        while (arr.length) {
          let node1 = arr.pop()
          let node2 = arr.pop()
          if (!node2 && !node1) {
            continue
          }
          if (!node1 && node2 || node1 && !node2) {
            return false
          }
          if (node1.val !== node2.val) {
            return false
          }
          arr.push(node1.left)
          arr.push(node2.right)
          arr.push(node1.right)
          arr.push(node2.left)
        }
        return true
      };
```

[100. 相同的树](https://leetcode-cn.com/problems/same-tree/submissions/)

>>>
    给定两个二叉树，编写一个函数来检验它们是否相同。
    
    如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
>>>

```ecmascript 6
                  var isSameTree = function(p, q) {
                    if (!p && !q) {
                      return true
                    }
                    if (p && q && p.val === q.val) {
                      return arguments.callee(p.left, q.left) && arguments.callee(p.right, q.right)
                    }
                    return false
                  };
```

[14. 最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/solution/)

>>>
    编写一个函数来查找字符串数组中的最长公共前缀。
    
    如果不存在公共前缀，返回空字符串 ""。
    
    示例 1:
    
    输入: ["flower","flow","flight"]
    输出: "fl"
>>>

```ecmascript 6
                var longestCommonPrefix = function(strs) {
                  if (!strs.length) {
                    return ''
                  }
                  let first = strs[0]
                  let i = first.length - 1
                  let j = 1
                  while (i > -1 && j < strs.length) {
                    if (first[i] === strs[j][i] && first.substring(0, i + 1) === strs[j].substring(0, i + 1)) {
                      j++
                    } else {
                      i--
                    }
                  }
                  return first.substring(0, i + 1) || ''
                };
```

[53. 最大子序和](https://leetcode-cn.com/problems/maximum-subarray/submissions/)

>>>
    给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
    
    示例:
    
    输入: [-2,1,-3,4,-1,2,1,-5,4],
    输出: 6
    解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
>>>

```ecmascript 6
              var maxSubArray = function(nums) {
                let sum = nums[0]
                let result = sum
                for (let i = 1; i < nums.length; i++) {
                  sum = Math.max(nums[i], sum + nums[i])
                  result = Math.max(sum, result)
                }
                return result
              };
```

[69. x 的平方根](https://leetcode-cn.com/problems/sqrtx/)

>>>
    实现 int sqrt(int x) 函数。
    
    计算并返回 x 的平方根，其中 x 是非负整数。
    
    由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。
    
    示例 1:
    
    输入: 4
    输出: 2
>>>

[牛顿迭代法传送门](https://www.cnblogs.com/qlky/p/7735145.html)
[相关知识点传送门](https://blog.csdn.net/ccnt_2012/article/details/81837154)
![推导过程](../img/niudun.jpg)

```ecmascript 6
    var mySqrt = function(x) {
      let i = x
      while (i * i > x) {
        i = (i + x / i) / 2
      }
      return Math.trunc(i)
      // return ~~Math.pow(x, .5)
      // return ~~Math.sqrt(x)
      // return ~~x**.5
    };
```

[83. 删除排序链表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

>>>
    给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
    
    示例 1:
    
    输入: 1->1->2
    输出: 1->2
>>>

```ecmascript 6
          var deleteDuplicates = function(head) {
            let cur = head
            while(cur && cur.next) {
              if (cur.val === cur.next.val) {
                cur.next = cur.next.next
              } else {
                cur = cur.next
              }
            }
            return head
          };
```

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
