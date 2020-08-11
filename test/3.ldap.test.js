'use strict';

require('dotenv').config();
const assert = require('assert');
const ldap = require('../middlewares/ldap');

describe('EUROPA LDAP Service', function() {

    it('should extract AD Groups starting with prefix', function (done) {
        let entry = {};
        const prefix = 'CN=XXX';
        const entryObject = {
            dn: 'XXX',
            controls: [],
            memberOf: [
            'CN=XXX,OU=Groups,DC=domain,DC=flex,DC=net',
            'CN=General,OU=Groups,OU=Management,DC=domain,DC=flex,DC=net'
            ],
            mail: 'bob.ray@domain.com',
            rbsEmployeeID: '12345689'
        };
        entry['object'] = entryObject;

        ldap.extractADGroups(prefix, entry, function (err,result) {
            if (err) {
                return done(err);
            } else {
                assert.equal(result[0],"XXX");
                return done();
            }
        });

    });

    it('should return no user found', function (done) {
        const ldapConfig = require('../config/ldap');

        ldap.ldapSearch('fakeuser', ldapConfig.ldap.url, ldapConfig.ldap.searchBase, JSON.parse('{}'), function (err, res) {

            if (err) {
                console.log(err);
                return done();
            }

            assert.equal(res,-1); // -1 means no user found in LDAP
            return done();
        });

    });


    it('should return users AD groups', function (done) {
        const ldapConfig = require('../config/ldap');

        ldap.ldapSearch('TestUser', ldapConfig.ldap.url, ldapConfig.ldap.searchBase, JSON.parse('{}'), function (err, res) {

            if (err) {
                console.log(err);
                return done();
            }
            assert.notEqual(res.memberOf.length,0);
            return done();
        });

    });

});

