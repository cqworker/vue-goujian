'use strict'
//webpack-merge提供了一个合并函数，它将数组和合并对象创建一个新对象
//如果遇到函数，它将执行它们，通过算法运行结果，然后再次将返回的值封装在函数中.
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


// 将dev和prod进行合并,更新NODE_ENV=development
module.exports = merge(prodEnv, {
  //JSON.parse('"a"') 语法原因
  NODE_ENV: '"development"',
})
