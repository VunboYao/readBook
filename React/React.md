HelloReact

```react
// JSX创建虚拟DOM
const VDOM = (
    <h1 id="title">
        <span>Hello, React</span>
    </h1>
)

// JS虚拟DOM创建
// React.createElement(标签名，{属性id,class}, 内容[标签级则React.createElement(标签名,{属性}, 内容)])
const VDOM = React.createElement('h1', { id: 'title' }, React.createElement('span', {}, 'Hello React'))
ReactDOM.render(VDOM, document.getElementById('APP'))
```

# 虚拟DOM

1. 本质是Object类型的对象（一般对象）
2. 虚拟DOM比较“轻”，真是DOM比较“重”, 因为虚拟DOM是React内部使用，无需真实DOM上那么多的属性
3. 虚拟DOM最终会被React转化为真实DOM，呈现在页面上

# JSX语法规则

1. 定义虚拟DOM时，不要写引号
2. 标签中混入JS表达式时要用**`{}`**
3. 样式的类名指定不要用`class`, 要用**`className`**
4. 内联样式，要用 **`style={{key:value}}`**的形式去写
5. 只有一个根标签。
   1. 代码片段元素**`<React.Fragment key={item.id}></React.Fragment>`， 目前唯一支持key属性**
   2. 短语法：**`<></>`, 但不支持key或属性**
6. 标签必须闭合或者自闭合
7. 标签首字母
   1. 若小写字母开头，则将该标签转为html中同名元素。若html中无该标签对应的同名元素，则报错
   2. 若大写字母开头， react就去渲染对应的组件，若组件没有定义，则报错

# 注意点

## 区分js表达式与js语句(代码)

1. 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
   - a
   - a+b
   - demo(1)
   - arr.map()
   - Function test (){}
2.  语句（代码）
   - if（）{}
   - for（）{}
   - switch（）{}
3. **JSX中只能写js表达式**

## for循环语句

```react
<ul>
    {
        arr.map(item => {
            return <li key={item.id}>{item}</li>
        })
    }
</ul>
```

# 组件

## 函数式组件

- this指向undefined.默认指向严格模式
- 需要 return 虚拟dom
- 注册组册时，需要首字母大写，同时自闭合

## 类式组件

- constructor 中原型方法通过bind绑定this

- 方法中通过setState进行更新，是一种数据合并

- constructor构造器只执行一次

- render 调用n + 1次

## state-状态机

state是组件对象最重要的属性，值是对象（可包含多个key-value的组合）

- 组件中render方法中的this为组件实例对象

- 组件中自定义的方法中this为undefined，如何解决？
  - 强制绑定this: 通过函数对象的bind()
  - **箭头函数**

- 状态数据，不能直接修改或更新

- **对象式状态改变，setState是异步的**

- 更改方式：

  - 直接修改：`this.setState({ stateVariable: value }, [callback])`

  - 返回一个状态改变对象 : `this.setState(updater(state, props), [callback])`

    ```react
    this.setState((state,props) => {
        return {count: state.count + 1}
    })
    ```

## props

**`array、bool、func、number、object、string、symbol`**

```react
// 限制属性
Person.propTypes = {
    name: PropTypes.string.isRequired, // 字符串：必输
    sex: PropTypes.string, // 字符串
    age: PropTypes.number, // 数字
    speak: PropTypes.func // 函数
}
// 定义默认值
Person.defaultProps = {
    sex: 'female',
    age: 18
}

// ============================简写方式===============================
import PropTypes from 'prop-types'
class Person extends React.Component {
    // 限制属性
    static propTypes = {
        name: PropTypes.string.isRequired, // 字符串：必输
        sex: PropTypes.string, // 字符串
        age: PropTypes.number, // 数字
        speak: PropTypes.func // 函数
    }
    // 定义默认值
    static defaultProps = {
        sex: 'female',
        age: 18
    }

    // 状态属性
    state = {}

    render() {
        const { name, age, sex } = this.props
        return (
            <ul>
                <li>name: {name}</li>
                <li>age: {age + 1}</li>
                <li>sex: {sex}</li>
            </ul>
        )
    }
}
```

- **`props`**是只读的

# 事件绑定

- 组件的`render()`, 在组件的原型对象上，供实例使用
- 组件中的`render`方法中的this为组件实例对象
- class式组件中的方法注册在组件的原型上

