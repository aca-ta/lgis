import {Viewport, MapEvent} from 'react-map-gl';

export enum Actions {
  CHANGE_VIEWPORT = 'map/changeViewport',
  OPEN_POPUP = 'map/openPopup',
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

export interface OpenPopupAction {
  readonly type: Actions.OPEN_POPUP;
  payload: {lat: number, lng: number, properties: {}}
}

export const openPopup = (lat: number, lng: number, properties: {}): OpenPopupAction => ({
  type: Actions.OPEN_POPUP,
  payload: {lat, lng, properties}
});

export interface ClosePopupAction {
  readonly type: Actions.CLOSE_POPUP;
}

export const closePopup = (): ClosePopupAction => ({
  type: Actions.CLOSE_POPUP,
});

export type ActionTypes =
  | ChangeViewportAction
  | ClosePopupAction
  | OpenPopupAction;
