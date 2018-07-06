import React, {Component} from 'react';
import MapGL from 'react-map-gl';
import {fromJS} from 'immutable';
import {getLayer, getDefaultLayer} from './map-style.js';

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      mapstyle: '',
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 35.681167,
        longitude: 139.767052,
        zoom: 15,
      },
    };
  }

  componentDidMount() {
    const defaultLayer = getDefaultLayer();
    const layer = getLayer();
    this.loadData(defaultLayer, layer);
  }

  loadData(defaultLayer, layer) {
    const mapStyle = defaultLayer
      .setIn(['sources', 'incomeByState'], fromJS({type: 'vector', layer}))
      .set('layers', defaultLayer.get('layers').push(layer));

    this.setState({layer, mapStyle});
  };

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({viewport})}
      />
    );
  }
}
