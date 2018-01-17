const path = require("path");
const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');

module.exports = {
	target: 'node',
	externals: [nodeExternals()],
	node: {
		__dirname: false,
		__filename: false,
	},
	devtool: "source-map",
	watch: false,
	entry: {
		server: ['./src/ts/lib/server.ts']
	},
	output: {
		path: path.resolve(__dirname, './dist/server'),
		filename: '[name].js',
		publicPath: '/'
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'awesome-typescript-loader'
			},
			{
				test: /\.hbs$/,
				loader: "handlebars-loader"
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
		new webpack.DefinePlugin({
			$dirname: '__dirname',
		})
	]
};