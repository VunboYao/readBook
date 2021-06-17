/*
const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer(((req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	res.end(`Hello World\n`)
}))
console.log(process.env)
server.listen(port, hostname, () => {
	console.log(`Server is listening http://${hostname}:${port}/`)
})
*/
// exports.name = '123'

function EventEmitter() {
  // 存储自定义事件及回调函数
  this._events = {}
}
EventEmitter.VERSION = '1.0.0'

EventEmitter.prototype.on = function (eventName, listener) {
  if (!eventName || !listener) return
  // 判断回调的 listener 是否为函数
  if (!isValidListener(listener)) {
    throw new TypeError('listener must be a function')
  }
  let events = this._events
  let listeners = events[eventName] = events[eventName] || []
  let listenerIsWrapped = typeof listener === 'object'
  // 不重复添加事件，判断是否有一样的
  if (indexOf(listeners, listener) === -1) {
    listeners.push(listenerIsWrapped ? listener : {
      listener: listener,
      once: false
    })
  }
  return this
}

EventEmitter.prototype.emit = function (eventName, args) {
  // 直接通过内部对象获取对应自定义事件的回调函数
  let listeners = this._events[eventName]
  if (!listeners) return
  for (let i = 0, len = listeners.length; i < len; i++) {
    let listener = listeners[i]
    if (listener) {
      listener.listener.call(this, args || '')
      if (listener.once) {
        this.off(eventName, listener.listener)
      }
    }
  }
  return this
}

EventEmitter.prototype.off = function (eventName, listener) {
  let listeners = this._events[eventName]
  if (!listeners) return
  let index
  for(let i = 0, len = listeners.length; i < len; i++) {
    if(listeners[i] && listeners[i].listener === listener) {
      index = i
      break
    }
  }
  if (typeof index !== 'undefined') {
    listeners.splice(index, 1, null)
  }
  return this
}

EventEmitter.prototype.once = function (eventName, listener) {
  return this.on(eventName, {
    listener: listener,
    once: true
  })
}

EventEmitter.prototype.allOff = function (eventName) {
  if (eventName && this._events[eventName]) {
    this._events[eventName] = []
  } else {
    this._events = {}
  }
}

// 判断是否是合法的 listener
function isValidListener(listener) {
  if (typeof listener === 'function') {
    return true
  } else if (listener && typeof listener === 'object') {
    return isValidListener(listener.listener)
  } else {
    return false
  }
}

// 判断自定义事件是否存在
function indexOf(array, item) {
  let result = -1
  item = typeof item === 'object' ? item.listener : item
  for (let i = 0, len = array.length; i < len; i++) {
    if (array[i].listener === item) {
      result = i
      break
    }
  }
  return result
}


let ET = new EventEmitter()
function sayName(names) {
  console.log('sayName', names);
}

ET.on('say', sayName)
ET.emit('say', '666')
