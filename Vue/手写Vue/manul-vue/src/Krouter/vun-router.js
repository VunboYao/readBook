// 1.插件
// 2.两个组件

// vue插件：
// function
// 要求必须有一个install，将来会被Vue.use调用

let Vue // 保存Vue构造函数，插件中要使用，不导入还能用
class VunRouter {
  constructor(options) {
    // 1.保存选项
    this.constructorOptions = options

    // 把current作为响应式数据
    // 将来发生变化，router-view的render函数能够再次执行
    // this指向路由实例
    /*const initial = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'current', initial)*/

    this.current = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'matched', [])
    // match方法可以递归遍历路由表，获得匹配关系数组
    this.match()

    // 2.监听hash变化
    window.addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1)
      this.matched = []
      this.match()
    })
  }
  match(routes) {
    routes = routes || this.constructorOptions.routes

    // 递归遍历
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      // /about/info
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children)
        }
        return
      }
    }
  }
}

// 参数1是Vue.use调用时传入的
VunRouter.install = function(_Vue) {
  Vue = _Vue // 借鸡生蛋

  // 1. 挂载$router属性
  // 全局混入目的：延迟下面逻辑到router创建完毕后并且附加到选项上时才执行
  Vue.mixin({
    beforeCreate() {
      // 此钩子在每个组件创建实例时都会调用
      // 根实例执行一次。生成路由实例
      if (this.$options.router) {
        // this指向每一个Vue组件的实例
        Vue.prototype.$router = this.$options.router
      }
    },
  })

  // 2.router-link
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        require: true,
      },
    },
    render(h) {
      return h(
        'a',
        {
          attrs: {
            href: '#' + this.to,
          },
        },
        this.$slots.default
      )
    },
  })

  // 3.router-view
  Vue.component('router-view', {
    render(h) {
      // 标记深度
      this.$vnode.data.routerView = true
      let depth = 0
      let parent = this.$parent
      while (parent) {
        const vnodeData = parent.$vnode && parent.$vnode.data
        if (vnodeData) {
          if (vnodeData.routerView) {
            // 说明当前parent是一个router-view
            depth++
          }
        }
        parent = parent.$parent
      }
      // this指向router-view(Vue组件)的实例
      console.log('this.$router 路由实例:>> ', this.$router)
      console.log('路由地址列表', this.$router.constructorOptions.routes)
      let component = null
      // const route = this.$router.constructorOptions.routes.find( route => route.path === this.$router.current)
      // 从匹配数组中获取
      console.log(this.$router.matched)
      const route = this.$router.matched[depth]
      if (route) component = route.component
      return h(component)
    },
  })
}

export default VunRouter
