const path = require('path');
const dotEnvSafe = require('dotenv-safe');

// Import environment variables.
// If the server is running on docker, disable the variable load from the .env
// file and use instead the system's variables.
if (!process.env.USING_DOCKER) {
  dotEnvSafe.load({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example'),
  });
}

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  mongo: {
    uri: process.env.MONGO_URI,
  },
};
