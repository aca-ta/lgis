import {combineReducers} from 'redux';
import {toolbar} from './toolbar';
import {map} from './map';
import {ToolbarState} from '../components/toolbar';
import {MapState} from '../components/map';

export interface State {
  toolbar: ToolbarState;
  map: MapState;
}

export const reducers = combineReducers({
  toolbar,
  map,
} as any);
