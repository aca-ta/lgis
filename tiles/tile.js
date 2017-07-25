#!/usr/bin/env node
const mapnik = require('mapnik');
const mercator = require('./sphericalmercator');


// register postgis plugin
if (mapnik.register_default_input_plugins) mapnik.register_default_input_plugins();

// change this to fit your db connection and settings
const postgisSettings = {
  dbname: 'test',
  table: 'cultural_property',
  user: 'postgres',
  type: 'postgis',
  extent: '-20005048.4188,-9039211.13765,19907487.2779,17096598.5401',
};

module.exports.createMvt = (req, func) => {
  const x = parseInt(req.params.X, 10);
  const y = parseInt(req.params.Y, 10);
  const z = parseInt(req.params.Z, 10);

  const map = new mapnik.Map(256, 256, mercator.proj4);
  const vt = new mapnik.VectorTile(x, y, z);
  const layer = new mapnik.Layer('tile', mercator.proj4);
  const postgis = new mapnik.Datasource(postgisSettings);
  const bbox = mercator.xyz_to_envelope(x, y, z, false);

  layer.datasource = postgis;
  layer.styles = ['point'];

  map.bufferSize = 64;

  map.extent = bbox;
  return map.render(vt, func);
};

