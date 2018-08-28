import {Actions, ActionTypes} from '../actions/toolbar';

export interface State {
  open: boolean;
  settings: string;
  table: string;
}

const initialState: State = {
  open: false,
  settings: '',
  table: '',
};

const toggleDrawer = (state: State): State => ({...state, open: !state.open});

const inputSettings = (state: State): State => ({
  ...state,
  settings: state.settings,
});

const inputTable = (state: State): State => ({
  ...state,
  table: state.table,
});

const addLayer = (state: State): State => ({
  ...state,
  settings: state.settings,
  table: state.table,
});

export const toolbar = (state: State = initialState, action: ActionTypes) => {
  switch (action.type) {
    case Actions.TOGGLE_DRAWER:
      return toggleDrawer(state);
    case Actions.INPUT_SETTINGS:
      return inputSettings(state);
    case actions.INPUT_TABLE:
      return inputTable(state);
    case actions.ADD_LAYER:
      return addLayer(state);
    default:
      return state;
  }
};
