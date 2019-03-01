# [参考链接](http://www.wechall.net/challs)

## [答案参考链接](http://winkar.github.io/2015/01/24/wechall.html)


1. [参考链接](http://www.wechall.net/challenge/training/get_sourced/index.php)
    * 点击右键查看源码

1. [参考链接](http://www.wechall.net/challenge/training/stegano1/index.php)
    * [图像相关知识参考链接](https://blog.csdn.net/u013378306/article/details/65936192)
    * [隐写术参考链接](https://blog.csdn.net/u011028345/article/details/75311346)
    * 通过图片编辑工具查看ascII值
    * window winhex、nodepad++ hex插件
    * [参考资料](https://blog.csdn.net/binwalker/article/details/77716326)
    * linux自带的
        ```
            hexdump -C file.name
        ```
        
1. [参考链接](http://www.wechall.net/challenge/training/crypto/caesar/index.php)
    * 恺撒加密[参考资料](https://www.cnblogs.com/dmego/p/6007143.html)
        ```ecmascript 6
               let arr = 'QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD LC ZXBPXO XKA VLRO RKFNRB PLIRQFLK FP ZFACKXLLYXXX'.split('')
               for (let i = 0; i < 26; i++) {
                 let result = arr.map(item => {
                   if (item === ' ') {
                     return item
                   }
                   return String.fromCharCode((item.charCodeAt(0) + i - 65) % 26 + 65).toLowerCase()
                 })
                 console.log(result.join(''))
               }
        ```
1. [参考链接](http://www.wechall.net/challenge/training/www/robots/index.php)
    * robots.txt
    
1. [参考链接](http://www.wechall.net/challenge/training/encodings/ascii/index.php)
    ```ecmascript 6
        let arr = [84, 104, 101, 32, 115, 111, 108, 117, 116, 105, 111, 110, 32, 105, 115, 58, 32, 99, 100, 101, 100, 103, 100, 97, 112, 104, 99, 110, 102]
        console.log(arr.map(item => String.fromCharCode(item)).join(''))
    ```

1. [参考链接](http://www.wechall.net/challenge/training/encodings/url/index.php)
    ```ecmascript 6
       decodeURIComponent('%59%69%70%70%65%68%21%20%59%6F%75%72%20%55%52%4C%20%69%73%20%63%68%61%6C%6C%65%6E%67%65%2F%74%72%61%69%6E%69%6E%67%2F%65%6E%63%6F%64%69%6E%67%73%2F%75%72%6C%2F%73%61%77%5F%6C%6F%74%69%6F%6E%2E%70%68%70%3F%70%3D%62%6C%6C%61%65%65%67%69%6E%68%66%68%26%63%69%64%3D%35%32%23%70%61%73%73%77%6F%72%64%3D%66%69%62%72%65%5F%6F%70%74%69%63%73%20%56%65%72%79%20%77%65%6C%6C%20%64%6F%6E%65%21')
    ```
    
1. [参考链接](http://www.wechall.net/challenge/training/programming1/index.php)
    * 先从浏览器获取cookie
    ```ecmascript 6
        const http = require('http')
        const opn = require('opn')
        
        const request = http.request({
            host: 'www.wechall.net',
            path: '/challenge/training/programming1/index.php?action=request',
            headers: {
                cookie: 'WC=11283876-43763-a8UttpPeOJGjwdza',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }, (res) => {
            res.setEncoding('utf8')
            res.on('data', (data) => {
                opn('http://www.wechall.net/challenge/training/programming1/index.php?answer=' + data)
            })
        })
        request.write('')
        request.end()
    ```

1. [参考链接](http://www.wechall.net/challenge/training/regex/index.php)
    * [正则表达式三十分钟入门](https://www.cnblogs.com/sunny3096/p/7201403.html)
    * [js match结果](https://www.jianshu.com/p/f09508c14e65)
    * /^$/
    * /^wechall$/
    * /^(wechall4?)\.(?:jpg|gif|tiff|bmp|png)$/
    >>>
        (?=exp) 'sing'.match(/\w(?=ing)/) 匹配后面是ing的字符，匹配结果：s
        (?<=exp) 'sing'.match(/(?<=sin)\w/) 匹配前面是sin的字符，匹配结果：g
        (?!exp) 'sing'.match(/\w{2}(?!\w)/) 匹配两个字符，但是后面不能有字符，匹配结果：ng
        (?<!exp) 'sing'.match(/(?<!\w)\w{2}/) 匹配两个字符，但是前面不能有字符，匹配结果：si
    >>>
    
1. [参考链接](http://www.wechall.net/challenge/training/encodings1/index.php)
    * [解题思路](https://blog.csdn.net/smoggyxhdz/article/details/79885903)
    * 0-127基本字符, 128-255扩展字符.
    * ASCII 码使用指定的 7 位或 8 位二进制数组合来表示 128 或 256 种可能的字符。标准 ASCII 码使用 7 位二进制数来表示所有的大写和小写字母，数字 0 到 9、标点符号，以及在美式英语中使用的特殊控制字符。目前许多基于 x86 的系统都支持使用扩展（或“高”）ASCII。扩展 ASCII 码允许将每个字符的第 8 位用于确定附加的 128 个特殊符号字符、外来语字母和图形符号。
    * [编码相关的一些发展史](https://blog.csdn.net/dk_0520/article/details/70157426)
    
1. [参考链接](http://www.wechall.net/challenge/training/prime_factory/index.php)
    ```ecmascript 6
       function prime(num) {
         let i = 2
         while (i <= num / 2) {
           if (num % i === 0) {
             return false
           }
           i++
         }
         return true
       }
   
       let start = 1000000
       let result = []
       while (result.length < 2) {
         let sum = eval(start.toString().split('').join('+'))
         if (prime(start) && prime(sum)) {
           result.push(start)
         }
         start++
       }
       console.log(result.join(''))
    ```



