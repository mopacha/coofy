const spawn = require('cross-spawn')

module.exports = (script, args = []) =>
	spawn.sync('node', [require.resolve(script)].concat(args), {
		stdio: 'inherit'
	})
