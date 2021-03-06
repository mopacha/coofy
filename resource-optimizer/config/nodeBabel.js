exports.get = () => {
	return {
		plugins: [
			['@babel/plugin-proposal-decorators', { legacy: true }],
			['@babel/plugin-transform-runtime']
		],
		presets: [
			[
				'@babel/preset-env',
				{
					targets: {
						node: 8
					}
				}
			]
		]
	}
}
