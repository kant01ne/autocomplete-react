import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from '../SearchBox/SearchBox';
import Index from './Index';

import axios from 'axios'
import moxios from 'moxios'

import { enzymeSetup } from '../testUtils.js'
enzymeSetup();

import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

describe('<Index />', () =>  {

  beforeEach(function () {
    moxios.install()
  })

  afterEach(function () {
    moxios.uninstall()
  })

  it('Requests Algolia\'s Search API correctly', (done) => {

    let wrapper = mount(
      <Index indexName="test" appId="abc123" apiKey="supersecret" value='12'/>
    );

    expect(wrapper.props().value).to.equal('12');
    expect(wrapper.props().appId).to.equal('abc123');
    expect(wrapper.props().apiKey).to.equal('supersecret');

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      expect(request.url).to.equal('https://abc123-dsn.algolia.net/1/indexes/test/query');
      expect(request.headers['X-Algolia-API-Key']).to.equal('supersecret');
      expect(request.headers['X-Algolia-Application-Id']).to.equal('abc123');
      let mockHits = [{name:'test1234'}];
      request.respondWith({
          status: 200,
          response: { hits: mockHits }
        }).then(() => {
          expect(JSON.parse(request.config.data)['query']).to.equal('12')
          expect(wrapper.state().hits).to.equal(mockHits);
          expect(wrapper.html()).to.equal('<ul><li>test1234</li></ul>');
          done();
        });
    });
  });

  it('Update hits record on props update', (done) => {

    let wrapper = mount(
      <Index indexName="test" appId="abc123" apiKey="supersecret" value='12'/>
    );
    wrapper.setProps({value:'random-value'});

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
          status: 200,
          response: { hits: [] }
        }).then(() => {
          expect(JSON.parse(request.config.data)['query']).to.equal('random-value')
          expect(wrapper.state().hits).to.eql([]);
          done();
        });
    });
  });

  it('Accepts custom function for Hits rendering', (done) => {
    let customDOM = function(item, key) {
      return <span key={key}>{item.name}: {item.description}</span>
    }
    let wrapper = mount(
      <Index indexName="test" appId="abc123" apiKey="supersecret" value='12' hit={customDOM}/>
    );
    wrapper.setProps({value:'random-value'});

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
          status: 200,
          response: { hits: [{name:'test1234', description:'short description of a test1234'}] }
        }).then(() => {
          expect(wrapper.html()).to.equal('<ul><span>test1234: short description of a test1234</span></ul>');
          done();
        });
    });
  });

});
