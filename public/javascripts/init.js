function init(){
  const map = L.map('map');
  const layer = Tangram.leafletLayer({
    scene: 'scene.yaml',
    attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>',
  });
  layer.addTo(map);
  layer.on('init', () => {
    addGUI(layer.scene);
    resizeMap();
  });
  layer.addTo(map);
  map.setView([35.681167, 139.767052], 15);
}