## 类中方法this的指向

- 实例调用，则方法中的this指向类的实例
- 若无`fun()`调用，赋值语句给第三方变量，则属于直接调用
- 类中默认开启严格模式，直接调用方法则返回undefined。
- **react中的`{this.onClick=handleClick}`方法赋值语句就是直接调用**.提取出来单独使用，this 会指向该方法运行时所在的环境

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  speak () {
    console.log(this)
  }
}
const student = new Person('Yao', 20)
student.speak() // Person {name: "Yao", age: 20} 实例调用
const x = student.speak // 方法指向到x， class中默认开启严格模式
x() // undefined
```

# ref

## 字符串形式(废弃)

```react
class Person extends React.Component {
    showData = () => {
        console.log(this.refs.inputNode.value)
    }
    render(){
        return (
            <>
            	<input ref="inputNode" placeholder="Please input your value" />
            	<button onClick={this.showData}>Confirm</button>
            </>
        )
    }
}
```

## 回调函数形式

```react
// 内联回调形式
class Person extends React.Component {
    showData = () => {
        console.log(this.inputNode.value)
    }
    render() {
        return (
            <div>
                <input
                    ref={c => (this.inputNode = c)}
                    placeholder='Please input your value'
                    />
                <button onClick={this.showData}>Confirm</button>
            </div>
        )
    }
}

// 回调函数的问题
class Person extends React.Component {
    state = {
        isHot: false,
    }
    showData = () => {
        this.setState({ isHot: !this.state.isHot })
    }
    render() {
        return (
            <div>
                <h2>Today is {this.state.isHot ? 'hot' : 'cold'}</h2>
                <input
                    ref={c => {
                        this.inputNode = c
                        console.log('这里会被执行更新2次', c)
                    }}
                    placeholder='Please input your value'
                    />
                <button onClick={this.showData}>Confirm</button>
            </div>
        )
    }
}

/*
第一次挂载：这里会被执行2次 <input placeholder="Please input your value">
点击Confirm更新时：
第一次打印：这里会被执行更新2次 null
第二次打印：这里会被执行更新2次 <input placeholder="Please input your value">
*/

// 内联形式调用：更新过程中会被执行两次，第一次传入参数null, 然后第二次会传入参数DOM元素。因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref (设置为null) 并且设置新的。

