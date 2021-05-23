// 路由懒加载，引入lazy, Suspense
import React, { Component, lazy, Suspense } from 'react'
import { Link, Route } from 'react-router-dom'
import './App.css'
const About = lazy(() => import('./components/About'))
const Home = lazy(() => import('./components/Home'))
export default class App extends Component {
  render() {
    return (
      <div>
        <div className='wrap'>
          <div className='left'>
            <Link to='/about'>关于</Link>
            <Link to='/home'>主页</Link>
          </div>
          <div className='right'>
            <Suspense fallback={<h2>loading....</h2>}>
              <Route path='/about' component={About} />
              <Route path='/home' component={Home} />
            </Suspense>
          </div>
        </div>
      </div>
    )
  }
}
