import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
//import BaseLayer from './layer-base';
//import Layer from './layer';
import Map from './map';
import Foundation from './libs/foundation-setup';
import load_settings from './setting';

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

/* add button events */
//document.querySelector('#lgis-show-table').addEventListener('click', () => {
//  const settings = load_settings('#lgis-settings');
//  const tableInfo = {
//    host: settings.host,
//    db: settings.db,
//    table: document.querySelector('#lgis-table').value,
//  };
//  new Layer(map, tableInfo);
//});
