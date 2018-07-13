import {fromJS} from 'immutable';
import MAP_STYLE from './map-style-basic-v8.json';

export function getLayer() {
  const source = fromJS({
    type: 'vector',
    tiles: [
      'http://localhost:3000/tiles/127.0.0.1/postgres/lgis_sample.busstop_chiba/{z}/{x}/{y}',
    ],
  });
  const layer = fromJS({
    id: 'data',
    type: 'circle',
    source: 'mapillary',
    'source-layer': 'tile',
    interactive: true,
  });

  return {source, layer};
}

export function getDefaultLayer() {
  return fromJS(MAP_STYLE);
}
