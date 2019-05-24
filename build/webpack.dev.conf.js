'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
//通过webpack-merge实现webpack.dev.conf.js对wepack.base.config.js的继承
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//美化webpack的错误信息和日志的插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
//查看空闲端口位置，默认情况下搜索8000这个端口
const portfinder = require('portfinder')
//processs为node的一个全局对象,用于获取当前程序的环境变量
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

console.log('webpack.dev.conf.js: '+process.env.NODE_ENV)
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    //控制台显示的选项有none, error, warning 或者 info
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,//压缩
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  // 插件
  plugins: [
    // 通过webpack插件修改定义的变量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),

    new webpack.HotModuleReplacementPlugin(),// 热加载
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),//当webpack编译错误的时候，来中端打包进程，防止错误代码打包到文件中
    // https://github.com/ampedandwired/html-webpack-plugin

    new HtmlWebpackPlugin({// 将打包生成的css和js添加到html模板中，生成对应html
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([//复制插件
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // 端口被占用时就重新设置evn和devServer的端口
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
