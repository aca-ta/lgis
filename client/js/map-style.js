import {fromJS} from 'immutable';

export const dataLayer = fromJS({
  id: 'data',
  source: {
    type: 'vector',
    url: 'mapbox://mapbox.mapbox-terrain-v',
  },
  'source-layer': 'contour',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': '#ff69b4',
    'line-width': 1,
  },
});
