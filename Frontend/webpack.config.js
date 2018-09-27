var webpack = require('webpack');
var path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin({ filename: 'css.bundle.css' })

var APP_DIR = path.resolve(__dirname,'src');
var BUILD_DIR = path.resolve(__dirname,'dist/js');

var config = {
	entry: APP_DIR + '/index.js',
	output:{
		path:BUILD_DIR,
		publicPath:'/dist/js',
		filename:'bundle.min.js'
	},
	resolve: {
    extensions: ['.js', '.jsx', '.png', '.css'],
  },
	plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new ExtractTextPlugin("styles.css"),
  ],
	module:{
		loaders:[
			{
				test:/\.jsx?/,
				include:APP_DIR,
				loader:'babel-loader',
				exclude:'/node_modules/',
			},
			{
				 test: /\.css$/,
				 use: extractCSS.extract({
					 fallback: 'style-loader',
					 use: [ 'css-loader' ]
				 })
			},
		]
	},
	devServer: {
	    historyApiFallback: true,
	},
};

module.exports = config;
