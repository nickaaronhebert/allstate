const webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: [
        'babel-polyfill', 
        path.join(__dirname, "src/index.js")
    ],
	module: {
		rules: [
			/* Used to transpile es6 (presets in .babelrc file) */
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader']
			},
			/* Converts sass to css then loads the css as a style tag */
			/* Note loaders work from right to left (e.g sass-loader runs then css-loader then style-loader */
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
			/* Used to load images */
			{
                test: /\.(jpe?g|png|gif|svg|eot|woff|woff2|ttf)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: path.join('img/[name].[ext]'),
                        //name: 'img/[path][name].[ext]',
                        publicPath: '/'
                    }
                }
			}
		]
	},
	/* Defines the webpack plugins we want to apply */
	plugins: [
    /* Load a custom template (lodash by default see the FAQ for details) */
    new HtmlWebpackPlugin({
        template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.DefinePlugin({
      APPLICATION_VERSION: JSON.stringify(process.env.npm_package_version),
      INFINIT_LIMIT: 999999999999
    }),
	]
};