# Light GIS

LGIS is a lightweight web GIS application.  
Render geospatial data with PostGIS. 

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

To use Lgis, you'll need a Mapbox Access token.  
There are two ways to provide a token to Lgis.

- Set your access token in the URL.
  - E.g `?access_token=TOKEN`
- Create `.env` file and write your token in the file.
  - E.g `MapboxAccessToken=TOKEN`

## Depends

- [react-map-gl](https://github.com/uber/react-map-gl)
- [node-mapnik](https://github.com/mapnik/node-mapnik)

## Tests

```
yarn test
```

