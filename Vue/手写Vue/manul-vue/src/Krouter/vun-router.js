// 1.插件
// 2.两个组件

// vue插件：
// function
// 要求必须有一个install，将来会被Vue.use调用

let Vue // 保存Vue构造函数，插件中要使用，不导入还能用
class VunRouter{
	constructor(options) {
		// 保存选项
		this.$options = options

    // 把current作为响应式数据
    // 将来发生变化，router-view的render函数能够再次执行
    // this指向路由实例
    const initial = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'current', initial)

    // 监听hash变化
    window.addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1)
    })
  }
}

// 参数1是Vue.use调用时传入的
VunRouter.install = function (_Vue) {
	Vue = _Vue

  // 1. 挂载$router属性
  // 全局混入目的：延迟下面逻辑到router创建完毕后并且附加到选项上时才执行
  Vue.mixin({
    beforeCreate() {
      // 此钩子在每个组件创建实例时都会调用
      // 根实例执行一次
      if (this.$options.router) {
        // this指向每一个Vue组件的实例
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 2.router-link
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        require: true
      }
    },
    render(h) {
      return h(
        'a',
        {
          attrs: {
            href: '#' + this.to
          }
        },
        this.$slots.default
      )
    }
  })

  // 3.router-view
  Vue.component('router-view', {
    render(h) {
      // this指向router-view的实例
      console.log('this :>> ', this.$router.$options.routes);
      let component = null
      const route = this.$router.$options.routes.find( route => route.path === this.$router.current)
      if (route) component = route.component
      return h(component)
    }
  })
}


export default VunRouter
