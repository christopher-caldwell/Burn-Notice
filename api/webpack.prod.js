const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: 'production',
  externals: {
    ...common.externals,
    'aws-sdk': 'aws-sdk'
	},
	plugins: [
		...common.plugins,
		new BundleAnalyzerPlugin()
	]
})