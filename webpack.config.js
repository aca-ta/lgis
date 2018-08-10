const webpack = require('webpack');
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
    path: `${__dirname}/public/javascripts`,
    filename: 'lgis.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /(node_modules)/,
        //include: '/client/js/*',
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  devtool: 'source-map',
  plugins: [defineEnv],
  cache: true,
};

const css = {
  mode: 'development',
  entry: './client/css/style.scss',
  output: {
    path: `${__dirname}/public/stylesheets`,
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
