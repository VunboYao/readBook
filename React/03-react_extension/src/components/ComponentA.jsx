import React, { PureComponent } from 'react'

export default class index extends PureComponent {
  state = {
    infoToB: 'i am A info',
    userList: [
      { id: '001', name: 'Yao' },
      { id: '002', name: 'Vunbo' },
      { id: '003', name: 'George' },
    ],
  }
  emitB = (params) => {
    window.MyEvent.emit('someEvent', this.state.infoToB)
  }
  render() {
    return (
      <div>
        <h3>i am component A</h3>
        <button onClick={this.emitB}>触发B组件的更新数据</button>
        {this.state.userList.map(item => {
          return <p key={item.id}>{item.name}</p>
        })}
      </div>
    )
  }
}
