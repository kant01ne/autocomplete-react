import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Index extends Component {
  static propTypes = {
    indexName: PropTypes.string.isRequired,
    appId: PropTypes.string,
    apiKey: PropTypes.string,
    hit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      hits: []
    };
    this._queryHits(this.props.value);
  }

  _queryHits(value) {
    let that = this;
    this._request().post('/query', {
      query: value
    })
    .then((response) => {
      that.setState({
        hits: response.data.hits
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  _request() {
    return axios.create({
      baseURL: `https://${this.props.appId}-dsn.algolia.net/1/indexes/${this.props.indexName}`,
      timeout: 5000,
      headers: {
        'X-Algolia-API-Key': this.props.apiKey,
        'X-Algolia-Application-Id': this.props.appId
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.value !== this.props.value) {
      this._queryHits(nextProps.value);
    }
  }

  render() {
    const Hit = this.props.hit || function(item, key) {
      return <li key={key}>{item.name}</li>
    }
    return (
      <ul>
        {this.state.hits && this.state.hits && this.state.hits.map((item, key) => {
          return Hit(item, key);
        })}
      </ul>
    );
  }
}

export default Index;
