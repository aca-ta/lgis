import $ from 'jquery';
import map from './map';
import BaseLayer from './layer-base';
import Layer from './layer';
import Foundation from './libs/foundation-setup';

window.$ = $;

$(document).ready(() => {
  $(document).foundation();
});

window.addEventListener(
  'load',
  () => {
    new BaseLayer(map);
  },
  false,
);

/* add button events */
document.querySelector('#lgis-show-table').addEventListener('click', () => {
  const settings = {
    host: document.getElementById('lgis-host').value,
    table: document.getElementById('lgis-table').value,
    db: document.getElementById('lgis-db').value,
  };
  new Layer(map, settings);
});
