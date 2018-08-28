import {combineReducers} from 'redux';
import {toolbar, State as toolbarState} from './toolbar';
import {toolbar, State as mapState} from './map';

export interface State {
  toolbar: toolbarState;
  map: mapState;
}

export const reducers = combineReducers({
  toolbar,
  map,
} as any);
