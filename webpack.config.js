const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

require('dotenv').config();

const defineEnv = new webpack.DefinePlugin({
  'process.env': {
    MapboxAccessToken: JSON.stringify(process.env.MapboxAccessToken),
  },
});

const javascripts = {
  mode: 'development',
  entry: './client/js/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public/javascripts'),
    filename: 'lgis.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  devtool: '#eval-cheap-module-source-map',
  plugins: [defineEnv],
  cache: true,
};

const css = {
  mode: 'development',
  entry: './client/css/style.scss',
  output: {
    path: path.resolve(__dirname, 'public/stylesheets'),
    filename: 'lgis.css',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {url: false},
          },
          {
            loader: 'sass-loader',
          },
        ]),
      },
    ],
  },
  plugins: [new ExtractTextPlugin('lgis.css')],
};

const smp = new SpeedMeasurePlugin()
module.exports = smp.wrap([javascripts, css]);