// 回调绑定只会执行一次
// 将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。
```

## createRef()

```react
class Person extends React.Component {
    state = {
        isHot: false,
    }
    /* 设置ref值 */
    inputNode = React.createRef()
    showData = () => {
        this.setState({ isHot: !this.state.isHot })
        console.log(this.inputNode.current.value) // 取ref中的值
    }
    render() {
        return (
            <div>
                <h2>Today is {this.state.isHot ? 'hot' : 'cold'}</h2>
                {/*引用ref值*/}
                <input
                    ref={this.inputNode}
                    placeholder='Please input your value'
                    />
                <button onClick={this.showData}>Confirm</button>
            </div>
        )
    }
}
```

# 事件对象

- 通过`onXxx`属性指定事件处理函数（**大小写问题**）
  - React使用的是自定义（合成）事件，而不是使用原生的DOM事件——为了更好的兼容性
  - React中的事件是通过委托方式处理的（委托给组件最外层的元素）——为了高效
- 通过`event.target`得到发生事件的DOM元素对象——**不要过度使用Ref**

# 生命周期(旧)

![1621051906478](..\React\react生命周期(旧).png)

## 初次挂载

**`ReactDOM.render()`触发， 挂载**

1. `constructor`，执行构造器。**仅在挂载时执行一次**
2. `componentWillMount()`，组件将要挂载。**仅在挂载时执行一次**
3. `render()`，初始化
4. **`componentDidMount()`，组件挂载后**。**仅在挂载时执行一次**

## 组件更新

**setState触发、父组件更新触发的更新**

1. `shouldComponentUpdate(nextProps, nextState)`，是否组件更新 ? 必须返回true/false
2. `componentWillUpdate(nextProps, nextState)`,  组件将要更新. 可处理不涉及真实 DOM 的操作
3. `render()`，执行渲染
4. `componentDidUpdate(nextProps, nextState)`，组件更新完成。**禁止套娃**。可处理真实 DOM 操作。**也可执行作为子组件更新完毕的标志通知父组件**

## 强制更新

**`forceUpdate()`触发**

1. `componentWillUpdate(nextProps, nextState)`,  组件将要更新
2. `render()`，执行渲染
3. `componentDidUpdate(nextProps, nextState)`，组件更新完成

## 卸载组件

**`ReactDOM.unmountComponentAtNode(document.getElementById('root'))`触发**

- **`componentWillUnmount()`**, 组件即将卸载。**清理定时器，收集数据通知后端系统等。**
- 也可通过父级移除子组件，进行子组件卸载

# 父子组件

## 初次挂载

1. A-`constructor`，执行构造器
2. A-`componentWillMount()`，组件将要挂载
3. A-`render()`，初始化
4. B-`constructor`，执行构造器
5. B-`componentWillMount()`，组件将要挂载
6. B-`render()`，初始化
7. **B-`componentDidMount()`，组件挂载后**
8. **A-`componentDidMount()`，组件挂载后**

## 组件更新

1. A-`shouldComponentUpdate(nextProps, nextState)`，组件更新 ? 必须返回true/false
2. A-`componentWillUpdate(nextProps, nextState)`,  组件将要更新
3. A-`render()`，执行渲染
4. **B-`componentWillReceiveProps(nextProps)`, 从父组件接收到的Props**
   - **在第二次触发变更时才会触发该钩子**
   - **不是由 props 的变化触发的，而是由父组件的更新触发的**
5. B-`shouldComponentUpdate(nextProps, nextState)`，组件更新 ? 必须返回true/false
6. B-`componentWillUpdate(nextProps, nextState)`,  组件将要更新
7. B-`render()`，执行渲染
8. B-`componentDidUpdate(nextProps, nextState)`，组件更新完成。**禁止套娃**
9. A-`componentDidUpdate(nextProps, nextState)`，组件更新完成。**禁止套娃**

## 卸载组件

- A-`componentWillUnmount()`
- B-`componentWillUnmount()`

# 生命周期（新）

![1621051906478](..\React\react生命周期(新).png)

## 将要过期的API

- `componentWillMount`
- `componentWillReceiveProps`
- `componentWillUpdate`
- 新版本中需要增加前缀: `UNSAFE_`

## 新的API

**`getDerivedStateFromProps(props, currentState)`**

- **静态方法： `static getDerivedStateFromProps(props, currentState){}`**
- 返回一个`state`对象或`null`
  - 返回一个固定的`state`对象， 则后续无法更改状态对象。

**`getSnapshotBeforeUpdate(preProps, preState)`**

- 返回一个`value`或`null`
- 返回值传递给`componentDidUpdate(preProps,preState,SnapshotValue )`

## 初次挂载

**ReactDOM.render()触发，初次渲染**

1. `constructor`
2. `getDerivedStateFromProps(props, state)`
3. `render()`
4. `componentDidMount()`

## 更新阶段

**由组件内部this.setState()或父组件重新render触发**

1. `getDerivedStateFromProps(props, state)`
2. `shouldComponentUpdate(nextProps, nextState)`，组件更新 ? 必须返回true/false
3. `render()`
4. `getSnapshotBeforeUpdate(prevProps, prevState)`
5. `componentDidUpdate(prevProps, prevState, snapshot)`

## 卸载组件

**由ReactDOM.unmountComponentAtNode()触发**

- `componentWillUnmount()`

# 路由

## 路由基本使用

- 导航区: `<Link to='/xxxx'>主页<Link>`
- 展示区写`Route`标签进行路径匹配：`<Route path='/xxx' component={Home}/>`
- `<App>`的最外层包裹一个`<BrowserRouter`或`<HashRouter>`

## 路由组件与一般组件

1. 写法不同
   - 一般组件: `<Demo />`
   -  路由组件: `<Route path="/demo" component={Demo}/>`

2. 存放位置不同
   - 一般组件：components
   - 路由组件：pages

3. 接收到的props不同：
   - 一般组件： 写组件标签时传递了什么，就能收到什么
   - 路由组件：接收三个固定的属性
     - history:
       - go: f go(n)
       - goBack: f goBack()
       - goForward: f goForward()
       - push: f push(path, state)
       - replace: f replace(path, state)
     - location:
       - pathName: '/about',
       - search: '',
       - state: undefined
     - match:
       - params: {},
       - path: '/about',
       - url: '/about'

## NavLink

NavLink可以实现路由链接的高亮，通过activeClassName指定样式名，默认`active`

```react
// NavLink封装
import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom';
export default class MyNavLink extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <div>
        <NavLink {...this.props} />
      </div>
    )
  }
}
```

## Switch的使用

- 通常情况下，path和component是一一对应的关系。

- Switch可以提高路由匹配效率(单一匹配)。

## **多级路径刷新页面样式丢失**

- public/index.html 中 引入样式时不写 ./ 写 / （常用）
- public/index.html 中 引入样式时不写 ./ 写 %PUBLIC_URL% （常用）
- 使用HashRouter

## 路由的匹配

- 默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
- 开启严格匹配：`<Route exact={true} path="/about" component={About}/>`
- 严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

## Redirect的使用

1. 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由

2. 具体编码

   ```react
   <SWitch>
       <Route path="/about" component={About}/>
       <Route path="/home" component={Home}/>
       <Redirect to="/about"/>
   </SWitch>
   ```

## 嵌套路由

1. 注册子路由时要写上父路由的path值
2. 路由的匹配是按照注册路由的顺序进行的

## 路由组件传参

1. params参数
   - 路由链接(携带参数)：`<Link to='/demo/test/tom/18'}>详情</Link>`
   - 注册路由(声明接收)：`<Route path="/demo/test/:name/:age" component={Test}/>`
   - 接收参数：**`this.props.match.params`**

2. search参数

   - 路由链接(携带参数)：`<Link to='/demo/test?name=tom&age=18'}>详情</Link>`

   - 注册路由(无需声明，正常注册即可)：`<Route path="/demo/test" component={Test}/>`

   - 接收参数：**`this.props.location.search`**

   - 备注：获取到的search是urlencoded编码字符串，需要借助querystring解析

     ```react
     import qs from 'querystring'
     const search = this.props.location.search
     const {id, title} = qs.parse(search.slice(1))
     console.log(search, id, title)
     ```

3. state参数
   - 路由链接(携带参数)：`<Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>`
   - 注册路由(无需声明，正常注册即可)：`<Route path="/demo/test" component={Test}/>`
   - 接收参数：**`this.props.location.state`**
   - 备注：**刷新也可以保留住参数**

## 编程式路由导航

**借助this.props.history对象上的API对操作路由跳转、前进、后退**

- `this.props.history.push()`
  - params方式: this.props.history.push(`/home/message/detail/${id}/${title}`)
  - search方式：this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)
  - state 方式：this.props.history.push(`/home/message/detail`, { id, title })
- `this.props.history.replace()`
- `this.props.history.goBack()`
- `this.props.history.goForward()`
- `this.props.history.go()`

## withRouter

当某一个组件不是一个`Router`，但是需要去调用`react-router`的三个对象`history，location，match`, 通过编程式去跳转路由。利用`WithRouter`包装并暴露

```react
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component {
  goBack = () => {
    this.props.history.goBack()
  }

  goForward = () => {
    this.props.history.goForward()
  }

  goTarget = () => {
    this.props.history.go(-2)
  }
  render() {
    return (
      <div>
        <h2>Hello React</h2>
        <button onClick={this.goBack}>GoBack</button>
        <button onClick={this.goForward}>GoForward</button>
        <button onClick={this.goTarget}>Go</button>
      </div>
    )
  }
}

