module.exports = {
  entry: [
    'babel-polyfill',
    './src/init.js',
  ],
  output: {
    path: __dirname + '/public/javascripts',
    filename: 'lgis.js',
  },
  module: {
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
};
