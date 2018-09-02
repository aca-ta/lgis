import {Actions, ActionTypes} from '../actions/toolbar';
import {ToolbarState} from '../components/toolbar';
import {defaultLayer, loadData} from '../models/layer';

const initialState: ToolbarState = {
  open: false,
  settings: '{"host": "127.0.0.1", "db": "mydatabase"}',
  table: 'my_schema.my_table',
};

const toggleDrawer = (state: ToolbarState): ToolbarState => ({
  ...state,
  open: !state.open,
});

const inputSettings = (
  state: ToolbarState,
  settings: string,
): ToolbarState => ({
  ...state,
  settings,
});

const inputTable = (state: ToolbarState, table: string): ToolbarState => ({
  ...state,
  table,
});

const addLayer = (
  state: ToolbarState,
  settings: string,
  table: string,
  mapStyle: any,
): ToolbarState => ({
  ...state,
  mapStyle: loadData(mapStyle, settings, table),
});

export const toolbar = (
  state: ToolbarState = initialState,
  action: ActionTypes,
) => {
  switch (action.type) {
    case Actions.TOGGLE_DRAWER:
      return toggleDrawer(state);
    case Actions.INPUT_SETTINGS:
      return inputSettings(state, action.payload.settings);
    case Actions.INPUT_TABLE:
      return inputTable(state, action.payload.table);
    case Actions.ADD_LAYER:
      return addLayer(
        state,
        action.payload.settings,
        action.payload.table,
        action.payload.mapStyle,
      );
    default:
      return state;
  }
};
