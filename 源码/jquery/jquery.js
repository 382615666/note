function jquery(selector, context) {

  // return new jquery.fn.init(selector, context)
}

jquery.fn = jquery.prototype = {
  version: '0.0.1'
}

jquery.fn.ready = function (fn) {
  return this
}

window.jquery = window.$ = jquery

export default jquery
