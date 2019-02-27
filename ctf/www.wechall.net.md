# [参考链接](http://www.wechall.net/challs)


1. [参考链接](http://www.wechall.net/challenge/training/get_sourced/index.php)
    * 点击右键查看源码

1. [参考链接](http://www.wechall.net/challenge/training/stegano1/index.php)
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
