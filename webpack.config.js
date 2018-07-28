const ExtractTextPlugin = require('extract-text-webpack-plugin');

const javascripts = {
  mode: 'development',
  entry: ['babel-polyfill', './client/js/index.js'],
  output: {
    path: `${__dirname}/public/javascripts`,
    filename: 'lgis.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  externals: {
    jQuery: 'jQuery',
    foundation: 'Foundation',
  },
  node: {
    fs: 'empty',
  },
  devtool: 'source-map',
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

module.exports = [javascripts, css];
