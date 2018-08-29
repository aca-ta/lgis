import * as React from 'react';
import MapGL, {Viewport} from 'react-map-gl';
import {State} from '../reducers/index';
import {State as MapState} from '../reducers/map';

interface MapProps {
  settings: string;
  table: string;
}

export interface MapState{
  
}

export default class Map extends React.Component<MapProps, MapState> {
  public render() {
    const {viewport, mapStyle, height, width, mapboxApiAccessToken} = this.props;
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
