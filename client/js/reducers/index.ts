import { combineReducers } from 'redux';
import { toolbar, State as toolbarState } from './toolbar';

export interface State {
  app: toolbarState
}

export const reducers = combineReducers({
  toolbar,
})
