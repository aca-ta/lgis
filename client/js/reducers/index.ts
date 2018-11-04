import {RouterState} from 'connected-react-router';
import reduceReducers from 'reduce-reducers';
import {combineReducers, Reducer} from 'redux';
import {
  Actions as loadActions,
  ActionTypes as loadActionType,
} from '../actions/load';
import {
  Actions as mapActions,
  ActionTypes as mapActionType,
} from '../actions/map';
import {
  Actions as toolbarActions,
  ActionTypes as toolbarActionType,
} from '../actions/toolbar';
import {MapState} from '../components/map';
import {ToolbarState} from '../components/toolbar';
import {addLayerStyle, loadMap} from '../models/layer';
import {mapReducer} from './map';
import {toolbarReducer} from './toolbar';

export interface RootState {
  toolbar: ToolbarState;
  map: MapState;
  router: RouterState;
}

const combinedReducers = combineReducers<RootState>({
  toolbar: toolbarReducer,
  map: mapReducer,
} as any);

type RootActionType = toolbarActionType | mapActionType | loadActionType;

const crossSliceReducer = (state: RootState, action: RootActionType) => {
  switch (action.type) {
    case toolbarActions.ADD_LAYER:
      return {
        ...state,
        map: {
          ...state.map,
          mapStyle: addLayerStyle(
            state.map.mapStyle,
            state.toolbar.settings,
            state.toolbar.table,
            state.toolbar.geomType,
          ),
        },
      };
    case loadActions.LOAD_MAP:
      const loaded = loadMap(action.payload.pathname);
      return {
        ...state,
        map: {
          ...state.map,
          mapStyle: addLayerStyle(
            state.map.mapStyle,
            state.toolbar.settings,
            state.toolbar.table,
            state.toolbar.geomType,
          ),
        },
      }
    default:
      return state;
  }
};

export const reducer = reduceReducers(
  combinedReducers,
  crossSliceReducer,
) as Reducer<RootState, RootActionType>;
