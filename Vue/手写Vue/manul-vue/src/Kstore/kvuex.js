let Vue
class Store {
  constructor(options) {
    this.initOptions = options
    this.mutations = options.mutations
    this.actions = options.dispatch
    this._vm = new Vue({
      data() {
        return {
          $$state: options.state
        }
      },
    })

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  get state() {
    return this._vm._data.$$state
  }
  set state(v) {
    console.error(v)
  }

  commit(type,payload) {
    const entry = this.mutations[type]
    if (!entry) {
      return console.error('unknow mutation type')
    }
    entry(this.state, payload)
  }

  dispatch(type, payload) {
     const entry = this.actions[type]
    if (!entry) {
      return console.error('unknow dispatch type')
    }
    return entry(this, payload)
  }
}

function install(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    },
  })
}

export default {Store, install}
