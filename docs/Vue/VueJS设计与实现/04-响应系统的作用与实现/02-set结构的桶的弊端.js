
// 用一个全局变量存储被注册的富作用函数
let activeEffect

// 存储副作用函数
const bucket = new Set()

// 原始数据
const data = { text: 'hello world' }

// 对原始数据的代理
const obj = new Proxy(data, {
  get(target, key) {
    if (activeEffect) {
      // 添加副作用函数
      bucket.add(activeEffect)
    }
    // 返回属性值
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newValue) {
    // 设置属性
    target[key] = newValue
    // 遍历副作用函数
    bucket.forEach(fn => fn())
    // TODO:返回true代表设置成功
    return true
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
    console.log('effect run');
    document.body.innerText = obj.text
  }
)

// 修改响应数据
setTimeout(() => {
  // obj.text = 'hello vue3'
  obj.notExist = 'hello vue3'
}, 1000)
