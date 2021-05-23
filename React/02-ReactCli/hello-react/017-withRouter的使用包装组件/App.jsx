import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import MyNavLink from './components/MyNavLink'
import About from './pages/About'
import Home from './pages/Home'
import Test from './pages/Test'
import Header from './components/Header'
console.log(Header);
export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='wrap'>
          <div className='left'>
            <MyNavLink to='/about' children='About' className='nav' />
            <MyNavLink to='/home' children='Home' className='nav' />
            <MyNavLink to='/test' children='Test' className='nav' />
          </div>
          <div className='right'>
            <Switch>
              <Route path='/about' component={About} />
              <Route path='/home' component={Home} />
              <Route path='/test' component={Test} />
              <Redirect to='/home' />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
