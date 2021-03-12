'use strict';

const path = require('path');

module.exports = {
  entry: './js/script.js',
	mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
  },

	watch: true,

	devtool: "source-map",

	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/preset-env',{
							debug: true,
							corejs: 3,
							useBuiltIns: "usage"
						}]]

					}
				}
			}
		]
	}
};