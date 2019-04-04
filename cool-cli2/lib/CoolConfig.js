exports.get = function () {
  return {
    preset: 'vue',
    webpackConfig: function (config) {
      return config
    },
    devServerConfig: {
      hot: true,
      port: 8080
    },
    injectStaticHostUrl: null // 自定义处理 static host 的方案
  }
}
