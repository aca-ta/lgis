import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { LGIS } from './components/lgis';
import {reducers} from './reducers';

const store = createStore(reducers);

window.addEventListener(
  'load',
  () => {
    ReactDOM.render(
      <Provider store={store}>
        <LGIS />
      </Provider>
      , document.querySelector('#app'));
  },
  false,
);
