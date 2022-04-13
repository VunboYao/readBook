let Vue
import vue from 'vue'
function install(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

class Store {
  constructor (options) {
    vue.util.defineReactive(this, 'state', options.state)
    this.state = options.state
    this.initGetters(options)
    this.initMutations(options)
    this.initActions(options)
  }
  initGetters(options) {
    let getters = options.getters || {}
    this.getters = {}
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state)
        }
      })
    })
  }
  initMutations(options) {
    let mutations = options.mutations || {}
    this.mutaitons = {}
    Object.keys(mutations).forEach(key => {
      this.mutaitons[key] = payload =>{
        mutations[key](this.state, payload)
      }
    })
  }
  initActions(options){
    // 1.拿到传递进来的actions
    let actions = options.actions || {}
    // 2.在store上新增一个actions的属性
    this.actions = {}
    // 3.将传递进来的actions中的方法添加到当前store的actions上
    for (let key in actions) {
      this.actions[key] = payload => {
        actions[key](this, payload)
      }
    }
  }
  commit = (type, payload) => {
    this.mutaitons[type](payload)
  }
  dispatch = (type, payload) => {
    this.actions[type](payload)
  }
}

export default {
  install,
  Store
}
