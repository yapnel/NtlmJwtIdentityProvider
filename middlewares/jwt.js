'use strict';

const logger = require('../config/winston');
const jwt = require('jsonwebtoken');
const rsaConfig = require('../config/rsa');
const helper = require('../util/helper');
const fs = require('fs');
let pubKey;
let priKey;

helper.readFile(rsaConfig.RSA.public, function (err, content) {
    if (err) {
        throw err;
    } else {
        pubKey = content;
    }
});


helper.readFile(rsaConfig.RSA.private, function (err, content) {
    if (err) {
        throw err;
    } else {
        priKey = content;
    }
});


function signing(userObj, username, next) {

	let jwtOptions = {
		algorithm: 'RS256',
		expiresIn: '5m',
		subject: username,
		issuer: 'IDP',
		audience: 'Audience'
	};
    let pp = process.env.passphrasePassword;

	jwt.sign(userObj, { key:priKey, passphrase: pp}, jwtOptions, function (err, token) {

        if (err) {
            logger.error(err);
			return next(err);
		} else {
            return next(null,token);
		}
    });

}

function verifying(token, next) {
    jwt.verify(token, pubKey, function (err, decoded) {
        if (err) {
            logger.error(err);
            return next(err);
        } else {
            next(null,decoded);
        }
    });
}

module.exports = {
    signing,
    verifying
};
