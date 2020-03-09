const STAGE = process.env.STAGE

const stageEnum = {
	'local': 'off',
	'dev': 'off',
	'qa': 'error',
	'prod': 'error'
}

const consoleLogError = stageEnum[STAGE]

module.exports = {
	rules: {
    'no-console': consoleLogError
  }
}
