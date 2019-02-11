const path = require('path'),
    merge = require('webpack-merge'),
    common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
      path: path.join(__dirname),
      filename: "bundle.[hash].js",
      publicPath: '/'
  },
	devServer: {
        publicPath: '/',
        compress: true, // Should compress files
        port: 9500,
        host: '0.0.0.0',
        open: true,  // The dev server will open in the browser
        overlay: true, // Shows a full-screen overlay in the browser when there are compiler errors or warnings
        historyApiFallback: true //Redirect all web traffic back to index.html if a path is not found.

    },

    plugins: [
        new Dotenv()
    ]

});
