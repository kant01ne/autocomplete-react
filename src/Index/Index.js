import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Index extends Component {
  static propTypes = {
    hits: PropTypes.func
  }

  render() {
    const hit = this.props.hit || function(hit) {
      return <div>
        {hit.value}
      </div>;
    }

    return (
      <div>
        {this.props.indexName}: {this.props.value}
      </div>
    );
  }
}

export default Index;
