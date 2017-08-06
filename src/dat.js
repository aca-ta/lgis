import * as dat from './vendor/dat.gui.min';

export default function addGUI(scene) {
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
  Object.keys(scene.config.layers).forEach((l) => {
    if (!scene.config.layers[l]) {
      return;
    }

    layerControls[l] = !(scene.config.layers[l].visible === false);
    layerGui.add(layerControls, l)
        .onChange((value) => {
          scene.config.layers[l].visible = value;
          scene.rebuild();
        });
    if (scene.config.layers[l].draw.polygons) {
      layerColors[l] = scene.config.layers[l].draw.polygons.color;
    } else {
      layerColors[l] = scene.config.layers[l].draw.lines.color;
    }
    layerGui
        .addColor(layerColors, l)
        .onChange((value) => {
          if (scene.config.layers[l].draw.polygons.color) {
            scene.config.layers[l].draw.polygons.color = value;
          } else {
            scene.config.layers[l].draw.lines.color = value;
          }
          scene.rebuild();
        });
  });
  layerGui.open();

  // Lighting
  const lightGui = gui.addFolder('Light');
  const lightControls = {
    'x position': 0.3,
    'y position': 0.5,
    'z position': 0.5,
    diffuse: 1,
    ambient: 0.5,
  };
  lightGui
      .add(lightControls, 'x position', -1, 1)
      .onChange((value) => {
        scene.lights.light1.direction[0] = -value;
        scene.render();
      });
  lightGui
      .add(lightControls, 'y position', -1, 1)
      .onChange((value) => {
        scene.lights.light1.direction[1] = -value;
        scene.render();
      });
  lightGui
      .add(lightControls, 'z position', 0, 1)
      .onChange((value) => {
        scene.lights.light1.direction[2] = -value;
        scene.render();
      });
  lightGui
      .add(lightControls, 'diffuse', 0, 2)
      .onChange((value) => {
        scene.lights.light1.diffuse = [value, value, value, 1];
        scene.render();
      });
  lightGui
      .add(lightControls, 'ambient', 0, 1)
      .onChange((value) => {
        scene.lights.light1.ambient = [value, value, value, 1];
        scene.render();
      });
  lightGui.open();
}
