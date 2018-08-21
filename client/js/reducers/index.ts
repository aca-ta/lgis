import { combineReducers } from 'redux';
import { toolbar, State as toolbarState } from './toolbar.ts';

export interface State {
  app: AppState
}

export const reducers = combineReducers({
  toolbar,
})
