import * as React from 'react';
import ReactMapGL, {Viewport, Popup, MapEvent} from 'react-map-gl';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {ActionTypes, changeViewport, closePopup} from '../actions/map';

import {RootState} from '../reducers';

const ToolTip = (
  latitude: number,
  longitude: number,
  isPopupOpen: boolean,
  dispatchClosePopup: () => void,
) => {
  if (!isPopupOpen) return;

  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      anchor="top"
      onClose={() => dispatchClosePopup()}
    >
      <div>hoge</div>
    </Popup>
  );
};

const Map = (props: {
  viewport: Viewport;
  mapStyle: any;
  isPopupOpen: boolean;
  dispatchChangeViewport: (viewport: Viewport) => void;
  dispatchClosePopup: () => void;
}) => {
  const {
    viewport,
    mapStyle,
    isPopupOpen,
    dispatchChangeViewport,
    dispatchClosePopup,
  } = props;

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
      onClick={(e: MapEvent, lngLat: number[], feature: any) => alert('feature is clicked')}>
      {ToolTip(
        viewport.latitude,
        viewport.longitude,
        isPopupOpen,
        dispatchClosePopup,
      )}
    </ReactMapGL>
  );
};

export interface MapState {
  viewport: Viewport;
  mapStyle: any;
  isPopupOpen: boolean;
}

const mapStateToProps = (state: RootState) => ({
  mapStyle: state.map.mapStyle,
  viewport: state.map.viewport,
  isPopupOpen: state.map.isPopupOpen,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => ({
  dispatchChangeViewport: (viewport: Viewport) => {
    dispatch(changeViewport(viewport));
  },
  dispatchClosePopup: () => {
    dispatch(closePopup());
  },
});

export const MAP = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
