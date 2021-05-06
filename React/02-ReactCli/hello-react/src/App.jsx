import {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import './App.css'
export default class App extends Component {
  render() {
    return (
      <div className='wrap'>
          <div className='left'>
            <Link to='/about'>关于</Link>
            <Link to='/home'>主页</Link>
          </div>
          <div className='right'>
            <Route path="/about" component={About} />
            <Route path="/home" component={Home} />
          </div>
      </div>
    )
  }
}
