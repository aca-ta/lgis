export enum Actions {
  TOGGLE_DRAWER = 'toolbar/toggleDrawer',
  INPUT_SETTINGS = 'toolbar/inputSettings',
  INPUT_TABLE = 'toolbar/inputTable',
  ADD_LAYER = 'toolbar/addLayer',
}

export interface ToggleDrawerAction {
  readonly type: Actions.TOGGLE_DRAWER;
}

export const toggleDrawer = (): ToggleDrawerAction => ({
  type: Actions.TOGGLE_DRAWER,
});

export interface InputSettingsAction {
  readonly type: Actions.INPUT_SETTINGS;
  payload: {settings: string};
}
export const inputSettings = (settings: string): InputSettingsAction => ({
  type: Actions.INPUT_SETTINGS,
  payload: {settings},
});

export interface InputTableAction {
  readonly type: Actions.INPUT_TABLE;
  payload: {table: string};
}
export const inputTable = (table: string): InputTableAction => ({
  type: Actions.INPUT_TABLE,
  payload: {table},
});

export interface AddLayerAction {
  readonly type: Actions.ADD_LAYER;
  payload: {settings: string; table: string; mapStyle: any;};
}
export const addLayer = (
  settings: string,
  table: string,
  mapStyle: any,
): AddLayerAction => ({
  type: Actions.ADD_LAYER,
  payload: {settings, table, mapStyle},
});

export type ActionTypes =
  | ToggleDrawerAction
  | InputSettingsAction
  | InputTableAction
  | AddLayerAction;
