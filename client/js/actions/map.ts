import {ViewState} from 'react-map-gl';

export enum Actions {
  CHANGE_VIEWPORT = 'map/changeViewport',
  OPEN_POPUP = 'map/openPopup',
  CLOSE_POPUP = 'map/closePopup',
}

export interface ChangeViewportAction {
  readonly type: Actions.CHANGE_VIEWPORT;
  payload: {viewport: ViewState};
}

export const changeViewport = (viewport: ViewState): ChangeViewportAction => ({
  type: Actions.CHANGE_VIEWPORT,
  payload: {viewport},
});

export interface OpenPopupAction {
  readonly type: Actions.OPEN_POPUP;
  payload: {lat: number; lng: number; properties: {[key: string]: string}};
}

export const openPopup = (
  lat: number,
  lng: number,
  properties: {[key: string]: string},
): OpenPopupAction => ({
  type: Actions.OPEN_POPUP,
  payload: {lat, lng, properties},
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
