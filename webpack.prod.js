const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const nib = require('nib');
const jeet = require('jeet');

module.exports = {
    entry: {
        client: ['./src/ts/client.tsx'],
        vendor: [
            'react',
            'react-dom',
            'react-router'
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist/webroot/'),
        filename: 'js/[name].js'
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
                                    jeet(),
                                    nib()
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    {
                        loader: 'file-loader',
                        query: {
                            context: './src',
                            name: '[path][name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            quality: 90,
                            progressive: true,
                            gifsicle: {
                                interlaced: false
                            },
                            pngquant: {
                                quality: "95-100",
                                speed: 1
                            }
                        }
                    }
                ]
            }
        ]
    }, plugins: [
        new CleanWebpackPlugin(['dist/webroot'], {
            verbose: true
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/fonts',
                to: __dirname + '/dist/webroot/fonts'
            }, {
                from: 'src/webroot',
                to: __dirname + '/dist/webroot'
            }
        ], {
            debug: false,
            copyUnmodified: false
        }),
        new ExtractTextPlugin({
            filename: '/css/style.css',
            allChunks: true
        }),
        new HandlebarsPlugin({
            entry: path.join(process.cwd(), 'src/', 'index.hbs'),
            output: path.join(process.cwd(), 'dist', 'index.html'),
            data: {
                version: '0',
                componentHtml: '{{{componentHtml}}}',
                title: '{{{title}}}',
                keywords: '{{{keywords}}}',
                description: '{{{description}}}',
                initialState: '',
            }
        }),
        new HandlebarsPlugin({
            entry: path.join(process.cwd(), 'src/', 'index.hbs'),
            output: path.join(process.cwd(), 'dist', 'indexServer.hbs'),
            data: {
                version: '0',
                componentHtml: '{{{componentHtml}}}',
                title: '{{{title}}}',
                keywords: '{{{keywords}}}',
                description: '{{{description}}}',
                initialState: '<script>window["_INITIAL_STATE_"] = {{{initialState}}}</script>'
            }
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