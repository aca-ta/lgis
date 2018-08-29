export enum Actions {
  ADD_LAYER = 'map/addLayer',
}

export interface AddLayerAction {
  readonly type: Actions.ADD_LAYER;
  payload: {settings: string; table: string};
}

export const addLayer = (settings: string, table: string): AddLayerAction => ({
  type: Actions.ADD_LAYER,
  payload: {settings, table},
});

export type ActionTypes = AddLayerAction;
