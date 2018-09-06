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

export const toolbarReducer = (
  state: ToolbarState = initialState,
  action: ActionTypes,
  mapStyle: any,
) => {
  switch (action.type) {
    case Actions.TOGGLE_DRAWER:
      return toggleDrawer(state);
    case Actions.INPUT_SETTINGS:
      return inputSettings(state, action.payload.settings);
    case Actions.INPUT_TABLE:
      return inputTable(state, action.payload.table);
    default:
      return state;
  }
};

