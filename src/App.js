import React, { Component } from 'react';
import SearchBox from './SearchBox/SearchBox';
import AutoComplete from './AutoComplete/AutoComplete';
import Index from './Index/Index';
import './App.css';

// curl -X POST \
//      -H "X-Algolia-API-Key: 6be0576ff61c053d5f9a3225e2a90f76" \
//      -H "X-Algolia-Application-Id: latency" \
//      --data-binary '{ "params": "query=iphone" }' \
//      "https://latency-dsn.algolia.net/1/indexes/bestbuy/query"

function BestBuyProduct(hit) {
  return(
    <div>
      {hit.shortDescription}
    </div>
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
        <div>
          <div>Testing the SearchBox component</div>
          <div>
            <SearchBox
              onChange={this.onSearchBoxInput}
            />
          </div>
          <div>
            <SearchBox
              defaultValue='SearchBox with default value'
              onChange={this.onSearchBoxInput}
            />
          </div>
        </div>
        <div>
          <div>Testing the Autocomplete component</div>
          <AutoComplete
            appId="latency"
            apiKey="6be0576ff61c053d5f9a3225e2a90f76"
          >
            <SearchBox/>
            <Index indexName="bestbuy" hit={BestBuyProduct}/>
            <Index indexName="airbnb" hit={BestBuyProduct}/>
          </AutoComplete>
        </div>
      </div>
    );
  }
}

export default App;
