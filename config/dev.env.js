'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // VUE_APP_BASE_API: '"/api"', 本地测试用
  BASE_API: '"http://localhost:8084/api"',  //远程部署用
})
