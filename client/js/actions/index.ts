export enum Actions {
  TOGGLE_TOOLBAR = 'toolbar/toggle',
}

export interface ToggleToolbarAction {
  readonly type: Actions.TOGGLE_TOOLBAR;
}

export const toggleToolbar = (): ToggleToolbarAction => ({type: Actions.TOGGLE_TOOLBAR});
