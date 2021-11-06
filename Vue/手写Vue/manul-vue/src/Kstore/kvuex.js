let Vue

class Store {
  constructor(options) {
    // 1.保存选项
    this.mutations = options.mutations
    this.actions = options.actions
    this._wrapGetters = options.getters

    // 定义computed选项
    const computed = {}
    // 向用户暴露一个getters
    this.getters = {}
    // {doubleCounter(state){}}
    Object.keys(this._wrapGetters).forEach(key => {
      // TODO:获取用户定义的getter
      const fn = this._wrapGetters[key]
      // 转换为computed可以使用的无参数形式
      computed[key] = () => {
        return fn(this.state)
      }
      // 为getters定义只读属性
      Object.defineProperty(this.getters, key, {
        get: () => {
          return this._vm[key]
        },
      })
    })

    // state应该是响应式的
    this._vm = new Vue({
      data() {
        return {
          // 自有属性，希望$$state不被代理
          $$state: options.state,
        }
      },
      computed,
    })

    /* this.getters = {}
    for (let k in options.getters) {
      this.getters[k] = options.getters[k]
      Object.defineProperty(this.getters, k, {
        get() {
          return options.getters[k](options.state)
        },
      })
    } */
  }

  // 存取器
  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('禁止直接修改state')
  }

  // 箭头函数类型，this指向Store的实例
  commit = (type, payload) => {
    const entry = this.mutations[type]
    if (!entry) {
      return console.error('unknow mutation type')
    }
    entry(this.state, payload)
  }

  dispatch = (type, payload) => {
    const entry = this.actions[type]
    if (!entry) {
      return console.error('unknow dispatch type')
    }
    return entry(this, payload)
  }
}

function install(_Vue) {
  // 保存Vue构造函数
  Vue = _Vue
  // 注册全局的$store
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    },
  })
}

export default { Store, install }
