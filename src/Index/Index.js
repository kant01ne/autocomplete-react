import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Index extends Component {
  static propTypes = {
    hit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      hits: []
    };
    this.instance = axios.create({
      baseURL: 'https://latency-dsn.algolia.net/1/indexes/bestbuy/query',
      timeout: 1000,
      headers: {
        'X-Algolia-API-Key': '6be0576ff61c053d5f9a3225e2a90f76',
        'X-Algolia-Application-Id': 'latency'
      }
    });
    this._getHits(this.props.value);
  }

  _getHits(value) {
    let that = this;
    this.instance.post('/', {
      query: value
    })
    .then(function (response) {
      that.setState({
        hits: response.data.hits
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.value !== this.props.value) {
      this._getHits(nextProps.value);
    }
  }

  render() {
    const Hit = this.props.hit || function(item) {
      return <div>
        {item.value}
      </div>;
    }
    return (
      <div>
        {this.state.hits && this.state.hits && this.state.hits.map((item) => {
          return Hit(item);
        })}
      </div>
    );
  }
}

export default Index;
