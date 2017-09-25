var webpack = require('webpack');
//var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  entry: './src/composable.js',
  output: {
    path:__dirname + '/dist/',
    filename:'composable.min.js'
  },
  module: { //maybe for runnign the tests in the browser
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015'],
        }
      }
    ]
  }
};
