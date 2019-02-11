const path = require('path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    merge = require('webpack-merge'),
    common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    mode: 'production',
    output: {
		path: path.join(__dirname, 'dist'),
		filename: "bundle.[hash].min.js",
	        publicPath: '/'
	},
	plugins: [
		new CleanWebpackPlugin(['dist/*.*'], {
            root: __dirname,
            watch: true
        }),
        new Dotenv()
	]
});
