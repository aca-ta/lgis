import {combineReducers} from 'redux';
import {toolbar} from './toolbar';
import {ToolbarState} from '../components/toolbar';
import {MapState} from '../components/map';

export interface State {
  toolbar: ToolbarState;
}

export const reducers = combineReducers({
  toolbar,
} as any);
