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
class ModuleCollections {
  constructor(rootModule) {
    this.register([],rootModule)
  }
  register(arr,rootModule) {
    // 1.按照需要的格式创建模块
    let module = {
      _raw: rootModule,
      _state: rootModule.state,
      _children: {}
    }
    // 2.保存模块信息
    if (arr.length === 0) {
      // 保存根模块
      this.root = module
    } else {
      // 保存子模块
      // this.root._children[arr[arr.length - 1]] = module
      let parent = arr.splice(0,arr.length - 1).reduce((root, currentKey) => {
        return root._children[currentKey]
      }, this.root)
      parent._children[arr[arr.length - 1]] = module
    }
    // 3.处理子模块
    for(let childrenModuleName in rootModule.modules) {
      let childrenModule = rootModule.modules[childrenModuleName]
      this.register(arr.concat(childrenModuleName), childrenModule)
    }
  }
}
class Store {
  constructor (options) {
    vue.util.defineReactive(this, 'state', options.state)
    this.state = options.state
    // 提取模块信息
    this.modules = new ModuleCollections(options)
    this.initModules([], this.modules.root)
  }
  initGetters(options) {
    let getters = options.getters || {}
    this.getters = this.getters || {}
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](options.state)
        }
      })
    })
  }
  initMutations(options) {
    let mutations = options.mutations || {}
    this.mutations = this.mutations || {}
    Object.keys(mutations).forEach(key => {
      this.mutations[key] = this.mutations[key] || []
      this.mutations[key].push(payload => {
        mutations[key](options.state, payload)
      })
    })
  }
  initActions(options){
    // 1.拿到传递进来的actions
    let actions = options.actions || {}
    // 2.在store上新增一个actions的属性
    this.actions = this.actions || {}
    // 3.将传递进来的actions中的方法添加到当前store的actions上
    for (let key in actions) {
      this.actions[key] = this.actions[key] || []
      this.actions[key].push(payload => {
        actions[key](this, payload)
      })
    }
  }
  initModules(arr, rootModule) {
    if (arr.length > 0) {
      let parent = arr.splice(0, arr.length-1).reduce((state, currentKey) => {
        return state[currentKey]
      }, this.state)
      Vue.set(parent, arr[arr.length - 1], rootModule._state)
    }
    this.initGetters(rootModule._raw)
    this.initMutations(rootModule._raw)
    this.initActions(rootModule._raw)
    for (let childrenModuleName in rootModule._children) {
      let childrenModule = rootModule._children[childrenModuleName]
      this.initModules(arr.concat(childrenModuleName), childrenModule)
    }
  }
  commit = (type, payload) => {
    this.mutations[type].forEach(fn => fn(payload))
  }
  dispatch = (type, payload) => {
    this.actions[type].forEach(fn => fn(payload))
  }
}

export default {
  install,
  Store
}
