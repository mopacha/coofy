


/**
 * @file vue spa webpack 配置
 * @author moofyu@163.com
 */

const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const TimeFixPlugin = require('time-fix-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BabelConfig = require('./JsBabel')
const staticPublicPath = require(path.join(process.cwd(), './src/app.config'))
  .staticUrl

const coolConfig  = require('./coolConfig')()
 
function srcPath(dir) {
  return path.join(process.cwd(), './src', dir)
}

const webpackConfig = env => {
  const isProd = env === 'production'
  const AUTOPREFIXER_BROWSERS = [
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'Opera >= 12',
    'Safari >= 7.1'
  ]

  let config ={
    entry: {},
    mode: env,
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.join(process.cwd(), './dist/'),
      publicPath: isProd ? `${staticPublicPath}/` : '/'
    },
    resolve: {
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
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: file => (
            /node_modules/.test(file) && !/\.vue\.js/.test(file)
          ),
          use: {
            loader: 'babel-loader',
            options: BabelConfig.get()
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

      ]
    },

    optimization: {
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
            autoprefixer: { disable: true }, 
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
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
      }
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].css'
      })
    ]
  }

  if(!isProd) {
    config.devtool = '#inline-source-map'
    config.plugins = config.plugins.concat([
      new webpack.NamedModulesPlugin(),
      new TimeFixPlugin(),
      new ProgressBarPlugin()
    ])
  }


  config = coolConfig.webpack(config)
  
  return config
}

module.exports = webpackConfig