import React, { PureComponent } from 'react'

const AppContext = React.createContext({age: 30})
const {Provider, Consumer} = AppContext;


export default class App extends PureComponent {
  state = {
    age: 20
  }
  render() {
    return (
      <>
        <h2>hello react</h2>
        {/* <Provider> */}
          <A />
          <B />
        {/* </Provider> */}
      </>
    )
  }
}


class B extends PureComponent {
  render() {
    return (
      <div>
        <h3>i am component-b-
          <Consumer>
            {
              value => <span>{++value.age}</span>
            }
          </Consumer>
          </h3>
      </div>
    )
  }
}

class A extends PureComponent {
  render() {
    return (
      <div>
        <h3>
          i am component-a-
          <Consumer>{value => <span>{value.age}</span>}</Consumer>
        </h3>
      </div>
    )
  }
}
