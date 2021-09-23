import { Component } from 'react'
import './App.css'
import Header from './components/Header'
export class App extends Component {
  myFun(...args) {
    console.log(args, 'fatherCom get some msg from sonComponet ');
  }
  render() {
    return (
      <div>
        <Header
        fatherFn={this.myFun.bind(this)} name={'大头'} age={2}/>
        <div className={'body'}>Body</div>
        <div className={'footer'}>Footer</div>
      </div>
    )
  }
}

export default App
