import React, { Component } from 'react'

import Detail from './Detail'
import {Link, Route} from 'react-router-dom'
export default class Home_Message extends Component {
  state = {
    msgArr: [
      { id: '01', title: 'Hello React' },
      { id: '02', title: 'Hello World' },
      { id: '03', title: 'Hello Friends' },
    ],
  }
  render() {
    const { msgArr } = this.state
    return (
      <div>
        <ul>
          {msgArr.map(item => {
            return (
              <li key={item.id}>
                <Link to={`/home/message/detail/${item.id}/${item.title}`}>{item.title}</Link>
              </li>
            )
          })}
        </ul>
        <Route path='/home/message/detail/:id/:title' component={Detail} />
      </div>
    )
  }
}
