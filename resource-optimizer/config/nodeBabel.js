exports.get = () => {
  return {
    plugins: ['@babel/plugin-transform-runtime'],
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
