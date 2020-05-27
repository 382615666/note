function jquery (selector, context) {
  return new jquery.fn.init(selector, context)
}

jquery.fn = jquery.prototype = {
  jquery: '1.0.0',
  construtor: jquery,
  length: 0
}


jquery.fn.ready = function (fn) {
  console.log(111)
  return this
}

jquery.fn.init.prototype = jquery.fn


window.jquery = window.$ = jquery

export default jquery
