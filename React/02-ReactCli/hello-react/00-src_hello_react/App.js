/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello React
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
 */

import { Component } from 'react'
import Hello from './components/Hello'
import Welcome from './components/Welcome'
class App extends Component {
  render() {
    return (
      <div>
        <Hello />
        <Welcome />
      </div>
    )
  }
}

export default App
