import React, { Component } from 'react';
import SearchBox from './SearchBox/SearchBox';
import StickySearchBox from './StickySearchBox/StickySearchBox';
import AutoComplete from './AutoComplete/AutoComplete';
import Index from './Index/Index';
import Highlight from './Highlight/Highlight';
import './App.css';

function BestBuyProduct(hit, key) {
  return(
    <li key={key}>
      <Highlight attribute="name" hit={hit} key={key}/>
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
          <div className="container">
            <AutoComplete
              appId="latency"
              apiKey="6be0576ff61c053d5f9a3225e2a90f76"
            >
              <StickySearchBox>
                <SearchBox placeholder="Search for BestBuy or Ikea Products"/>
              </StickySearchBox>
              <div className="container">
                <div className="flex-2">
                  <h3>Best Buy Products</h3>
                  <Index indexName="bestbuy" hit={BestBuyProduct}/>
                </div>
                <div className="flex-2">
                  <h3>Ikea Products</h3>
                  <div className="nested-div-1">
                    <div className="nested-div-2">
                      <Index indexName="ikea" hit={IkeaProduct}/>
                    </div>
                  </div>
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
              <br/><br/>
              <SearchBox
                style={{color:'red', backgroundColor:'blue'}}
                placeholder="blue background and red color"
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
        <span style={{'height':'800px'}}>Test</span>
        </div>
      </div>
    );
  }
}


export default App;
