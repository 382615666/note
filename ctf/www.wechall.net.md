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

1. [参考链接](http://www.wechall.net/challenge/training/encodings/url/index.php)
    ```ecmascript 6
       decodeURIComponent('%59%69%70%70%65%68%21%20%59%6F%75%72%20%55%52%4C%20%69%73%20%63%68%61%6C%6C%65%6E%67%65%2F%74%72%61%69%6E%69%6E%67%2F%65%6E%63%6F%64%69%6E%67%73%2F%75%72%6C%2F%73%61%77%5F%6C%6F%74%69%6F%6E%2E%70%68%70%3F%70%3D%62%6C%6C%61%65%65%67%69%6E%68%66%68%26%63%69%64%3D%35%32%23%70%61%73%73%77%6F%72%64%3D%66%69%62%72%65%5F%6F%70%74%69%63%73%20%56%65%72%79%20%77%65%6C%6C%20%64%6F%6E%65%21')
    ```
    
1. [参考链接](http://www.wechall.net/challenge/training/encodings/url/index.php)
