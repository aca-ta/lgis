export enum Actions {
  TOGGLE_TOOLBAR = 'toolbar/toggle',
}

export interface ToggleToolbarAction {
  readonly type: Actions.TOGGLE_TOOLBAR;
  payload: boolean;
}

export const toggleToolbar = (open: boolean): ToggleToolbarAction => ({type: Actions.TOGGLE_TOOLBAR, payload: open});
