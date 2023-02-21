import { Component } from 'react'
import MainBanner from './MainBanner'
import MainProductList from './MainProductList'

export default class Main extends Component {
  render() {
    return (
      <div>
        <h2>Main</h2>
        <MainBanner/>
        <MainProductList/>
      </div>
    )
  }
}
