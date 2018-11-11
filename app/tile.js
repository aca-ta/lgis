#!/usr/bin/env node
const mapnik = require('mapnik');
const mercator = require('./lib/sphericalmercator');


// register postgis plugin
if (mapnik.register_default_input_plugins) mapnik.register_default_input_plugins();

function sridToProj4(srid) {
  switch (srid) {
    case '4326':
      return '+proj=latlong +datum=WGS84';
    case '4301':
      return '+proj=longlat +ellps=bessel +towgs84=-146.414,507.337,680.507,0,0,0,0 +no_defs';
    case '3857':
    case '900013':
    default:
      return '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs';
  }
}


module.exports.createMvt = (req, func) => {
  const postgisSettings = {
    host: req.params.host,
    dbname: req.params.db,
    table: req.params.table,
    user: 'postgres',
    password: 'postgres',
    type: 'postgis',
    geometry_field: 'geom',
    extent: '-20005048.4188,-9039211.13765,19907487.2779,17096598.5401',
  };
  const x = parseInt(req.params.X, 10);
  const y = parseInt(req.params.Y, 10);
  const z = parseInt(req.params.Z, 10);


  const map = new mapnik.Map(256, 256, mercator.proj4);
  const layer = new mapnik.Layer('tile', sridToProj4(req.params.datum));
  let postgis;
  try {
    postgis = new mapnik.Datasource(postgisSettings);
  } catch (err) {
    console.log(err);
    return err;
  }
  const bbox = mercator.xyz_to_envelope(x, y, z, false);

  layer.datasource = postgis;
  layer.styles = ['point'];
  map.add_layer(layer);
  map.extent = bbox;

  const vt = new mapnik.VectorTile(z, x, y);
  vt.bufferSize = 64;

  map.render(vt, func);
  return;
};

