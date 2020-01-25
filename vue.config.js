module.exports = {
  productionSourceMap: false,
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