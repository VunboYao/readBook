const bucket = new WeakMap()
const reactiveMap = new Map()
const TriggerType = {
  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE'
}

// * 定义一个对象，将自定义的 add 方法定义到该对象下
const mutableInstrumentations = {
  add(key) {
    // * this 仍然指向的是代理对象，通过 raw 属性获取原始数据对象
    const target = this.raw
    // 通过原始数据对象执行 add 方法删除具体的值
    // 通过target直接调用并执行，不再需要 .bind
    const res = target.add(key)

    const hadKey = target.has(key)
    // 只有值不存在的情况下，才需要触发响应
    if (!hadKey) {
      // 调用 trigger 函数触发响应，并指定操作类型为 ADD
      trigger(target, key, TriggerType.ADD)
    }
    return res
  },
  // * 同理实现 delete
  delete(key) {
    const target = this.raw
    const hadKey = target.has(key)
    const res = target.delete(key)
    if (hadKey) {
      trigger(target, key, TriggerType.DELETE)
    }
    return res
  }
}

const ITERATE_KEY = Symbol()
function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get(target, key, receiver) {

      // * 如果读取的是 raw 属性，则返回原始数据对象 target
      if (key === 'raw') return target

      // *如果读取的是 size 属性。 指定第三个参数 receiver 为原始对象 target 从而修复问题
      if (key === 'size') {
        // !建立响应关系
        track(target, ITERATE_KEY)
        return Reflect.get(target, key, target)
      }
      // 返回定义在mutableInstrumentations对象下的方法
      return mutableInstrumentations[key]
    },
  })
}

function readonly(obj) {
  return createReactive(obj, false, true)
}

function shallowReadonly(obj) {
  return createReactive(obj, true, true)
}

function reactive(obj) {
  const existionProxy = reactiveMap.get(obj)
  if (existionProxy) return existionProxy

  const proxy = createReactive(obj)
  reactiveMap.set(obj, proxy)
  return proxy
}

function shallowReactive(obj) {
  return createReactive(obj, true)
}

function track(target, key) {
  if (!activeEffect || !shouldTrack) return
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

function trigger(target, key, type, newValue) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  const effectsToRun = new Set()

  if (Array.isArray(target) && key === 'length') {
    depsMap.forEach((effects, key) => {
      if (key >= newValue) {
        effects.forEach(effectFn => {
          if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn)
          }
        })
      }
    })
  }
  if (type === TriggerType.ADD && Array.isArray(target)) {
    const lengthEffects = depsMap.get('length')
    lengthEffects && lengthEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })
  }

  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })

  if (type === TriggerType.ADD || type === TriggerType.DELETE) {
    const iterateEffects = depsMap.get(ITERATE_KEY)
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
const s1 = reactive(new Set([1, 2]))
effect(() => {
  console.log(p.size);
})
p.add(1)