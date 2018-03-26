import React, { Component } from 'react';
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
          <div>Testing the SearchBox component</div>
          <SearchBox
            onChange={this.onInput}
          />
      </div>
    );
  }
}

export default App;