export default withRouter(Header)

// withRouter加工一般组件，使其具有路由组件的属性
// withRouter返回一个新的组件
```



## BrowserRouter与HashRouter的区别

1. 底层原理不一样:
   - BrowserRouter使用的是H5的history API，不兼容IE9及以下版本
   - HashRouter使用的是URL的哈希值
2. path表现形式不一样
   - BrowserRouter的路径中没有#,例如：localhost:3000/demo/test
   - HashRouter的路径包含#,例如：localhost:3000/#/demo/test
3. 刷新后对路由state参数的影响
   - BrowserRouter没有任何影响，因为state保存在history对象中
   - HashRouter刷新后会导致路由state参数的丢失！！！

4. 备注：HashRouter可以用于解决一些路径错误相关的问题

# redux

![1621051906478](..\React\redux原理图.png)

## 基础介绍

**store.js:**

- 引入redux中的createStore函数，创建一个store
- createStore调用时要传入一个为其服务的reducer，并暴露store对象

**reducer.js:**

- reducer的本质是一个函数，接收：preState,action，返回加工后的状态
- reducer有两个作用：初始化状态，加工状态
- reducer被第一次调用时，是store自动触发的
  - 传递的preState是undefined
  - 传递的action是:{type:'@@REDUX/INIT_a.2.b.4}

**constant.js：**

- 定义redux中全局常量

**action.js：**

- 明确：延迟的动作不想交给组件自身，想交给action
- 何时需要异步action：想要对状态进行操作，但是具体的数据靠异步任务返回。
- 具体编码：
  - `npm i redux-thunk`，并配置在store中
  - 创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务
  - 异步任务有结果后，分发一个同步的action去真正操作数据
  - 备注：**异步action不是必须要写的，完全可以自己等待异步任务的结果了再去分发同步action。**

## react-redux介绍

![1621051906478](..\React\react-redux模型图.png)

1. 明确两个概念
   1. UI组件:不能使用任何redux的api，只负责页面的呈现、交互等
   2. 器组件：负责和redux通信，将结果交给UI组件。
2. 如何创建一个容器组件————靠react-redux 的 connect函数
   1. **`connect(mapStateToProps,mapDispatchToProps)(UI组件)`**
   2. **`mapStateToProps`**:映射状态，返回值是一个对象
   3. **`mapDispatchToProps`**:映射操作状态的方法，返回值是一个对象

3. 备注1：容器组件中的store是靠props传进去的，而不是在容器组件中直接引入
4. 备注2：mapDispatchToProps，也可以是一个对象

## react-redux优化

1. 容器组件和UI组件整合一个文件

2. 无需自己给容器组件传递store，给`<App/>`包裹一个`<Provider store={store}>`即可。

3. **使用了react-redux后也不用再自己检测redux中状态的改变了，容器组件可以自动完成这个工作。**

   ```react
   // 原始方式。订阅App的更新
   store.subscribe(() => {
     ReactDOM.render(<App/>, document.getElementById('root'))
   })
   ```

4. `mapDispatchToProps`也可以简单的写成一个对象

5. 一个组件要和redux“打交道”要经过哪几步？

   1. 定义好UI组件---不暴露

   2. 引入connect生成一个容器组件，并暴露，写法如下：

      ```react
      connect(
          state => ({...state}), //映射状态
          {key:xxxxxAction} //映射操作状态的方法
      )(UI组件)
      ```

   3. 在UI组件中通过this.props.xxxxxxx读取和操作状态

## react-redux开发者工具的使用

1. `npm i redux-devtools-extension`

2. store中进行配置

   ```react
   // 引入redux中的核心方法
   import { createStore, applyMiddleware } from 'redux'
   
   // 获取redux异步action处理器
   import thunk from 'redux-thunk'
   
   // 引入redux-devtools-extension
   import { composeWithDevTools } from 'redux-devtools-extension'
   
   // 引入汇总后的reducer
   import Reducer from './reducers'
   
   export default createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)))
   ```

## 终极奥义

**1.入口文件中通过Provider为所有的容器组件注册Store**

```react
// index.js 入口文件
import ReactDOM from 'react-dom' // 引入DOM依赖库
import App from './App'
import { Provider } from 'react-redux' // 引入react-redux中核心方法，Provider
import Store from './redux/store'

