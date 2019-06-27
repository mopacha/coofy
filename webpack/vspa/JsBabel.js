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
					corejs: '2',
					debug: false
				}
			]
		],
		plugins: [
			['@babel/plugin-transform-runtime'],
			['@babel/plugin-syntax-dynamic-import'],
			['transform-vue-jsx'],
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
