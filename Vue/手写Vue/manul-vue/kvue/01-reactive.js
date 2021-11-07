// 数据响应
function defineReactive(obj, key, val) {
  // 递归
  observe(val)
  // 属性拦截
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', key, newVal)
        observe(newVal)
        val = newVal
        // update()
      }
    },
  })
}

// 观察所有传入的属性
function observe(obj) {
  // 判断obj是对象
  if (typeof obj !== 'object' || obj === null) return obj
  Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
}

// 动态新增一个属性
function set(obj, key, val) {
  defineReactive(obj, key, val)
}
