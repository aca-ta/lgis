import * as React from 'react';
import ReactMapGL, {Viewport, Popup, MapEvent} from 'react-map-gl';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {
  ActionTypes,
  changeViewport,
  openPopup,
  closePopup,
} from '../actions/map';

import {RootState} from '../reducers';

const ToolTip = (
  isPopupOpen: boolean,
  latitude: number,
  longitude: number,
  feature: any,
  dispatchClosePopup: () => void,
) => {
  if (!isPopupOpen) return;

  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      anchor="top"
      onClose={() => dispatchClosePopup()}>
      <div>hoge</div>
    </Popup>
  );
};

const Map = (props: {
  viewport: Viewport;
  mapStyle: any;
  isPopupOpen: boolean;
  popupLat: number;
  popupLng: number;
  feature: any;
  dispatchChangeViewport: (viewport: Viewport) => void;
  dispatchOpenPopup: (lat: number, lng: number, feature: any) => void;
  dispatchClosePopup: () => void;
}) => {
  const {
    viewport,
    mapStyle,
    isPopupOpen,
    popupLat,
    popupLng,
    feature,
    dispatchChangeViewport,
    dispatchOpenPopup,
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
      onClick={(e: MapEvent, lngLat: number[], feature: any) =>
        dispatchOpenPopup(e.lngLat[0], e.lngLat[1], e.features[0])
      }>
      {ToolTip(isPopupOpen, popupLng, popupLat, feature, dispatchClosePopup)}
    </ReactMapGL>
  );
};

export interface MapState {
  viewport: Viewport;
  mapStyle: any;
  isPopupOpen: boolean;
  popupLat: number;
  popupLng: number;
  feature: any;
}

const mapStateToProps = (state: RootState) => ({
  mapStyle: state.map.mapStyle,
  viewport: state.map.viewport,
  isPopupOpen: state.map.isPopupOpen,
  popupLat: state.map.popupLat,
  popupLng: state.map.popupLng,
  feature: state.map.feature,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => ({
  dispatchChangeViewport: (viewport: Viewport) => {
    dispatch(changeViewport(viewport));
  },
  dispatchOpenPopup: (lat: number, lng: number, feature: any) => {
    dispatch(openPopup(lat, lng, feature));
  },
  dispatchClosePopup: () => {
    dispatch(closePopup());
  },
});

export const MAP = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
