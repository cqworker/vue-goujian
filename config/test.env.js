'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

// build时被webpack.prod.cong.js调用
let baseUrl = '"http://test.ip"'
console.log('test.env.js: '+baseUrl)

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  //自定义HTTP网络请求baseUrl
  baseUrl: baseUrl
})
