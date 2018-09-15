import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import ReactMapGL, {Viewport, Popup, MapEvent} from 'react-map-gl';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import * as _ from 'lodash';
import {
  ActionTypes,
  changeViewport,
  openPopup,
  closePopup,
} from '../actions/map';

import {RootState} from '../reducers';
import {Feature} from '../types/react-map-gl.d';

const ToolTip = (
  isPopupOpen: boolean,
  latitude: number,
  longitude: number,
  properties: {[key: string]: string},
  dispatchClosePopup: () => void,
) => {
  if (Object.keys(properties).length === 0) return;
  const ParamList = Object.keys(properties).map(key => {
    return (
      <TableRow>
        <TableCell>{key}</TableCell>
        <TableCell>{properties[key]}</TableCell>
      </TableRow>
    );
  });

  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      anchor="top"
      onClose={() => dispatchClosePopup()}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{ParamList}</TableBody>
      </Table>
    </Popup>
  );
};

const Map = (props: {
  viewport: Viewport;
  mapStyle: any;
  isPopupOpen: boolean;
  popupLat: number;
  popupLng: number;
  properties: {};
  dispatchChangeViewport: (viewport: Viewport) => void;
  dispatchOpenPopup: (lat: number, lng: number, properties: {}) => void;
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
      onClick={(e: MapEvent, lngLat: number[], feature: Feature) =>
        dispatchOpenPopup(
          e.lngLat[0],
          e.lngLat[1],
          (e.features[0] as Feature).properties,
        )
      }>
      {ToolTip(isPopupOpen, popupLng, popupLat, properties, dispatchClosePopup)}
    </ReactMapGL>
  );
};

export interface MapState {
  viewport: Viewport;
  mapStyle: any;
  isPopupOpen: boolean;
  popupLat: number;
  popupLng: number;
  properties: {};
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
  dispatchOpenPopup: (lat: number, lng: number, properties: {}) => {
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
