export enum Actions {
  TOGGLE_DRAWER = 'toolbar/toggleDrawer',
  INPUT_SETTINGS = 'toolbar/inputSettings',
  INPUT_TABLE = 'toolbar/inputTable',
  ADD_LAYER = 'toolbar/addLayer',
}

export interface ToggleDrawerAction {
  readonly type: Actions.TOGGLE_DRAWER;
  payload: boolean;
}

export const toggleDrawer = (open: boolean): ToggleDrawerAction => ({
  type: Actions.TOGGLE_DRAWER,
  payload: open,
});

export interface InputSettingsAction {
  readonly type: Actions.INPUT_SETTINGS;
  payload: string;
}
export const inputSettings = (settings: string): InputSettingsAction => ({
  type: Actions.INPUT_SETTINGS,
  payload: settings,
});

export interface InputTableAction {
  readonly type: Actions.INPUT_TABLE;
  payload: string;
}
export const inputTable = (settings: string): InputTableAction => ({
  type: Actions.INPUT_TABLE,
  payload: table,
});

export interface AddLayerAction {
  readonly type: Actions.ADD_LAYER;
  payload: {settings: string; table: string};
}
export const addLayer = (settings: string, table: string): AddLayerAction => ({
  type: Actions.ADD_LAYER,
  payload: {settings, table},
});

export type ActionTypes =
  | ToggleDrawerAction
  | InputSettingsAction
  | InputTableAction
  | AddLayerAction;
