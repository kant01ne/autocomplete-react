import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBox extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
   this.setState({value: event.target.value});
   this.props.onChange(event.target.value);
 }

  render() {
    return (
      <input type="text" value={this.state.value} onChange={this.handleChange} />
    );
  }
}

export default SearchBox;
