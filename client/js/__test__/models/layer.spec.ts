import { addLayerStyle } from '../../models/layer';

describe('addLayerStyle', () => {
  it('returns new mapStyle', () => {

    const mapStyle = {
      sources: {},
      layers: {}
    };
    const setting = "{}";
    const table = "test";
    const geomType = "point";

    expect(addLayerStyle(mapStyle, setting, table, geomType)).toBe({});
  })
});
