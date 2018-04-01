import React from 'react';
import ReactDOM from 'react-dom';
import Highlight from './Highlight';
import { enzymeSetup } from '../testUtils.js'
enzymeSetup();

import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

let item = {
    name: 'Mike',
    email: 'mike@mikecompany.com',
    _highlightResult: {
      name: {
        value: '<em>Mi</em>ke'
      },
      email: {
        value: '<em>mi</em>ke@<em>mi</em>kecompany.com'
      }
    }
}

describe('<Highlight />', () =>  {
  it('renders highlighted component for specified attribute', () => {
    let wrapper = render(
      <Highlight
        attribute='name'
        hit={item}
      />
    );
    expect(wrapper.html()).to.equal('<em>Mi</em>ke');

    //Change attribute to email
    wrapper = render(
      <Highlight
        attribute='email'
        hit={item}
      />
    );
    expect(wrapper.html()).to.equal('<em>mi</em>ke@<em>mi</em>kecompany.com');
  });

    it('allow for tag modification', () => {
      let wrapper = render(
        <Highlight
          attribute='name'
          hit={item}
          tag="span"
        />
      );
      expect(wrapper.html()).to.equal('<span>Mi</span>ke');
    });

});
