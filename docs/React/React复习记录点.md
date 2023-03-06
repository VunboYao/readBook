## 1. React开发的三个依赖包是什么？分别有什么作用？

- React: 包含react所必须的核心代码
- React-DOM: react渲染在不同平台所需要的核心代码
- Babel：将jsx转换成 react代码的工具

## 2. React如何封装组件，组件里面包含哪些内容？

- 函数组件：接收唯一带数据的props对象，并返回一个React元素
- class组件：类名大写，继承自React.Component，必须有一个render方法，返回一个React元素

## 3. 在进行函数绑定时，如何进行this关键字的绑定？

- 函数调用时，通过bind绑定this
- 函数声明时，使用箭头函数
- 通过在构造函数中，手动通过bind的方式来修改监听方法中的this
- 事件绑定时，手动绑定一个箭头函数，再通过箭头函数的函数体手动调用监听的方法

## 4. React如何进行列表数据的展示？回顾数组的常见高阶函数

- map、for方法拼接DOM
- map表达式

常见的高阶函数

- map
- filter
- some
- every
- forEach
- slice
- Splice

## 5. JSX如何绑定数据？如何绑定内容、属性，有哪些规则？

- `属性/内容=${value}`
- 规则
  - 定义虚拟DOM时，不要写引号
  - 标签中混入JS表达式时要用{}
  - 样式的类名指定用className
  - style内联样式，要用 style={{key:value}}的形式
  - 只有一个根标签
  - 标签语法必须闭合或者自闭和

## 6. JSX 绑定事件，this绑定有哪些规则？如何给函数传递参数？

- 普通绑定 - `onClick={this.btnClick}` - 在内部是独立函数调用,所以this为undefined

- 函数调用时，通过bind绑定this：`onClick={this.HandleClick.bind(this)}`
- 函数声明时，使用箭头函数:`onClick={this.HandleClick}`,`HandleClick=() => {}`
- 通过在构造函数中，手动通过bind的方式来修改this:`this.HandleClick=this.HandleClick.bind(this)`
- 事件绑定时，手动绑定一个箭头函数:`onClick={() => this.HandleClick()}`

如何传递参数：

- event参数的传递：`onClick={event => this.HandleClick(event)}`
- 额外参数的传递：`onClick={event => this.HandleClick(event, 'http', 18)}`

## 7. JSX的代码是如何被编译为React代码的？它的本质是进行什么操作？

- 通过babel进行转换
- 本质是React.createElement(component, props, ...children)函数的语法糖

## 8. 什么是虚拟DOM？虚拟DOM在React中起到什么作用？

以js对象的方式创建描述DOM树的结构，这个对象树称为虚拟DOM

- 虚拟DOM diff
- 跨平台渲染
- 声明式编程
  - 只需要告诉React希望让UI是什么状态
  - React来确保DOM和状态状态是匹配的
  - 不需要直接进行DOM操作，就可以从手动更改DOM、属性操作、事件处理中解放出来


## 9. React组件可以如何划分？分别有哪些不同的概念？

- 根据组件定义方式：函数组件和类组件
- 根据组件内部是否有状态需要维护：无状态组件和有状态组件
- 组件的不同职责：展示型组件和容器型组件

函数组件、无状态组件、展示型组件主要关注UI的展示

类组件、有状态组件、容器型组件主要关注数据逻辑

## 10. React 重要的生命周期有哪些？分别列出它们的作用

- componentDidMount:组件已经挂载
- componentDidUpdate: 组件已更新
- componentWillUnmount: 组件即将被移除
- Constructor: 初始化内部的state，为事件绑定this
- getDerivedStateFromProps: state的值源于props时使用，返回一个对象来更新state
- getSnapshotBeforeUpdate: React更新DOM之前回调的一个函数，可以获取DOM更新前的一些信息
- shouldComponentUpdate: 性能优化，是否需要更新

## 11. React 中如何实现组件间的通信？父传子？子传父？

- 父组件：**通过属性=值**的形式传递给子组件
- 子组件通过**props**参数来获取父组件传递过来的数据
- 父传子，通过props传递
- 子传父，通过props传递一个函数给子组件，子组件调用传递过来的方法，并将属性传入。

