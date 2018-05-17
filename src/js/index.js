import map from './map';
import BaseLayer from './layer-base';
import Layer from './layer';
import GuiControler from './gui-control';
import css from '../css/style.css';

window.addEventListener('load', () => {
  new BaseLayer(map, GuiControler);
}, false);


/* add button events */
document.getElementById('lgis-show-table').addEventListener('click', () => {
  const settings = {
    host: document.getElementById('lgis-host').value,
    table: document.getElementById('lgis-table').value,
    db: document.getElementById('lgis-db').value,
  };
  new Layer(map, settings);
});
