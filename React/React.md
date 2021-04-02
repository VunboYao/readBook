# HelloReact

```react
const VDOM = (
    <h1 id="title">
        <span>Hello, React</span>
    </h1>
)

ReactDOM.render(VDOM, document.getElementById('APP'))
```



# 虚拟DOM

1. 本质是Object类型的对象（一般对象）
2. 虚拟DOM比较“轻”，真是DOM比较“重”, 因为虚拟DOM是React内部使用，无需真实DOM上那么多的属性
3. 虚拟DOM最终会被React转化为真实DOM，呈现在页面上

# JSX语法规则

1. 定义虚拟DOM时，不要写引号
2. 标签中混入JS表达式时要用{}
3. 样式的类名指定不要用class, 要用className
4. 内联样式，要用 style={{key:value}}的形式去写
5. 只有一个根标签
6. 标签必须闭合
7. 标签首字母
   1. 若小写字母开头，则将该标签转为html中同名元素。若html中无该标签对应的同名元素，则报错
   2. 若大写字母开头， react就去渲染对应的组件，若组件没有定义，则报错

