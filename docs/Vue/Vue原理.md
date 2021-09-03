# Vue-Router



1.vue-cli最新的安装方式

2.Vue.use?=>引入插件、注册插件=> install方法，行参Vue的构造函数

- Vue.use的用法
  - 安装Vue.js插件。如果插件是一个对象，必须提供**install**方法。如果插件是一个函数，他会被作为install方法。**install方法调用时，会将Vue作为参数传入**
  - **该方法需要在调用new Vue()之前被调用**
  - Vue.js的插件应该暴露一个install方法，第一个参数是**Vue构造器， 第二个参数是一个可选的选项对象**

3.runtime-only,运行时版本

- Vue的编译渲染过程
  - template => ast => render函数 => VDom => 真实DOM
    - 先将template解析(parse)成抽象语法树AST
    - 将AST编译(compiler)成render函数
    - 将render函数渲染(render)成虚拟DOM
    - 最后将虚拟DOM渲染成真实DOM

- runtime-compiler的步骤
  - template => ast => render函数 => VDOM => 真实DOM
- runtime-only的步骤
  - render函数=>VDom=>真实DOM

4.render返回一个虚拟dom

5.this.$slots.**响应性：否、只读、**

	- **插槽分发的内容**
	- **插槽分发的内容**

6.render可直接渲染组建

7.Vue.util.defineReactive

8.Vue.mixin()

- **全局注册混入**。影响注册之后的所有创建的每个Vue实例。

9.route.matched()

10.vm.$set

- 向响应式对象中添加一个property，并确保这个新propery同样是响应式的，且触发视图更新
- **注意对象不能时Vue实例，或者Vue实例的根数据对象**

11.嵌套路由的实现方式

- router-view深度标记
- 路由匹配时获取代表深度层级的matched数组

## Vuex

1.存取器

