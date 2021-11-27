// TODO: 依赖收集、发布(发布订阅)
class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  // 订阅、收集
  addDepend() {
    // 自动收集
    if (watchFn.activeFn) {
      this.reactiveFns.add(watchFn.activeFn)
    }
  }

  // 发布
  notify() {
    this.reactiveFns.forEach(fn => fn())
  }
}

// 观察者
function watchFn(fn) {
  watchFn.activeFn = fn
  fn()
  watchFn.activeFn = null
}

// TODO: 封装一个自动获取depend的函数
const targetMap = new WeakMap()
function getDepend(target, key) {
  // 1.根据target获取map对象
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  // 2.根据key获取depend对象
  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
  return depend
}

// TODO: 声明响应式
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 根据target、key拿到对应的depend
      const depend = getDepend(target, key)
      // 依赖收集
      depend.addDepend()
      return Reflect.get(target, key, receiver)
    },
    set(target, key, newVal, receiver) {
      // 数据无更新。则终止
      if (target[key] === newVal) return
      Reflect.set(target, key, newVal, receiver)
      // TODO： 获取目标属性对应的depend，自动执行更新
      const depend = getDepend(target, key)
      depend.notify()
    },
  })
}

// defineProperty实现响应式
function reactive2(obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        // 根据obj,key获取对应的depend
        const depend = getDepend(obj, key)
        depend.addDepend()
        return value
      },
      set(newVal) {
        // 旧值退出
        if (value === newVal) return
        value = newVal
        const depend = getDepend(obj, key)
        depend.notify()
      },
    })
  })
  // TODO: 需要返回该对象
  return obj
}

// 示例
const objProxy = reactive2({
  name: 'yyb',
  age: 10,
})
watchFn(function() {
  console.log(objProxy.name, 'listeneing name')
})

watchFn(function() {
  console.log(objProxy.age, 'listening age')
})
console.log('--------------------初始化---------------')
objProxy.age = '12'
objProxy.age = '125'
