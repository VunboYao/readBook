import { PureComponent, createRef } from 'react'

class App extends PureComponent {
  state = {
    isHot: false,
  }

  callBackRef = null

  yaoRef = createRef()

  getRef(el) {
    this.callBackRef = el
  }

  getDOM() {
    /*
    * 第一种
    * 1.字符串形式，已废弃
    * 2.废弃原因：
    *   - 由于无法获取 this, 需要 react 跟踪当前组件的渲染，导致速度慢
    *   - 无法库中如果赋值了re，则用户无法覆盖。不可组合
    *   - 由当前的执行组件决定。意味着使用通用的 渲染回调模式 ,错误的组件将拥有引用（http://blog.itpub.net/69923331/viewspace-2729645/）
    *  */
    // eslint-disable-next-line react/no-string-refs
    console.log(this.refs.yao)

    /*
    * 第二种
    * 1. 通过createRef方法创建好ref对象，将创建后的对象绑定到目标元素上
    * 2. 通过 current 获取节点信息
    *  */
    console.log(this.yaoRef.current)

    /*
    * 第三种：回调函数形式
    * 1.声明一个接收ref的变量
    * 2.通过回调函数方式赋值，函数中接收 React 组件实例或 HTML DOM元素作为参数
    * 注意点：
    * 如果 ref 回调函数是以内联函数的方式定义的，更新过程中会执行2次，第一次传入nul，然后第二次传入参数 DOM 元素
    * 因为 每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref(设置为null) 并设置新的。
    * 通过设置成 class 的绑定函数的方式可以避免上述问题，大多数情况是无关紧要
    *  */
    console.log(this.callBackRef)
  }

  showData() {
    this.setState({
      isHot: !this.state.isHot,
    })
  }

  render() {
    return (
      <div>
        {/* eslint-disable-next-line react/no-string-refs */}
        <h2 ref="yao">字符串形式：已废弃</h2>
        <h2 ref={this.yaoRef}>createRef形式</h2>
        <h2 ref={(e) => { this.callBackRef = e; console.log(e) }}>回调函数内联形式</h2>
        <h2 ref={el => this.getRef(el)}>回掉函数class的绑定函数</h2>

        <button onClick={e => this.getDOM(e)}>GetDom</button>
        <button onClick={e => this.showData(e)}>UpdatePage</button>
      </div>
    )
  }
}

export default App
