import React, {Component} from 'react';
import MapGL from 'react-map-gl';
import {fromJS} from 'immutable';
import {getLayer, getDefaultLayer} from './map-style.js';

export default class Map extends Component {
  constructor() {
    super();
    const defaultLayer = getDefaultLayer();
    const layerData = getLayer();
    const mapStyle = this.loadData(defaultLayer, layerData);

    this.state = {
      mapStyle: mapStyle,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 35.681167,
        longitude: 139.767052,
        zoom: 15,
      },
    };
  }

  loadData(defaultLayer, layerData) {
    const {source, layer} = layerData;

    const mapStyle = defaultLayer
      .setIn(['sources', 'lgis'], fromJS(source))
      .set('layers', defaultLayer.get('layers').push(layer));

    return mapStyle;
  }

  render() {
    const {viewport, mapStyle} = this.state;
    return (
      <MapGL
        {...viewport}
        mapStyle={mapStyle}
        onViewportChange={viewport => this.setState({viewport})}
      />
    );
  }
}
