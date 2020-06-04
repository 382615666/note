function jquery (selector, context) {
  return new jquery.fn.init(selector, context)
}

const class2type = {}
const version = '1.0.0'

jquery.fn = jquery.prototype = {
  jquery: version,
  construtor: jquery,
  length: 0,
  init () {
    return this
  },

  slice () {
    return this.pushStack([].slice.apply(this, arguments))
  },

  eq (i) {
    const j = i < 0 ? i + this.length : i
    return this.pushStack(j >= 0 && j < this.length ? [this[j]] : [])
  },

  map(callback) {
    return this.pushStack(jquery.map(this, function (elem, i) {
      return callback.call(elem, i, elem)
    }))
  },
  even () {
    return this.pushStack(jquery.grep(this, function (elem, i) {
      return (i + 1) % 2
    }))
  },

  odd () {
    return this.pushStack(jquery.grep(this, function (elem, i) {
      return i % 2
    }))
  },

  pushStack (elem) {
     const result = jquery.merge(this.construtor(), elem)
     result.preObject = this
     return result
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
  end () {
    return this.preObject || this.construtor()
  },
  each (callback) {
    return jquery.each(this, callback)
  },
  sort: [].sort,
  push: [].push,
  splice: [].splice
}

jquery.extend = jquery.fn.extend = function () {
  const target = arguments[0] || {}
  const deep = false
  const i = 1
  const length = arguments.length
  
  if (typeof target === 'boolean') {
    deep = target
    target = arguments[i] || {}
    i++
  }

  if (typeof target !== 'object' && !isFunction(target)) {
    target = {}
  }
  if (i === length) {
    target = this
    i--
  }
  for (; i < length; i++) {
    const options = arguments[i]
    if (options != null) {
      for (let name in options) {
        const copy = options[name]
        if (name === '__proto__' || target === copy) {
          continue
        }
        let copyIsArray = Array.isArray(copy)
        if (deep && copy && jquery.isPlainObject(copy) || copyIsArray) {
          src = target[name]
          let clone = []
          if (copyIsArray && !Array.isArray(copy)) {
            clone = []
          } else if (!copyIsArray && !jquery.isPlainObject(src)) {
            clone = {}
          } else {
            clone = src
          }
          copyIsArray = false
          target[name] = jquery.extend(deep, clone, copy)
        } else if (copye !== void(0)) {
          target[name] = copy
        }
      }
    }
  }
}

jquery.extend({
  isReady: true,
  expando: `jquery${version + Math.random().replace(/\D/g, '')}`,
  error (msg) {
    throw new Error(msg)
  },
  noop () {},
  inArray (elem, arr, i) {
    return arr == null ? -1 : [].indexOf.call(arr, elem, i)
  },

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
  },

  isEmptyObject (obj) {
    for (let name in obj) {
      return false
    }
    return true
  },

  grep (elem, callback, flag) {
    const result = []
    for (let i = 0; i < elem.length; i++) {
      if (callback(elem[i], i) === flag) {
        result.push(elem[i])
      }
    }
    return result
  },

  isPlainObject (obj) {
    let proto, Ctor
    if (!obj || toString.call(obj) !== '[object object]') {
      return false
    }
    proto = Object.getPrototypeOf(obj)
    if (!proto) {
      return true
    }
    
    Ctor = class2type.hasOwnProperty.call(proto, 'contructor') && proto.construtor
    return typeof Ctor === 'function' && class2type.hasOwnProperty.toString().call(Ctor) == class2type.hasOwnProperty.toString.call(Object)
  },

  globalEval (code, options, doc) {
    DOMEval(code, {
      nonce: options && options.nonce
    }, doc)
  },

  map (elem, callback, arg) {
    const result = []
    let value
    if (isArrayLike(elem)) {
      for (let i in elem) {
        value = callback.call(elem[i], i, arg)
        if (value != null) {
          result.push(value)
        }
      }
    } else {
      for (let i = 0; i < elem.length; i++) {
        value = callback.call(elem[i], i, arg)
        if (value != null) {
          result.push(value)
        }
      }
    }
    return flat(result)
  },

  each (elem, callback) {
    if (isArrayLike(elem)) {
      for (let i = 0; i < elem.length; i++) {
        if (callback.call(elem[i], i, elem[i]) === false) {
          break
        }
      }
    } else {
      for (let i in elem) {
        if (callback.call(elem[i], i, elem[i]) === false) {
          break
        }
      }
    }
    return elem
  },

  guid: 1,
  support: {}
})

jquery.each({
  parent (elem) {
    const parent = elem.parentNode
    return parent && parent.nodeType !== 11 ? parent : null
  },
  parents (elem) {
    return dir(elem, 'parentNode')
  },
  parentsUntil (elem, i, until) {
    return dir(elem, 'parentNode', until)
  },
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function (name, fn) {
  const guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
  }
  const rparentsprev = /^(?:parents|prev(?:Until|All))/
  jquery.fn[name] = function (until, selector) {
    let result = jquery.map(this, fn, until)
    if (name.slice(-5) !== 'Until') {
      selector = until
    }
    if (selector && typeof selector === 'string') {
      result = jquery.filter(selector, result)
    }
    if (this.length > 1) {
      if (!guaranteedUnique[name]) {
        jquery.uniqueSort(result)
      }
      if (rparentsprev.test(name)) {
        result.reverse()
      }
    }
    return this.pushStack(result)
  }
})

if (typeof Symbol === 'function') {
  jquery.fn[Symbol.iterator] = [][Symbol.iterator]
}

jquery.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function (index, name) {
  class2type[`[object ${name}]`] = name.toLowerCase()
})

function sibling (cur, dir) {
  while((cur = cur[dir]) && cur.nodeType !== 1) {}
  return cur
}

function siblings (n, elem) {
  const result = []
  for (;n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== elem) {
      result.push(n)
    }
  }
  return result
}

function dir (elem, dir, until) {
  const matched = []
  const truncate = until !== undefined

  while((elem = elem[dir]) && elem.nodeType !== 9) {
    if (elem.nodeType === 1) {
      if (truncate && jquery(elem).is(until)) {
        break
      }
      matched.push(elem)
    }
  }
  return matched
}

function flat (array) {
  return [].flat ? [].flat.call(array) : [].concat.apply([], array)
}

function DOMEval (code, node, doc) {
  const doc = doc || window.document
  const script = document.createElement('script')
  script.text =code

  const scriptDefaultAttributes = {
    type: true,
    src: true,
    nonce: true,
    noModule: true
  }

  for (let i in scriptDefaultAttributes) {
    const value = node[i] || node.getAttribute || node.getAttribute(i)
    if (value) {
      script.setAttribute(i, value)
    }
  }
  doc.head.appendChild(script).parentNode.removeChild(script)
}

jquery.fn.extend({
  has (target) {
    target = jquery(target, this)
    return this.filter(function () {
      for (let i = 0; i < target.length; i++) {
        if (jquery.contains(this, target[i])) {
          return true
        }
      }
    })
  },
  
  index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
})

function isWindow (obj) {
  return obj != null && obj === obj.window
}

function isFunction (obj) {
  return typeof obj === 'function' && typeof obj.nodeType !== 'number'
}

function toType (obj) {
  if (obj == null) {
    return obj + ''
  }
  return typeof obj === 'object' || typeof obj === 'function' ? class2type[{}.toString.call(obj)] || 'object' : typeof object
}

function isArrayLike (obj) {
  const length = !!obj && 'length' in obj && obj.length
  const type = toType(obj)
  
  if (isFunction(obj) || isWindow(obj)) {
    return false
  }
  return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj
}

export default jquery
