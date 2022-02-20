
// 存储副作用函数
const bucket = new WeakMap()

// 原始数据
const data = { text: 'hello world', ok: true }

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
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  // 把当前激活的副作用函数添加到依赖集合 deps(Set) 中
  deps.add(activeEffect)
  // deps 就是一个与当前副作用函数存在联系的依赖集合，将其添加到 activeEffect.deps数组中
  activeEffect.deps.push(deps)
}

// 在 set 函数内调用 trigger 函数触发变化
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  // TODO:避免无限循环 
  const effectsToRun = new Set(effects)
  effectsToRun && effectsToRun.forEach(effectFn => effectFn())
}

// 用一个全局变量存储被注册的富作用函数
let activeEffect
// effect 函数用来注册副作用函数
function effect(fn) {
  const effectFn = () => {
    // 清除无用的数据
    cleanup(effectFn)
    // effectFn 执行时，将其设置为当前激活的副作用函数
    activeEffect = effectFn
    fn()
  }

  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合Set()
  effectFn.deps = []
  // 执行该副作用函数
  effectFn()
}


function cleanup(effectFn) {
  // 遍历 effectFn.deps 数组。由set()组成的数组
  for (let i = 0; i < effectFn.deps.length; i++) {
    // deps是单个的Set()
    const deps = effectFn.deps[i]
    // 将effectFn从Set()中移除
    deps.delete(effectFn)
  }
  // 重置 effectFn.deps 数组
  effectFn.deps.length = 0
}

effect(function effectFn() {
  document.body.innerText = obj.ok ? obj.text : 'not'
})


// 修改响应数据
// setTimeout(() => {
// obj.text = 'hello vue3'
// obj.notExist = 'hello vue3'
debugger
obj.ok = false
obj.text = 'hello vue3'
console.log('bucket :>> ', bucket);
// }, 1000)