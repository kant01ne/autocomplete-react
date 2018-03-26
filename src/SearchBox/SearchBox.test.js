import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './SearchBox';

import { enzymeSetup } from '../testUtils.js'
enzymeSetup();

import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

let onChange;

describe('<SearchBox />', () =>  {

  beforeEach(() => {
    onChange = sinon.spy()
  });

  it('renders without crashing', () => {
    let wrapper = shallow(<SearchBox onChange={onChange}/>);
    expect(wrapper.find('input').length).to.equal(1);
    expect(wrapper.props().value).to.equal('');
  });

  it('set the state value when user types in', () => {
    let wrapper = shallow(<SearchBox onChange={onChange}/>);
    wrapper.find('input').simulate('change', {target: {value: 't'}})
    expect(wrapper.state().value).to.equal('t');
    wrapper.find('input').simulate('change', {target: {value: 'te'}})
    expect(wrapper.state().value).to.equal('te');
    wrapper.find('input').simulate('change', {target: {value: 'tes'}})
    expect(wrapper.state().value).to.equal('tes');
    wrapper.find('input').simulate('change', {target: {value: 'test'}})
    expect(wrapper.state().value).to.equal('test');
    wrapper.find('input').simulate('change', {target: {value: ''}})
    expect(wrapper.state().value).to.equal('');
  });


  it('propagates value to parent component by calling this.props.onChange', () => {
    let wrapper = shallow(<SearchBox onChange={onChange}/>);
    wrapper.find('input').simulate('change', {target: {value: 't'}})
    expect(onChange.callCount).to.equal(1);
  });

    it('can define default value', () => {
      let wrapper = shallow(<SearchBox onChange={onChange} defaultValue='testValue'/>);
      expect(wrapper.state().value).to.equal('testValue');
    });

});
