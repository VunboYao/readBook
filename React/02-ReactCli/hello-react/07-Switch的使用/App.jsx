import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Test from "./pages/Test";
import MyNavLink from "./components/MyNavLink";
import "./App.css";
export default class App extends Component {
  render() {
    return (
      <div className="wrap">
        <div className="left"> 
          <MyNavLink to="/about" children="About" />
          <MyNavLink to="/home" children="Home" />
        </div>
        <div className="right">
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/home" component={Test} />
            <Route path="/home" component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}
