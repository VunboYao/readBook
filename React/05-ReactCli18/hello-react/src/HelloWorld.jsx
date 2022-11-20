import { Component } from 'react'

export class HelloWorld extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: 'Hello World',
    }
    console.log('constructor')
  }

  update() {
    this.setState({
      msg: 'Hello World World',
    })
  }

  render() {
    console.log('render')
    return (
			<div>
				<h2>{this.state.msg}</h2>
				<button onClick={() => this.update()}>Change</button>
			</div>
    )
  }

  componentDidMount() {
    console.log('didMount')
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
}
