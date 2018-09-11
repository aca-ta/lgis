import {Viewport} from 'react-map-gl';
export enum Actions {
  CHANGE_VIEWPORT = 'map/changeViewport',
  CLOSE_POPUP = 'map/closePopup',
}

export interface ChangeViewportAction {
  readonly type: Actions.CHANGE_VIEWPORT;
  payload: {viewport: Viewport};
}

export const changeViewport = (viewport: Viewport): ChangeViewportAction => ({
  type: Actions.CHANGE_VIEWPORT,
  payload: {viewport},
});

export interface ClosePopupAction {
  readonly type: Actions.CLOSE_POPUP;
}

export const closePopup = (): ClosePopupAction => ({
  type: Actions.CLOSE_POPUP,
});

export type ActionTypes = ChangeViewportAction | ClosePopupAction;
