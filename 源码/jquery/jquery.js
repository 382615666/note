function jquery (selector, context) {
  return new jquery.fn.init(selector, context)
}

jquery.fn = jquery.prototype = {
  jquery: '1.0.0',
  construtor: jquery,
  length: 0,
  init () {
    return this
  },
  get (num) {
    if (num === null) {
      return [].slice.call(this)
    }
    return num < 0 ? this[num + this.length] : this [num]
  },
  toArray () {
    return [].slice.call(this)
  },
  first () {
    return this.eq(0)
  },
  last () {
    return this.eq(-1)
  },
  sort: [].sort,
  push: [].push,
  splice: [].splice
}

jquery.extend({
  merge (first, second) {
    const i = first.length
    const j = 0
    while (j < second.length) {
      first[i++] = second[j]
    }
    first.length = i
    return first
  },
  makeArray (arr, result) {
    const ret = result || []
    if (arr) {
      if (isArrayLike(Object(arr))) {
        jquery.merge(ret, typeof arr === 'string' ? [arr] : arr)
      } else {
        [].push.call(ret, result)
      }
    }
    return ret
  }
})

function isArrayLike (obj) {
  
}

export default jquery
