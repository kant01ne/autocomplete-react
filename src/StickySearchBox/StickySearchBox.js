import React, { Component } from 'react';
import './StickySearchBox.css';

class StickySearchBox extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
    this.stickySearchBox = document.getElementById("stickySearchBox");
    this.initialOffsetTop = this.stickySearchBox.offsetTop;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.pageYOffset >= this.initialOffsetTop) {
      this.stickySearchBox.classList.add("sticky")
    } else {
      this.stickySearchBox.classList.remove("sticky");
    }
  }

  render() {
    return (
      <div id="stickySearchBox">
        {this.props.children}
      </div>
    );
  }
}

export default StickySearchBox;
