import {ViewState} from 'react-map-gl';
import {Actions, ActionTypes} from '../actions/map';
import {MapState} from '../components/map';
import {defaultLayer} from '../models/layer';

const initialState: MapState = {
  mapStyle: defaultLayer,
  viewport: {
    latitude: 35.681167,
    longitude: 139.767052,
    zoom: 10,
  },
  popupLat: 0,
  popupLng: 0,
  properties: {},
};

const changeViewport = (state: MapState, viewport: ViewState): MapState => ({
  ...state,
  viewport,
});

const openPopup = (
  state: MapState,
  popupLat: number,
  popupLng: number,
  properties: {[key: string]: string},
): MapState => ({
  ...state,
  popupLat,
  popupLng,
  properties,
});

const closePopup = (state: MapState): MapState => ({
  ...state,
  popupLat: 0,
  popupLng: 0,
  properties: {},
});

export const mapReducer = (
  state: MapState = initialState,
  action: ActionTypes,
) => {
  switch (action.type) {
    case Actions.CHANGE_VIEWPORT:
      return changeViewport(state, action.payload.viewport);
    case Actions.OPEN_POPUP:
      return openPopup(
        state,
        action.payload.lat,
        action.payload.lng,
        action.payload.properties,
      );
    case Actions.CLOSE_POPUP:
      return closePopup(state);
    default:
      return state;
  }
};
