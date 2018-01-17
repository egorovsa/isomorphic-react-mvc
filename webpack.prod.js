const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nib = require('nib');
const vendors = require('./webpack.vendors');

module.exports = {
	entry: {
		client: ['./src/ts/lib/client.tsx'],
		vendor: vendors
	},
	output: {
		path: path.resolve(__dirname, './dist/webroot/'),
		filename: 'js/[name].js',
		publicPath: '/'
	},
	devtool: false,
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['awesome-typescript-loader']
			}, {
				test: /\.styl$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								minimize: true
							}
						}, {
							loader: 'stylus-loader',
							options: {
								use: [
									nib()
								]
							}
						}
					]
				})
			},
			{
				test: /\.(woff|ttf|eot)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
				loaders:
					['file-loader']
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				loaders:
					[
						{
							loader: 'file-loader',
							query: {
								context: './src',
								name: '[path][name].[ext]'
							}
						},
						{
							loader: 'image-webpack-loader',
							options: {
								mozjpeg: {
									progressive: true,
									quality: 65
								},
								optipng: {
									enabled: false,
								},
								pngquant: {
									quality: '65-90',
									speed: 4
								},
								gifsicle: {
									interlaced: false,
								},
								webp: {
									quality: 75
								}
							}
						},
					]
			}
		]
	}, plugins: [
		new CleanWebpackPlugin(['dist/webroot'], {
			verbose: true
		}),
		new CopyWebpackPlugin([
			{
				from: 'src/webroot',
				to: __dirname + '/dist/webroot'
			},
			{
				from: 'src/ts/app/api/local-data',
				to: __dirname + '/dist/webroot/local-data'
			}
		], {
			debug: false,
			copyUnmodified: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		}),
		new ExtractTextPlugin({
			filename: '/css/style.css',
			allChunks: true
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			},
			compress: {
				screw_ie8: true,
				warnings: false
			},
			comments: false
		})
	]
};