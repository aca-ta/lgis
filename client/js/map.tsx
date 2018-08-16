import {fromJS} from 'immutable';
import * as React from 'react';
import MapGL from 'react-map-gl';
import {defaultLayer, getLayer} from './map-style.js';

export default class Map extends React.Component {
  public state = {
    mapStyle: defaultLayer,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: 35.681167,
      longitude: 139.767052,
      zoom: 10,
    },
  };

  public loadData = (settingJson: string, table: string) => {
    const settings = JSON.parse(settingJson);
    const {source, layer} = getLayer(
      settings.host,
      settings.db,
      table
    );

    const mapStyle = defaultLayer
      .setIn(['sources', 'lgis'], fromJS(source))
      .set('layers', defaultLayer.get('layers').push(layer));

    this.setState({mapStyle})
  };

  public render() {
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
