# Vue 面试指南

 清除一个定时器

- beforeDestroy 中销毁， 需要保存一个 timer，如果可以最好只有生命周期钩子可以访问到它。被视为杂物变量。
- 推荐：通过 $once 这个事件侦听器， 在定义完定时器之后的位置来清除定时器

    ```js
    mounted(){
        const timer = setInterval(()=>{
            console.log(1)
        },1000)
        this.$once('hook:beforeDestroy',()=>{
            clearInterval(timer)
        })
    }
    ```

## 组件间传值

### 父组件获取子组件数据

- $children, 返回值是数组。无法确定子组件的顺序，不是响应式
- $refs 获取特定子组件的数据

### 子组件获取父组件数据

- $parent, 与 $children相似
- props 与 emit

### inheritAttrs

- 控制子组件 html 属性上是否显示父组件提供的属性， 无论子组件上 props 是否包含的属性
- 父组件中没被需要的属性， 跟子组件本来的属性冲突的时候，则依据父组件。 如果该属性为 false, 则父组件不会覆盖子组件原来的属性

### $attrs与$listeners

- 获取到没有使用的注册属性， 如果需要，也可以继续往下传递

- 包含了父作用域中的事件监听器，传入内部组件

- `v-bind="$attrs"、v-on="$listeners"`

- ```js
  子组件： 
  <el-button
      v-bind="$attrs"
      v-on="$listeners"
    >ShowButton</el-button>
  
  父组件：
  <compon-test
      :foo.sync="bar"
      type="success"
  />
  ```

### provide / inject

- 解决过多的引用层次，子孙组件获取祖先元素的资源。

## 自定义指令

### 指令生命周期

- bind: 一旦指令附加到元素时触发
- inserted: 一旦元素被添加到父元素时触发
- update: 每当元素本身更新（但是子元素还未更新）时触发
- componentUpdate: 每当组件和子组件被更新时触发
- unbind: 一旦指令被移除时触发

### 指令参数

- 每个钩子都有 el、binding 和 vnode 参数
- binding 是一个保护传入钩子的参数对象。包括 name、value、oldValue、expression、arguments、arg 及修饰语

## vue 生命周期

- beforeCreate(): 实例创建之前，这个阶段实例的 data 和 methods 是读不到的
- created(): 实例创建之后，这个阶段已经完成数据观测，属性和方法的运算，watch/event 事件回调，mount 挂载阶段还没有开始。$el 属性目前不可见，数据并没有在 DOM 元素上进行渲染。进行 template 编译等操作， 将 template 编译为 render 函数， 有了 render 函数后才会执行 beforeMount()
- beforeMount()：在挂载开始之前被调用，相关的 render 函数首次被调用
- mounted(): 挂载之后调用，el 选项的 DOM 节点被新创建的 vm.$el 替换，并挂载到实例上去之后调用此生命周期函数， 此时实例的数据在 DOM 节点上进行渲染
- beforeUpdate()
- updated()
- beforeDestroy()
- destroyed()

## watch & computed 的区别

### computed

- 有缓存机制
- 不能接受参数
- 可以依赖其他 computed, 甚至是其他组件的 data
- 不能与 data 中的属性重复

### watch

- 可接受两个参数
- 监听时可触发一个回调， 并做一些事情
- 监听的属性必须是存在的
- 允许异步
- watch 配置：handler，deep(是否深度)，immediate(是否立即执行)

## 导航钩子

## 如何实现强制刷新组件

- v-if

    ```vue
    <hello-world v-if="update">
    <button @click="reload">Refresh</button>
    data(){
        return {
            update: true
        }
    },
    methods: {
        reload() {
            this.update = false
            this.$nextTick().then(() => {
                this.update = true
            })
        }
    }
    ```

- this.$forceUpdate()

## 解决 vue 打包后静态资源图片失效问题

- 将静态资源存放在 src 目录下

## 解决 vue 动态设置 img 的 src 不生效问题

- 动态添加 src 被当作静态资源处理，没有进行编译， 需要加上 require

## MVVM设计模式

- M:Model          数据模型（保存数据，处理数据业务逻辑）
- V: View             视图（展示数据，与用户交互）
- VM：VIew Model 数据模型和视图的桥梁
- 特点：数据的双向传递
  - M => VM => V
  - V => VM => M

- Vue中的MVVM划分
  - Vue其实是基于MVVM设计模式
  - 被控制的区域是： View
  - Vue实例对象： View Model
  - 实例对象中的data: Model

- Vue中的单向传递
  - 把 ”数据“（Model）交给 ”Vue实例对象“（View Model）， Vue实例对象将数据交给”界面“（View）

- Vue中的双向传递：v-model

## 1-组件通信

- props
- $emit / ~~$on~~
- ~~$children~~ / $parent
- $attrs/~~$listeners~~
- ref
- $root
- vuex
- provide/inject

## 2-v-if和v-for优先级

- 2 中 v-for 高
- 3 中 v-if 高
- 计算属性或者外层嵌套处理

## 3-双向绑定和使用原理



## 25-Vue性能优化方法

主要从 Vue 代码编写层面说一些优化手段，例如：代码分割、服务端渲染、组件缓存、长列表优化等

- 路由的懒加载 import，有效拆分代码尺寸，访问时异步加载
- Keep-alive 缓存：避免重复的创建组件实例，且能保存缓存组件的状态 LRU-Cache(Least recently used)
- v-show， 避免重复创建组件
- v-for，避免同时使用 v-if, vue2警告， vue3 错误。2: v-for高， 3: v-if 高
- v-once 的使用只渲染一次; v-memo 内存复用，v-for 大列表时性能优化，跳过 vnode diff 及创建， 传入空依赖数组 (v-memo="[]") 将与 v-once 效果相同
