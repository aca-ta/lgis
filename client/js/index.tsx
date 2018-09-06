import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, Reducer} from 'redux';
import {Lgis} from './components/lgis';
import {reducer} from './reducers';

const store = createStore(
  reducer,
  typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

window.addEventListener(
  'load',
  () => {
    ReactDOM.render(
      <Provider store={store}>
        <Lgis />
      </Provider>,
      document.querySelector('#app'),
    );
  },
  false,
);
