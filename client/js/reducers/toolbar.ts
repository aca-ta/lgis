import {Actions, ToggleToolbarAction} from '../actions/index';

export interface State {
  open: boolean;
}

export const toolbar = (state: State, action: ToggleToolbarAction) => {
  switch (action.type) {
    case Actions.TOGGLE_TOOLBAR:
      toggleToolbar(state);
    default:
      return state;
  }
};

export const toggleToolbar = (state: State) => {open: !state.open}
