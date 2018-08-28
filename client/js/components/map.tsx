import * as React from 'react';
import MapGL, {Viewport} from 'react-map-gl';
import {State} from '../reducers/index';

interface MapProps {
  settings: string;
  table: string;
}

export default class Map extends React.Component<MapProps, State> {
  public render() {
    const {viewport, mapStyle, height, width, mapboxApiAccessToken} = this.state;
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
