import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Lgis } from './lgis';


window.addEventListener(
  'load',
  () => {
    ReactDOM.render(<Lgis />, document.querySelector('#app'));
  },
  false,
);
