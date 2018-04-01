import React, { Component } from 'react';
import Parser from 'html-react-parser';

class Highlight extends Component {

  highlightedValue() {
    let value = this.props.hit._highlightResult[this.props.attribute].value;
    if (this.props.tag) {
      const openingTag = `<${this.props.tag}>`;
      const closingTag = `</${this.props.tag}>`;
      value = value.replace('<em>', openingTag);
      value = value.replace('</em>', closingTag);
    }
    return value;
  }

  render() {
    let value = this.highlightedValue();
    return (<div>{Parser(value)}</div>);
  }
}

export default Highlight;
