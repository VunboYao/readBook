class MyEventEmitter {
  constructor() {
    // eventMap 用来存储事件和监听函数之间的关系
    this.eventMap = {}
  }

  // 订阅
  on(type, handler) {
    // 非函数则报错
    if (!handler instanceof Function) {
      throw new Error('please enter a function')
    }
    // 若不存在，新建该队列
    if (!this.eventMap[type]) {
      this.eventMap[type] = []
    }
    // 若存在，直接往队列推入 handler
    this.eventMap[type].push(handler)
  }

  // 触发执行
  emit(type, params) {
    // 若事件已订阅
    if (this.eventMap[type]) {
      // 依次执行出队
      this.eventMap[type].forEach(handler => {
        handler(params)
      })
    }
  }

  off(type, handler) {
    if (this.eventMap[type]) {
      this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1)
    }
  }
}

export default MyEventEmitter

/* const myEvent = new MyEventEmitter()
// 编写一个简单的 handler
const testHandler = function (params) {
  console.log(`test事件被触发了，testHandler 接收到的入参是${params}`)
}
// 监听 test 事件
myEvent.on('test', testHandler)
myEvent.on('test', testHandler)
// 在触发 test 事件的同时，传入希望 testHandler 感知的参数
myEvent.emit('test', 'newState')
myEvent.off('test', testHandler)
myEvent.off('test', testHandler) */
