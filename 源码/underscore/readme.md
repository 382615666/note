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

* 运行时绑定上下文对象
```ecmascript 6
   function pack(func, context) {
     return function(item, index, object) {
       return func.call(context, item, index)
     }
   }
   function each(object, func, context) {
     const pa = pack(func, context)
     for (let i = 0; i < object.length; i++) {
       pa(object[i], i, object)
     }
   }
   each([1, 2, 3], function(item, value) {
     console.log(item, value)
   }, this)
```
