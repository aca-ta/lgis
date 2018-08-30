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
};

const changeViewport = (state: MapState): MapState => ({
  ...state,
  viewport: state.viewport,
})


export const map = (state: MapState = initialState, action: ActionTypes) => {
  switch (action.type) {
    case Actions.CHANGE_VIEWPORT:
      return changeViewport(state);
    default:
      return state;
  }
};

