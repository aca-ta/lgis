import Tangram from 'tangram';


export default class Layer {
  constructor(map, settings) {
    this.layer = Tangram.leafletLayer({
      scene: 'scene.yaml',
    }).on('init', () => {
      this.layer.scene.setDataSource('mvt', {
        type: 'MVT',
        url: `http://localhost:3000/tiles/${settings.host}/${settings.db}/${settings.table}/{z}/{x}/{y}`,
      });
      this.layer.setSelectionEvents({
        click: this.setOnFeatureClick(),
      });
      this.layer.scene.updateConfig();
    }).addTo(map);
  }

  setOnFeatureClick() {
    const scene = this.layer.scene;
    const func = (selection) => {
      if (!selection.feature) return;

      scene.config.global.selected = selection.feature.properties.id;
      alert(selection.feature.properties.name);
      scene.rebuild();
    };
    return func;
  }
}
