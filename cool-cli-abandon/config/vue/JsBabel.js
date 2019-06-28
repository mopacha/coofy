exports.get = () => {
	return {
		presets: [
			[
				'@babel/preset-env',
				{
					targets: {
						browsers: ['last 2 versions', 'ie >= 9']
					},
					modules: false,
					useBuiltIns: 'entry',
					debug: false
				}
			]
		],
		plugins: [
			['@babel/plugin-transform-runtime'],
			['@babel/plugin-syntax-dynamic-import'],
			['transform-vue-jsx'],
			//['dynamic-import-node'],
			[
				'component',
				{
					libraryName: 'element-ui',
					styleLibraryName: 'theme-chalk'
				}
			]
		]
	}
}
