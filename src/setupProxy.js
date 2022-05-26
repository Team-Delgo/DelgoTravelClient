/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api/data', {
      target: 'http://kapi.kakao.com/kakao/v1/payment/ready',
      // pathRewrite: {
      //   '^https://kapi.kakao.com/':''
      // },
      changeOrigin: true
    }))
  }
