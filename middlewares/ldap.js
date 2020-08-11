"use strict";

const logger = require('../config/winston');
const ldap = require('ldapjs');
const ldapConfig = require('../config/ldap');
const caConfig = require('../config/ca');
const jwt = require('../middlewares/jwt');
const fs = require('fs');
let root = fs.readFileSync(caConfig.CA.cert) ;

const usernameLDAP = process.env.ldapUsername;
const passwordLDAP = process.env.ldapPassword;

function ldapSearch(username, ldapURL, searchBase, ntlmObj, next) {

    const ldapOpts = {
		filter: (ldapConfig.ldap.searchFilter).replace('${username}', username),
		scope: 'sub',
		attributes: ['mail', 'memberOf', 'employeeID']
	}

	var ldapClient = ldap.createClient({
		url: ldapURL,
		tlsOptions: {
			ca: root
		}
	});

	ldapClient.bind(usernameLDAP, passwordLDAP, function (err) {

		if (err) {
			logger.error('Binding Error ' + err);
			return next('Binding Error ' + err);
		} else {

			ldapClient.search(searchBase, ldapOpts, function (err, res) {
				let userFound = false;

				res.on('searchEntry', function (entry) {
					userFound = true;
					let userObj = ntlmObj;
					userObj['email'] = entry.object.mail;
					userObj['employeeID'] = entry.object.employeeID;

					extractADGroups('CN=XXX', entry, function (err,result) {
						if (err) {
							logger.error(err);
							return next(err);
						} else {
							userObj['memberOf'] = result;
							return next(null, userObj);
						}
					});
				});

				res.on('error', function (err) {
					logger.error('error: ' + err.message);
					return next('LDAP Search Error ' + err);
				});

				res.on('end', function (result) {
					if(!userFound) {
						next(null,-1); // -1 means no user found in LDAP
					}

					ldapClient.unbind(function (err) {
						if (err) {
							logger.error('Unbind Error: ' + err);
							return next('LDAP Unbind Error ' + err);
						}
					});
				});


			});
		}
	});

}


function extractADGroups(prefix, entry, next) {
	let memberOfArr = [];
	for (var i = 0; i < entry.object.memberOf.length; i++) {
		if (entry.object.memberOf[i].startsWith(prefix)) {
			let mbrs = entry.object.memberOf[i];
			let pos = mbrs.indexOf(',');
			memberOfArr.push(mbrs.substr(3, pos - 3));
		}
	}
	return next(null,memberOfArr);
}

module.exports = {ldapSearch, extractADGroups};