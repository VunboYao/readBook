# HelloReact

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

- props是只读的

# 事件绑定

- 组件的render(), 在组件的原型对象上，供实例使用
- 组件中的render方法中的this为组件实例对象
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

