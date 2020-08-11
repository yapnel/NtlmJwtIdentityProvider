'use strict';

const debug = require('debug')('ntlm');
const ntlm = require('express-ntlm');
const ldapConfig = require('../config/ldap');
const caConfig = require('../config/ca');
const fs = require('fs');

const auth = ntlm
				({
					debug: function() {
						var args = Array.prototype.slice.apply(arguments);
						debug(args);
					},
					domain: 'Domain Controllers',
				   	domaincontroller: ldapConfig.ldap.url,
				   	tlsOptions: {
					   ca: fs.readFileSync(caConfig.CA.cert)
					}
                });

module.exports = {auth}