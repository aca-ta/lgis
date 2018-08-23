import {combineReducers} from 'redux';
import {toolbar, State as toolbarState} from './toolbar';

export interface State {
  toolbar: toolbarState;
}

export const reducers = combineReducers({
  toolbar,
} as any);
