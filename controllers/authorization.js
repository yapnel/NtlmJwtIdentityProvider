'use strict';

const logger = require('../config/winston');
const jwt = require('../middlewares/jwt');
const ldap = require('../middlewares/ldap');
const ldapConfig = require('../config/ldap');

function getToken(request, response) {

    ldap.ldapSearch(request.ntlm.UserName, ldapConfig.ldap.url, ldapConfig.ldap.searchBase, request.ntlm, function (err, res) {

        if (err) {
			return response.status(500).send({ success: false, message: err });
        } else {

            if (res == -1) { // -1 means no user found in LDAP
                return response.status(403).send('Forbidden - No User Found in LDAP');
            }

            jwt.signing(res, request.ntlm.UserName, function (error, res) {
                if (error) {
                    logger.error(error);
                    return (error);
                } else {
                    response.send(JSON.stringify({token:res}));
                }
            });

        }

	});
}

function verifyToken(request, response) {
    let token;
    try {
        token = request.header('Authorization').replace(/^Bearer\s/, '');
    } catch (err) {
        return response.status(403).send('No Authorization Bearer header set');
    }


	jwt.verifying(token, function (err, decoded) {
		if (err) {
			return response.status(401).send({ success: false, message: 'Failed to authenticate token.' });
		} else {
			response.send(JSON.stringify({claim:decoded}));
		}
	});

}

module.exports = {getToken, verifyToken}