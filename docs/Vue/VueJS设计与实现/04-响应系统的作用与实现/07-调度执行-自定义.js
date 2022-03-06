
// 存储副作用函数
const bucket = new WeakMap()

// 原始数据
const data = { foo: 1 }

// 对原始数据的代理
const obj = new Proxy(data, {
  get(target, key) {
    // 将副作用函数 activeEffect 添加到存储副作用函数的桶中
    track(target, key)
    // 返回属性值
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newValue) {
    // 设置属性
    target[key] = newValue
    // 把副作用函数从桶里取出来并执行
    trigger(target, key)
  }
})

// 在 get 拦截函数内调用 track 函数追踪变化
function track(target, key) {
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    // 建立一个当前target对应的map: [obj, Map()]
    bucket.set(target, (depsMap = new Map()))
  }
  // 从target:Map()中获取key:Set()
  let deps = depsMap.get(key)
  if (!deps) {
    // 建立一个当前key值对应的依赖集合:key: Set([effectFn(), effectFn2()...])
    depsMap.set(key, (deps = new Set()))
  }
  // 把当前激活的副作用函数添加到依赖集合 deps(Set) 中
  deps.add(activeEffect)
  // deps 就是一个与当前副作用函数存在联系的依赖集合，将其添加到 activeEffect.deps数组中
  activeEffect.deps.push(deps)
}

// 在 set 函数内调用 trigger 函数触发变化
function trigger(target, key) {
  // 获取到Map()
  const depsMap = bucket.get(target)
  if (!depsMap) return
  // 获取到key：Set()
  const effects = depsMap.get(key)
  // TODO:避免无限循环
  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })
  effectsToRun.forEach(effectFn => {
    // TODO:如果一个副作用函数存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      // 否则直接执行副作用函数
      effectFn()
    }
  })
}

// 用一个全局变量存储被注册的副作用函数
let activeEffect
const effectStack = [] // effect 栈
// effect 函数用来注册副作用函数
function effect(fn, options = {}) {
  const effectFn = () => {
    // 清除无用的数据
    cleanup(effectFn)
    // effectFn 执行时，将其设置为当前激活的副作用函数
    activeEffect = effectFn
    // 在调用副作用函数之前将当前副作用函数压入栈中
    effectStack.push(effectFn)
    fn()
    // 将当前副作用函数弹出，并把activeEffect还原为之前的值
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }
  // TODO:将 options 挂载到 effectFn 上
  effectFn.options = options
  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合Set()
  effectFn.deps = []
  // 执行该副作用函数
  effectFn()
}

function cleanup(effectFn) {
  // 遍历 effectFn.deps 数组。由set()组成的数组
  for (let i = 0; i < effectFn.deps.length; i++) {
    // 拿到每一个key:Set(),内部存储的是每一个effectFn
    const deps = effectFn.deps[i]
    // 将effectFn从Set()中移除
    deps.delete(effectFn)
  }
  // 删除了当前effectFn中所有的关联依赖集合Set()
  // 重置 effectFn.deps 数组
  effectFn.deps.length = 0
}

// TODO:定义一个任务队列
const jobQueue = new Set()
const p = Promise.resolve() // 微任务队列

let isFlushing = false // 一个标志代表是否正在刷新队列
function flushJob() {
  // 如果正在刷新，则什么都不做
  if(isFlushing) return
  // 设置为true， 代表正在刷新
  isFlushing = true
  // 在微任务队列中刷新 jobQueue 队列
  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
    // 结束后重置 isFlushing
    isFlushing = false
  })
}

effect(() => {
  console.log(obj.foo)
}, {
  scheduler(fn) {
    // 每次调度时，将副作用函数添加到 jobQueue 队列中
    jobQueue.add(fn)
    // 调用flushJob刷新队列
    flushJob()
  }
})
obj.foo++
obj.foo++
