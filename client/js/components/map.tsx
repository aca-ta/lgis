import * as React from 'react';
import MapGL, {Viewport} from 'react-map-gl';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {ActionTypes, changeViewport} from '../actions/map';

import {State} from '../reducers';

interface MapProps {
  viewport: Viewport;
  mapStyle: any;
  dispatchChangeViewport: (viewport: Viewport) => void;
}

const Map = (props: MapProps) => {
  const {viewport, mapStyle, dispatchChangeViewport} = props;

  return (
    <MapGL
      {...viewport}
      height={window.innerHeight}
      width={window.innerWidth}
      mapStyle={mapStyle}
      mapboxApiAccessToken={''}
      onViewportChange={(viewport: Viewport) =>
        dispatchChangeViewport(viewport)
      }
    />
  );
};

export interface MapState {
  viewport: Viewport;
  mapStyle: any;
}

const mapStateToProps = (state: State) => ({
  mapStyle: state.map.mapStyle,
  viewport: state.map.viewport,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => ({
  dispatchChangeViewport: (viewport: Viewport) => {
    dispatch(changeViewport(viewport));
  },
});

export const MAP = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
