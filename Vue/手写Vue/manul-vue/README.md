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

## 项目管理

- 坚实的基础
  - 界定项目成员的职位和责任
  - 了解客户的具体需求
- 项目管理资源
  - 确定项目需求
  - 明确项目角色，合理分配资源
- 项目里程碑
  - 项目的生命周期。启动、计划、执行和结尾
- 有效的沟通
  - 相互了解，互相及时了解项目信息和变动情况
- 核心优势
  - 认清团队成员的优势所在。合理分配任务
- 项目管理工具
  - 记录报告、文件共享到输入信息、有效沟通到实现一致协作
- 风险管理
- 可交付的成果
- 评估总结

## Vuex 实现思路

- 实现 Store 类

  - 维护响应式 state,暴露 commit/dispatch
  - install: 注册 store

- install 中通过 mixin, 注册全局的\$store
- 利用 new Vue 将 state 中的数据进行响应式处理
  - 将 new Vue 中的 state 做处理：变为自有属性，不被代理
  - 通过存取器 get/set 指定只能通过 state 来访问数据
- commit
  - 限制通过 mutations 中的方法来触发
- dispatch
  - 限制通过 actions 中的方法来触发。this 绑定问题，箭头函数/bind
- getters
  - 使用方式：可以通过\$store.getters.doubleState 来使用。因此向用户暴露一个 getters 对象
  - 利用 new Vue 中的 computed 计算属性来实现数据的计算
  - 从用户传入的 options 中取得 warpGetters。遍历获取用户定义的 getter
  - computed 计算属性中的函数是无参数的；store 中 getters 里的函数是有参数 state 的。进行高阶函数封装，将 getters 中的方法转换为 computed 可以使用的无参数形式
  - 为 getters 定义只读属性

## Vue 生命周期

- beforeCreate
  - vue 实例相关属性初始化.$parent,$children,\$refs 等声明
  - 自定义组件的事件监听
  - 插槽的处理；\$createElement 的定义
- created： 组件数据和状态的初始化
  - inject 注入的处理
  - props/methods/data/computed/watch 的初始化
  - provide 的处理
  - 开始执行挂载
- beforeMount: 判断是否有 template 选项/el 选项。
- mounted
  - 声明组件更新函数。执行 render 函数，生成 vdom.同时为组件声明一个 watcher 监听函数
  - 对虚拟 dom 进行 patch 补丁操作。将 vdom=>真实 dom。同时把新的 dom 放置到 el 元素的旁边。同时删除旧的 el 元素
  - 因此此时可以对 dom 进行操作
- beforeUpdate: 数据更新前被调用。可以更改数据状态
- updated：由于数据的更改对 vdom 进行 patch 补丁比对操作。避免在此期间更改状态。会导致无限循环问题。
- beforeDestroy：实例销毁之前调用。如关闭定时器，关闭 dom 监听操作等。
- destroyed: 移除对 data 数据的监听，销毁所有的监听器

## Vue 源码阅读

- entry-runtime-with-compiler.js
  - 打包入口
  - 处理 template 或者 el 选项，处理编译这件事
- src\platforms\web\runtime\index.js
  - 安装补丁函数：vdom => dom
  - 实现\$mount： vdom => dom => append
- src\core\index.js
  - 构造函数声明
  - 实例属性和方法的声明
- src\core\instance\init.js
  - 初始化
- src\core\instance\lifecycle.js
  - 真正的挂载
