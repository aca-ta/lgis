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
import {Feature} from '../types/react-map-gl.d';
import {Tooltip} from './tooltip';

const Map = (props: {
  viewport: Viewport;
  mapStyle: any;
  isPopupOpen: boolean;
  popupLat: number;
  popupLng: number;
  properties: {[key: string]: string};
  dispatchChangeViewport: (viewport: Viewport) => void;
  dispatchOpenPopup: (
    lat: number,
    lng: number,
    properties: {[key: string]: string},
  ) => void;
  dispatchClosePopup: () => void;
}) => {
  const {
    viewport,
    mapStyle,
    isPopupOpen,
    popupLat,
    popupLng,
    properties,
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
      onClick={(e: MapEvent, lngLat: number[], feature: Feature) => {
        if ((e.features[0] as Feature).source !== 'lgis') return;
        dispatchOpenPopup(
          e.lngLat[0],
          e.lngLat[1],
          (e.features[0] as Feature).properties,
        );
      }}>
      {Tooltip(isPopupOpen, popupLng, popupLat, properties, dispatchClosePopup)}
    </ReactMapGL>
  );
};

export interface MapState {
  viewport: Viewport;
  mapStyle: any;
  isPopupOpen: boolean;
  popupLat: number;
  popupLng: number;
  properties: {[key: string]: string};
}

const mapStateToProps = (state: RootState) => ({
  mapStyle: state.map.mapStyle,
  viewport: state.map.viewport,
  isPopupOpen: state.map.isPopupOpen,
  popupLat: state.map.popupLat,
  popupLng: state.map.popupLng,
  properties: state.map.properties,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => ({
  dispatchChangeViewport: (viewport: Viewport) => {
    dispatch(changeViewport(viewport));
  },
  dispatchOpenPopup: (
    lat: number,
    lng: number,
    properties: {[key: string]: string},
  ) => {
    dispatch(openPopup(lat, lng, properties));
  },
  dispatchClosePopup: () => {
    dispatch(closePopup());
  },
});

export const MAP = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
