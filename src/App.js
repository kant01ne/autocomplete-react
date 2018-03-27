import React, { Component } from 'react';
import SearchBox from './SearchBox/SearchBox';
import AutoComplete from './AutoComplete/AutoComplete';
import Index from './Index/Index';
import './App.css';

function BestBuyProduct(hit, key) {
  return(
    <li key={key}>
      {hit.name}
    </li>
  );
}

function IkeaProduct(hit, key) {
  return(
    <li key={key}>
      {hit.name}
    </li>
  );
}


class App extends Component {
  constructor(props) {
      super(props);
      this.onSearchBoxInput = this.onSearchBoxInput.bind(this);
  }

  onSearchBoxInput(value) {
    console.log(value);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Algolia Autocomplete-react</h1>
        </header>
        <div className="App-intro">
          <h2>Testing the Autocomplete component</h2>
          <div className="container margin-50">
            <AutoComplete
              appId="latency"
              apiKey="6be0576ff61c053d5f9a3225e2a90f76"
            >
              <SearchBox placeholder="Search for BestBuy or Ikea Products"/>
              <h3>Best Buy Products</h3>
              <Index indexName="bestbuy" hit={BestBuyProduct}/>
              <h3>Ikea Products</h3>
              <div className="nested-div-1">
                <div className="nested-div-2">
                  <Index indexName="ikea" hit={IkeaProduct}/>
                </div>
              </div>
            </AutoComplete>
          </div>
          <h2>Testing the SearchBox component</h2>
          <p>(log the value in the console from parent component)</p>
          <div className="container margin-50">
            <div className="flex-2">
              <SearchBox
                placeholder="SearchBox with placeholder"
                onChange={this.onSearchBoxInput}
              />
            </div>
            <div className="flex-2">
              <SearchBox
                defaultValue='SearchBox with default value'
                onChange={this.onSearchBoxInput}
              />
            </div>
          </div>
          <h2>Testing the Index component (value=Sony)</h2>
          <div className="container margin-50">
            <Index
              value='Sony'
              appId="latency"
              apiKey="6be0576ff61c053d5f9a3225e2a90f76"
              indexName="bestbuy"
              hit={BestBuyProduct}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
