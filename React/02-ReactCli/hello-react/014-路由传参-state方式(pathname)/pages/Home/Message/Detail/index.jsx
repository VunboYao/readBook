import React, { Component } from 'react'
const data = [
  { id: '01', content: '你好，老婆' },
  { id: '02', content: '你好，玛丽' },
  { id: '03', content: '你好，React' },
]
export default class Detail extends Component {
  render() {
    console.log(this.props);
    const {id, title} = this.props.location.state || {}
    const obj = data.find(item => item.id === id)
    return (
      <div>
        <ul>
          <li>ID: {id}</li>
          <li>TITLE: {title}</li>
          <li>CONTENT: {obj['content']}</li>
        </ul>
      </div>
    )
  }
}
