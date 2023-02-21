import { Component } from 'react'

export default class MainProductList extends Component {
  state = {
    goods: ['item01', 'item02', 'item03', 'item04'],
  }

  render() {
    const { goods } = this.state
    return (
      <div>
        <h2>MainProductList</h2>
        <ul>
          {
            goods.map((item) => {
              return <li key={item}>{item}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
