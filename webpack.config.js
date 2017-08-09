module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js',
  ],
  output: {
    path: `${__dirname}/public/javascripts`,
    filename: 'lgis.js',
  },
  module: {
    noParse: /tangram\/dist\/tangram/,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  devtool: 'source-map',
};
