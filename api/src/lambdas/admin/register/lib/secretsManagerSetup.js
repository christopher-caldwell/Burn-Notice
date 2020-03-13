const { generateTokenWithSecretsManager, validateTokenWithSecretsManager  } = require('simple-lambda-actions/dist/auth')
const CustomError = require('simple-lambda-actions/dist/util/ErrorHandler')

const SecretId = process.env.SECRET_NAME
const nameOfSecret = process.env.SIGNING_KEY_NAME
const expiryDurationOfToken = process.env.TOKEN_DURATION

const secretManagerParams = { SecretId, nameOfSecret }

const generateToken = payload => {
	return generateTokenWithSecretsManager(secretManagerParams, payload, expiryDurationOfToken)
}

const validateToken = async token => {
	const decodedPayload = await validateTokenWithSecretsManager(secretManagerParams, token)
	if(decodedPayload.role !== 'super-admin'){
		throw new CustomError({
			message: 'Token provided does not allow creation of admin users',
			statusCode: 403
		})
	}
}

module.exports = { generateToken, validateToken }
