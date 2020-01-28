module.exports = {
  publicPath: '/static/',
  productionSourceMap: false,
  outputDir: '../msbox/msbox_web/src/main/resources/static',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://49.233.92.117:8001/',
        pathRewrite: {
          "^/api": "/"
        },
      }
    }
  },
};