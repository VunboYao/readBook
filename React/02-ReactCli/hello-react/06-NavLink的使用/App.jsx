import { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import './App.css'
export default class App extends Component {
  render() {
    return (
      <div className='wrap'>
        <div className='left'>
          <NavLink activeClassName='test-active' to='/about'>
            关于
          </NavLink>
          <NavLink activeClassName='test-active' to='/home'>
            主页
          </NavLink>
        </div>
        <div className='right'>
          <Route path='/about' component={About} />
          <Route path='/home' component={Home} />
        </div>
      </div>
    )
  }
}
