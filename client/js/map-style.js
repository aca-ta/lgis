import { fromJS } from 'immutable';
import MAP_STYLE from './map-style-basic-v8.json';

export const getLayer = (host, db, table) => {
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

  return { source, layer };
};

export const defaultLayer = fromJS(MAP_STYLE);
