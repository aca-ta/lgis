import {fromJS, List, Map } from 'immutable';
import { addLayerStyle } from '../../models/layer';


describe('addLayerStyle', () => {
  it('returns new mapStyle', () => {

    const mapStyle = fromJS({
      sources: [],
      layers: []
    });
    const setting = "{}";
    const table = "test";
    const geomType = "point";

    const expected = fromJS({
      "sources": [],
      "layers":  [
        {
          "id": "point", 
          "type": "circle",
          "source": "lgis",
          "source-layer":
          "tile",
          "interactive": true,
          "paint": {
            "circle-color": "#4153f4"
          }
        }
      ]
    });

    expect(addLayerStyle(mapStyle, setting, table, geomType)).toEqual(expected);
  })
});
