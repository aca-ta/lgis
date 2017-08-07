import addGUI from './dat';

export const map = L.map('map');
map.setView([35.681167, 139.767052], 15);

export default function createMap() {
  const layer = Tangram.leafletLayer({
    scene: 'base.yaml',
    attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>',
  });
  layer.on('init', () => {
    addGUI(layer.scene);
  });
  layer.addTo(map);
}

