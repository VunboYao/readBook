import { PureComponent } from 'react'
import PropTypes from 'prop-types'

function HOC(Cpn) {
  // define class Component
  /* return class extends PureComponent {
    render() {
      // add props name
      return <Cpn names={'why'}/>
    }
  } */

  // define Func Component
  return function(props) {
    return <Cpn {...props} names={'why'}/>
  }
}

class HelloWorld extends PureComponent {
  static propTypes = {
    names: PropTypes.string,
  }

  render() {
    const { names } = this.props
    return (
      <div>
        <h2>Hello World - {names}</h2>
      </div>
    )
  }
}

const HelloWorldHOC = HOC(HelloWorld)

class App extends PureComponent {
  render() {
    return (<HelloWorldHOC/>)
  }
}

export default App
