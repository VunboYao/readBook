import React, { Component } from 'react'
// import qs from 'querystring'

const data = [
  { id: '01', content: '你好，老婆' },
  { id: '02', content: '你好，玛丽' },
  { id: '03', content: '你好，React' },
]
export default class Detail extends Component {
  render() {
    console.log(this.props)
    /* 路由获取参数: state 方式 */
    const { id, title } = this.props.location.state || {}
    console.log(this.props.location.state)

    /* 路由获取参数: search 方式 */
    // const search = this.props.location.search
    // const {id, title} = qs.parse(search.slice(1))
    // console.log(search, id, title);

    /* 路由获取参数： params 方式 */
    // const {id, title} = this.props.match.params
    // console.log(this.props.match.params);

    const obj = data.find(item => item.id === id) || {}
    console.log('obj', obj);
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
