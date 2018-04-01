import React, { Component } from 'react';
import Parser from 'html-react-parser';

class Highlight extends Component {

  highlightedValue() {
    let value = this.props.hit._highlightResult[this.props.attribute].value;
    if (this.props.tag) {
      const openingTag = `<${this.props.tag}>`;
      const closingTag = `</${this.props.tag}>`;
      value = value.replace(new RegExp('<em>', 'g'), openingTag);
      value = value.replace(new RegExp('</em>', 'g'), closingTag);
    }
    return value;
  }

  render() {
    let value = this.highlightedValue();
    return (<div>{Parser(value)}</div>);
  }
}

export default Highlight;
