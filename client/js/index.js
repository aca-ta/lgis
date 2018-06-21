import $ from 'jquery';
import map from './map';
import BaseLayer from './layer-base';
import Layer from './layer';
import Foundation from './libs/foundation-setup';
import load_settings from './setting';

window.$ = $;

$(document).ready(() => {
  $(document).foundation();
});

window.addEventListener(
  'load',
  () => {
    new BaseLayer(map);
  },
  false
);

/* add button events */
document.querySelector('#lgis-show-table').addEventListener('click', () => {
  const settings = load_settings('#lgis-settings');
  const tableInfo = {
    host: settings.host,
    db: settings.db,
    table: document.getElementById('lgis-table').value,
  };
  new Layer(map, tableInfo);
});