ReactDOM.render(
  /* 用Provider包裹App, 让App的所有后代容器组件都能接收到store */
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

**2.App.js中引入相应的容器组件**

**3.redux下store.js文件的初始化**

```react
// redux/store.js
// 引入redux中的核心方法
import { createStore, applyMiddleware } from 'redux'

// 获取redux异步action处理器
import thunk from 'redux-thunk'

// 引入redux-devtools-extension
import { composeWithDevTools } from 'redux-devtools-extension'

// 引入汇总后的reducer
import Reducer from './reducers'

export default createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)
```

**4.constant.js文件下定义常量名称并暴露供给reduer与action使用**

**5.reducers的建立**

- 多个共享数据状态，则使用多个文件；**通过`redux`中的`combineReducers`方法合并为一个对象并暴露**

  ```react
  // redux/reducers/index.js
  import { combineReducers } from 'redux'
  // 引入reducer
  import Count from './Count'
  import Person from './Person'

  export default combineReducers({ Count, Person })
  ```

- reducer.js初始化。引入常量，定义初始化数据，处理action

  ```react
  // redux/reducers/Count.js
  
  import { INCREMENT, DECREMENT } from '../constant'
  const initState = 0 // 声明初始化数据
  
  /* TODO: 纯函数，不能改写preState */
  export default function CountReducer(preState=initState, action) {
    const {type, data} = action
    switch (type) {
      case INCREMENT:
        return preState + data
      case DECREMENT:
        return preState - data
      default:
        return preState
    }
  }
  ```

**6.actions中引入常量，触发（dispatch）操作，变更数据**

```react
//redux/actions/Count.js

import { INCREMENT, DECREMENT } from '../constant'

export const increment = data => ({type: INCREMENT, data})
export const decrement = data => ({type: DECREMENT, data})
```

**7.引入connect生成一个容器组件，并声明一个UI组件，最终暴露connect(state, action)(UI组件)**

```react
// 引入核心库
import { Component } from 'react'

// 通过connect生成一个容器组件
import { connect } from 'react-redux'

// 引入actions
import { increment, decrement } from '../redux/actions/Count'

// 创建UI组件
class Count extends Component {
    // 通过this.props可获取connect方法中传入的state与action
    // this.props.increment(select) ...
    // this.props.Count
}

// 暴露方法
export default connect(
  // 映射状态 mapStateToProps
  state => ({ ...state }),
  // 映射操作方法 mapDispatchToProps
  {
    increment,
    decrement,
  }
)(Count)



// connect原始方式
/*
1.mapStateToProps函数返回一个对象
2.返回的对象中的key就作为传递给UI组件的props的key,value就作为传递给UI组件的props的value
3.mapStateToProps用于传递状态
*/
const mapStateToProps = state => ({ count: state })

/*
1.mapDispatchToProps函数返回的是一个对象
2.返回的对象中的key就作为传递给UI组件的props的key,value就作为传递给UI组件的props的value
3.mapStateToProps用于传递操作状态的方法
*/
const mapDispatchToProps = dispatch => {
  return {
    [INCREMENT]: num => dispatch(createIncrementAction(num)),
    [DECREMENT]: num => dispatch(createDecrementAction(num)),
    addOfAsync: (num, time) => dispatch(createIncrementAsyncAction(num, time)),
  }
}

// 暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI)
```

# 扩展

## setState

1. setState(stateChange, [callback])------对象式的setState
   - stateChange为状态改变对象(该对象可以体现出状态的更改)
   - callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
2. setState(updater, [callback])------函数式的setState
   - updater为返回stateChange对象的函数
   - updater可以接收到state和props
   - callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用
3. 总结：
   - 对象式的setState是函数式的setState的简写方式(语法糖)
   - 使用原则：
     1. 如果新状态不依赖于原状态 ===> 使用对象方式
     2. 如果新状态依赖于原状态 ===> 使用函数方式
     3. 如果需要在setState()执行后获取最新的状态数据, 要在第二个callback函数中读取

## lazyLoad

- 通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包

  ```react
  const Login = lazy(()=>import('@/pages/Login'))
  ```

- 通过`<Suspense>`指定在加载得到路由打包文件前显示一个自定义`loading`界面

  ```react
  <Suspense fallback={<h1>loading.....</h1>}>
      <Switch>
          <Route path="/xxx" component={Xxxx}/>
          <Redirect to="/login"/>
      </Switch>
  </Suspense>
  ```

## Hooks

- State Hook: React.useState()
- Effect Hook: React.useEffect()
- Ref Hook: React.useRef()

### State Hook

1. State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
2. 语法: `const [xxx, setXxx] = React.useState(initValue)`
3. useState()说明:
   1. 参数: 第一次初始化指定的值在内部作缓存
   2. 返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
4. setXxx()2种写法:
   1. setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
   2. setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值

### Effect Hook

1. Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)

