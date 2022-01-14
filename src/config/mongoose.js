const mongoose = require('mongoose');
const infoLog = require('debug')('bsf_api:info:index');
const logger = require('./logger');
const { mongo, env } = require('./vars');

infoLog.log = console.log.bind(console);

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  console.log('\n error DB: %o', err);
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});


// Ready to use mongoose connection
mongoose.connection.on('connected', () => {
  infoLog('  MongoDB Connected: %o', mongo.uri);
  logger.info(`MongoDB Connected: ${mongo.uri}`);
  if (env !== 'test') {
    const adminDB = new mongoose.mongo.Admin(mongoose.connection.db);
    adminDB.buildInfo((err, info) => {
      logger.info('MongoDB version: %o', info.version);
    });
  }
});

// Ready to use mongoose connection
mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB disconnected');
});


// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

const connectionOptions = {
  keepAlive: 1,
};

/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/
exports.connect = () => {
  mongoose.connect(mongo.uri, connectionOptions);
  return mongoose.connection;
};

exports.disconnect = (done) => {
  mongoose.disconnect(done);
};

exports.dropDB = (done) => {
  mongoose.connection.dropDatabase(done);
};


exports.connectionOptions = connectionOptions;
