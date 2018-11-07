# ctf总结

* 点击右键查看网页源代码

### 一些常见的解密练习

```
    let a = '10101001101000110100111100110100' +
    '00011101001100101111100011101000' +
    '10000011010011110011010000001101' +
    '11010110111000101101001111010001' +
    '00000110010111011101100011110111' +
    '11100100110010111001000100000110' +
    '00011110011110001111010011101001' +
    '01011100100000101100111011111110' +
    '10111100100100000111000011000011' +
    '11001111100111110111110111111100' +
    '10110010001000001101001111001101' +
    '00000110010111000011110011111100' +
    '11110011111010011000011110010111' +
    '0100110010111100100101110'
    let arr = []
    for (let i = 0; i < a.length / 7; i++) {
        arr.push(String.fromCharCode('0b' + a.substr(i * 7, 7)))
    }
    console.log(arr.join(''))
    // This text is 7-bit encoded ascii. Your password is easystarter.
```

> 将数值转换为ascii

```
        let str = '84, 104, 101, 32, 115, 111, 108, 117, 116, 105, 111, 110, 32, 105, 115, 58, 32, 114, 97, 112, 108, 104, 101, 103, 115, 112, 108, 114, 101'
        let arr = str.split(', ')
        arr = arr.map(item => String.fromCharCode(item))
        str = arr.join('')
        console.log(str)
        // The solution is: raplhegsplre
```

* encodeURI 编译非uri字符内的特殊字符

* encodeURIComponent 编译所有特殊字符

> 质数各位之和也是质数

```
    function isPrime (num) {
        let max = Math.sqrt(num)
        for (let i = 2; i <= max; i++ ) {
            if (num % i == 0) {
                return false
            }
        }
        return true
    }
    let a = 1000000
    let arr = []
    while (arr.length !== 2) {
        a = a + 1
        if (isPrime(a)) {
            let sum = 0
            a.toString().split('').forEach(item => sum = parseInt(item) + sum)
            if (isPrime(sum)) {
                arr.push(a)
            }
        }
    }
    console.log(arr.join(''))
    // 10000331000037
```

* 十进制转其他进制

> let a = 2; a.toString(2)

* 其他进制转十进制

> parseInt(xxxx, 2)

* 其他进制转ascii

> String.fromCharCode(xxx)

> String.fromCharCode('0x6f')

> String.fromCharCode('0b111111')

* 字符转ascii

> 'xxx'.charCodeAt(index)
