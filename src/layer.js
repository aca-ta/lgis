import Tangram from 'tangram';

function setOnFeatureClick(scene) {
  const func = (selection) => {
    if (!selection.feature) return;
    scene.config.global.selected = selection.feature.properties.id;
    alert(selection.feature.properties.name);
    scene.rebuild();
  };

  return func;
}


export default class Layer {
  constructor(map, settings) {
    const layer = Tangram.leafletLayer({
      scene: 'scene.yaml',
    });
    layer.on('init', () => {
      layer.scene.setDataSource('mvt', {
        type: 'MVT',
        url: `http://localhost:3000/tiles/${settings.table}/{z}/{x}/{y}`,
      });
      layer.setSelectionEvents({
        click: setOnFeatureClick(layer.scene),
      });
      layer.scene.updateConfig();
    });
    layer.addTo(map);
  }
}
