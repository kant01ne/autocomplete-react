import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './AutoComplete';
import SearchBox from '../SearchBox/SearchBox';

import { enzymeSetup } from '../testUtils.js'
enzymeSetup();

import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

let onChange;

describe('<AutoComplete />', () =>  {

  beforeEach(() => {
    onChange = sinon.spy()
  });

  it('renders without crashing', () => {
    let wrapper = shallow(
      <AutoComplete>
        <SearchBox/>
      </AutoComplete>
    );
    expect(wrapper.find(SearchBox).length).to.equal(1);
    expect(wrapper.state().value).to.equal('');
  });


  it('update state value on user input', () => {
    let wrapper = mount(
      <AutoComplete>
        <SearchBox/>
      </AutoComplete>
    );
    wrapper.find('input').simulate('change', {target: {value: 'test'}})
    expect(wrapper.state().value).to.equal('test');
  });

});
