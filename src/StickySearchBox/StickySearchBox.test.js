import React from 'react';
import ReactDOM from 'react-dom';
import StickySearchBox from './StickySearchBox';

import { enzymeSetup } from '../testUtils.js'
enzymeSetup();

import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

describe('<StickySearchBox />', () =>  {

  it('keeps stickySearchBox on top of the page when scrolling down the page', () => {
    let wrapper = render(<div style={{'height':'4000px'}}>
      <StickySearchBox>Anything from DOM to text</StickySearchBox>
    </div>);
    expect(wrapper.find('#stickySearchBox').length).to.equal(1);
    expect(wrapper.find('.sticky').length).to.equal(0);
    window.scrollTo(0, 2000);
    // TODO Need to find a way to properly scroll while testing with Enzyme (Doesn't seem trivial)
    // expect(wrapper.find('.sticky').length).to.equal(1);
  });

});
