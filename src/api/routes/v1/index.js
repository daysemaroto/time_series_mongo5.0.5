const express = require('express');
const verbose = require('debug')('bsf_api:verbose:routes');
const debug = require('debug')('bsf_api:debug:routes');
// const multiparty = require('multiparty');

const router = express.Router();

/**
 * Log all requests
 */
router.all('*', (req, res, next) => {
  debug('req Auth: %o', req.get('Authorization'));
  verbose('req body: %o', req.body);
  verbose('req query: %o req.params: %o', req.query, req.params);
  next();
});

router.get('/status', (req, res) => res.send('OK'));


module.exports = router;
