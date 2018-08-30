import {fromJS} from 'immutable';
import * as MAP_STYLE from './map-style-basic-v8.json';

export const defaultLayer = fromJS((<any>MAP_STYLE).default);

export const getLayer = (host: string, db: string, table: string) => {
  const source = fromJS({
    type: 'vector',
    tiles: [`http://localhost:3000/tiles/${host}/${db}/${table}/{z}/{x}/{y}`],
  });
  const layer = fromJS({
    id: 'data',
    type: 'circle',
    source: 'lgis',
    'source-layer': 'tile',
    interactive: true,
  });

  return {source, layer};
};

export const loadData = (settingJson: string, table: string) => {
  const settings = JSON.parse(settingJson);
  const {source, layer} = getLayer(settings.host, settings.db, table);

  const mapStyle: any = defaultLayer
    .setIn(['sources', 'lgis'], fromJS(source))
    .set('layers', defaultLayer.get('layers').push(layer));

  return mapStyle;
};
