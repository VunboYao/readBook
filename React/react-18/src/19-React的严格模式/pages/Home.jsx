import { PureComponent } from 'react'

class Home extends PureComponent {
  constructor(props) {
    super(props)
    console.log('Home: Constructor')
  }

  // !Deprecated API in StrictMode
  /*  UNSAFE_componentWillMount() {
    console.log('Home: UNSAFE_componentWillMount')
  } */
  componentDidMount() {
    console.log('Home: componentDidMount')
  }

  render() {
    console.log('Home: Render')
    return (
      <div>
        {/* !can't use ref string mode in StrictMode */}
        {/* <h2 ref={'title'}>Home Page</h2> */}
        <h2>Home Page </h2>
      </div>
    )
  }
}

export default Home
