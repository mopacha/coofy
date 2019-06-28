const path = require('path')
exports.resolveNodeModulesPath = function () {
  let nodeModulesPath;
  try {
    nodeModulesPath =  path.join(require.resolve('webpack-dev-server/client'), '../../../')
  } catch(e) {
    nodeModulesPath = path.join(__dirname, '../../')
  }
  return nodeModulesPath
}