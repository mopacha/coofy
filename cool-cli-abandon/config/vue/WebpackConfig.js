const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const TimeFixPlugin = require('time-fix-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const Smp = new SpeedMeasurePlugin()
const BabelConfig = require('./JsBabel')
const staticPublicPath = require(path.join(process.cwd(), './src/app.config'))
	.staticUrl

function srcPath(dir) {
	return path.join(process.cwd(), './src', dir)
}

exports._default = function(env) {
	env = env || 'development'

	const output = {
		path: path.join(process.cwd(), './dist/'),
		filename: '[name].js',
		chunkFilename: '[name].js',
		sourceMapFilename: '[name].js.map',
		publicPath: `${staticPublicPath}/`
	}

	const AUTOPREFIXER_BROWSERS = [
		'Chrome >= 35',
		'Firefox >= 31',
		'Explorer >= 8',
		'Opera >= 12',
		'Safari >= 7.1'
	]

	const GLOBALS = {
		'process.env': {
			NODE_ENV: JSON.stringify(env)
		},
		__DEV__: env === 'development'
	}

	const plugins = [
		new webpack.DefinePlugin(GLOBALS),
		new VueLoaderPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new ProgressBarPlugin(),

		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].css'
		})
	]

	const moduleConfig = {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: BabelConfig.get()
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},

			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'img/[name].[hash:6].[ext]'
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'media/[name].[hash:6].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'fonts/[name].[hash:6].[ext]'
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: {} },
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer')({
									overrideBrowserslist: AUTOPREFIXER_BROWSERS
								})
							]
						}
					},
					{ loader: 'sass-loader', options: {} }
				]
			}
		]
	}

	const resolve = {
		extensions: ['.js', '.vue', '.scss', '.json'],
		modules: [path.resolve('./src/static/'), path.resolve('./node_modules/')],
		alias: {
			vue: 'vue/dist/vue.esm.js',
			'@': srcPath(''),
			'@static': srcPath('static'),
			'#': srcPath('static/apps'),
			'@common': srcPath('static/common'),
			'@utils': srcPath('static/common/utils'),
			'@components': srcPath('static/common/components')
		}
	}
	const optimization = {
		minimizer: [
			// 自定义js优化配置，
			new TerserPlugin({
				terserOptions: {
					cache: false,
					parallel: true, // 开启并行压缩，充分利用cpu
					sourceMap: true,
					extractComments: true, // 移除注释
					compress: {
						unused: true,
						warnings: false,
						drop_debugger: true
					},
					output: {
						comments: false,
						ascii_only: true
					}
				}
			}),

			// 配置css文件压缩
			new OptimizeCssAssetsPlugin({
				assetNameRegExp: /\.css$/g,
				cssProcessorOptions: {
					safe: true,
					autoprefixer: { disable: true }, // 这里是个大坑，稍后会提到
					mergeLonghand: false,
					discardComments: {
						removeAll: true // 移除注释
					}
				},
				canPrint: true
			})
		],

		splitChunks: {
			automaticNameDelimiter: '-'
			// cacheGroups: {
			// 	libs: {
			// 		test: /[\\/]node_modules[\\/]/,
			// 		name: `chunk-lib`,
			// 		priority: 10,
			// 		chunks: 'initial' //  只打包初始时依赖的第三方
			// 	},
			// 	elementUI: {
			// 		name: `chunk-ui`,
			// 		priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
			// 		test: /[\\/]node_modules[\\/](_element-ui@2.7.2@element-ui|element-ui)[\\/]/,
			// 		chunks: 'initial'
			// 	},
			// 	commons: {
			// 		// test: path.join(process.cwd(), './src/static/public'), // 可自定义拓展你的规则
			// 		name: `chunk-commons`,
			// 		minChunks: 20000, // 最小共用次数,
			// 		priority: 5,
			// 		chunks: 'initial',
			// 		reuseExistingChunk: false
			// 	}
			// }
		},
		runtimeChunk: {
			name: entrypoint => `runtime-${entrypoint.name}`
		}
	}

	const config = {
		entry: {},
		output,
		mode: env,
		module: moduleConfig,
		plugins,
		resolve,
		optimization
	}
	return config
}

exports.production = function(env) {
	let config = this._default(env)
	return config
}

exports.development = function(env) {
	let config = this._default(env)
	config.devtool = '#inline-source-map'
	config.plugins = config.plugins.concat([
		new webpack.NamedModulesPlugin(),
		new TimeFixPlugin()
		// new BundleAnalyzerPlugin()
	])
	return config
	//return Smp.wrap(config)
}

exports.pkDevelopment = function(coolConfig) {
	// delete sockjs-node/info?t=1555055861466 on network
	const nodeModulesPath = require('../../utils/tools').resolveNodeModulesPath()
	const sockjsFile = nodeModulesPath + `sockjs-client/dist/sockjs.js`
	const fs = require('fs')

	fs.readFile(sockjsFile, 'utf8', function(err, data) {
		if (err) {
			return console.log(err)
		}
		const result = data.replace('self.xhr.send(payload);', '')
		fs.writeFile(sockjsFile, result, 'utf8', function(err) {
			if (err) return console.log(err)
		})
	})

	//const nodeModulesPath = require('../../utils/tools').resolveNodeModulesPath()
	//var preEntrys = [nodeModulesPath + 'vconsole/dist/vconsole.min.js']
	// if (coolConfig.devServer.hot) {
	// 	preEntrys = preEntrys.concat([
	// 		nodeModulesPath +
	// 			'webpack-dev-server/client?http://localhost:' +
	// 			coolConfig.devServer.port +
	// 			'/',
	// 		nodeModulesPath + 'webpack/hot/dev-server'
	// 	])
	// }

	const devServerConfig = coolConfig.devServer
	const config = coolConfig.webpackConfig

	var template = devServerConfig.template
		? devServerConfig.template
		: path.join(__dirname, '../../template/index.html')

	Object.keys(config.entry).forEach(function(entry) {
		// if (Array.isArray(config.entry[entry])) {
		// 	config.entry[entry].unshift.apply(config.entry[entry], preEntrys)
		// } else {
		// 	config.entry[entry] = preEntrys.concat(config.entry[entry])
		// }

		config.plugins.push(
			new HtmlWebpackPlugin({
				template: template,
				filename: `${entry}.html`,
				inject: true,
				chunks: [entry]
			})
		)
	})
	// if (coolConfig.devServer.hot) {
	// 	config.plugins.push(new webpack.HotModuleReplacementPlugin())
	// }
}

exports.pkProduction = function(coolConfig) {
	const config = coolConfig.webpackConfig
	return config
}
