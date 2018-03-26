import React from 'react';
import ReactDOM from 'react-dom';
import SuggestionsList from './SuggestionsList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SuggestionsList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
