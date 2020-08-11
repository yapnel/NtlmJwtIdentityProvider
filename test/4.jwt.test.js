'use strict';

const assert = require('assert');
const jwt = require('../middlewares/jwt');

describe('JWT Authorizaton Service', function() {

    it('should return a valid signed JWT', function (done) {
        let username = 'cowdie';
        let userObj = {};
        userObj['email'] = 'bob.joy@domain.com';
        userObj['employeeID'] = '123654987';

        jwt.signing(userObj, username, function (err, token) {
            if (err) {
                console.log(err);
                return done(err);
            } else {
                assert.equal(token.match(/\./g).length, 2);
                return done();
            }
        });
    });

    it('should verify JWT successfully', function (done) {
        let username = 'cowdie';
        let userObj = {};
        userObj['email'] = 'bob.joy@domain.com';
        userObj['employeeID'] = '123654987';

        jwt.signing(userObj, username, function (err, token) {
            if (err) {
                console.log(err);
                return done(err);
            } else {
                jwt.verifying(token, function(err, decoded) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    } else {
                        assert.equal(decoded.sub,'cowdie');
                        return done();
                    }
                });
            }
        });
    });


});