2. React中的副作用操作

   1. 发ajax请求数据获取
   2. 设置订阅 / 启动定时器
   3. 手动更改真实DOM

3. 语法和说明:

   ```react
   useEffect(() => {
       // 在此可以执行任何带副作用操作
       return () => { // 在组件卸载前执行
           // 在此做一些收尾工作, 比如清除定时器/取消订阅等
       }
   }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
   ```

4. 可以把 useEffect Hook 看做如下三个函数的组合

   ```react
   componentDidMount()
   componentDidUpdate()
   componentWillUnmount()
   ```

### Ref Hook

1. Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
2. 语法: `const refContainer = React.useRef()`
3. 作用:保存标签对象,功能与`React.createRef()`一样

## Fragment

```react
<Fragment><Fragment>
<></>
// 可以不用必须有一个真实的DOM根标签了
```

## Context

一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

1. 创建Context容器对象

   ```react
   const XxxContext = React.createContext()
   ```

2. 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据

   ```react
   <xxxContext.Provider value={数据}>
       子组件
   </xxxContext.Provider>
   ```

3. 后代组件读取数据

   ```react
   //第一种方式:仅适用于类组件
   static contextType = xxxContext  // 声明接收context
   this.context // 读取context中的value数据

   //第二种方式: 函数组件与类组件都可以
   <xxxContext.Consumer>
       {
           value => ( // value就是context中的value数据
           	要显示的内容
           )
   	}
   </xxxContext.Consumer>
   ```

