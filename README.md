# Light GIS

A light weight web GIS tool.  
Rendering geospatial data with Postgis. made with [react-map-gl](https://github.com/uber/react-map-gl) and [mapnik](https://github.com/mapnik/node-mapnik).

![LGIS](media/header.gif)

## Install

```
yarn install
yarn build
```

## Usage

```
yarn start
```

### Mapbox Access Tokens

To use Lgis, you'll need a Mapbox Acess token.  
There are two ways to provide a token to Lgis.

- Set your access token in the URL.
  - e.g `?access_token=TOKEN`
- Create `.env` file and write your token in the file.
  - e.g `MapboxAccessToken=TOKEN`

## Depends

- [react-map-gl](https://github.com/uber/react-map-gl)
- [node-mapnik](https://github.com/mapnik/node-mapnik)

## Tests

```
yarn test
```

