import { Component } from 'react'
import './footer.css'
// TODO: 引用该库
import { EventEmitter } from 'events'
const eventBus = new EventEmitter()
export default class Footer extends Component {
  state = {
    footerMsg: 'i am footer',
  }
  // TODO：组件挂载后，注册事件监听器
  componentDidMount() {
    eventBus.addListener('btnClick', this.handerClick.bind(this))
    eventBus.addListener('btnClick2', this.demoHandler.bind(this))
  }
  // TODO: 组件即将卸载的时候，将监听事件移除
  componentWillUnmount() {
    eventBus.removeListener('btnClick', this.handerClick.bind(this))
    console.log(eventBus)
  }
  demoHandler() {}
  handerClick(...args) {
    this.setState(state => {
      return { footerMsg: args[0] }
    })
    console.log(args, '父级参数获取')
  }
  render() {
    return (
      <>
        <div className={'footer'}>{this.state.footerMsg}</div>
        <FooterSon />
      </>
    )
  }
}

class FooterSon extends Component {
  // TODO: 触发事件，事件名称、参数
  emitHandler() {
    eventBus.emit('btnClick', 'footerSon')
  }
  render() {
    return (
      <h3>
        <button onClick={() => this.emitHandler()}>ChangeFatherContent</button>
      </h3>
    )
  }
}
