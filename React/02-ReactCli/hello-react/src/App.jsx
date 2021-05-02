import React, { Component } from "react";
import "./App.css";
import Search from './components/Search'
import List from './components/List'
export default class App extends Component {
  state = {
    users: [],
    isFirst: true,
    isLoading: false,
    err: ''
  }

  updateAppStatus = (obj) => {
    this.setState(obj)
  }
  render() {
    return (
      <div>
        <Search updateAppStatus={this.updateAppStatus}/>
        <List {...this.state}/>
      </div>
    );
  }
}
