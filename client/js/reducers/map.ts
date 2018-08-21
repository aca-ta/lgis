import {Viewport} from 'react-map-gl';
interface MapState {
  mapStyle: {};
  width: number;
  height: number;
  mapboxApiAccessToken: string;
  viewport: Viewport;
}


export const maps = (state: MapState , action) => {
  switch (action.type) {
    case 'ADD_LAYER':
      //TODO: add a layer
    default:
      return state;
  }
}
