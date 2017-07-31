function addGUI(scene) {

  // Create dat GUI
  const gui = new dat.GUI({ autoPlace: true });
  gui.domElement.parentNode.style.zIndex = 500;
  window.gui = gui;

  // Camera
  var camera_types = {
      'Flat': 'flat',
      'Perspective': 'perspective',
      'Isometric': 'isometric'
  };
  gui.camera = scene.config.camera.type;
  gui.add(gui, 'camera', camera_types).onChange(function(value) {
      scene.config.camera.type = value;
      scene.updateConfig();
  });

  // Layers
  var layer_gui = gui.addFolder('Layers');
  var layer_colors = {};
  var layer_controls = {};
  Object.keys(layer.scene.config.layers).forEach(function(l) {
      if (!layer.scene.config.layers[l]) {
          return;
      }

      layer_controls[l] = !(layer.scene.config.layers[l].visible == false);
      layer_gui.
          add(layer_controls, l).
          onChange(function(value) {
              layer.scene.config.layers[l].visible = value;
              layer.scene.rebuildGeometry();
          });
      try {
          var c = layer.scene.config.layers[l].draw.polygons.color;
      }
      catch(e) {
          var c = layer.scene.config.layers[l].draw.lines.color;
      }
      layer_colors[l] = [c[0]*255, c[1]*255, c[2]*255];
      layer_gui.
          addColor(layer_colors, l).
          onChange(function(value) {
              try {
                  layer.scene.config.layers[l].draw.polygons.color = [value[0]/255, value[1]/255, value[2]/255];
              }
              catch(e) {
                  layer.scene.config.layers[l].draw.lines.color = [value[0]/255, value[1]/255, value[2]/255];
              }
              layer.scene.rebuildGeometry();
              });
  });
  layer_gui.open();

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
