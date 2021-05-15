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

1. `constructor`，执行构造器
2. `componentWillMount()`，组件将要挂载
3. `render()`，初始化
4. **`componentDidMount()`，组件挂载后**

## 组件更新

**setState触发**

1. `shouldComponentUpdate(nextProps, nextState)`，是否组件更新 ? 必须返回true/false
2. `componentWillUpdate(nextProps, nextState)`,  组件将要更新
3. `render()`，执行渲染
4. `componentDidUpdate(nextProps, nextState)`，组件更新完成。**禁止套娃**

## 强制更新

**`forceUpdate()`触发**

1. `componentWillUpdate(nextProps, nextState)`,  组件将要更新
2. `render()`，执行渲染
3. `componentDidUpdate(nextProps, nextState)`，组件更新完成

## 卸载组件

**`ReactDOM.unmountComponentAtNode(document.getElementById('root'))`触发**

- **`componentWillUnmount()`**, 组件即将卸载。**清理定时器，收集数据通知后端系统等。**

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
4. B-`componentWillReceiveProps()`, 从父组件接收到的Props
   - **在第二次触发变更时才会触发该钩子**
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

**`getDerivedStateFromProps(props, state)`**

- **静态方法： `static getDerivedStateFromProps(props, state){}`**
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

NavLink可以实现路由链接的高亮，通过activeClassName指定样式名

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

**借助this.prosp.history对象上的API对操作路由跳转、前进、后退**

- `this.prosp.history.push()`
- `this.prosp.history.replace()`
- `this.prosp.history.goBack()`
- `this.prosp.history.goForward()`
- `this.prosp.history.go()`

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

