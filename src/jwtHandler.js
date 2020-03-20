// load all dependencies
const Promise = require('bluebird');
const exceptions = require('./customExceptions');
const appConstants = require('./constants');
const jsonwebtoken = require('jsonwebtoken');

const jwt = Promise.promisifyAll(jsonwebtoken);
const TOKEN_EXPIRATION_SEC = appConstants.TOKEN_EXPIRATION_TIME * 60;
const EMAIL_LINK_EXP_TIME = '2d';
const JWT_ALGORITHM = 'RS256';
const JWT_SECRET_KEY = 'login_secret_key_to_save_data';

const genUsrToken = function(user) {
	var options = {};
	return jwt
		.signAsync(user, JWT_SECRET_KEY, options)
		.then(function(jwtToken) {
			return jwtToken;
		})
		.catch(function(err) {
			throw new exceptions.tokenGenException();
		});
};

const genAdminToken = function(admin, setExpire) {
	var options = {};
	return jwt
		.signAsync(admin, JWT_SECRET_KEY, options)
		.then(function(jwtToken) {
			return jwtToken;
		})
		.catch(function(err) {
			throw new exceptions.tokenGenException();
		});
};

const verifyUsrToken = function(acsTokn) {
	return jwt
		.verifyAsync(acsTokn, JWT_SECRET_KEY)
		.then(function(tokenPayload) {
			this.tokenPayload = tokenPayload;
			return redisClient.getValue(acsTokn);
		})
		.then(function(reply) {
			if (reply) {
				return this.tokenPayload;
			} else {
				throw err;
			}
		})
		.catch(function(err) {
			throw new exceptions.unauthorizeAccess(err);
		});
};

const verifyUsrForgotPassToken = function(acsTokn) {
	return jwt
		.verifyAsync(acsTokn, JWT_SECRET_KEY)
		.then(function(tokenPayload) {
			return tokenPayload;
		})
		.catch(function(err) {
			throw new exceptions.unauthorizeAccess(err);
		});
};

const expireToken = function(req) {
	var token = req.get('accessToken');
	if (token) {
		//blacklist token in redis db
		//it will be removed after 6 months
		redisClient.setValue(token, true);
		redisClient.expire(token, TOKEN_EXPIRATION_SEC);
	}
};

module.exports = {
	genUsrToken: genUsrToken,
	verifyUsrToken: verifyUsrToken,
	expireToken: expireToken,
	genAdminToken: genAdminToken,
	verifyUsrForgotPassToken,
};
