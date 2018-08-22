import {Actions, ToggleToolbarAction} from '../actions/index';

export interface State {
  open: boolean;
}

const initialState: State = {
  open: false,
};

export const toolbar = (
  state: State = initialState,
  action: ToggleToolbarAction,
) => {
  switch (action.type) {
    case Actions.TOGGLE_TOOLBAR:
      toggleToolbar(state);
    default:
      return state;
  }
};

export const toggleToolbar = (state: State) => {
  open: !state.open;
};
