export enum Actions {
  TOGGLE_DRAWER = 'toolbar/toggleDrawer',
  INPUT_SETTINGS = 'toolbar/inputSettings',
}

export interface ToggleDrawerAction {
  readonly type: Actions.TOGGLE_DRAWER;
  payload: boolean;
}

export const toggleDrawer = (open: boolean): ToggleDrawerAction => ({type: Actions.TOGGLE_DRAWER, payload: open});


export interface InputSettingsAction {
  readonly type: Actions.INPUT_SETTINGS;
  payload: string;
}
export const inputSettings = (settings: string): InputSettingsAction => ({type: Actions.INPUT_SETTINGS, payload: settings});

export type ActionTypes = ToggleDrawerAction | InputSettingsAction;
