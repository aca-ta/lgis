import React from 'react';
import MapGL from 'react-map-gl';
import {fromJS} from 'immutable';
import {getLayer, defaultLayer} from './map-style.js';

export default class Map extends React.Component {
  state = {
    mapStyle: defaultLayer,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: 35.681167,
      longitude: 139.767052,
      zoom: 10,
    },
  };

  loadData = (settingJson, table) => {
    const settings = JSON.parse(settingJson);
    const {source, layer} = getLayer(
      settings.host,
      settings.db,
      table
    );

    const mapStyle = defaultLayer
      .setIn(['sources', 'lgis'], fromJS(source))
      .set('layers', defaultLayer.get('layers').push(layer));

    this.setState({mapStyle: mapStyle})
  };

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
