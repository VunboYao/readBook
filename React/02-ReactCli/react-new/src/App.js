import { Component } from 'react'
import './App.css'
import Header from './components/header/header.jsx'
import Body from './components/body/body'
import Footer from './components/footer/footer'
export class App extends Component {
  state = {
    showFooter: true,
    count: 0
  }
  myFun(...args) {
    console.log(args, 'fatherCom get some msg from sonComponet ');
  }
  onMountCom() {
    this.setState({showFooter: !this.state.showFooter})
  }
  handleCount() {
    let { count } = this.state
    // TODO: 回调函数形式
    this.setState((state, props) => {
      console.log(state, props);
      return { count: ++count }
    })
    // TODO: 对象形式直接修改，默认异步的
    this.setState({
      count: count + 1
    })
    this.setState({
      count: count + 1
    })
  }
  render() {
    const { showFooter, count } = this.state
    return (
      <div>
        <Header fatherFn={this.myFun.bind(this)} name={'大头'} age={2}/>
        <Body />
        {showFooter ? <Footer/> : ''}
        <button onClick={() => this.onMountCom()}>unmountFooterCom</button>
        <h3>count: {count}</h3>
        <button onClick={() => this.handleCount()}>SetState连续触发，合并现象</button>
      </div>
    )
  }
}

export default App
