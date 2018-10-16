import reduceReducers from 'reduce-reducers';
import {combineReducers, Reducer} from 'redux';
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
import {addLayerStyle} from '../models/layer';
import {mapReducer} from './map';
import {toolbarReducer} from './toolbar';

export interface RootState {
  toolbar: ToolbarState;
  map: MapState;
}

const combinedReducers = combineReducers<RootState>({
  toolbar: toolbarReducer,
  map: mapReducer,
} as any);

type RootActionType = toolbarActionType | mapActionType;

const crossSliceReducer = (state: RootState, action: RootActionType) => {
  switch (action.type) {
    case toolbarActions.ADD_LAYER:
      return {
        toolbar: state.toolbar,
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
    default:
      return state;
  }
};

export const reducer = reduceReducers(
  combinedReducers,
  crossSliceReducer,
) as Reducer<RootState, RootActionType>;
