var path = require('path');
var webpack = require('webpack');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var conf_browser = {
	entry: ['./src/_main-browser.js'],
	output: {
		path: path.resolve(__dirname, './www/'),
		publicPath: '',
		filename: 'build-browser.js'
	},
	module: {
		rules: [{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {}
				}
			}, {
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}, {
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: 'img/[name].[ext]?[hash]'
				}
			}, {
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'file-loader', // url-loader
				options: {
					limit: 10000,
					name: 'fonts/[name].[hash:7].[ext]'
				}
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	},
	devServer: {
		historyApiFallback: true,
		noInfo: false,
		contentBase: "www"
	},
	performance: {
		hints: false // 'error'
	},
	// https://webpack.github.io/docs/configuration.html#devtool
	devtool: '#cheap-module-eval-source-map', // faster than '#eval-source-map', 
	plugins: [
		new FriendlyErrorsWebpackPlugin()
	]
}

if (process.env.NODE_ENV === 'production') {
	conf_browser.devtool = '#source-map';
	conf_browser.plugins = conf_browser.plugins.concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false,
                comparisons: false  // workaround for https://github.com/mapbox/mapbox-gl-js/issues/4359
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		/**
			This hack is for preventing moment.js from bloating the bundle with its locales
			alt solution is new webpack.IgnorePlugin(/(locale)/, /node_modules.+(momentjs)/)
			or just https://github.com/ksloan/moment-mini
			see also https://github.com/webpack/webpack/issues/3128
		*/
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
	])
}

module.exports = [conf_browser];