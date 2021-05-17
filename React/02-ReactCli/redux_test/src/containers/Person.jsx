import React, { PureComponent } from 'react'

export default class Person extends PureComponent {
  render() {
    return (
      <>
        <input type="text" placeholder="请输入你的姓名" />
        <ul>
          <li>我是一条信息</li>
        </ul>
      </>
    )
  }
}
