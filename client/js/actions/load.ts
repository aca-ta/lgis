export enum Actions {
  LOAD_MAP = 'load/loadMap',
}

export interface LoadMapAction {
  readonly type: Actions.LOAD_MAP;
  payload: {name: string; table: string; geomType: string; settings: any};
}

export const loadMap = (
  name: string,
  table: string,
  geomType: string,
  settings: any,
): LoadMapAction => ({
  type: Actions.LOAD_MAP,
  payload: {name, table, geomType, settings},
});

export type ActionTypes = LoadMapAction;
