import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBox.css';

class SearchBox extends Component {
  static propTypes = {
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  handleInput(event) {
   this.setState({value: event.target.value});
   if(this.props.onChange) {
     this.props.onChange(event.target.value);
   }
 }

 clearInput(event) {
   this.setState({value: ''});
   if(this.props.onChange) {
     this.props.onChange(event.target.value);
   }
 }

  render() {
    return (
      <div>
        <input id="searchBox"
          style={this.props.style}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.handleInput}
        />
        {this.state.value && <button type="reset" id="clearSearchBox" onClick={this.clearInput}/>}
      </div>
    );
  }
}

export default SearchBox;
