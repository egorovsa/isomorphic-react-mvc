const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nib = require('nib');
const jeet = require('jeet');

const host = '127.0.0.1';
const port = 3000;

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
    devtool: "source-map",
    devServer: {
        contentBase: [
            path.join(__dirname, "dist"),
            path.join(__dirname, "dist/webroot")
        ],
        overlay: {
            warnings: true,
            errors: true
        },
        historyApiFallback: true,
        host: host,
        port: port
    },
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
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            minimize: true
                        }
                    }, {
                        loader: 'stylus-loader',
                        options: {
                            sourceMap: true,
                            use: [
                                jeet(),
                                nib()
                            ]
                        }
                    }
                ]
            },
            {
                enforce: "pre",
                test:
                    /\.js$/,
                loader:
                    "source-map-loader"
            }
            ,
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
    },
    plugins: [
        new CleanWebpackPlugin(['dist/webroot'], {
            verbose: true
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/webroot',
                to: __dirname + '/dist/webroot'
            }, {
                from: 'src/ts/app/api/local-data',
                to: __dirname + '/dist/webroot/local-data'
            }
        ], {
            debug: false,
            copyUnmodified: false
        }),
        new HandlebarsPlugin({
            entry: './src/index.hbs',
            output: './dist/index.html',
            data: {
                version: '0',
                componentHtml: '{{{componentHtml}}}',
                title: '{{{title}}}',
                keywords: '{{{keywords}}}',
                description: '{{{description}}}',
                initialState: '',
            }
        })
    ]
}
;