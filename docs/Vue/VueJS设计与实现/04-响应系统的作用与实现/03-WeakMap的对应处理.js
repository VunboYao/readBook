
// 用一个全局变量存储被注册的富作用函数
let activeEffect

// 存储副作用函数
const bucket = new WeakMap()

// 原始数据
const data = { text: 'hello world', ok: true }

// 对原始数据的代理
const obj = new Proxy(data, {
  get(target, key) {
    if (!activeEffect) return
    // 根据target从桶中取得depsMap。map类型：key=> effects
    let depsMap = bucket.get(target)
    // 如果不存在depsMap， 那么新建一个Map并于target关联
    if (!depsMap) {
      // [ [target, [key, set()] ]...]
      // WeakMap中增加[target, Map]
      bucket.set(target, (depsMap = new Map()))
    }

    // 再根据key从depsMap中取得deps，它是一个Set类型。里面存储着所有与当前key相关的effects
    let deps = depsMap.get(key)
    if (!deps) {
      depsMap.set(key, (deps = new Set()))
    }
    deps.add(activeEffect)

    // 返回属性值
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newValue) {
    // 设置属性
    target[key] = newValue

    // 根据target从桶中取得depsMap。是一个map类型[[key1, set()], [key2, set()]]
    const depsMap = bucket.get(target)
    if (!depsMap) return
    // 根据key取得所有副作用函数 effects（set类型）
    const effect = depsMap.get(key)
    // 遍历副作用函数
    effect && effect.forEach(fn => fn())
  }
})

// effect 函数用来注册副作用函数
function effect(fn) {
  // 调用effect注册副作用函数时，将副作用函数fn赋值给activeEffect
  activeEffect = fn
  fn()
}

effect(
  () => {
    console.log('run');
    document.body.innerText = obj.ok ? obj.text : 'not'
  }
)

// 修改响应数据
setTimeout(() => {
  obj.ok = false
  console.log(bucket);
  obj.text = '123'
}, 1000)