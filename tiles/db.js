#!/usr/bin/env node

// This example shows how to use node-mapnik to
// render maps tiles based on spatial data stored in postgis
//
// To run you must configure the postgis_settings variable


const mapnik = require('mapnik');
const mercator = require('./sphericalmercator');
const parseXYZ = require('./tile').parseXYZ;
const path = require('path');

const TMS_SCHEME = false;

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

module.exports.createTiles = (req, res) => {
  parseXYZ(req, TMS_SCHEME, (err, params) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(err.message);
    } else {
      try {
        const map = new mapnik.Map(256, 256, mercator.proj4);
        const vt = new mapnik.VectorTile(params.x, params.y, params.z);
        const layer = new mapnik.Layer('tile', mercator.proj4);
        const postgis = new mapnik.Datasource(postgisSettings);
        const bbox = mercator.xyz_to_envelope(parseInt(params.x, 10),
                                              parseInt(params.y, 10),
                                              parseInt(params.z, 10), false);

        layer.datasource = postgis;
        layer.styles = ['point'];

        map.bufferSize = 64;
        map.load(path.join(__dirname, 'point_vector.xml'), { strict: true }, (err, map) => {
          if (err) throw err;
          map.add_layer(layer);

          map.extent = bbox;
          const im = new mapnik.Image(map.width, map.height);
          map.render(im, (err, im) => {
            if (err) {
              throw err;
            } else {
              res.writeHead(200, { 'Content-Type': 'image/png' });
              res.end(im.encodeSync('png'));
            }
          });
        });
      }
      catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(err.message);
      }
    }
  });
};

