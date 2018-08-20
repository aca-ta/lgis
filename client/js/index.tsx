import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Lgis } from './lgis';

const store = createStore(rootReducer);

window.addEventListener(
  'load',
  () => {
    ReactDOM.render(<Lgis />, document.querySelector('#app'));
  },
  false,
);
