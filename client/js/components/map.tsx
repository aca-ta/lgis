import * as React from 'react';
import MapGL, {Viewport} from 'react-map-gl';
import {State} from '../reducers/index';

interface MapProps {}

export interface MapState {
  mapStyle: {};
  width: number;
  height: number;
  mapboxApiAccessToken: string;
  viewport: Viewport;
}

export default class Map extends React.Component<MapProps, MapState> {
  public render() {
    const {
      viewport,
      mapStyle,
      height,
      width,
      mapboxApiAccessToken,
    } = this.state;
    return (
      <MapGL
        {...viewport}
        height={height}
        width={width}
        mapStyle={mapStyle}
        mapboxApiAccessToken={mapboxApiAccessToken}
        onViewportChange={(viewport: Viewport) => this.setState({viewport})}
      />
    );
  }
}
