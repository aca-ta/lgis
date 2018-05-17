module.exports = {
  entry: [
    'babel-polyfill',
    './src/js/index.js',
  ],
  output: {
    path: `${__dirname}/public/javascripts`,
    filename: 'lgis.js',
  },
  module: {
    noParse: /tangram\/dist\/tangram/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
        },
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
    ],
  },
  devtool: 'source-map',
};