4. 在应用开发中一般不用context, 一般都它的封装react插件

## 组件优化

### Component的2个问题

1. 只要执行setState(),即使不改变状态数据, 组件也会重新render()
2. 只当前组件重新render(), 就会自动重新render子组件 ==> 效率低

**解决**

- 使用PureComponent： PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
- 注意：**只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false。不要直接修改state数据, 而是要产生新数据**

## render props

- Vue: 使用slot技术, 也就是通过组件标签体传入结构  `<AA><BB/></AA>`

- React
  - 使用children props: 通过组件标签体传入结构
  - 使用render props: 通过组件标签属性传入结构, 一般用render函数属性

```react
// render props
export default class Demo extends PureComponent {
  render() {
    return (
      <div className="parent">
        <h2>我是父亲组件</h2>
        {/* 需要提供插槽的组件，传入子组件时，通过render返回一个函数调用。传入需要插入的组件和属性 */}
        <A age={2} render={data => <B name={data}/>}/>
      </div>
    )
  }
}


class A extends PureComponent {
  render() {
    const {age} = this.props
    const tip = age > 18 ? 'adult' : 'baby'
    return (
      <div className="son">
        <h3>我是子组件</h3>
        {/* 默认执行函数调用，传入暴露给子组件的参数 */}
        {this.props.render(tip)}
      </div>
    )
  }
}

class B extends PureComponent {
  render() {
    console.log(this);
    return (
      <div className='grandson'>
        {/* 接收props传入的参数 */}
        <h3>我是孙组件, i am {this.props.name}</h3>
      </div>
    )
  }
}
```

## 错误边界

错误边界：用来捕获后代组件错误，渲染出备用页面

- 只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

- 使用方式： getDerivedStateFromError配合componentDidCatch

```react
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```

## 组件通信方式

- props：

  ​    (1).children props

  ​    (2).render props

- 消息订阅-发布
  
- pubs-sub、event等等
  
- 集中式管理：
  
  - redux、dva等等
- conText： 生产者-消费者模式

**组件之间的关系**

- 父子组件：props

- 兄弟组件(非嵌套组件)：消息订阅-发布、集中式管理
- 祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(用的少)

# 原理

## `JSX` 的本质： `JavaScript` 的语法扩展

- 通过 `Babel ` 将 `JSX` 语法转换为 `JavaScript` 代码。`JSX => React.createElement`
- **JSX 的本质是** `React.createElement` **这个JavaScript 调用的语法糖**

**React 选用 JSX 语法的动机**

- **JSX 语法糖允许前端开发者使用我们最为熟悉的类 HTML 标签语法来创建虚拟 DOM，在降低学习成本的同时，也提升了研发效率与研发体验**

**React.createElement**

- createElement 源码最终返回一个调用`ReactElement`执行方法，并传入相关参数

- createElement 就像是开发者和 `ReactElement` 调用之间的一个**“转换器”、一个数据处理层**
- `ReactElement` 本质是**组装**，把传入的参数按照一定的规范组装，再返回 `React.createElement`， 即返回“ 虚拟DOM”。最终由`ReactDOM.render`来渲染为真的DOM

