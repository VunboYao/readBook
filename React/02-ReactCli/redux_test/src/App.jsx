import React, { PureComponent } from 'react'
import Count from './containers/Count'
import Person from './containers/Person'
export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Count/>
        <hr/>
        <Person/>
      </div>
    )
  }
}
