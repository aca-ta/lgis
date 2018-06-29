import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';
import mapStyle from './map-style.js';

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      viewport: {
        mapStyle: mapStyle,
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 35.681167,
        longitude: 139.767052,
        zoom: 15,
      },
    };
  }
  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({viewport})}
      />
    );
  }
}
