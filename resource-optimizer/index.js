const path = require('path')

const tasks = ['clean', 'build', 'addHash', 'pkStatic', 'babelNode', 'pkNode']

module.exports = config => {
  config = Object.assign(
    {},
    {
      STATIC_BUILD_PATH: 'build/static'
    },
    config
  )

  tasks.forEach(function (task) {
    require(path.join(__dirname, 'tasks/' + task))(config)
  })
}
