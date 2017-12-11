import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('Sticky renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sticky />, div);
});

it('DropMenu renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DropMenu />, div);
});
