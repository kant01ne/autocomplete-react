import React, { Component } from 'react';
import SearchBox from '../SearchBox/SearchBox';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.onSearchBoxUpdate = this.onSearchBoxUpdate.bind(this);
  }

  onSearchBoxUpdate(value) {
    this.setState({
      value: value
    });
  }

  render() {
    return (
      <div>
        <SearchBox onChange={this.onSearchBoxUpdate}/>
        {this.props.children}
      </div>
    );
  }
}

export default AutoComplete;
