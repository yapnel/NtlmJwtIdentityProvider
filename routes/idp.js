'use strict';

const express = require('express');
const router = express.Router();
const ntlm = require('../middlewares/ntlm');
const authorization = require('../controllers/authorization');
const authentication = require('../controllers/authentication');
const health = require('../controllers/health');

router.get('/health', health.checkHealth);

router.get('/auth', ntlm.auth, authorization.getToken);

router.get('/testNTLM', ntlm.auth, authentication.ntlmAuth);

router.post('/testVerify', authorization.verifyToken);

module.exports = router;
