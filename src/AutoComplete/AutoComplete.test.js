import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './AutoComplete';
import SearchBox from '../SearchBox/SearchBox';
import Index from '../Index/Index';

import axios from 'axios'
import moxios from 'moxios'

import { enzymeSetup } from '../testUtils.js'
enzymeSetup();

import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

describe('<AutoComplete />', () =>  {

  beforeEach(function () {
    moxios.install()
  })

  afterEach(function () {
    moxios.uninstall()
  })

  it('renders without crashing', () => {
    let wrapper = shallow(
      <AutoComplete
        appId='abc123'
        apiKey='supersecret'
      >
        <SearchBox/>
      </AutoComplete>
    );
    expect(wrapper.find(SearchBox).length).to.equal(1);
    expect(wrapper.state().value).to.equal('');
  });

  it('renders without crashing for empty Autocomplete', () => {
    let wrapper = shallow(
      <AutoComplete
        appId='abc123'
        apiKey='supersecret'
      />
    );
    expect(wrapper.find(SearchBox).length).to.equal(0);
    expect(wrapper.html()).to.equal('<div></div>');
  });

  it('Populate children elements props properly', () => {

    let wrapper = mount(
      <AutoComplete
        appId='abc123'
        apiKey='supersecret'
      >
        <SearchBox/>
        <div className="divWithNoChildren">Test</div>
        <div className="parentElement1">
          <Index indexName="test"/>
        </div>
      </AutoComplete>
    );
    expect(wrapper.find('.divWithNoChildren').text()).to.equal('Test');
    expect(wrapper.find('.parentElement1').contains(<ul/>)).to.equal(true);
    expect(wrapper.find(SearchBox).props().onChange).to.equal(wrapper.instance().onSearchBoxUpdate);
    expect(wrapper.find(Index).props().value).to.equal('');
    expect(wrapper.find(Index).props().appId).to.equal('abc123');
    expect(wrapper.find(Index).props().apiKey).to.equal('supersecret');
  });

  it('update state value on user input with SearchBox present and propagate to Index', () => {
    let wrapper = mount(
      <AutoComplete
        appId='abc123'
        apiKey='supersecret'
      >
        <SearchBox/>
        <Index indexName="test"/>
      </AutoComplete>
    );
    wrapper.find('input').simulate('change', {target: {value: 'test-xyz'}})
    expect(wrapper.state().value).to.equal('test-xyz');
    expect(wrapper.find(Index).props().value).to.equal('test-xyz');

  });
});
