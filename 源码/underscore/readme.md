# underscore

[中文注释文档](https://github.com/lessfish/underscore-analysis/blob/master/underscore-1.8.3.js/underscore-1.8.3-analysis.js)

* void 0 === undefined undefined 可以被重置

* 0.._ === undefined

* 强制类型检查和转换
```ecmascript 6
   var _ = function(obj) {
     if (_ instanceof obj) {
       return obj
     }
     if (!(this instanceof obj)) {
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
   function getProperty (key) {
      return function (obj) {
        return obj ? void 0 : obj[key]
      }
   }
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
    function isArray(obj) {
      return Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Array]'
    }
```

* 创建原型对象
```ecmascript 6
   function create(prototype) {
     
   }
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
    function now() {
      return Date.now() || new Date().getTime()
    }
```
* 类数组
```ecmascript 6
   function isArrayLike(collection) {
     const getLength = getProperty('length')
     const length = getLength(collection)
     return typeof length === 'number' && length >= 0 && length < Math.pow(2, 53) - 1
   }
```
