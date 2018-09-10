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

const renderPopup = (latitude: number, longitude: number) => {
  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      anchor="top"
      onClose={() => alert('close button is clicked.')} //TODO: implement dispachClosePopup()
    >
      <div>hoge</div>
    </Popup>
  )
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
      }
    >
      {renderPopup(viewport.latitude, viewport.longitude)}
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
