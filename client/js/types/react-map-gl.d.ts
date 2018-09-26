export interface Layer {
  id: string;
  type: string;
  source: string;
  'source-layer': string;
  paint: any;
}

export interface Feature {
  id: number;
  layer: Layer;
  properties: {[key: string]: string};
  source: string;
  sourceLayer: string;
  state: {};
  type: string;
}
