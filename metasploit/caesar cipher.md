# caesar cipher

> 字母位置的偏移

```
    let str = 'OCZ LPDXF WMJRI AJS EPHKN JQZM OCZ GVUT YJB JA XVZNVM VIY TJPM PIDLPZ NJGPODJI DN WVDZWGJGJHZZ'
    function start (str) {
        let arr = str.split('')
        let result = []
        for (let i = 1; i < 26; i++) {
            let temp = arr.map((item, index) => {
                if (item === ' ') {
                    return item
                }
                return convert(item, i)
            })
            result.push(temp.join(''))
        }
        return result
    }
    function convert(str, pos) {
        let code = str.charCodeAt()
        code = code + pos
        if (code > 90) {
            code = code - 90 + 64
        }
        return String.fromCharCode(code)
    }
    let result = start(str)
    result.forEach(item => console.log(item))

    // THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG OF CAESAR AND YOUR UNIQUE SOLUTION IS BAIEBLOLOMEE
```