`JSX => Babel => React.createElement<retrun ReactElement< return 虚拟DOM>> => ReactDOM.render()`

------

## **虚拟DOM：核心算法的基石**

- 组件初始化时，通过调用生命周期中的 render 方法，**生成虚拟 DOM**，再通过调用 ReactDOM.render 方法，实现虚拟 DOM 到真实 DOM 的转换
- 组件更新时，再次调用 render 方法**生成新的虚拟 DOM，借助 diff 算法定位出两次虚拟 DOM 的差异**，从而实现更新

**生命周期方法的本质：组件的“灵魂”与“躯干”**

- render(非 ReactDOM.render)，**灵魂**
  - 生成虚拟 DOM
  - 渲染工作流：组件数据改变到组件实际更新发生的过程
  - **render 在执行过程中不会去操作真实 DOM， 它的职能时把需要渲染的内容返回出来**， 真实 DOM 的渲染工作在挂载阶段由 ReactDOM.render 来承接
- 生命周期方法：“躯干”

------

## **生命周期新API**

- **`getDerivedStateFromProps` **不是 `componentWillMount`的替代品
- 初衷不是试图替换掉 `componentWillMount`, 而是试图替换掉 `componentWillReceiveProps`, 唯一目的**使用props来派生/更新state**
- **getDerivedStateFromProps 是一个静态方法**。静态方法不依赖组件实例而存在，因此在这个方法内部是**访问不到this**的。
- 接收两个参数：props 和 state, 分别代表当前组件接收到的来自父组件的 props 和当前组件自身的 state；返回一个对象 或 `null`

**为什么要用getDerivedStateFromProps代替componentWillReceiveProps？**

- getDerivedStateFromProps 是作为一个试图代替 componentWillReceiveProps 的 API 而出现的
- getDerivedStateFromProps不能完全和 componentWillReceiveProps 画等号，其特性决定了我们曾经在 componentWillReceiveProps 里面做的事情，不能够百分百迁移到getDerivedStateFromProps 里

- **getDerivedStateFromProps是一个static方法，无法拿到组件实例的this，无法执行this.fetch()、不合理的 this.setState（会导致死循环的那种）这类可能会产生副作用的操作**

## **Fiber架构解析**

- Fiber 会使原本同步的渲染过程变成异步的。
- **16之前的同步渲染的递归调用栈是非常深的，无法中途打断，导致浏览器没有办法处理任何渲染之外的事情，会进入一种无法处理用户交互的状态**。最终导致卡顿甚至卡死
- **Fiber 会将一个大的更新任务拆解为许多个小任务**。每当执行完一个小任务时，**渲染线程都会把主线程交回去**，看看有没有优先级更高的工作要处理，确保不会出现其他任务被“饿死”的情况，进而避免同步渲染带来的卡顿

- 渲染线程不再“一去不回头”，而是**可以被打断**的，这就是所谓的“异步渲染”

**生命周期工作流**

![1621051906478](..\React\lifecycle.png)

- render阶段：纯净且没有副作用，可能会被 React 暂停、终止或重新启动
- pre-commit阶段：可以读取DOM
- commit 阶段：可以使用 DOM，运行副作用，安排更新

**总的来说，render 阶段在执行过程中允许被打断，而 commit 阶段则总是同步执行的**

- 在 Fiber 机制下，**render阶段是允许暂停、终止和重启的， 因此 render 阶段的生命周期都是有可能被重复执行的**
  - componentWillMount
  - componentWillUpdate
  - componentWillReceiveProps
  - **以上生命周期都处于 render 阶段，都可能重复被执行**

- 在 componentWill 开头的生命周期里，可能做的事情包括不限于：
  - setState()
  - Fetch 发起的异步请求
  - 操作真是DOM
- **完全可以转移到其他生命周期（尤其是 componentDidxxx）里去做**
  - 异步请求再怎么快也快不过（React 15 下）同步的生命周期。componentWillMount 结束后，render 会迅速地被触发，所以说首次渲染依然会在数据返回之前执行

- **在 Fiber 带来的异步渲染机制下，可能会导致非常严重的 Bug。**
  - 由于 render 阶段里的生命周期都可以重复执行，在 componentWillxxx 被打断 + 重启多次后，就会发出多个付款请求

