import {Viewport} from 'react-map-gl';
import {Actions, ActionTypes} from '../actions/map';
import {loadData, defaultLayer} from '../models/layer';

export interface State {
  mapStyle: {};
  width: number;
  height: number;
  mapboxApiAccessToken: string;
  viewport: Viewport;
}

const initialState: State = {
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

const addLayer = (state: State, settings: string, table: string): State => {
  const mapStyle = loadData(settings, table);

  return {
    ...state,
    mapStyle,
  };
};

export const map = (state: State = initialState, action: ActionTypes) => {
  switch (action.type) {
    case Actions.ADD_LAYER:
      addLayer(state)
    default:
      return state;
  }
};
