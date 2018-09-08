import {fromJS} from 'immutable';
import * as MAP_STYLE from './map-style-basic-v8.json';

export const defaultLayer = fromJS((<any>MAP_STYLE).default);

const pointLayer = {
  id: 'data',
  type: 'circle',
  source: 'lgis',
  'source-layer': 'tile',
  interactive: true,
};

export const getLayer = (
  host: string,
  db: string,
  table: string,
  geomType: string,
) => {
  const source = fromJS({
    type: 'vector',
    tiles: [
      `http://localhost:3000/tiles/${host}/${db}/${table}/{z}/{x}/{y}`,
    ],
  });

  switch(geomType){
    case 'point':
      return {source, fromJS(pointLayer)};
    default:
      throw new Error('Geometry type is not choosen.')
  }

};

export const loadData = (
  prevMapStyle: any,
  settingJson: string,
  table: string,
  geomType: string,
) => {
  const settings = JSON.parse(settingJson);
  const {source, layer} = getLayer(settings.host, settings.db, table, geomType);

  const mapStyle: any = prevMapStyle
    .setIn(['sources', 'lgis'], fromJS(source))
    .set('layers', prevMapStyle.get('layers').push(layer));

  return mapStyle;
};