## 12. React 中有插槽的概念吗？如果没有，如何实现插槽的效果？

- 组件通过props的children属性实现插槽，但如果只传递一个插槽，则不适用
- props属性传递React元素，通过将需要插入的元素转换为react元素，以props属性的方式传入

## 13. 非父子组件的通信有哪些方式？分别有什么作用？

- Context, 顶级标签赋值，后续子孙元素可以直接获取value
  - 创建context
  - 在需要使用的组件，导入context
  - 使用<context.Provider>包裹后代组件
  - 1.在需要使用的后代组件引入context
    - xxx.contextType = context
    - 在render方法中可以通过this.context拿到传递过来的值
  - 2.通过<context.Consumer>可以从不同的context中获取数据，函数中获取Provider的数据.通过value拿到值
- EventBus
- Redux

## 14. React 的 setState 是同步的还是异步的？ React18中是怎么样的？

- 异步，批量更新
- setTimeout和原生DOM事件中，是同步的
- React18中，是异步。如果希望同步拿到，需要使用flushSync操作

## 15. 什么是 SCU优化？类组件和函数组件分别如何进行SCU的优化？

- 通过shouldComponentUpdate生命周期监测，比对数据是否需要更新，进而触发render的重新渲染
- 类组件：PureComponent组件
- 函数组件：Memo高阶函数调用

## 16. React为什么要强调不可变的力量？如何实现不可变的力量？

- 保证setState赋值新数据时能够触发render的重新渲染
- 针对数组、对象等数据操作时，应该赋值一个新的对象来操作，不能保持引用地址相同
- 通常使用`...扩展运算符`拷贝，并在新的对象上进行操作

## 17. React中获取DOM的方式有哪些？

- ref字符串形式，已废弃
- createRef方法创建，current获取value
- 回掉函数形式
- 函数中通过`forwardRef方法`

## 18. 什么是受控组件和非受控组件，如何使用？

- input类标签使用了state中的数据，则是受控组件，即唯一数据来源是state中的数据

- 数据来源非state中的数据时，则是非受控组件

## 19. 什么是高阶组件？高阶组件在React开发中起到什么作用？

高阶函数HOC

- 接受一个或多个函数作为输入
- 输出一个函数
- 即高阶组件是参数为组件，返回值为新组件的函数

作用

- 应用增强
- 统一管理公共部分数据

## 20. 什么是Fragment，有什么作用？

- 代码片段，包裹一段代码，无须每次使用div进行包括，减少一层代码嵌套
- 如果需要在Fragment中使用key, 那么就不能使用短语法`<></>`

## 21. 什么是React的严格模式，在开发中有什么作用？

严格模式

- 与Fragment一样，StrictMode不会渲染任何可见的UI
- 为其后代元素触发额外的检查和警告
- 严格模式检查仅在开发模式下运行，不会影响生产构建

作用

- 过期的API、生命周期检测
- 生命周期中逻辑错误检测
- 检测废弃的findDOMNode方法
- 检测过时的contextAPI

## 22. React中如何实现过渡动画？常见的过渡动画组件有哪些？

react-transition-group组件

- CSSTransition
- SwitchTransition
- TransitionGroup

## 23. React中编写CSS的方式有哪些？各自有什么优缺点？

- 内联CSS：编写规则需要小驼峰；代码混乱
- 普通的CSS：全局混乱
- CSS_Modules：繁琐，命名不能使用连接符(-),必须是style.className的方式使用，不能动态修改某些样式
- CSS_in_JS: 便捷

## 24. styled-components 有哪些技术特点？可以完成哪些功能？

技术特点：

- 使用ES6模版字符串的语法
- 本质最终通过函数的调用，创建出一个组件，并自动添加一个不重复的class

功能

- 直接子代选择器或后代选择器，并且直接编写样式
- 可以通过&符号获取当前元素
- 直接编写伪类、伪元素等
- 可以传递props、attrs属性
- 支持样式的继承

## 25. 什么是 redux？ redux的核心思想是什么？核心的原则有哪些？

## 26. redux如何命名文件，每个文件是什么作用？

## 27. redux如何和react结合在一起？如何共享数据，如何进行action操作？

##

##

##

##

##

##

##

##

##