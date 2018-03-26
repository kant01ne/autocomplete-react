import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

export function enzymeSetup() {
  configure({ adapter: new Adapter() });
}
