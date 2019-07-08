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
    
```

* isEmpty
```ecmascript 6
    isEmpty: obj => {
      if (!obj) {
        return true
      }
      
    }
```
