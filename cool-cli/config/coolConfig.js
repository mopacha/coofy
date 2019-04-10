const path = require('path')
const getDefault =  ()=> {
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

const getCoolConfig = env=> {
  let config
  try {
    config = require(path.join(process.cwd(), './cool.config.js'))
  } catch (e) {
    console.log('read cool.config.js fail')
    config = {}
  }
	config = Object.assign(getDefault(), config)
  return config
}

module.exports = {
	getCoolConfig
}