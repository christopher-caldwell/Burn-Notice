module.exports = {
  'transpileDependencies': [
    'vuetify'
	],
	configureWebpack:{
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 100000,
      }
    }
	},
	productionSourceMap: false
}
