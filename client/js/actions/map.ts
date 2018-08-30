import {Viewport} from 'react-map-gl';
export enum Actions {
  CHANGE_VIEWPORT = 'map/changeViewport',
}


export interface ChangeViewportAction {
  readonly type: Actions.CHANGE_VIEWPORT;
  payload: Viewport
}

export const changeViewport = (viewport: Viewport): ChangeViewportAction => ({
  type: Actions.CHANGE_VIEWPORT,
  payload: viewport
})

export type ActionTypes = ChangeViewportAction;
