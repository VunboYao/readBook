import React, { PureComponent } from 'react'
import Detail from './Detail'
import { Route } from 'react-router-dom'
const data = [
  { id: 1, msg: 'hello react' },
  { id: 2, msg: 'welcome world' },
  { id: 3, msg: 'hello world' },
]
export default class News extends PureComponent {
  navigation = params => {
    this.props.history.push('/home/news/detail', {
      id: params.id,
      msg: params.msg,
    })
  }
  render() {
    return (
      <>
        <ul>
          {data.map(item => {
            return (
              <li onClick={_ => this.navigation(item)} key={item.id}>
                {item.msg}
              </li>
            )
          })}
        </ul>
        <Route path='/home/news/detail' component={Detail} />
      </>
    )
  }
}
