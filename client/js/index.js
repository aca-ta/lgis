import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Map from './map';
import Foundation from './libs/foundation-setup';

window.$ = $;

$(document).ready(() => {
  $(document).foundation();
});

window.addEventListener(
  'load',
  () => {
    ReactDOM.render(<Map />, document.querySelector('#map'));
  },
  false,
);
