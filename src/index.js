// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const infoLog = require('debug')('bsf_api:info:index');
const {
  port,
  env,
} = require('./config/vars');
const logger = require('./config/logger');
const mongooseClient = require('./config/mongoose');
const app = require('./config/express');

infoLog.log = console.log.bind(console);
infoLog('  Init API server...');

// open mongooseClient connection
mongooseClient.connect();

/** ********************************************** */
// Express server listening...
// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

/**
* Exports express
* @public
*/
module.exports = app;
