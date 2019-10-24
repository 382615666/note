//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
//     中文注释 by hanzichi @https://github.com/hanzichi
//     我的源码解读顺序（跟系列解读文章相对应）
//     Object -> Array -> Collection -> Function -> Utility

(function() {

  // Baseline setup
  // 基本设置、配置
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  // 将 this 赋值给局部变量 root
  // root 的值, 客户端为 `window`, 服务端(node) 中为 `exports`
  var root = this;

  // Save the previous value of the `_` variable.
  // 将原来全局环境中的变量 `_` 赋值给变量 previousUnderscore 进行缓存
  // 在后面的 noConflict 方法中有用到
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  // 缓存变量, 便于压缩代码
  // 此处「压缩」指的是压缩到 min.js 版本
  // 而不是 gzip 压缩
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  // 缓存变量, 便于压缩代码
  // 同时可减少在原型链中的查找次数(提高代码效率)
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  // ES5 原生方法, 如果浏览器支持, 则 underscore 中会优先使用
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  // 核心函数
  // `_` 其实是一个构造函数
  // 支持无 new 调用的构造函数（思考 jQuery 的无 new 调用）
  // 将传入的参数（实际要操作的数据）赋值给 this._wrapped 属性
  // OOP 调用时，_ 相当于一个构造函数
  // each 等方法都在该构造函数的原型链上
  // _([1, 2, 3]).each(alert)
  // _([1, 2, 3]) 相当于无 new 构造了一个新的对象
  // 调用了该对象的 each 方法，该方法在该对象构造函数的原型链上
  var _ = function(obj) {
    // 以下均针对 OOP 形式的调用
    // 如果是非 OOP 形式的调用，不会进入该函数内部

    // 如果 obj 已经是 `_` 函数的实例，则直接返回 obj
    if (obj instanceof _)
      return obj;

    // 如果不是 `_` 函数的实例
    // 则调用 new 运算符，返回实例化的对象
    if (!(this instanceof _))
      return new _(obj);

    // 将 obj 赋值给 this._wrapped 属性
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  // 将上面定义的 `_` 局部变量赋值给全局对象中的 `_` 属性
  // 即客户端中 window._ = _
  // 服务端(node)中 exports._ = _
  // 同时在服务端向后兼容老的 require() API
  // 这样暴露给全局后便可以在全局环境中使用 `_` 变量(方法)
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  // 当前 underscore 版本号
  _.VERSION = '1.8.3';

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  // 与 ES5 中 Array.prototype.filter 使用方法类似
  // 寻找数组或者对象中所有满足条件的元素
  // 如果是数组，则将 `元素值` 存入数组
  // 如果是对象，则将 `value 值` 存入数组
  // 返回该数组
  // _.filter(list, predicate, [context])
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];

    // 根据 this 指向，返回 predicate 函数（判断函数）
    predicate = cb(predicate, context);

    // 遍历每个元素，如果符合条件则存入数组
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });

    return results;
  };

  // Return all the elements for which a truth test fails.
  // 寻找数组或者对象中所有不满足条件的元素
  // 并以数组方式返回
  // 所得结果是 _.filter 方法的补集

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  // 与 ES5 中的 Array.prototype.every 方法类似
  // 判断数组中的每个元素或者对象中每个 value 值是否都满足 predicate 函数中的判断条件
  // 如果是，则返回 ture；否则返回 false（有一个不满足就返回 false）
  // _.every(list, [predicate], [context])

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  // 与 ES5 中 Array.prototype.some 方法类似
  // 判断数组或者对象中是否有一个元素（value 值 for object）满足 predicate 函数中的条件
  // 如果是则返回 true；否则返回 false
  // _.some(list, [predicate], [context])

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  // 判断数组或者对象中（value 值）是否有指定元素
  // 如果是 object，则忽略 key 值，只需要查找 value 值即可
  // 即该 obj 中是否有指定的 value 值
  // 返回布尔值

  // Invoke a method (with arguments) on every item in a collection.
  // Calls the method named by methodName on each value in the list.
  // Any extra arguments passed to invoke will be forwarded on to the method invocation.
  // 数组或者对象中的每个元素都调用 method 方法
  // 返回调用后的结果（数组或者关联数组）
  // method 参数后的参数会被当做参数传入 method 方法中
  // _.invoke(list, methodName, *arguments)

  // _.pluck(list, propertyName)
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  // groupBy_  _.groupBy(list, iteratee, [context])
  // 根据特定规则对数组或者对象中的元素进行分组
  // result 是返回对象
  // value 是数组元素
  // key 是迭代后的值
  _.groupBy = group(function(result, value, key) {
    // 根据 key 值分组
    // key 是元素经过迭代函数后的值
    // 或者元素自身的属性值

    // result 对象已经有该 key 值了
    if (_.has(result, key))
      result[key].push(value);
    else result[key] = [value];
  });


  // Array Functions
  // 数组的扩展方法
  // 共 20 个扩展方法
  // Note: All array functions will also work on the arguments object.
  // However, Underscore functions are not designed to work on "sparse" arrays.
  // ---------------

  // Internal implementation of a recursive `flatten` function.
  // 递归调用数组，将数组展开
  // 即 [1, 2, [3, 4]] => [1, 2, 3, 4]
  // flatten(array, shallow, false)
  // flatten(arguments, true, true, 1)
  // flatten(arguments, true, true)
  // flatten(arguments, false, false, 1)
  // ===== //
  // input => Array 或者 arguments
  // shallow => 是否只展开一层
  // strict === true，通常和 shallow === true 配合使用
  // 表示只展开一层，但是不保存非数组元素（即无法展开的基础类型）
  // flatten([[1, 2], 3, 4], true, true) => [1, 2]
  // flatten([[1, 2], 3, 4], false, true) = > []
  // startIndex => 从 input 的第几项开始展开
  // ===== //
  // 可以看到，如果 strict 参数为 true，那么 shallow 也为 true
  // 也就是展开一层，同时把非数组过滤
  // [[1, 2], [3, 4], 5, 6] => [1, 2, 3, 4]

  // Flatten out an array, either recursively (by default), or just one level.
  // 将嵌套的数组展开

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  // 数组去重
  // 如果第二个参数 `isSorted` 为 true
  // 则说明事先已经知道数组有序
  // 程序会跑一个更快的算法（一次线性比较，元素和数组前一个元素比较即可）
  // 如果有第三个参数 iteratee，则对数组每个元素迭代
  // 对迭代之后的结果进行去重
  // 返回去重后的数组（array 的子数组）

  // Generator function to create the findIndex and findLastIndex functions
  // => 1
  // ===== //
  // 二分查找
  // 将一个元素插入已排序的数组
  // 返回该插入的位置下标
  // Function (ahem) Functions
  // 函数的扩展方法
  // 共 14 个扩展方法
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    // 非 new 调用 _.bind 返回的方法（即 bound）
    // callingContext 不是 boundFunc 的一个实例
    if (!(callingContext instanceof boundFunc))
      return sourceFunc.apply(context, args);

    // 如果是用 new 调用 _.bind 返回的方法

    // self 为 sourceFunc 的实例，继承了它的原型链
    // self 理论上是一个空对象（还没赋值），但是有原型链
    var self = baseCreate(sourceFunc.prototype);

    // 用 new 生成一个构造函数的实例
    // 正常情况下是没有返回值的，即 result 值为 undefined
    // 如果构造函数有返回值
    // 如果返回值是对象（非 null），则 new 的结果返回这个对象
    // 否则返回实例
    // @see http://www.cnblogs.com/zichi/p/4392944.html
    var result = sourceFunc.apply(self, args);

    // 如果构造函数返回了对象
    // 则 new 的结果是这个对象
    // 返回这个对象
    if (_.isObject(result)) return result;

    // 否则返回 self
    // var result = sourceFunc.apply(self, args);
    // self 对象当做参数传入
    // 会直接改变值
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  // ES5 bind 方法的扩展（polyfill）
  // 将 func 中的 this 指向 context（对象）
  // _.bind(function, object, *arguments)
  // 可选的 arguments 参数会被当作 func 的参数传入
  // func 在调用时，会优先用 arguments 参数，然后使用 _.bind 返回方法所传入的参数
  _.bind = function(func, context) {
    // 如果浏览器支持 ES5 bind 方法，并且 func 上的 bind 方法没有被重写
    // 则优先使用原生的 bind 方法
    if (nativeBind && func.bind === nativeBind)
      return nativeBind.apply(func, slice.call(arguments, 1));

    // 如果传入的参数 func 不是方法，则抛出错误
    if (!_.isFunction(func))
      throw new TypeError('Bind must be called on a function');

    // polyfill
    // 经典闭包，函数返回函数
    // args 获取优先使用的参数
    var args = slice.call(arguments, 2);
    var bound = function() {
      // args.concat(slice.call(arguments))
      // 最终函数的实际调用参数由两部分组成
      // 一部分是传入 _.bind 的参数（会被优先调用）
      // 另一部分是传入 bound（_.bind 所返回方法）的参数
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };

    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  // _.partial(function, *arguments)
  // _.partial 能返回一个方法
  // pre-fill 该方法的一些参数
  _.partial = function(func) {
    // 提取希望 pre-fill 的参数
    // 如果传入的是 _，则这个位置的参数暂时空着，等待手动填入
    var boundArgs = slice.call(arguments, 1);

    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        // 如果该位置的参数为 _，则用 bound 方法的参数填充这个位置
        // args 为调用 _.partial 方法的 pre-fill 的参数 & bound 方法的 arguments
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }

      // bound 方法还有剩余的 arguments，添上去
      while (position < arguments.length)
        args.push(arguments[position++]);

      return executeBound(func, bound, this, this, args);
    };

    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  // 指定一系列方法（methodNames）中的 this 指向（object）
  // _.bindAll(object, *methodNames)
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;

    // 如果只传入了一个参数（obj），没有传入 methodNames，则报错
    if (length <= 1)
      throw new Error('bindAll must be passed function names');

    // 遍历 methodNames
    for (i = 1; i < length; i++) {
      key = arguments[i];
      // 逐个绑定
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  //「记忆化」，存储中间运算结果，提高效率
  // 参数 hasher 是个 function，用来计算 key
  // 如果传入了 hasher，则用 hasher 来计算 key
  // 否则用 key 参数直接当 key（即 memoize 方法传入的第一个参数）
  // _.memoize(function, [hashFunction])
  // 适用于需要大量重复求值的场景
  // 比如递归求解菲波那切数
  // @http://www.jameskrob.com/memoize.html
  // create hash for storing "expensive" function outputs
  // run expensive function
  // check whether function has already been run with given arguments via hash lookup
  // if false - run function, and store output in hash
  // if true, return output stored in hash
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      // 储存变量，方便使用
      var cache = memoize.cache;

      // 求 key
      // 如果传入了 hasher，则用 hasher 函数来计算 key
      // 否则用 参数 key（即 memoize 方法传入的第一个参数）当 key
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);

      // 如果这个 key 还没被 hash 过（还没求过值）
      if (!_.has(cache, address))
        cache[address] = func.apply(this, arguments);

      // 返回
      return cache[address];
    };

    // cache 对象被当做 key-value 键值对缓存中间运算结果
    memoize.cache = {};

    // 返回一个函数（经典闭包）
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  // 延迟触发某方法
  // _.delay(function, wait, *arguments)
  //  如果传入了 arguments 参数，则会被当作 func 的参数在触发时调用
  // 其实是封装了「延迟触发某方法」，使其复用
  _.delay = function(func, wait) {
    // 获取 *arguments
    // 是 func 函数所需要的参数
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      // 将参数赋予 func 函数
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  // 和 setTimeout(func, 0) 相似（源码看来似乎应该是 setTimeout(func, 1)）
  // _.defer(function, *arguments)
  // 如果传入 *arguments，会被当做参数，和 _.delay 调用方式类似（少了第二个参数）
  // 其实核心还是调用了 _.delay 方法，但第二个参数（wait 参数）设置了默认值为 1
  // 如何使得方法能设置默认值？用 _.partial 方法
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  // 函数节流（如果有连续事件响应，则每间隔一定时间段触发）
  // 每间隔 wait(Number) milliseconds 触发一次 func 方法
  // 如果 options 参数传入 {leading: false}
  // 那么不会马上触发（等待 wait milliseconds 后第一次触发 func）
  // 如果 options 参数传入 {trailing: false}
  // 那么最后一次回调不会被触发
  // **Notice: options 不能同时设置 leading 和 trailing 为 false**
  // 示例：
  // var throttled = _.throttle(updatePosition, 100);
  // $(window).scroll(throttled);
  // 调用方式（注意看 A 和 B console.log 打印的位置）：
  // _.throttle(function, wait, [options])
  // sample 1: _.throttle(function(){}, 1000)
  // print: A, B, B, B ...
  // sample 2: _.throttle(function(){}, 1000, {leading: false})
  // print: B, B, B, B ...
  // sample 3: _.throttle(function(){}, 1000, {trailing: false})
  // print: A, A, A, A ...
  // ----------------------------------------- //
  _.throttle = function(func, wait, options) {
    var context, args, result;

    // setTimeout 的 handler
    var timeout = null;

    // 标记时间戳
    // 上一次执行回调的时间戳
    var previous = 0;

    // 如果没有传入 options 参数
    // 则将 options 参数置为空对象
    if (!options)
      options = {};

    var later = function() {
      // 如果 options.leading === false
      // 则每次触发回调后将 previous 置为 0
      // 否则置为当前时间戳
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      // console.log('B')
      result = func.apply(context, args);

      // 这里的 timeout 变量一定是 null 了吧
      // 是否没有必要进行判断？
      if (!timeout)
        context = args = null;
    };

    // 以滚轮事件为例（scroll）
    // 每次触发滚轮事件即执行这个返回的方法
    // _.throttle 方法返回的函数
    return function() {
      // 记录当前时间戳
      var now = _.now();

      // 第一次执行回调（此时 previous 为 0，之后 previous 值为上一次时间戳）
      // 并且如果程序设定第一个回调不是立即执行的（options.leading === false）
      // 则将 previous 值（表示上次执行的时间戳）设为 now 的时间戳（第一次触发时）
      // 表示刚执行过，这次就不用执行了
      if (!previous && options.leading === false)
        previous = now;

      // 距离下次触发 func 还需要等待的时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;

      // 要么是到了间隔时间了，随即触发方法（remaining <= 0）
      // 要么是没有传入 {leading: false}，且第一次触发回调，即立即触发
      // 此时 previous 为 0，wait - (now - previous) 也满足 <= 0
      // 之后便会把 previous 值迅速置为 now
      // ========= //
      // remaining > wait，表示客户端系统时间被调整过
      // 则马上执行 func 函数
      // @see https://blog.coding.net/blog/the-difference-between-throttle-and-debounce-in-underscorejs
      // ========= //

      // console.log(remaining) 可以打印出来看看
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          // 解除引用，防止内存泄露
          timeout = null;
        }

        // 重置前一次触发的时间戳
        previous = now;

        // 触发方法
        // result 为该方法返回值
        // console.log('A')
        result = func.apply(context, args);

        // 引用置为空，防止内存泄露
        // 感觉这里的 timeout 肯定是 null 啊？这个 if 判断没必要吧？
        if (!timeout)
          context = args = null;
      } else if (!timeout && options.trailing !== false) { // 最后一次需要触发的情况
        // 如果已经存在一个定时器，则不会进入该 if 分支
        // 如果 {trailing: false}，即最后一次不需要触发了，也不会进入这个分支
        // 间隔 remaining milliseconds 后触发 later 方法
        timeout = setTimeout(later, remaining);
      }

      // 回调返回值
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  // 函数去抖（连续事件触发结束后只触发一次）
  // sample 1: _.debounce(function(){}, 1000)
  // 连续事件结束后的 1000ms 后触发
  // sample 1: _.debounce(function(){}, 1000, true)
  // 连续事件触发后立即触发（此时会忽略第二个参数）
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      // 定时器设置的回调 later 方法的触发时间，和连续事件触发的最后一次时间戳的间隔
      // 如果间隔为 wait（或者刚好大于 wait），则触发事件
      var last = _.now() - timestamp;

      // 时间间隔 last 在 [0, wait) 中
      // 还没到触发的点，则继续设置定时器
      // last 值应该不会小于 0 吧？
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        // 到了可以触发的时间点
        timeout = null;
        // 可以触发了
        // 并且不是设置为立即触发的
        // 因为如果是立即触发（callNow），也会进入这个回调中
        // 主要是为了将 timeout 值置为空，使之不影响下次连续事件的触发
        // 如果不是立即执行，随即执行 func 方法
        if (!immediate) {
          // 执行 func 函数
          result = func.apply(context, args);
          // 这里的 timeout 一定是 null 了吧
          // 感觉这个判断多余了
          if (!timeout)
            context = args = null;
        }
      }
    };

    // 嗯，闭包返回的函数，是可以传入参数的
    // 也是 DOM 事件所触发的回调函数
    return function() {
      // 可以指定 this 指向
      context = this;
      args = arguments;

      // 每次触发函数，更新时间戳
      // later 方法中取 last 值时用到该变量
      // 判断距离上次触发事件是否已经过了 wait seconds 了
      // 即我们需要距离最后一次事件触发 wait seconds 后触发这个回调方法
      timestamp = _.now();

      // 立即触发需要满足两个条件
      // immediate 参数为 true，并且 timeout 还没设置
      // immediate 参数为 true 是显而易见的
      // 如果去掉 !timeout 的条件，就会一直触发，而不是触发一次
      // 因为第一次触发后已经设置了 timeout，所以根据 timeout 是否为空可以判断是否是首次触发
      var callNow = immediate && !timeout;

      // 设置 wait seconds 后触发 later 方法
      // 无论是否 callNow（如果是 callNow，也进入 later 方法，去 later 方法中判断是否执行相应回调函数）
      // 在某一段的连续触发中，只会在第一次触发时进入这个 if 分支中
      if (!timeout)
      // 设置了 timeout，所以以后不会进入这个 if 分支了
        timeout = setTimeout(later, wait);

      // 如果是立即触发
      if (callNow) {
        // func 可能是有返回值的
        result = func.apply(context, args);
        // 解除引用
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  // 返回一个 predicate 方法的对立方法
  // 即该方法可以对原来的 predicate 迭代结果值取补集
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  // _.compose(*functions)
  // var tmp = _.compose(f, g, h)
  // tmp(args) => f(g(h(args)))
  _.compose = function() {
    var args = arguments; // funcs
    var start = args.length - 1; // 倒序调用
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      // 一个一个方法地执行
      while (i--)
        result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  // 第 times 触发执行 func（事实上之后的每次触发还是会执行 func）
  // 有什么用呢？
  // 如果有 N 个异步事件，所有异步执行完后执行该回调，即 func 方法（联想 eventproxy）
  // _.after 会返回一个函数
  // 当这个函数第 times 被执行的时候
  // 触发 func 方法
  _.after = function(times, func) {
    return function() {
      // 函数被触发了 times 了，则执行 func 函数
      // 事实上 times 次后如果函数继续被执行，也会触发 func
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  // 函数至多被调用 times - 1 次（(but not including) the Nth call）
  // func 函数会触发 time - 1 次（Creates a version of the function that can be called no more than count times）
  // func 函数有个返回值，前 time - 1 次触发的返回值都是将参数代入重新计算的
  // 第 times 开始的返回值为第 times - 1 次时的返回值（不重新计算）
  // The result of the last function call is memoized and returned when count has been reached.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        // 缓存函数执行结果
        memo = func.apply(this, arguments);
      }

      // func 引用置为空，其实不置为空也用不到 func 了
      if (times <= 1)
        func = null;

      // 前 times - 1 次触发，memo 都是分别计算返回
      // 第 times 次开始，memo 值同 times - 1 次时的 memo
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  // 函数至多只能被调用一次
  // 适用于这样的场景，某些函数只能被初始化一次，不得不设置一个变量 flag
  // 初始化后设置 flag 为 true，之后不断 check flag
  // ====== //
  // 其实是调用了 _.before 方法，并且将 times 参数设置为了默认值 2（也就是 func 至多能被调用 2 - 1 = 1 次）
  _.once = _.partial(_.before, 2);


  // Object Functions
  // 对象的扩展方法
  // 共 38 个扩展方法
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  // IE < 9 下 不能用 for key in ... 来枚举对象的某些 key
  // 比如重写了对象的 `toString` 方法，这个 key 值就不能在 IE < 9 下用 for in 枚举到
  // IE < 9，{toString: null}.propertyIsEnumerable('toString') 返回 false
  // IE < 9，重写的 `toString` 属性被认为不可枚举
  // 据此可以判断是否在 IE < 9 浏览器环境中
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');

  // IE < 9 下不能用 for in 来枚举的 key 值集合
  // 其实还有个 `constructor` 属性
  // 个人觉得可能是 `constructor` 和其他属性不属于一类
  // nonEnumerableProps[] 中都是方法
  // 而 constructor 表示的是对象的构造函数
  // 所以区分开来了
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];


  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  // 跟 _.map 方法很像
  // 但是是专门为对象服务的 map 方法
  // 迭代函数改变对象的 values 值
  // 返回对象副本
  _.mapObject = function(obj, iteratee, context) {
    // 迭代函数
    // 对每个键值对进行迭代
    iteratee = cb(iteratee, context);

    var keys =  _.keys(obj),
      length = keys.length,
      results = {}, // 对象副本，该方法返回的对象
      currentKey;

    for (var index = 0; index < length; index++) {
      currentKey = keys[index];
      // key 值不变
      // 对每个 value 值用迭代函数迭代
      // 返回经过函数运算后的值
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };



  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  // 传入一个对象
  // 遍历该对象的键值对（包括 own properties 以及 原型链上的）
  // 如果某个 value 的类型是方法（function），则将该 key 存入数组
  // 将该数组排序后返回
  _.functions = _.methods = function(obj) {
    // 返回的数组
    var names = [];

    // if IE < 9
    // 且对象重写了 `nonEnumerableProps` 数组中的某些方法
    // 那么这些方法名是不会被返回的
    // 可见放弃了 IE < 9 可能对 `toString` 等方法的重写支持
    for (var key in obj) {
      // 如果某个 key 对应的 value 值类型是函数
      // 则将这个 key 值存入数组
      if (_.isFunction(obj[key])) names.push(key);
    }

    // 返回排序后的数组
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  // extend_.extend(destination, *sources)
  // Copy all of the properties in the source objects over to the destination object
  // and return the destination object
  // It's in-order, so the last source will override properties of the same name in previous arguments.
  // 将几个对象上（第二个参数开始，根据参数而定）的所有键值对添加到 destination 对象（第一个参数）上
  // 因为 key 值可能会相同，所以后面的（键值对）可能会覆盖前面的
  // 参数个数 >= 1
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  // 跟 extend 方法类似，但是只把 own properties 拷贝给第一个参数对象
  // 只继承 own properties 的键值对
  // 参数个数 >= 1
  _.extendOwn = _.assign = createAssigner(_.keys);


  // Return a copy of the object only containing the whitelisted properties.
  // 根据一定的需求（key 值，或者通过 predicate 函数返回真假）
  // 返回拥有一定键值对的对象副本
  // 第二个参数可以是一个 predicate 函数
  // 也可以是 >= 0 个 key
  // _.pick(object, *keys)
  // Return a copy of the object
  // filtered to only have values for the whitelisted keys (or array of valid keys)
  // Alternatively accepts a predicate indicating which keys to pick.
  /*
  _.pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age');
  => {name: 'moe', age: 50}
  _.pick({name: 'moe', age: 50, userid: 'moe1'}, ['name', 'age']);
  => {name: 'moe', age: 50}
  _.pick({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
    return _.isNumber(value);
  });
  => {age: 50}
  */
  _.pick = function(object, oiteratee, context) {
    // result 为返回的对象副本
    var result = {}, obj = object, iteratee, keys;

    // 容错
    if (obj == null) return result;

    // 如果第二个参数是函数
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      // 如果第二个参数不是函数
      // 则后面的 keys 可能是数组
      // 也可能是连续的几个并列的参数
      // 用 flatten 将它们展开
      keys = flatten(arguments, false, false, 1);

      // 也转为 predicate 函数判断形式
      // 将指定 key 转化为 predicate 函数
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }

    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      // 满足条件
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

  // Return a copy of the object without the blacklisted properties.
  // 跟 _.pick 方法相对
  // 返回 _.pick 的补集
  // 即返回没有指定 keys 值的对象副本
  // 或者返回不能通过 predicate 函数的对象副本
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      // _.negate 方法对 iteratee 的结果取反
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // _.defaults(object, *defaults)
  // Fill in a given object with default properties.
  // Fill in undefined properties in object
  // with the first value present in the following list of defaults objects.
  // 和 _.extend 非常类似
  // 区别是如果 *defaults 中出现了和 object 中一样的键
  // 则不覆盖 object 的键值对
  // 如果 *defaults 多个参数对象中有相同 key 的对象
  // 则取最早出现的 value 值
  // 参数个数 >= 1
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  // 给定 prototype
  // 以及一些 own properties
  // 构造一个新的对象并返回
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);

    // 将 props 的键值对覆盖 result 对象
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  // 对象的 `浅复制` 副本
  // 注意点：所有嵌套的对象或者数组都会跟原对象用同一个引用
  // 所以是为浅复制，而不是深度克隆
  _.clone = function(obj) {
    // 容错，如果不是对象或者数组类型，则可以直接返回
    // 因为一些基础类型是直接按值传递的
    // 思考，arguments 呢？ Nodelists 呢？ HTML Collections 呢？
    if (!_.isObject(obj))
      return obj;

    // 如果是数组，则用 obj.slice() 返回数组副本
    // 如果是对象，则提取所有 obj 的键值对覆盖空对象，返回
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  // _.chain([1,2,3,200])
  // .filter(function(num) { return num % 2 == 0; })
  // .tap(alert)
  // .map(function(num) { return num * num })
  // .value();
  // => // [2, 200] (alerted)
  // => [4, 40000]
  // 主要是用在链式调用中
  // 对中间值立即进行处理
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  // attrs 参数为一个对象
  // 判断 object 对象中是否有 attrs 中的所有 key-value 键值对
  // 返回布尔值
  _.isMatch = function(object, attrs) {
    // 提取 attrs 对象的所有 keys
    var keys = _.keys(attrs), length = keys.length;

    // 如果 object 为空
    // 根据 attrs 的键值对数量返回布尔值
    if (object == null) return !length;

    // 这一步有必要？
    var obj = Object(object);

    // 遍历 attrs 对象键值对
    for (var i = 0; i < length; i++) {
      var key = keys[i];

      // 如果 obj 对象没有 attrs 对象的某个 key
      // 或者对于某个 key，它们的 value 值不同
      // 则证明 object 并不拥有 attrs 的所有键值对
      // 则返回 false
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }

    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  // "内部的"/ "递归地"/ "比较"
  // 该内部方法会被递归调用
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    // a === b 时
    // 需要注意 `0 === -0` 这个 special case
    // 0 和 -0 被认为不相同（unequal）
    // 至于原因可以参考上面的链接
    if (a === b) return a !== 0 || 1 / a === 1 / b;

    // A strict comparison is necessary because `null == undefined`.
    // 如果 a 和 b 有一个为 null（或者 undefined）
    // 判断 a === b
    if (a == null || b == null) return a === b;

    // Unwrap any wrapped objects.
    // 如果 a 和 b 是 underscore OOP 的对象
    // 那么比较 _wrapped 属性值（Unwrap）
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;

    // Compare `[[Class]]` names.
    // 用 Object.prototype.toString.call 方法获取 a 变量类型
    var className = toString.call(a);

    // 如果 a 和 b 类型不相同，则返回 false
    // 类型都不同了还比较个蛋！
    if (className !== toString.call(b)) return false;

    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      // 以上五种类型的元素可以直接根据其 value 值来比较是否相等
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        // 转为 String 类型进行比较
        return '' + a === '' + b;

      // RegExp 和 String 可以看做一类
      // 如果 obj 为 RegExp 或者 String 类型
      // 那么 '' + obj 会将 obj 强制转为 String
      // 根据 '' + a === '' + b 即可判断 a 和 b 是否相等
      // ================

      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        // 如果 +a !== +a
        // 那么 a 就是 NaN
        // 判断 b 是否也是 NaN 即可
        if (+a !== +a) return +b !== +b;

        // An `egal` comparison is performed for other numeric values.
        // 排除了 NaN 干扰
        // 还要考虑 0 的干扰
        // 用 +a 将 Number() 形式转为基本类型
        // 即 +Number(1) ==> 1
        // 0 需要特判
        // 如果 a 为 0，判断 1 / +a === 1 / b
        // 否则判断 +a === +b
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;

      // 如果 a 为 Number 类型
      // 要注意 NaN 这个 special number
      // NaN 和 NaN 被认为 equal
      // ================

      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;

      // Date 和 Boolean 可以看做一类
      // 如果 obj 为 Date 或者 Boolean
      // 那么 +obj 会将 obj 转为 Number 类型
      // 然后比较即可
      // +new Date() 是当前时间距离 1970 年 1 月 1 日 0 点的毫秒数
      // +true => 1
      // +new Boolean(false) => 0
    }


    // 判断 a 是否是数组
    var areArrays = className === '[object Array]';

    // 如果 a 不是数组类型
    if (!areArrays) {
      // 如果 a 不是 object 或者 b 不是 object
      // 则返回 false
      if (typeof a != 'object' || typeof b != 'object') return false;

      // 通过上个步骤的 if 过滤
      // !!保证到此的 a 和 b 均为对象!!

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      // 通过构造函数来判断 a 和 b 是否相同
      // 但是，如果 a 和 b 的构造函数不同
      // 也并不一定 a 和 b 就是 unequal
      // 比如 a 和 b 在不同的 iframes 中！
      // aCtor instanceof aCtor 这步有点不大理解，啥用？
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
        && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }

    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    // 第一次调用 eq() 函数，没有传入 aStack 和 bStack 参数
    // 之后递归调用都会传入这两个参数
    aStack = aStack || [];
    bStack = bStack || [];

    var length = aStack.length;

    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    // 将嵌套的对象和数组展开
    // 如果 a 是数组
    // 因为嵌套，所以需要展开深度比较
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      // 根据 length 判断是否应该继续递归对比
      length = a.length;

      // 如果 a 和 b length 属性大小不同
      // 那么显然 a 和 b 不同
      // return false 不用继续比较了
      if (length !== b.length) return false;

      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        // 递归
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // 如果 a 不是数组
      // 进入这个判断分支

      // Deep compare objects.
      // 两个对象的深度比较
      var keys = _.keys(a), key;
      length = keys.length;

      // Ensure that both objects contain the same number of properties before comparing deep equality.
      // a 和 b 对象的键数量不同
      // 那还比较毛？
      if (_.keys(b).length !== length) return false;

      while (length--) {
        // Deep compare each member
        // 递归比较
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }

    // Remove the first object from the stack of traversed objects.
    // 与 aStack.push(a) 对应
    // 此时 aStack 栈顶元素正是 a
    // 而代码走到此步
    // a 和 b isEqual 确认
    // 所以 a，b 两个元素可以出栈
    aStack.pop();
    bStack.pop();

    // 深度搜索递归比较完毕
    // 放心地 return true
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  // 判断两个对象是否一样
  // new Boolean(true)，true 被认为 equal
  // [1, 2, 3], [1, 2, 3] 被认为 equal
  // 0 和 -0 被认为 unequal
  // NaN 和 NaN 被认为 equal
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  // 是否是 {}、[] 或者 "" 或者 null、undefined
  _.isEmpty = function(obj) {
    if (obj == null) return true;

    // 如果是数组、类数组、或者字符串
    // 根据 length 属性判断是否为空
    // 后面的条件是为了过滤 isArrayLike 对于 {length: 10} 这样对象的判断 bug？
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;

    // 如果是对象
    // 根据 keys 数量判断是否为 Empty
    return _.keys(obj).length === 0;
  };

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  // _.isArguments 方法在 IE < 9 下的兼容
  // IE < 9 下对 arguments 调用 Object.prototype.toString.call 方法
  // 结果是 => [object Object]
  // 而并非我们期望的 [object Arguments]。
  // so 用是否含有 callee 属性来做兼容
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  // _.isFunction 在 old v8, IE 11 和 Safari 8 下的兼容
  // 觉得这里有点问题
  // 我用的 chrome 49 (显然不是 old v8)
  // 却也进入了这个 if 判断内部
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  // 判断是否是有限的数字
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Utility Functions
  // 工具类方法
  // 共 14 个扩展方法
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  // 如果全局环境中已经使用了 `_` 变量
  // 可以用该方法返回其他变量
  // 继续使用 underscore 中的方法
  // var underscore = _.noConflict();
  // underscore.each(..);
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  // 判断一个给定的对象是否有某些键值对
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  // 执行某函数 n 次
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++)
      accum[i] = iteratee(i);
    return accum;
  };


  // List of HTML entities for escaping.
  // HTML 实体编码
  // escapeMap 用于编码
  // see @http://www.cnblogs.com/zichi/p/5135636.html
  // in PHP, htmlspecialchars — Convert special characters to HTML entities
  // see @http://php.net/manual/zh/function.htmlspecialchars.php
  // 能将 & " ' < > 转为实体编码（下面的前 5 种）
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    // 以上四个为最常用的字符实体
    // 也是仅有的可以在所有环境下使用的实体字符（其他应该用「实体数字」，如下）
    // 浏览器也许并不支持所有实体名称（对实体数字的支持却很好）
    "'": '&#x27;',
    '`': '&#x60;'
  };

  // _.invert 方法将一个对象的键值对对调
  // unescapeMap 用于解码
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };

    // Regexes for identifying a key that needs to be escaped
    // 正则替换
    // 注意下 ?:
    var source = '(?:' + _.keys(map).join('|') + ')';

    // 正则 pattern
    var testRegexp = RegExp(source);

    // 全局替换
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };

  // Escapes a string for insertion into HTML, replacing &, <, >, ", `, and ' characters.
  // 编码，防止被 XSS 攻击等一些安全隐患
  _.escape = createEscaper(escapeMap);

  // The opposite of escape
  // replaces &amp;, &lt;, &gt;, &quot;, &#96; and &#x27; with their unescaped counterparts
  // 解码
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  // 生成客户端临时的 DOM ids
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  // ERB => Embedded Ruby
  // Underscore 默认采用 ERB-style 风格模板，也可以根据自己习惯自定义模板
  // 1. <%  %> - to execute some code
  // 2. <%= %> - to print some value in template
  // 3. <%- %> - to print some values HTML escaped
  _.templateSettings = {
    // 三种渲染模板
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',  // 回车符
    '\n':     'n',  // 换行符
    // http://stackoverflow.com/questions/16686687/json-stringify-and-u2028-u2029-check
    '\u2028': 'u2028', // Line separator
    '\u2029': 'u2029'  // Paragraph separator
  };

  // RegExp pattern
  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    /**
     '      => \\'
     \\     => \\\\
     \r     => \\r
     \n     => \\n
     \u2028 => \\u2028
     \u2029 => \\u2029
     **/
    return '\\' + escapes[match];
  };

  // 将 JavaScript 模板编译为可以用于页面呈现的函数
  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  // oldSettings 参数为了兼容 underscore 旧版本
  // setting 参数可以用来自定义字符串模板（但是 key 要和 _.templateSettings 中的相同，才能 overridden）
  // 1. <%  %> - to execute some code
  // 2. <%= %> - to print some value in template
  // 3. <%- %> - to print some values HTML escaped
  // Compiles JavaScript templates into functions
  // _.template(templateString, [settings])
  _.template = function(text, settings, oldSettings) {
    // 兼容旧版本
    if (!settings && oldSettings)
      settings = oldSettings;

    // 相同的 key，优先选择 settings 对象中的
    // 其次选择 _.templateSettings 对象中的
    // 生成最终用来做模板渲染的字符串
    // 自定义模板优先于默认模板 _.templateSettings
    // 如果定义了相同的 key，则前者会覆盖后者
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    // 正则表达式 pattern，用于正则匹配 text 字符串中的模板字符串
    // /<%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g
    // 注意最后还有个 |$
    var matcher = RegExp([
      // 注意下 pattern 的 source 属性
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    // 编译模板字符串，将原始的模板字符串替换成函数字符串
    // 用拼接成的函数字符串生成函数（new Function(...)）
    var index = 0;

    // source 变量拼接的字符串用来生成函数
    // 用于当做 new Function 生成函数时的函数字符串变量
    // 记录编译成的函数字符串，可通过 _.template(tpl).source 获取（_.template(tpl) 返回方法）
    var source = "__p+='";

    // replace 函数不需要为返回值赋值，主要是为了在函数内对 source 变量赋值
    // 将 text 变量中的模板提取出来
    // match 为匹配的整个串
    // escape/interpolate/evaluate 为匹配的子表达式（如果没有匹配成功则为 undefined）
    // offset 为字符匹配（match）的起始位置（偏移量）
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      // \n => \\n
      source += text.slice(index, offset).replace(escaper, escapeChar);

      // 改变 index 值，为了下次的 slice
      index = offset + match.length;

      if (escape) {
        // 需要对变量进行编码（=> HTML 实体编码）
        // 避免 XSS 攻击
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        // 单纯的插入变量
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        // 可以直接执行的 JavaScript 语句
        // 注意 "__p+="，__p 为渲染返回的字符串
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      // return 的作用是？
      // 将匹配到的内容原样返回（Adobe VMs 需要返回 match 来使得 offset 值正常）
      return match;
    });

    source += "';\n";

    // By default, `template` places the values from your data in the local scope via the `with` statement.
    // However, you can specify a single variable name with the variable setting.
    // This can significantly improve the speed at which a template is able to render.
    // If a variable is not specified, place data values in local scope.
    // 指定 scope
    // 如果设置了 settings.variable，能显著提升模板的渲染速度
    // 否则，默认用 with 语句指定作用域
    if (!settings.variable)
      source = 'with(obj||{}){\n' + source + '}\n';

    // 增加 print 功能
    // __p 为返回的字符串
    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      // render 方法，前两个参数为 render 方法的参数
      // obj 为传入的 JSON 对象，传入 _ 参数使得函数内部能用 Underscore 的函数
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      // 抛出错误
      e.source = source;
      throw e;
    }

    // 返回的函数
    // data 一般是 JSON 数据，用来渲染模板
    var template = function(data) {
      // render 为模板渲染函数
      // 传入参数 _ ，使得模板里 <%  %> 里的代码能用 underscore 的方法
      //（<%  %> - to execute some code）
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    // template.source for debug?
    // obj 与 with(obj||{}) 中的 obj 对应
    var argument = settings.variable || 'obj';

    // 可通过 _.template(tpl).source 获取
    // 可以用来预编译，在服务端预编译好，直接在客户端生成代码，客户端直接调用方法
    // 这样如果出错就能打印出错行
    // Precompiling your templates can be a big help when debugging errors you can't reproduce.
    // This is because precompiled templates can provide line numbers and a stack trace,
    // something that is not possible when compiling templates on the client.
    // The source property is available on the compiled template function for easy precompilation.
    // see @http://stackoverflow.com/questions/18755292/underscore-js-precompiled-templates-using
    // see @http://stackoverflow.com/questions/13536262/what-is-javascript-template-precompiling
    // see @http://stackoverflow.com/questions/40126223/can-anyone-explain-underscores-precompilation-in-template
    // JST is a server-side thing, not client-side.
    // This mean that you compile Unserscore template on server side by some server-side script and save the result in a file.
    // Then use this file as compiled Unserscore template.
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add your own custom functions to the Underscore object.
  // 可向 underscore 函数库扩展自己的方法
  // obj 参数必须是一个对象（JavaScript 中一切皆对象）
  // 且自己的方法定义在 obj 的属性上
  // 如 obj.myFunc = function() {...}
  // 形如 {myFunc: function(){}}
  // 之后便可使用如下: _.myFunc(..) 或者 OOP _(..).myFunc(..)
  _.mixin = function(obj) {
    // 遍历 obj 的 key，将方法挂载到 Underscore 上
    // 其实是将方法浅拷贝到 _.prototype 上
    _.each(_.functions(obj), function(name) {
      // 直接把方法挂载到 _[name] 上
      // 调用类似 _.myFunc([1, 2, 3], ..)
      var func = _[name] = obj[name];

      // 浅拷贝
      // 将 name 方法挂载到 _ 对象的原型链上，使之能 OOP 调用
      _.prototype[name] = function() {
        // 第一个参数
        var args = [this._wrapped];

        // arguments 为 name 方法需要的其他参数
        push.apply(args, arguments);
        // 执行 func 方法
        // 支持链式操作
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  // 将前面定义的 underscore 方法添加给包装过的对象
  // 即添加到 _.prototype 中
  // 使 underscore 支持面向对象形式的调用
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  // 将 Array 原型链上有的方法都添加到 underscore 中
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);

      if ((name === 'shift' || name === 'splice') && obj.length === 0)
        delete obj[0];

      // 支持链式操作
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  // 添加 concat、join、slice 等数组原生方法给 Underscore
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });


  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;


  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  // 兼容 AMD 规范
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));
