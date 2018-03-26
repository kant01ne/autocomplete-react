import React, { Component } from 'react';

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
        {this.props.indexName}

      </div>
    );
  }
}

export default Index;
