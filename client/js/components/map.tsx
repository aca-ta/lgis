import * as React from 'react';
import ReactMapGL, {Viewport, Popup} from 'react-map-gl';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {ActionTypes, changeViewport} from '../actions/map';

import {RootState} from '../reducers';

interface MapProps {
  viewport: Viewport;
  mapStyle: any;
  dispatchChangeViewport: (viewport: Viewport) => void;
}

const Map = (props: MapProps) => {
  const {viewport, mapStyle, dispatchChangeViewport} = props;

  return (
    <ReactMapGL
      {...viewport}
      height={window.innerHeight}
      width={window.innerWidth}
      mapStyle={mapStyle}
      mapboxApiAccessToken={''}
      onViewportChange={(viewport: Viewport) =>
        dispatchChangeViewport(viewport)
      }>
      <Popup
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        closeButton={true}
        closeOnClick={true}
        anchor="top">
        <div>hoge</div>
      </Popup>
    </ReactMapGL>
  );
};

export interface MapState {
  viewport: Viewport;
  mapStyle: any;
}

const mapStateToProps = (state: RootState) => ({
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
