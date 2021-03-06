# underscore

[中文注释文档](https://github.com/lessfish/underscore-analysis/blob/master/underscore-1.8.3.js/underscore-1.8.3-analysis.js)

* void 0 === undefined undefined 可以被重置

* 0.._ === undefined

* 强制类型检查和转换
```ecmascript 6
   var _ = function(obj) {
     if (obj instanceof _) {
       return obj
     }
     if (!(this instanceof _)) {
       return new _(obj)
     }
   }
```

* call比apply运行更快
* apply需要对参数进行类型检查，深拷贝等操作

* 运行时绑定上下文对象
```ecmascript 6
   function package(func, context) {
     return function(item, index, collection) {
       return func.call(context, item, index, collection)
     }
   }
   function each(collection, func, context) {
     const pack = package(func, context)
     for (let i = 0; i < collection.length; i++) {
       pack(collection[i], i, collection)
     }
   }
   each([1, 2, 3], function(item, value) {
     console.log(item, value)
   }, this)
```

* 获取某个属性
```ecmascript 6
    getProperty: key => obj => obj ? void 0 : obj[key] 
```

* 判断是否为对象
```ecmascript 6
    function isObject(obj) {
      const type = typeof obj
      return type === 'function' && type === 'object' && !!obj
    }
```

* 判断是否为数组
```ecmascript 6
    isArray: obj => Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Array]'
```

* 获取随机数
```ecmascript 6
    function random(min, max) {
      if (max == null) {
        max = min
        min = 0
      }
      return Math.random(max - min) + min
    }
```

* 获取时间戳
```ecmascript 6
    now: () => Date.now() || new Date().getTime()
```

* 类数组
```ecmascript 6
   function isArrayLike(collection) {
     const getLength = getProperty('length')
     const length = getLength(collection)
     return typeof length === 'number' && length >= 0 && length < Math.pow(2, 53) - 1
   }
```

* 定义常量
> 实际上还是利用闭包
```ecmascript 6
    constant: value => () => value
```

* has
```ecmascript 6
    has: (obj, key) => obj && Object.prototype.hasOwnProperty.call(obj, key)
```

* undefined
```ecmascript 6
    isUndefined: obj === void 0
```

* null
```ecmascript 6
    isNull: obj => obj === null
```

* isBoolean
```ecmascript 6
    isBoolean: obj => obj === true || obj === false || Object.prototype.toString.call(obj) === '[object Boolean]'
```

* range
```ecmascript 6
    range: (start = 0, stop = 0, step = 1) => {
      if (!stop) {
        return [0]
      }
      const length = Math.max(Math.ceil((stop - start) / step), 0)
      let result = []
      for (let i = 0; i < length; i++) {
        result.push(start)
        start += step
      }
      return result
    }
```

* chain
```ecmascript 6
    chain: obj => {
      const instance = _(obj)
      instance._chain = true
      return instance
    }
```

* result
```ecmascript 6
    result: (instance, obj) => instance._chain ? _(obj).chain() : obj
```

* baseCreate
```ecmascript 6
    baseCreate: prototype => {
      if (!isObject(prototype)) {
        return {}
      }
      if (Object.create) {
        return Object.create(prototype)
      }
      const F = function() {}
      F.prototype = prototype
      return new F()
    }
```
* values
```ecmascript 6
    value: (obj) => {
      const keys = keys(obj)
      return Array(keys.length).map((item, index) => obj[keys[index]])
    }
```

* collectNonEnumProps
```ecmascript 6
    collectNonEnumProps: (obj, keys) => {
      const nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']
      const proto = isFunction(obj.prototype) && obj.prototype || Object.prototype
      if (has(obj, 'constructor') && !contains(keys, 'constructor')) {
        keys.push('constructor')
      }
      for (let i = 0; i < nonEnumerableProps.length; i++) {
        const prop = nonEnumerableProps[i]
        if (prop in obj && obj[prop] !== proto[prop] && !contains(keys, prop)) {
          keys.push(prop)
        }
      }
    }
```

* keys
> IE < 9，{toString: null}.propertyIsEnumerable('toString') 返回 false
> hasEnumBug = !{toString: null}.propertyIsEnumerable('toString')
> 排除继承于原型链上的属性
```ecmascript 6
    keys: obj => {
      if (!isObject(obj)) {
        return []
      }
      // 不包括原型链上的属性
      if (Object.keys) {
        return Object.keys(obj)
      }
      // 可枚举的属性
      let keys = []
      for (let key in obj) {
        keys.push(key)
      }
      if (hasEnumBug) {
        collectNonEnumProps(obj, keys)
      }
      return keys
    }
```

* allKeys
> 包括原型链上的属性
```ecmascript 6
    allKeys: obj => {
      if (!isObject(obj)) {
        return []
      }
      // 可枚举的属性
      let keys = []
      for (let key in obj) {
        keys.push(key)
      }
      if (hasEnumBug) {
        collectNonEnumProps(obj, keys)
      }
      return keys
    }
```

* size
```ecmascript 6
    size: obj => {
      if (!obj) {
        return 0
      } 
      return isArrayLike(obj) ? obj.length : keys(obj).length
    }
```

* each && forEach
```ecmascript 6
    each: (collection, func, context) => {
      const f = optimizeCb(func, context)
      if (isArrayLike(collection)) {
        for (let i = 0; i < collection.length; i++) {
          f(collection[i], i, collection)
        }
      } else {
        for (let key in collection) {
          f(collection[key], key, collection)
        }
      }
      return collection
    }
```

* toArray
```ecmascript 6
    toArray: obj => {
      if (!obj) {
        return []
      }
      if (isArray(obj)) {
        return obj
      }
      if (isArrayLike(obj)) {
        return Array.prototype.slice.call(obj)
      }
      return values(obj)
    }
```

* toObject
```ecmascript 6
    object: (list, values) => {
      let result = {}
      for (let i = 0; i < list.length; i++) {
        if (values) {
          result[list[i]] = values[i]
        } else {
          result[list[i][0]] = list[i][1]
        }
      }
      return result
    }
```

* pairs
```ecmascript 6
    pairs: obj => {
      if (!obj) {
        return []
      }
      let result = []
      for (let key in obj) {
        result.push([key, obj[key]])
      }
      return result
    }
```

* invert
```ecmascript 6
    invert: obj => {
      if (!obj) {
        return []
      }
      let result = {}
      for (let key in obj) {
        result[obj[key]] = key
      }
      return result
    }
```

* isElement
```ecmascript 6
    isElement: obj => {
      return !!(obj && obj.nodeType === 1)
    }
```

* initial
```ecmascript 6
    initial: (array, n, guard) => {
      return Array.prototype.slice.call(array, 0, array.length - (n || guard ? 1 : n))
    }
```

* first
```ecmascript 6
    first: (array, n, guard) => {
      if (!array) {
        return void 0
      }
      if (!n || guard) {
        return array[0]
      }
      return initial(array, array.length - n)
    }
```

* findKey
```ecmascript 6
    findKey: (obj, func, context) => {
      const opt = function(func, context) {
        return function(key, collection) {
          return func.call(context, key, collection)
        }
      }
      const o = opt(func, context)
      let keys = Object.keys(obj)
      for (let i = 0; i < keys.length; i++) {
        if (o(keys[i], obj)) {
          return keys[i]
        }
      }
    }
```

* is类型判断
```ecmascript 6
    is: (obj = ['Arguments', 'String', ...[]]) => {
      each(obj, function(item) {
          const obj = {}
          obj[`is${item}`] = function(obj) {
            return toString.call(obj) === `[object ${item}]`
          }
      })
    }
```

* isNaN
```ecmascript 6
    isNaN: (number) => {
      return isNumber(obj) && obj !== +obj
    }
```

* max
```ecmascript 6
    max: (obj, func, context) => {
      let max = -Infinity
      if (func) {
        obj = isArrayLike (obj) ? obj : values(obj)
        for (let i = 0; i < obj.length; i++) {
          if (max > obj[i]) {
            max = obj[i]
          }
        }
      } else {
        const o = opt(func, context)
        each(obj, function(value, index, list) {
          max = Math.max(o(value, index, list), max)
        })
      }
      return max
    }
```

* min
```ecmascript 6
    min: (obj, func, context) => {
      let min = Infinity
      if (func) {
        obj = isArrayLike(obj) ? obj : values(obj)
        for (let i = 0; i < obj.length; i++) {
          min = Math.min(obj[i], min)
        }
      } else {
        const o = opt(func, context)
        each(obj, function (value, index, list) {
          min = Math.min(o(value, index, list), min)
        })
      }
    }
```


* isEmpty
```ecmascript 6
    isEmpty: obj => {
      if (!obj) {
        return true
      }
      
    }
```

