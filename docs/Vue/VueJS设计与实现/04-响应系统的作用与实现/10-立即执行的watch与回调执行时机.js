const bucket = new WeakMap()

const data = {
  foo: 1,
  get bar() {
    // 这里的 this 指向谁？ data本身
    // 当track中Reflect.get(target, key, receiver)时，this指向proxy
    return this.foo
  }
}

const proxy = new Proxy(data, {
  get(target, key, receiver) {
    track(target, key)
    return Reflect.get(target, key, receiver)
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
    const res = fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    return res
  }
  effectFn.options = options
  effectFn.deps = []
  if (!options.lazy) {
    effectFn()
  }
  return effectFn
}

function computed(getter) {
  let value
  let dirty = true

  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      if (!dirty) {
        dirty = true
        trigger(obj, 'value')
      }
    }
  })

  const obj = {
    get value() {
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      track(obj, 'value')
      return value
    }
  }
  return obj
}

function watch(source, cb, options) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }

  let oldValue, newValue

  let cleanup
  function onInvalidate(fn) {
    cleanup = fn
  }
  // 提取 scheduler 调度函数为一个独立的 job 函数
  const job = () => {
    newValue = effectFn()
    if (cleanup) {
      cleanup()
    }
    cb(newValue, oldValue, onInvalidate)
    oldValue = newValue
  }

  const effectFn = effect(
    () => getter(),
    {
      lazy: true,
      // 提取 job 函数作为调度器函数
      scheduler: () => {
        // 在调度函数中判断 flush 是否为 'post', 如果是，将其放到微任务队列中执行
        if (options.flush === 'post') {
          const p = Promise.resolve()
          p.then(job)
        } else {
          job()
        }
      }
    }
  )
  if (options.immediate) {
    // 当 immediate 为 true 时立即执行 job， 从而触发回调执行
    job()
  } else {
    oldValue = effectFn()
  }
}
function traverse(value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return
  seen.add(value)
  for (const k in value) {
    traverse(value[k], seen)
  }
  return value
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
effect(() => {
  console.log(proxy.bar)
})

proxy.foo++