// 存储副作用函数
const bucket = new Set()

// 原始数据
const data = { text: 'hello world' }

// 对原始数据的代理
const obj = new Proxy(data, {
  get(target, key) {
    // 添加副作用函数
    bucket.add(effect)
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

// 副作用函数
function effect() {
  document.body.innerText = obj.text
}
// 执行，触发读取
effect()

// 修改响应数据
setTimeout(() => {
  obj.text = 'hello vue3'
}, 1000)