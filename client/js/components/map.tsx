import * as React from 'react';
import ReactMapGL, {MapError, MapEvent, Popup, Viewport} from 'react-map-gl';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {
  ActionTypes,
  changeViewport,
  closePopup,
  openPopup,
} from '../actions/map';

import {RootState} from '../reducers';
import {Feature} from '../types/react-map-gl.d';
import {Tooltip} from './tooltip';

const Map = (props: {
  viewport: Viewport;
  mapStyle: any;
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
    popupLat,
    popupLng,
    properties,
    dispatchChangeViewport,
    dispatchOpenPopup,
    dispatchClosePopup,
  } = props;

  const openPopupOrNot = (e: MapEvent) => {
    if (e.features.length === 0 || (e.features[0] as Feature).source !== 'lgis'){
      return;
    }
    return dispatchOpenPopup(
      e.lngLat[0],
      e.lngLat[1],
      (e.features[0] as Feature).properties,
    );
  }

  const showErrorMsg = (evt: MapError) => {
    if (evt.error && evt.error.status === 400) {
      console.error(`${evt.error.message}: The table value might be wrong.`);
    }
  }

  return (
    <ReactMapGL
      {...viewport}
      height={window.innerHeight}
      width={window.innerWidth}
      mapStyle={mapStyle}
      mapboxApiAccessToken={''}
      onViewportChange={dispatchChangeViewport}
      onError={showErrorMsg}
      onClick={openPopupOrNot}>
      {Tooltip(popupLng, popupLat, properties, dispatchClosePopup)}
    </ReactMapGL>
  );
};

export interface MapState {
  viewport: Viewport;
  mapStyle: any;
  popupLat: number;
  popupLng: number;
  properties: {[key: string]: string};
}

const mapStateToProps = (state: RootState) => ({
  mapStyle: state.map.mapStyle,
  viewport: state.map.viewport,
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
