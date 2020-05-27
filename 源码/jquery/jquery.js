function jquery (selector, context) {
  return new jquery.fn.init(selector, context)
}

jquery.fn = jquery.prototype = {
  jquery: '1.0.0',
  construtor: jquery,
  length: 0
}

export default jquery
