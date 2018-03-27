import React, { Component } from 'react';
import SearchBox from '../SearchBox/SearchBox';
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

  render() {
    let {appId, apiKey} = this.props;
    let onSearchBoxUpdate = this.onSearchBoxUpdate;
    let children = this.props.children.length > 1 ? this.props.children : [this.props.children]
    return (
      <div>
        {children &&
          children.map((children, key) => {
            switch(children.type) {
              case SearchBox:
                let searchBoxComponent = React.cloneElement(children, {
                  appId,
                  apiKey,
                  key,
                  onChange: onSearchBoxUpdate,
                });
                return searchBoxComponent;
              case Index:
                let indexComponent = React.cloneElement(children, {
                  appId,
                  apiKey,
                  key,
                  value: this.state.value
                });
                return indexComponent;
              default:
                return children;
            }
          })
        }
      </div>
    );
  }
}

export default AutoComplete;
