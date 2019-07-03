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
