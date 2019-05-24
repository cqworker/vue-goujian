'use strict'
// build时被webpack.prod.cong.js调用
let baseUrl = '"http://prod.ip"'
console.log('prod.env.js: '+baseUrl)

module.exports = {
  NODE_ENV: '"production"',
  //自定义HTTP网络请求baseUrl
  baseUrl: baseUrl
}
