import {fromJS} from 'immutable';
import * as React from 'react';
import MapGL, {InteractiveMapProps} from 'react-map-gl';
import {defaultLayer, getLayer} from './map-style.js';

interface Props {
  settings: string;
  table: string;
}

interface State {
  mapStyle: {};
  mapProps: InteractiveMapProps;
}

export default class Map extends React.Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      mapStyle: defaultLayer,
      mapProps: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 35.681167,
        longitude: 139.767052,
        zoom: 10,
        mapboxApiAccessToken: '',
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
    const {mapProps, mapStyle} = this.state;
    return (
      <MapGL
        {...mapProps}
        mapStyle={mapStyle}
        onViewportChange={(mapProps: InteractiveMapProps) =>
          this.setState({mapProps})
        }
      />
    );
  }
}
