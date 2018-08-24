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
      return toggleToolbar(state);
    default:
      return state;
  }
};

const toggleToolbar = (state: State):State => ({ open: !state.open });
