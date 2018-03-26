import React from 'react';
import ReactDOM from 'react-dom';
import SuggestionItem from './SuggestionItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SuggestionItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
