import {fromJS} from 'immutable';
import MAP_STYLE from './map-style-basic-v8.json';

export function getLayer() {
  return {
    id: 'data',
    type: 'circle',
    source: {
      type: 'vector',
      tiles:
        '[http://localhost:3000/tiles/127.0.0.1/postgres/lgis_sample.busstop_chiba/{z}/{x}/{y}]',
    },
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#51bbd6',
        100,
        '#f1f075',
        750,
        '#f28cb1',
      ],
    },
  };
}

export function getDefaultLayer() {
  return fromJS(MAP_STYLE);
}
