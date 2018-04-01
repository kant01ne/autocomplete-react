import React, { Component } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import StickySearchBox from '../StickySearchBox/StickySearchBox';
import Index from '../Index/Index';

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

  _recursivelyPopulateChildrenProps(elements) {
    elements = elements.length > 1 ? elements : [elements]
    let {appId, apiKey} = this.props;
    const onSearchBoxUpdate = this.onSearchBoxUpdate;
    return elements.map((children, key) => {
      switch(children.type) {

        case SearchBox:
          return React.cloneElement(children, {
            appId,
            apiKey,
            key,
            onChange: onSearchBoxUpdate,
          });

        case StickySearchBox:
          return React.cloneElement(children, {
            key,
            children: this._recursivelyPopulateChildrenProps(children.props.children, this.state.value)
          });

        case Index:
          if (this.state.value === '') {
            return;
          }
          return React.cloneElement(children, {
            appId,
            apiKey,
            key,
            value: this.state.value
          });

        default:
          if (this.state.value === '') {
            return;
          } else if (children.props.children && (Array.isArray(children.props.children) || children.props.children.type)) {
            return React.cloneElement(children, {
              key,
              children: this._recursivelyPopulateChildrenProps(children.props.children, this.state.value)
            });
          } else {
            return children;
          }
      }
    });
  }

  render() {
    return (
      <div style={{width:'100%'}}>
        {this.props.children && this._recursivelyPopulateChildrenProps(this.props.children)}
      </div>
    );
  }
}

export default AutoComplete;
