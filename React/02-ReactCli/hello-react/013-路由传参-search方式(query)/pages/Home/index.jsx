import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import MyNavLink from '../../components/MyNavLink'
import Home_News from './News'
import Home_Message from './Message'

export default class Home extends Component {
  render() {
    return (
      <div className='home-children'>
        <div className='home-nav'>
          <MyNavLink to='/home/news' className='nav'>
            News
          </MyNavLink>
          <MyNavLink to='/home/message' className='nav'>
            Message
          </MyNavLink>
        </div>
        <div className="home-body">
          <Switch>
            <Route path="/home/news" component={Home_News} />
            <Route path="/home/message" component={Home_Message} />
            <Redirect to='/home/news'/>
          </Switch>
        </div>
      </div>
    )
  }
}
