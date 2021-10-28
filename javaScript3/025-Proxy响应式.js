// TODO: 依赖收集、发布
class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  addDepend() {
    // 自动收集
    if (watchFn.activeFn) {
      this.reactiveFns.add(watchFn.activeFn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => fn())
  }
}

const depend = new Depend()

function watchFn(fn) {
  watchFn.activeFn = fn
  fn()
  watchFn.activeFn = null
}

const obj = {
  name: 'vunbo',
  age: 28,
}

// TODO: 封装一个获取depend的函数
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
const objProxy = new Proxy(obj, {
  get(target, key, receiver) {
    // 根据target、key拿到对应的depend
    const depend = getDepend(target, key)
    // 依赖收集
    depend.addDepend()
    return Reflect.get(target, key, receiver)
  },
  set(target, key, newVal, receiver) {
    Reflect.set(target, key, newVal, receiver)
    // TODO： 自动执行更新
    const depend = getDepend(target, key)
    depend.notify()
  },
})

watchFn(function () {
  console.log(objProxy.name, 'hello world')
})
watchFn(function () {
  console.log(objProxy.name, 'hello world2')
})
watchFn(function () {
  console.log(objProxy.age, 'listening age')
  console.log(objProxy.age, 'listening age')
})
watchFn(function () {
  console.log(objProxy.age, 'listening age2')
})

objProxy.age = '12'
objProxy.age = '23'
