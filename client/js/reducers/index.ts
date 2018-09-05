import {combineReducers, Reducer} from 'redux';
import reduceReducers from 'reduce-reducers';
import {toolbarReducer} from './toolbar';
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
import {loadData} from '../models/layer';

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
      //TODO: toolbarMapStyleReducerの戻り値で更新したmapStyleをとれているので、
      //ここで直接loadDataを呼び出してmap.stateに入れる
      return {
        toolbar: state.toolbar,
        map: {
          ...state.map,
          mapStyle: loadData(
            state.map.mapStyle,
            state.toolbar.settings,
            state.toolbar.table,
          ),
        },
      };
    default:
      return state;
  }
};

/*
export const reducer = (state: RootState, action: RootActionType) => {
  const intermediateState = combinedReducers(state, action);
  const finalState = crossSliceReducer(state, action);
  return finalState;
};
*/
export const reducer = reduceReducers(
  combinedReducers,
  crossSliceReducer,
) as Reducer<RootState, RootActionType>;
