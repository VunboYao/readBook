import {Component} from 'react'
import welcome from './index.module.css'
export default class Welcome extends Component {
  render() {
    return (
      <div className="box">
        <h3 className={welcome.title}>Welcome react</h3>
      </div>
    )
  }
}
