import React, { PureComponent } from 'react'

export default class index extends PureComponent {
  state = {
    /* userList: [
      { id: '001', name: 'Yao' },
      { id: '002', name: 'Vunbo' },
      { id: '003', name: 'George' },
    ], */
    userList: 'demo'
  }
  render() {
    return (
      <div>
        <h2>i am ComA</h2>
        {this.state.userList.map(item => {
          return <p key={item.id}>{item.name}</p>
        })}
      </div>
    )
  }
}
