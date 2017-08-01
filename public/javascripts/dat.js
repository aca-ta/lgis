function addGUI(layer) {
  let scene = layer.scene;

  // Create dat GUI
  const gui = new dat.GUI({ autoPlace: true });
  gui.domElement.parentNode.style.zIndex = 500;
  window.gui = gui;

  // Camera
  const cameraTypes = {
    Flat: 'flat',
    Perspective: 'perspective',
    Isometric: 'isometric',
  };
  gui.camera = scene.config.camera.type;
  gui.add(gui, 'camera', cameraTypes).onChange((value) => {
    scene.config.camera.type = value;
    scene.updateConfig();
  });

  // Layers
  const layerGui = gui.addFolder('Layers');
  const layerColors = {};
  const layerControls = {};
  Object.keys(layer.scene.config.layers).forEach((l) => {
    if (!layer.scene.config.layers[l]) {
      return;
    }

    layerControls[l] = !(layer.scene.config.layers[l].visible === false);
    layerGui.add(layerControls, l)
        .onChange((value) => {
          layer.scene.config.layers[l].visible = value;
          layer.scene.rebuildGeometry();
        });
    try {
      const c = layer.scene.config.layers[l].draw.polygons.color;
    } catch(e) {
        const c = layer.scene.config.layers[l].draw.lines.color;
    }
    layerColors[l] = [c[0]*255, c[1]*255, c[2]*255];
    layerGui
        .addColor(layerColors, l)
        .onChange((value) => {
          try {
                layer.scene.config.layers[l].draw.polygons.color = [value[0]/255, value[1]/255, value[2]/255];
          } catch(e) {
                layer.scene.config.layers[l].draw.lines.color = [value[0]/255, value[1]/255, value[2]/255];
          }
          layer.scene.rebuildGeometry();
        });
  });
  layerGui.open();

  // Lighting
  var light_gui = gui.addFolder('Light');
  var light_controls = {
      "x position": .3,
      "y position": .5,
      "z position": .5,
      "diffuse": 1,
      "ambient": .5
  };
  light_gui.
      add(light_controls, "x position", -1, 1).
      onChange(function(value) {
          scene.lights.light1.direction[0] = -value;
          scene.render();
      });
  light_gui.
      add(light_controls, "y position", -1, 1).
      onChange(function(value) {
          scene.lights.light1.direction[1] = -value;
          scene.render();
     });
  light_gui.
      add(light_controls, "z position", 0, 1).
      onChange(function(value) {
          scene.lights.light1.direction[2] = -value;
          scene.render();
     });
  light_gui.
      add(light_controls, "diffuse", 0, 2).
      onChange(function(value) {
          scene.lights.light1.diffuse = [value, value, value, 1];
          scene.render();
      });
  light_gui.
      add(light_controls, "ambient", 0, 1).
      onChange(function(value) {
          scene.lights.light1.ambient = [value, value, value, 1];
          scene.render();
      });
  light_gui.open();
}


// Resize map to window
function resizeMap() {
  document.getElementById('map').style.width = window.innerWidth + 'px';
  document.getElementById('map').style.height = window.innerHeight + 'px';
  map.invalidateSize(false);
}
