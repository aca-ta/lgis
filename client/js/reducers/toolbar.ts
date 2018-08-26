import {Actions, ActionTypes} from '../actions/index';

export interface State {
  open: boolean;
  settings: string;
}

const initialState: State = {
  open: false,
  settings: '',
};

const toggleDrawer = (state: State):State => ({ ...state, open: !state.open });

const inputSettings = (state: State): State => ({...state, settings: state.settings});

export const toolbar = (
  state: State = initialState,
  action: ActionTypes,
) => {
  switch (action.type) {
    case Actions.TOGGLE_DRAWER:
      return toggleDrawer(state);
    case Actions.INPUT_SETTINGS:
      return inputSettings(state);
    default:
      return state;
  }
};

