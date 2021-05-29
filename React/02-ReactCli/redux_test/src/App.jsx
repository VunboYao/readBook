import React, { PureComponent } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.scss'
import MyNavLink from './components/MyNavLink'
import Count from './containers/Count'
import Person from './containers/Person'
import About from './pages/About'
import Home from './pages/Home'
export default class App extends PureComponent {
  render() {
    return (
      <>
        <Count />
        <hr />
        <Person />
        <hr />
        <div className='route'>
          <div className='left'>
            <MyNavLink to='/home'>Home</MyNavLink>
            <MyNavLink to='/about'>About</MyNavLink>
          </div>
          <div className='right'>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/about' component={About} />
              <Redirect to='/about' />
            </Switch>
          </div>
        </div>
      </>
    )
  }
}
