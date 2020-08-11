'use strict';

const assert = require('assert');
const health = require('../controllers/health');
const sinon = require('sinon');
    
describe('Health Check', function() {

    it('should return OK', function (done) {
        let req = {}
        // Have `res` have a send key with a function value coz we use `res.send()` in our func
        let res = {
          // replace empty function with a spy
          send: sinon.spy()
        }

        health.checkHealth(req, res);
        //spy.calledOnce;
        assert.equal(res.send.firstCall.args[0],JSON.stringify({"status":"OK"}));
        done();    
    });

});

//https://scotch.io/tutorials/how-to-test-nodejs-apps-using-mocha-chai-and-sinonjs