import {fromJS} from 'immutable';
import * as React from 'react';
import MapGL, {Viewport} from 'react-map-gl';
import {defaultLayer, getLayer} from './map-style';

interface Props {
  settings: string;
  table: string;
}

interface State {
  mapStyle: {};
  width: number;
  height: number;
  mapboxApiAccessToken: string;
  viewport: Viewport;
}

export default class Map extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      mapStyle: defaultLayer,
      width: window.innerWidth,
      height: window.innerHeight,
      mapboxApiAccessToken: '',
      viewport: {
        latitude: 35.681167,
        longitude: 139.767052,
        zoom: 10,
      },
    };
  }

  public loadData = (settingJson: string, table: string) => {
    const settings = JSON.parse(settingJson);
    const {source, layer} = getLayer(settings.host, settings.db, table);

    const mapStyle = defaultLayer
      .setIn(['sources', 'lgis'], fromJS(source))
      .set('layers', defaultLayer.get('layers').push(layer));

    this.setState({mapStyle});
  };

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
