import React, { Component } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'

export default class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    )
  }
}
