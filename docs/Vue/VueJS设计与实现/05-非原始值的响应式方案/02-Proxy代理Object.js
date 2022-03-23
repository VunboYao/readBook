const bucket = new WeakMap()

const TriggerType = {
  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE'
}

const data = {
  foo: 1
}

const ITERATE_KEY = Symbol()
const proxy = new Proxy(data, {
  // 拦截访问属性 obj.foo
  get(target, key, receiver) {
    track(target, key)
    return Reflect.get(target, key, receiver)
  },
  // 拦截设置操作
  set(target, key, newValue, receiver) {
    // !如果属性不存在，则说明是在添加新属性，否则是设置已有属性
    const type = Object.prototype.hasOwnProperty.call(target, key) ? TriggerType.SET : TriggerType.ADD
    // *返回true/false
    const res = Reflect.set(target, key, newValue, receiver)

    trigger(target, key, type)
    return res
  },
  // !拦截 in 操作符
  has(target, key) {
    track(target, key)
    return Reflect.has(target, key)
  },
  // !拦截 for...in. 修改属性不会对for...in循环产生影响
  ownKeys(target) {
    // TODO:将副作用函数与ITERATE_KEY关联,
    // * 获取属于自己的键值，这个操作不与任何具体的键进行绑定。因此需要独立构造一个唯一的key作为标识
    track(target, ITERATE_KEY)
    return Reflect.ownKeys(target)
  },
  // !拦截删除操作：delete proxy.foo
  deleteProperty(target, key) {
    // *检查被操作的属性是否是对象自己的属性
    const hadKey = Object.prototype.hasOwnProperty.call(target, key)
    // *使用 Reflect.deleteProperty 完成属性的删除
    const res = Reflect.deleteProperty(target, key)
    console.log("🚀 ~ file: 02-Proxy代理Object.js ~ line 48 ~ deleteProperty ~ res", res)

    if (res && hadKey) {
      // !只有当被删除的属性是对象自己的属性并且成功删除时，才触发更新
      trigger(target, key, TriggerType.DELETE)
    }
    return res
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

// !新增了第三个属性type来判断属性的类型：新增、删除，修改
function trigger(target, key, type) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })

  // !只有当操纵类型为'ADD' 或 'DELETE'时，才触发与 ITERATE_KEY（ownKeys，for...in） 相关联的副作用函数重新执行
  if (type === TriggerType.ADD || type === TriggerType.DELETE) {
    // TODO:取得与 ITERATE_KEY 相关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY)
    // *将与 ITERATE_KEY 相关联的副作用函数也添加到 effectsToRun
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })
  }

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
      scheduler: () => {
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
  for (const key in proxy) {
    console.log('key :>> ', key)
  }
})

proxy.bar = 2
delete proxy.foo