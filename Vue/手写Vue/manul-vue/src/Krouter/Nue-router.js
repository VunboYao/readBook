import vue from 'vue'
class NueRouteInfo {
  constructor() {
    this.currentPath = null
  }
}

class NueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash'
    this.routes = options.routes || []
    // 提取路由信息：path: component
    this.routesMap = this.createRoutesMap()
    this.routeInfo = new NueRouteInfo()
    this.initDefault()
  }
  initDefault() {
    if(this.mode === 'hash') {
      if (!location.hash) {
        location.hash = '#/'
      }
      window.addEventListener('load', () => {
        this.routeInfo.currentPath = location.hash.slice(1)
      })
      window.addEventListener('hashchange', () => {
        this.routeInfo.currentPath = location.hash.slice(1)
      })
    } else {
      if (!location.pathName) {
        location.pathName = '/'
      }
      window.addEventListener('load', () => {
        this.routeInfo.currentPath = location.pathName
      })
      window.addEventListener('popstate', () => {
        this.routeInfo.currentPath = location.pathName
      })
    }
  }
  createRoutesMap() {
    return this.routes.reduce((map, route) => {
      map[route.path] = route.component
      return map
    }, {})
  }
}

NueRouter.install = (Vue) => {
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
        Vue.prototype.$route = Vue.prototype.$router.routeInfo
        vue.util.defineReactive(this, 'xxx', this.$router)
      }
    }
  })

  Vue.component('router-link', {
    props: {
      to: String
    },
    render() {
      let mode = this._self.$router.mode
      let path = this.to
      if (mode === 'hash') {
        path = '#' + path
      }
      return <a href={path}>{this.$slots.default}</a>
    }
  })

  Vue.component('router-view', {
    render(h) {
      let routesMap = this._self.$router.routesMap
      let currentPath = this._self.$route.currentPath
      let currentComponent = routesMap[currentPath]
      return h(currentComponent)
    }
  })
}


export default NueRouter
