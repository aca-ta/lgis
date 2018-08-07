# Light GIS

A light weight web GIS tool.  
Rendering geospatial data with Postgis.

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
There two ways to provide a token to Lgis.
- Set your access token in the URL. 
  - e.g `?access_token=TOKEN`
- Create `.env` file and write your token in the file.
  - e.g `MapboxAccessToken=TOKEN`

