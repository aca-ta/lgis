import React, {Component} from 'react';
import MapGL from 'react-map-gl';
import {fromJS} from 'immutable';
import {getLayer, getDefaultLayer} from './map-style.js';
import load_settings from './setting';

export default class Map extends Component {
  constructor() {
    super();
    this.defaultLayer = getDefaultLayer();

    this.state = {
      mapStyle: this.defaultLayer,
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
    /*
    document.querySelector('#lgis-show-table').addEventListener('click', () => {
      const settings = load_settings('#lgis-settings');
      const table = document.querySelector('#lgis-table').value;

      const layerData = getLayer(settings.host, settings.db, table);
      const mapStyle = this.loadData(layerData);
      this.setState({mapStyle: mapStyle})
    });
    */
  }

  loadData(layerData) {
    const {source, layer} = layerData;

    const mapStyle = this.defaultLayer
      .setIn(['sources', 'lgis'], fromJS(source))
      .set('layers', this.defaultLayer.get('layers').push(layer));

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
