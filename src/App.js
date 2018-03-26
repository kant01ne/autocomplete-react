import React, { Component } from 'react';
import logo from './logo.svg';
import SearchBox from './SearchBox/SearchBox';
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.onInput = this.onInput.bind(this);
  }

  onInput(value) {
      console.log(value)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <div>Testing the SearchBox component</div>
          <SearchBox
            onChange={this.onInput}
          />
      </div>
    );
  }
}

export default App;
