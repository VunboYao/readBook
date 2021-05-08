import React, { Component } from 'react'

import Detail from './Detail'
import { Link, Route } from 'react-router-dom'
export default class Home_Message extends Component {
  state = {
    msgArr: [
      { id: '01', title: 'Hello React' },
      { id: '02', title: 'Hello World' },
      { id: '03', title: 'Hello Friends' },
    ],
  }

  showPush = (id, title) => {
    // params 方式跳转
    // this.props.history.push(`/home/message/detail/${id}/${title}`)

    // search 方式跳转
    // this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)

    // state 方式跳转
    this.props.history.push(`/home/message/detail`, { id, title })
  }

  showReplace = (id, title) => {
    console.log(id, title)
    // params 方式跳转
    // this.props.history.replace(`/home/message/detail/${id}/${title}`)

    // search 方式跳转
    // this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)

    // state 方式跳转
    this.props.history.replace(`/home/message/detail`, { id, title })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  goForward = () => {
    this.props.history.goForward()
  }

  goTarget = () => {
    this.props.history.go(-2)
  }

  render() {
    const { msgArr } = this.state
    return (
      <div>
        <ul>
          {msgArr.map(item => {
            return (
              <li key={item.id}>
                {/* 路由导航传参: state 方式 */}
                <Link to={{ pathname: '/home/message/detail', state: { id: item.id, title: item.title } }}>
                  {item.title}
                </Link>

                {/* 路由导航传参: search 方式 */}
                {/* <Link to={`/home/message/detail?id=${item.id}&title=${item.title}`}>{item.title}</Link> */}

                {/* 路由导航传参：params 方式 */}
                {/* <Link to={`/home/message/detail/${item.id}/${item.title}`}>{item.title}</Link> */}

                {/* 编程式导航 */}
                <button onClick={() => this.showPush(item.id, item.title)}>Push查看</button>
                <button onClick={() => this.showReplace(item.id, item.title)}>Replace查看</button>
              </li>
            )
          })}
        </ul>

        {/* 路由组件注册: state || search */}
        <Route path='/home/message/detail' component={Detail} />

        {/* 路由组件注册：params */}
        {/* <Route path='/home/message/detail/:id/:title' component={Detail} /> */}

        {/* 编程式导航组件实现快进、后退 */}
        <button onClick={this.goBack}>GoBack</button>
        <button onClick={this.goForward}>GoForward</button>
        <button onClick={this.goTarget}>Go</button>
      </div>
    )
  }
}
