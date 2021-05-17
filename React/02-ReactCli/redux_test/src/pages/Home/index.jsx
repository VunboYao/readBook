import React, { PureComponent } from 'react'
import Message from './Message'
import News from './News'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
export default class Home extends PureComponent {
  render() {
    return (
      <>
        <h2>主页信息</h2>
        <hr />
        <div className='home'>
          <div className='home-nav'>
            <Link to='/home/msg' children='Message' />
            <Link to='/home/news' children='News' />
          </div>
          <Switch>
            <Route path='/home/msg' component={Message} />
            <Route path='/home/news' component={News} />
            <Redirect to='/home/msg' />
          </Switch>
        </div>
      </>
    )
  }
}
