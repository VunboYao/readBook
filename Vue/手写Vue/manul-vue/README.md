## vue-router 实现思路

- 需要实现一个 install 方法。进行插件的注册

  - 默认传入的参数为 Vue 的构造函数
  - 执行全局组件的注册：router-link 与 router-view

- router-link 通过 props 中传入的 to 属性，生成一个 a 标签

  - render 方法通过 h(createElement)函数，生成虚拟 dom
  - this.\$slots.default

- router-view

  - 通过 hash 值监听当前的路由。匹配对应的组件
  - 利用 Vue.mixin。在 beforeCreate 阶段，判断是否在 Vue 组件的根实例，包含 router 选项，则注册全局的\$router = this.options.router 获取到 VueRouter 的实例
  - 通过 this.\$router.options.routes 去查找与 this.current 对应的路由对象
  - 返回对应的 component

- VueRouter 构造函数中保存对应的 options 选项。获取 routes
  - 监听 hashchange，获取到当前的 hash 值。
  - 利用 Vue.util.defineReactive 对 this.current 值进行响应式绑定
