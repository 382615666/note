function jquery(selector, context) {

  return new jquery.fn.init(selector, context)
}

jquery.fn = jquery.prototype = {
  version: '0.0.1',
  init () {
    console.log(222)
    return this
  }
}


jquery.fn.ready = function (fn) {
  console.log(111)
  return this
}

jquery.fn.init.prototype = jquery.fn


window.jquery = window.$ = jquery

export default jquery
