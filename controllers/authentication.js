'use strict';

const ntlm = require('express-ntlm');
const ldapConfig = require('../config/ldap');
const caConfig = require('../config/ca');
const fs = require('fs');

const auth = ntlm
				({
					domain: 'Domain Controller',
				   	domaincontroller: ldapConfig.ldap.url,
				   	tlsOptions: {
					   ca: fs.readFileSync(caConfig.CA.cert)
					}
                });


function ntlmAuth(request, response) {
	response.send(JSON.stringify(request.ntlm));
}

module.exports = {ntlmAuth, auth}