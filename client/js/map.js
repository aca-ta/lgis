import L from 'leaflet';

class Map {
  constructor() {
    this.map = L.map('map');
    this.map.setView([35.681167, 139.767052], 15);
  }
}


export default new Map().map;
