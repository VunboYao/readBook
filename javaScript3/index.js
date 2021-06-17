{
  // 冒泡排序
  let a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]
  function bubbleSort(array) {
    const len = array.length
    if (len < 2) return array
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < i; j++) {
        if (array[j] > array[i]) {
          // console.log(i, j);
          // debugger
          const temp = array[j]
          array[j] = array[i]
          array[i] = temp
        }
      }
    }
    return array
  }
  // console.log(bubbleSort(a))
}

{
  // 快速排序
  let a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]
  function quickSort(array) {
    let quick = function(arr) {
      if (arr.length <= 1) return arr
      // 求中间值
      const index = Math.floor(arr.length >> 1)
      // 取第一位值
      const pivot = arr.splice(index, 1)[0]
      const left = []
      const right = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] > pivot) {
          right.push(arr[i])
        } else if (arr[i] <= pivot) {
          left.push(arr[i])
        }
      }
      // console.log('right ' + pivot, right);
      // console.log('left ' + pivot, left);
      // debugger
      return quick(left).concat([pivot], quick(right))
    }
    return quick(array)
  }
  let c = quickSort(a)
  // console.log(c);
}

{
  // 插入排序
  let a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]
  function insertSrot(array) {
    const len = array.length
    let current, prev
    for (let i = 1; i < len; i++) {
      current = array[i]
      prev = i - 1
      console.log(i, current)
      while (prev >= 0 && array[prev] > current) {
        debugger
        array[prev + 1] = array[prev]
        prev--
      }
      array[prev + 1] = current
    }
    return array
  }
  // console.log(insertSrot(a))
}

{
  // 选择排序
  const a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]
  function selectSort(array) {
    const len = array.length
    let temp, minIndex
    for (let i = 0; i < len - 1; i++) {
      minIndex = i
      for (let j = i + 1; j < array; j++) {
        // console.log(i, j);
        if (array[j] < array[minIndex]) {
          minIndex = j
        }
      }
      temp = array[i]
      array[i] = array[minIndex]
      array[minIndex] = temp
    }
    return array
  }
  // console.log(selectSort(a))
}

{
  const a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]
  function heap_sort(arr) {
    let len = arr.length
    let k = 0
    function swap(i, j) {
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    function max_heapify(start, end) {
      let dad = start
      let son = dad * 2 + 1
      if (son >= end) return
      if (son + 1 < end && arr[son] < arr[son + 1]) {
        son++
      }
      if (arr[dad] <= arr[son]) {
        swap(dad, son)
        max_heapify(son, end)
      }
    }
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
      max_heapify(i, len)
    }

    for (let j = len - 1; j < k; j--) {
      swap(0, j)
      max_heapify(0, j)
    }

    return arr
  }
  // console.log(heap_sort(a))
}

{
  let a = {
    name: 4,
    [Symbol.iterator]() {
      let name = this.name
      return {
        next() {
          if (name <= 0) {
            return { value: undefined, done: true }
          } else {
            return { value: name--, done: false }
          }
        },
      }
    },
  }
  for (let c of a) {
    // console.log(c);
  }
  setTimeout(() => {
    // window.close()
  }, 3000)
  /*   class Test {
    constructor(limit) {
      this.limit = limit
    }

    [Symbol.iterator]() {
      let count = 1, limit = this.limit
      return {
        next() {
          if (count <= limit) {
            return {done: false, value: count++}
          } else {
            return {done: true}
          }
        },
        return() {
          console.log('Exiting early');
          return {done: true}
        }
      }
    }
  }
  let c1 = new Test(4)
  for (let i of c1) {
    if (i > 2) {
      break
    }
    console.log(i);
  } */
}

{
  function demo() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('123')
      }, 1000)
    })
  }
  function test() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('456')
      }, 1000)
    })
  }
  function foo() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('789')
      }, 1000)
    })
  }
  const arr = [demo, test, foo]
  // const subArr = arr.map(item => {
  //   return item()
  //     .then(res => {
  //       return res
  //     })
  //     .catch(err => {
  //       return err
  //     })
  // })
  Promise.any([demo(), test(), foo()])
    .then(res => {
      // console.log(res, 'ok')
    })
    .catch(err => {
      // console.log(err)
    })
}

{
  function EventEmitter() {
    // 存储自定义事件及回调函数
    this._events = {}
  }
  EventEmitter.VERSION = '1.0.0'

  EventEmitter.prototype.on = function(eventName, listener) {
    if (!eventName || !listener) return
    // 判断回调的 listener 是否为函数
    if (!isValidListener(listener)) {
      throw new TypeError('listener must be a function')
    }
    // 获取调度中心
    let events = this._events
    // 获取对应事件名的回调
    let listeners = (events[eventName] = events[eventName] || [])
    listeners.push({
      listener: listener,
      once: false,
    })
    return this
  }

  EventEmitter.prototype.emit = function(eventName, args) {
    // 直接通过内部对象获取对应自定义事件的回调函数
    let listeners = this._events[eventName]
    if (!listeners) return
    for (let i = 0, len = listeners.length; i < len; i++) {
      let listener = listeners[i]
      if (listener) {
        listener.listener.call(this, args || '')
        if (listener.once) {
          debugger
          this.off(eventName, listener.listener)
        }
      }
    }
    // return this
  }

  EventEmitter.prototype.off = function(eventName, listener) {
    let listeners = this._events[eventName]
    if (!listeners) return
    let index
    for (let i = 0, len = listeners.length; i < len; i++) {
      // 存入listeners中的是一个数组，比对listener是否是同一个
      if (listeners[i] && listeners[i].listener === listener) {
        index = i
        break
      }
    }
    if (typeof index !== 'undefined') {
      listeners.splice(index, 1, null)
    }
    return this
  }

  EventEmitter.prototype.once = function(eventName, listener) {
    return this.on(eventName, {
      listener: listener,
      once: true,
    })
  }

  EventEmitter.prototype.allOff = function(eventName) {
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

  let ET = new EventEmitter()
  function sayName(names) {
    console.log('sayName', names)
  }

  ET.once('say', sayName)
  // ET.off('say', sayName)
  ET.emit('say', '666')
  ET.emit('say', '666')
}
