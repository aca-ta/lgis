import {fromJS} from 'immutable';
import * as MAP_STYLE from './map-style-basic-v8.json';

export const defaultLayer = fromJS((MAP_STYLE as any).default);

const pointLayer = {
  id: 'point',
  type: 'circle',
  source: 'lgis',
  'source-layer': 'tile',
  interactive: true,
  paint: {
    'circle-color': '#4153f4',
  },
};

const lineStringLayer = {
  id: 'linestring',
  type: 'line',
  source: 'lgis',
  'source-layer': 'tile',
  interactive: true,
  paint: {
    'line-color': '#176b31',
    'line-width': 2
  },
};

const polygonLayer = {
  id: 'polygon',
  type: 'fill',
  source: 'lgis',
  'source-layer': 'tile',
  interactive: true,
  paint: {
    'fill-color': '#96a186',
    'fill-opacity': 0.8,
    'fill-outline-color': 'black',
  },
};

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
      return fromJS(pointLayer);
    case 'linestring':
      return fromJS(lineStringLayer);
    case 'polygon':
      return fromJS(polygonLayer);
    default:
      throw new Error('Geometry type is not choosen.');
  }
};

const setSource = (mapStyle: any, source: any) => {
  return mapStyle.mergeIn(['sources', 'lgis'], source);
};

const setLayer = (mapStyle: any, layer: any) => {
  const newLayers = mapStyle
    .get('layers')
    .filter((elm: any) => elm.get('source') !== 'lgis')
    .push(layer);
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
