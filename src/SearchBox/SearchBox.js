import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBox extends Component {
  static propTypes = {
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props);
    let value = this.props.defaultValue || '';
    this.state = {value: value};
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
   this.setState({value: event.target.value});
   if(this.props.onChange) {
     this.props.onChange(event.target.value);
   }
 }

  render() {
    return (
      <input
        type="search"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default SearchBox;
