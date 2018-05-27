'use strict';

// Configurations
module.exports = {
  // Server
  port: process.env.PORT || <server port>,
  // Logs
  logs: {
    type: process.env.LOGS || 'DEBUG_NO_SYNC'
  },
  // SDK auth key and secret
  api: {
    key: <custom key for sdk access>,
    secret: <custom secret for sdk access>
  },
  // JWT Token
  jwt: {
    secret: <access token secret key>,
    expire: <expiration token time ie (2 hours): '2h'>
  },
  // MongoDB
  mongodb: {
    port: process.env.DB_PORT || <mongodb port> || 27017,
    host: process.env.DB_HOST || <mongodb url> || '127.0.0.1',
    name: <database name> || 'blockchain'
  }
};
