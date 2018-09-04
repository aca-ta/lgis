import {combineReducers} from 'redux';
import {toolbarReducer, toolbarMapStyleReducer} from './toolbar';
import {mapReducer} from './map';
import {ToolbarState} from '../components/toolbar';
import {MapState} from '../components/map';
import {
  ActionTypes as toolbarActionType,
  Actions as toolbarActions,
} from '../actions/toolbar';
import {
  ActionTypes as mapActionType,
  Actions as mapActions,
} from '../actions/map';

export interface RootState {
  toolbar: ToolbarState;
  map: MapState;
}

const combinedReducers = combineReducers<RootState>({
  toolbarReducer,
  mapReducer,
} as any);

type RootActionType = toolbarActionType | mapActionType;

const crossSliceReducer = (state: RootState, action: RootActionType) => {
  switch (action.type) {
    case toolbarActions.ADD_LAYER:
      return {
        toolbar: toolbarMapStyleReducer(
          state.toolbar,
          action,
          state.map.mapStyle,
        ),
        map: mapReducer(state.map, action),
      };
    default:
      return state;
  }
};

export const reducer = (state: RootState, action: RootActionType) => {
  const intermediateState = combinedReducers(state, action);
  const finalState = crossSliceReducer(intermediateState, action);
  return finalState;
};
