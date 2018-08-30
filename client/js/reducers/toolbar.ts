import {Actions, ActionTypes} from '../actions/toolbar';
import {ToolbarState} from '../components/toolbar';
import {defaultLayer, loadData} from '../models/layer';

const initialState: ToolbarState = {
  open: false,
  settings: '',
  table: '',
  mapStyle: defaultLayer,
};

const toggleDrawer = (state: ToolbarState): ToolbarState => ({
  ...state,
  open: !state.open,
});

const inputSettings = (state: ToolbarState): ToolbarState => ({
  ...state,
  settings: state.settings,
});

const inputTable = (state: ToolbarState): ToolbarState => ({
  ...state,
  table: state.table,
});

const addLayer = (state: ToolbarState): ToolbarState => ({
    ...state,
    mapStyle: loadData(state.settings, state.table)
});

export const toolbar = (
  state: ToolbarState = initialState,
  action: ActionTypes,
) => {
  switch (action.type) {
    case Actions.TOGGLE_DRAWER:
      return toggleDrawer(state);
    case Actions.INPUT_SETTINGS:
      return inputSettings(state);
    case Actions.INPUT_TABLE:
      return inputTable(state);
    case Actions.ADD_LAYER:
      return addLayer(state);
    default:
      return state;
  }
};
