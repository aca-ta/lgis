import {Viewport} from 'react-map-gl';
import {Actions, ActionTypes} from '../actions/map';
import {loadData, defaultLayer} from '../models/layer';
import {MapState} from '../components/map';


const initialState: MapState = {
  mapStyle: defaultLayer,
  width: window.innerWidth,
  height: window.innerHeight,
  mapboxApiAccessToken: '',
  viewport: {
    latitude: 35.681167,
    longitude: 139.767052,
    zoom: 10,
  },
};

export const map = (state: State = initialState, action: ActionTypes) => {
  switch (action.type) {
    default:
      return state;
  }
};
