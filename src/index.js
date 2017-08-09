import map from './map';
import BaseLayer from './layer-base';
import Layer from './layer';
import GuiControler from './gui-control';

window.addEventListener('load', () => {
  new BaseLayer(map, GuiControler);
}, false);


/* add button events */
document.getElementById('lgis-show-table').addEventListener('click', () => {
  const settings = {
    table: document.getElementById('lgis-table').value,
  };
  new Layer(map, settings);
});
