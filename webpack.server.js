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
	watch: false,
	entry: {
		server: ['./src/ts/server.ts']
	},

	output: {
		path: path.resolve(__dirname, './dist/server'),
		filename: '[name].js'
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
			}
		]
	}, plugins: [
		new webpack.DefinePlugin({
			$dirname: '__dirname',
		}),
		// new webpack.DefinePlugin({
		//     'process.env.NODE_ENV': 'production'
		// }),
		// new webpack.LoaderOptionsPlugin({
		//     minimize: true,
		//     debug: false
		// }),
		// new webpack.optimize.UglifyJsPlugin({
		//     beautify: false,
		//     mangle: {
		//         screw_ie8: true,
		//         keep_fnames: true
		//     },
		//     compress: {
		//         screw_ie8: true
		//     },
		//     comments: false
		// })
	]
};