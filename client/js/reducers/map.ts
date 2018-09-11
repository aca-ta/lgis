import {Viewport} from 'react-map-gl';
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
  isPopupOpen: true,
};

const changeViewport = (state: MapState, viewport: Viewport): MapState => ({
  ...state,
  viewport,
})

const closePopup = (state: MapState): MapState => ({
  ...state,
  isPopupOpen: false,
})

export const mapReducer = (state: MapState = initialState, action: ActionTypes) => {
  switch (action.type) {
    case Actions.CHANGE_VIEWPORT:
      return changeViewport(state, action.payload.viewport);
    case Actions.CLOSE_POPUP:
      return closePopup(state);
    default:
      return state;
  }
};

