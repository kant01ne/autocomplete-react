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
    expect(wrapper.html()).to.equal('<div style="width:100%"></div>');
  });

  it('Populate children elements props properly (when value is present)', () => {

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
    wrapper.find('input').simulate('change', {target: {value: 'val'}}) //Make a simple research to display the rest of the autocomplete elements
    expect(wrapper.find('.divWithNoChildren').text()).to.equal('Test');
    expect(wrapper.find(SearchBox).props().onChange).to.equal(wrapper.instance().onSearchBoxUpdate);
    expect(wrapper.find(Index).props().value).to.equal('val');
    expect(wrapper.find(Index).props().appId).to.equal('abc123');
    expect(wrapper.find(Index).props().apiKey).to.equal('supersecret');
  });

    it('Open/hide everything based on value (except SearchBox always displayed)', () => {

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

      //Only SearchBox displayed
      expect(wrapper.find(SearchBox).length).to.equal(1);
      expect(wrapper.find('.divWithNoChildren').length).to.equal(0);
      expect(wrapper.find(Index).length).to.equal(0);

      //User input should show Indexes
      wrapper.find('input').simulate('change', {target: {value: 'test-xyz'}});
      expect(wrapper.state().value).to.equal('test-xyz');
      expect(wrapper.find(Index).props().value).to.equal('test-xyz');

       //Clear value should remove Indexes
      wrapper.find('input').simulate('change', {target: {value: ''}});
      expect(wrapper.find(SearchBox).length).to.equal(1);
      expect(wrapper.find('.divWithNoChildren').length).to.equal(0);
      expect(wrapper.find(Index).length).to.equal(0);

    });
});
