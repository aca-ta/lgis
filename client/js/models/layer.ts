import axios, {AxiosResponse} from 'axios';
import {fromJS} from 'immutable';
import * as MAP_STYLE from './map-style-basic-v8.json';

export const defaultLayer = fromJS((MAP_STYLE as any).default);

const pointLayer = [
  {
    id: 'point',
    type: 'circle',
    source: 'lgis',
    'source-layer': 'tile',
    interactive: true,
    paint: {
      'circle-color': ['coalesce', ['get', 'color'], '#4153f4'],
    },
  },
];

const lineStringLayer = [
  {
    id: 'linestring',
    type: 'line',
    source: 'lgis',
    'source-layer': 'tile',
    interactive: true,
    paint: {
      'line-color': ['coalesce', ['get', 'color'], '#176b31'],
      'line-width': 2,
    },
  },
];

const polygonLayer = [
  {
    id: 'polygon',
    type: 'fill',
    source: 'lgis',
    'source-layer': 'tile',
    interactive: true,
    paint: {
      'fill-color': ['coalesce', ['get', 'color'], '#96a186'],
      'fill-opacity': 0.8,
      'fill-outline-color': 'black',
    },
  },
  {
    layout: {
      'text-field': ['get', 'label'],
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-transform': 'uppercase',
      'text-letter-spacing': 0.1,
      'text-size': {
        base: 1.4,
        stops: [[10, 8], [20, 14]],
      },
    },
    type: 'symbol',
    source: 'lgis',
    id: 'polygon_label',
    paint: {
      'text-color': '#666',
      'text-halo-color': 'rgba(255,255,255,0.75)',
      'text-halo-width': 2,
    },
    'source-layer': 'tile',
  },
];

const polygon3DLayer = [
  {
    id: 'polygon',
    type: 'fill-extrusion',
    source: 'lgis',
    'source-layer': 'tile',
    interactive: true,
    paint: {
      'fill-extrusion-color': ['coalesce', ['get', 'color'], '#96a186'],
      'fill-extrusion-opacity': 0.8,
      'fill-extrusion-height': ['get', 'height'],
    },
  },
];

const createSource = (
  host: string,
  db: string,
  datum: string,
  table: string,
) => ({
  type: 'vector',
  tiles: [
    `http://localhost:3000/tiles/${host}/${db}/${table}/${datum}/{z}/{x}/{y}`,
  ],
});

const selectLayerStyle = (geomType: string) => {
  switch (geomType) {
    case 'point':
      return pointLayer;
    case 'linestring':
      return lineStringLayer;
    case 'polygon':
      return polygonLayer;
    case 'polygon3d':
      return polygon3DLayer;
    default:
      alert('Geometry type is not choosen.');
  }
};

const setSource = (mapStyle: any, source: any) => {
  return mapStyle.mergeIn(['sources', 'lgis'], source);
};

const setLayer = (mapStyle: any, layer: any) => {
  const newLayers = mapStyle
    .get('layers')
    .filter((elm: any) => elm.get('source') !== 'lgis')
    .concat(fromJS(layer))
  return mapStyle.mergeIn(['layers'], newLayers);
};

export const addLayerStyle = (
  prevMapStyle: any,
  settingJson: string,
  table: string,
  geomType: string,
) => {
  const settings = JSON.parse(settingJson);
  const source = createSource(
    settings.host,
    settings.db,
    settings.datum,
    table,
  );
  const layer = selectLayerStyle(geomType);

  let mapStyle = setSource(prevMapStyle, fromJS(source));
  mapStyle = setLayer(mapStyle, layer);
  return mapStyle;
};

export const saveMap = (
  settingJson: string,
  table: string,
  geomType: string,
) => {
  const settings = JSON.parse(settingJson);

  // FIXME: use modal dialog instead of prompt
  const name = prompt('The map name is...', '');

  const query = `name=${name}&settings=${JSON.stringify(
    settings,
  )}&geomType=${geomType}&table=${table}`;
  axios.get(`/save_map?${query}`).then(response => alert('saved'));
};

interface LoadMapResponse {
  name: string;
  table: string;
  geomType: string;
  settings: {
    host: string;
    db: string;
    datum: string;
  };
}

export const loadMap = async (name: string) => {
  const query = `name=${name}`;
  const res: AxiosResponse<LoadMapResponse> = await axios.get(
    `/load_map?${query}`,
  );
  return res.data;
};
