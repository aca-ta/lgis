export enum Actions {
  LOAD_MAP = 'load/loadMap'
}

export interface LoadMapAction {
  readonly type: Actions.LOAD_MAP;
  payload: {pathname: string}
}

export const loadMap = (pathname: string): LoadMapAction => ({
  type: Actions.LOAD_MAP,
  payload: {pathname}
});


export type ActionTypes = LoadMapAction;
