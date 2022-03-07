const bucket = new WeakMap()

const data = { foo: 1, bar: 2 }

const obj = new Proxy(data, {
  get(target, key) {
    track(target, key)
    return target[key]
  },
  set(target, key, newValue) {
    target[key] = newValue
    trigger(target, key)
  }
})

function track(target, key) {
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })
  effectsToRun.forEach(effectFn => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}

let activeEffect
const effectStack = []

function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    // 将 fn 的执行结果存储到res中
    const res = fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    // 将 res 作为effectFn的返回值
    return res
  }
  effectFn.options = options
  effectFn.deps = []
  // 只有非 lazy 的时候，才执行
  if (!options.lazy) {
    effectFn()
  }
  // 将副作用函数作为返回值返回
  return effectFn
}

function computed(getter) {
  // value 用来缓存上一次计算的值
  let value
  // dirty 标志，用来标识是否需要重新计算值，为 true 则意味着“脏”，需要计算
  let dirty = true

  // 把 getter 作为副作用函数，创建一个 lazy 的 effect
  const effectFn = effect(getter, {
    lazy: true,
    // 添加调度器，在调度器中将 dirty 重置为 true
    scheduler() {
      // TODO:此处不需要将fn参数传入来执行，因为在下边即将计算值
      if (!dirty) {
        dirty = true
        // 当计算属性依赖的响应式数据变化时，手动调用 trigger 函数触发响应
        trigger(obj, 'value')
      }
    }
  })

  const obj = {
    // 当读取 value 时才执行 effectFn
    get value() {
      // 只有“脏”时才计算值，并将得到的值缓存到 value 中
      if (dirty) {
        value = effectFn()
        // 将 dirty 设置 为 false， 下一次访问直接使用缓存到 value 中的值
        dirty = false
      }
      // 当读取 value 时， 手动调用 track 函数进行追踪
      track(obj, 'value')
      return value
    }
  }
  return obj
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

const jobQueue = new Set()
const p = Promise.resolve()
let isFlushing = false
function flushJob() {
  if (isFlushing) return
  isFlushing = true
  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
    isFlushing = false
  })
}

// =================================
const sumRes = computed(() => {
  console.log('反复执行')
  return obj.foo + obj.bar
})
/* console.log(sumRes.value)
console.log(sumRes.value)
obj.foo++
console.log(sumRes.value) */

effect(() => {
  // 在该副作用函数中读取 sumRes.value
  console.log(sumRes.value)
})
// 修改了值
obj.foo++