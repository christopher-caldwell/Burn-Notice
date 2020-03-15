module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/recommended', 'eslint:recommended'],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'no-console': process.env.STAGE === 'prod' ? 'error' : 'off'
	}
}

