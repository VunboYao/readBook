import { Component } from 'react'
import PropTypes from 'prop-types'
export class HelloWorld extends Component {
  state = {
    msg: 'React',
  }

  static propTypes = {
    msg: PropTypes.string, // 字符串：必输
  }

  static defaultProps = {
    msg: 'em',
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
        <h3>{this.props.msg}</h3>
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
