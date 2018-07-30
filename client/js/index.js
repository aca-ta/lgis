import $ from 'jquery';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './app';


window.addEventListener(
  'load',
  () => {
    ReactDOM.render(<App />, document.querySelector('#navbar'));
  },
  false,
);
