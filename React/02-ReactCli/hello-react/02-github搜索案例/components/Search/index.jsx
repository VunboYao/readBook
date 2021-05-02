import React, { Component } from 'react'
import Axios from 'axios'
export default class Search extends Component {
  handleSearch = (params) => {
    const {value: keyword} = this.keywordElement
    this.props.updateAppStatus({isLoading: true, isFirst: false})
    Axios.get('https://api.github.com/search/users?q=' + keyword).then(res => {
      this.props.updateAppStatus({isLoading: false, users: res.data.items})
    }, error => {
      this.props.updateAppStatus({isLoading: false, err: error})
    })
  }
  render() {
    return (
      <div>
        <h2>Hello Github</h2>
        <input type="text" ref={c => this.keywordElement = c}/>
        <button onClick={this.handleSearch}>search</button>
      </div>
    )
  }
}
