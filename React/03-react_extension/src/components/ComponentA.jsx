import React, { PureComponent, Component } from 'react'

const AppContext = React.createContext({name: 'mafei', age: 25})
const { Provider, Consumer } = AppContext
export default class index extends PureComponent {
  state = {
    name: 'yyb',
    age: 20,
    infoToB: 'i am A info',
    userList: [
      { id: '001', name: 'Yao' },
      { id: '002', name: 'Vunbo' },
      { id: '003', name: 'George' },
    ],
  }
  emitB = params => {
    window.MyEvent.emit('someEvent', this.state.infoToB)
  }
  render() {
    const { name, age } = this.state
    return (
      <div>
        <h3>i am component A</h3>
        <button onClick={this.emitB}>触发B组件的更新数据</button>
        {this.state.userList.map(item => {
          return <p key={item.id}>{item.name}</p>
        })}
        <hr />
        <Provider value={{ name, age }}>
          <Son name={name} />
        </Provider>
      </div>
    )
  }
}

class Son extends Component {
  render() {
    return (
      <>
        <h2>我是
          <Consumer>{value => `i am ${value.name}, age is ${value.age}`}</Consumer>
        </h2>
      </>
    )
  }
}
