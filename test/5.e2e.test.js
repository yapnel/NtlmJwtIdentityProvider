'use strict';

require('dotenv').config();

let
  assert = require('assert'),
  request_ntlm = require('request-ntlm-lite'),
  request = require('supertest')
  ;

  const testuser = 'TestUser';
  const testpass = 'TestUser';

describe('End 2 End Test Suite', function () {
  let server;
  let options;

  before(function () {
    server = require('../index.js');
  });

  after(function () {
    server.close(() => {
      process.exit(0); // SOMETHING IS WRONG. request-ntlm-lite keep-alive Connection header is not shutdown by Express server close gracefully
    });
  });

  describe('Health Check', function () {
    it('should return status OK health check', function (done) {
      request(server)
        .get('/api/health')
        .expect('Content-Type', /json/)
        .expect(function (res) {
          res.body.status = res.body.status;
        })
        .expect(200, {
          status: 'OK'
        }, done());
    });
  });

  describe('NTLM Auth', function () {
    it('should return forbidden by NTLM', function (done) {
      options = {
        username: "",
        password: "",
        ntlm_domain: "domain",
        url: 'http://127.0.0.1:8080/api/testNTLM',
        strictSSL: false
      };

      request_ntlm.get(options, null, function (err, res, body) {
        if (err) {
          console.log(err);
          done(err);
        } else {
          assert.equal(body, 'Forbidden');
          done();
        }
      });
    });

    it('should return authenticated by NTLM', function (done) {
      options = {
        username: testuser,
        password: testpass,
        ntlm_domain: "domain",
        url: 'http://127.0.0.1:8080/api/testNTLM',
        strictSSL: false
      };

      request_ntlm.get(options, null, function (err, res, body) {
        if (err) {
          console.log(err);
          done(err);
        } else {
          assert.equal(body, '{"DomainName":"domain","UserName":"TestUser","Workstation":"","Authenticated":true}');
          done();
        }
      });
    });

    it('should get 401 Unauthorized by NTLM', function (done) {
      request(server)
        .get('/api/testNTLM')
        .expect(401, done);
    });

  });

  describe('IDP Endpoints', function () {

    it('GET /api/auth success', function (done) {
      options = {
        username: testuser,
        password: testpass,
        ntlm_domain: "domain",
        url: 'http://127.0.0.1:8080/api/auth',
        strictSSL: false
      };

      request_ntlm.get(options, undefined, function (err, res, tk) {
        if (err) {
          console.log(err);
          done(err);
        } else {
          assert.equal(JSON.parse(tk).token.match(/\./g).length, 2);
          done();
        }
      });
    });

    it('GET /api/auth failure', function (done) {
      options = {
        username: "fakeuser",
        password: "fakepass",
        ntlm_domain: "domain",
        url: 'http://127.0.0.1:8080/api/auth',
        strictSSL: false
      };

      request_ntlm.get(options, undefined, function (err, res, tk) {
        if (err) {
          console.log(err);
          done(err);
        } else {
          assert.equal(tk, 'Forbidden');
          done();
        }
      });
    });


    it('POST /api/testVerify failure', function (done) {
      request(server)
        .post('/api/testVerify')
        .set('Authorization', 'Bearer 413ewadsasasdasdasd')
        .expect(401)
        .end(function (err, res) {
          if (err) {
            console.log('POST /api/testVerify failure '+ err);
            done(err);
          }
          assert(res.body,{success: false, message: 'Failed to authenticate token.'});
          done();
        });
    });

    it('POST /api/testVerify success', function (done) {
      options = {
        username: testuser,
        password: testpass,
        ntlm_domain: "domain",
        url: 'http://127.0.0.1:8080/api/auth',
        strictSSL: false
      };

      request_ntlm.get(options, undefined, function (err, res, tk) {
        if (err) {
          console.log('POST /api/testVerify success ' + err);
          done(err);
        } else {
          request(server)
            .post('/api/testVerify')
            .set('Authorization', 'Bearer '+ JSON.parse(tk).token)
            .expect(200)
            .end(function (err, res) {
              if (err) {
                console.log(err);
                done(err);
              }
              assert.notEqual(JSON.parse(res.text).claim.memberOf.length,0);
              done();
          });
        }
      });
    });

  });

});








