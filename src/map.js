import addGUI from './dat';

function setOnFeatureClick(scene) {
  const func = (selection) => {
    if (!selection.feature) return;
    scene.config.global.selected = selection.feature.properties.id;
    alert(selection.feature.properties.name);
    scene.rebuild();
  };

  return func;
}


export default function createMap() {
  const map = L.map('map');
  const layer = Tangram.leafletLayer({
    scene: 'scene.yaml',
    attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>',
  });
  layer.addTo(map);
  layer.on('init', () => {
    layer.setSelectionEvents({
      click: setOnFeatureClick(layer.scene),
    });
    addGUI(layer.scene);
  });
  layer.addTo(map);
  map.setView([35.681167, 139.767052], 15);
}
