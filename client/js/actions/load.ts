export enum Actions {
  LOAD_MAP = 'load/loadMap'
}

export interface LoadMapAction {
  readonly type: Actions.LOAD_MAP;
}

export const loadMap = (): LoadMapAction => ({
  type: Actions.LOAD_MAP,
});


export type ActionTypes = LoadMapAction;
