import { PureComponent, createRef } from 'react'

class App extends PureComponent {
  classRef = createRef()

  componentDidMount() {
    // !createRef方式使用 才有current
    this.classRef.current.focusTextInput()
    // 回调形式
    // this.classRef.focusTextInput()
  }

  render() {
    return (
      <>
        <h2>auto focus after HelloWorld mounted</h2>
        {/* ref 只能是class component valid */}
        <HelloWorld ref={this.classRef}/>
        {/* <HelloWorld ref={e => this.classRef = e}/> */}
      </>
    )
  }
}

class HelloWorld extends PureComponent {
  textInput = createRef()

  focusTextInput() {
    this.textInput.current.focus()
  }

  render() {
    return <>
      <input type="text" ref={this.textInput}/>
      <input type="button" value={'Focus the text input'} onClick={e => this.focusTextInput(e)}/>
    </>
  }
}

export default App
